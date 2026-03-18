import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inputArg = process.argv[2] || "leads.csv";
const leadsPath = path.resolve(root, inputArg);
const parsed = path.parse(leadsPath);

if (!fs.existsSync(leadsPath)) {
  console.error(`Missing input CSV: ${leadsPath}`);
  process.exit(1);
}

const csv = fs.readFileSync(leadsPath, "utf8").trim();
const lines = csv.split(/\r?\n/).filter(Boolean);

if (lines.length < 2) {
  console.error("leads.csv has no lead rows.");
  process.exit(1);
}

const headers = lines[0].split(",");
const rows = lines.slice(1).map((line) => {
  const cols = line.split(",");
  return Object.fromEntries(headers.map((header, index) => [header, (cols[index] || "").trim()]));
});

const fetchHtml = async (url) => {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.text();
};

const has = (html, pattern) => pattern.test(html);

const inspect = (html) => {
  const normalized = html.toLowerCase();
  const findings = [];

  const hasForm = has(normalized, /<form[\s>]/);
  const hasPhone = has(normalized, /tel:|\(\d{3}\)|\+\d{1,3}[\s-]?\d/);
  const hasBooking = has(normalized, /book now|schedule|appointment|calendly|setmore|housecall pro|jobber/);
  const hasChat = has(normalized, /live chat|intercom|drift|tawk|zendesk/);
  const hasQuote = has(normalized, /quote|get estimate|free estimate|request quote/);
  const hasAfterHours = has(normalized, /24\/7|after hours|same day|emergency service/);

  if (!hasForm) findings.push("no visible web form for lead capture");
  if (!hasPhone) findings.push("no obvious phone CTA above the fold");
  if (!hasBooking) findings.push("no clear scheduling or booking step");
  if (!hasChat) findings.push("no live chat or instant response layer");
  if (!hasQuote) findings.push("no strong quote or estimate CTA");
  if (hasAfterHours) findings.push("offers urgent service but may still rely on manual callbacks");

  if (findings.length === 0) {
    findings.push("site has basic conversion elements, but follow-up speed still needs manual review");
  }

  return {
    hasForm,
    hasPhone,
    hasBooking,
    hasChat,
    hasQuote,
    findings,
  };
};

const toSummary = (audit) => audit.findings.slice(0, 2).join("; ");

const main = async () => {
  const results = [];

  for (const row of rows) {
    const url = row.website;
    if (!url) {
      results.push({
        company: row.company || "-",
        website: "-",
        audit_summary: "missing website URL",
        outreach_angle: "ask how they currently handle follow-up and quote requests",
      });
      continue;
    }

    try {
      const html = await fetchHtml(url);
      const audit = inspect(html);
      results.push({
        company: row.company || "-",
        website: url,
        audit_summary: toSummary(audit),
        outreach_angle: audit.hasQuote
          ? "frame the offer around faster follow-up after quote requests"
          : "frame the offer around capturing and routing warm leads faster",
      });
    } catch (error) {
      results.push({
        company: row.company || "-",
        website: url,
        audit_summary: `audit failed: ${error.message}`,
        outreach_angle: "open with a short manual teardown instead of a technical claim",
      });
    }
  }

  const outputPath = path.join(parsed.dir, `${parsed.name}-audits.md`);
  const markdown = results
    .map(
      (result) =>
        `## ${result.company}\n` +
        `- Website: ${result.website}\n` +
        `- Audit: ${result.audit_summary}\n` +
        `- Outreach angle: ${result.outreach_angle}\n`
    )
    .join("\n");

  fs.writeFileSync(outputPath, `# Lead Audits\n\n${markdown}`);
  console.log(`Generated ${results.length} audit(s): ${outputPath}`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
