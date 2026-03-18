import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inputArg = process.argv[2] || "leads.csv";
const leadsPath = path.resolve(root, inputArg);
const parsed = path.parse(leadsPath);
const outputPath = path.join(parsed.dir, `${parsed.name}-outreach.txt`);

if (!fs.existsSync(leadsPath)) {
  console.error(`Missing input CSV: ${leadsPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(leadsPath, "utf8").trim();
const lines = raw.split(/\r?\n/).filter(Boolean);

if (lines.length < 2) {
  console.error("leads.csv has no lead rows.");
  process.exit(1);
}

const headers = lines[0].split(",");
const records = lines.slice(1).map((line) => {
  const cols = line.split(",");
  return Object.fromEntries(headers.map((header, index) => [header, (cols[index] || "").trim()]));
});

const makeDm = (lead) =>
  `Hi ${lead.company || "there"}, I checked ${lead.website || "your site"} and noticed ${lead.problem_observed || "a slow follow-up step"}.\n` +
  `I build 72-hour AI follow-up and quoting sprints for local service teams so warm leads get a faster next step.\n` +
  `If useful, I can send a short teardown and a ${lead.package_tier || "$799"} implementation option.`;

const makeEmail = (lead) =>
  `Subject: One intake issue I noticed on ${lead.company || "your site"}\n\n` +
  `I reviewed ${lead.website || "your site"} and found ${lead.problem_observed || "one obvious delay in the intake flow"}.\n` +
  `I help local service operators ship a lightweight AI follow-up and quote-prep workflow in 72 hours.\n` +
  `If you want, I can send a 3-step fix and price tiers.\n`;

const output = records
  .map((lead) => {
    return [
      `# ${lead.company || "Unknown Company"}`,
      `Website: ${lead.website || "-"}`,
      `Contact: ${lead.contact_channel || "-"}`,
      `Package: ${lead.package_tier || "-"}`,
      "",
      "DM",
      makeDm(lead),
      "",
      "Email",
      makeEmail(lead),
      "",
      "---",
      "",
    ].join("\n");
  })
  .join("\n");

fs.writeFileSync(outputPath, output);

console.log(`Generated outreach copy for ${records.length} lead(s): ${outputPath}`);
