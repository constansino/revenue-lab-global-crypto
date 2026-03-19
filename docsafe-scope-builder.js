const scopeCatalog = {
  formbricks: "Formbricks",
  stirling: "Stirling-PDF",
  documenso: "Documenso",
  docuseal: "Docuseal",
  activepieces: "Activepieces",
  n8n: "n8n",
};

const scopeOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the workflow still needs to be mapped before implementation is locked.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when one lane is already clear enough to build now.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when the workflow already needs broader roles, branding, and multi-owner state control.",
    link: "./docsafe-workspace-start.html",
  },
};

const approvalGate = document.getElementById("approvalGate");
const templateReuse = document.getElementById("templateReuse");
const pdfPain = document.getElementById("pdfPain");
const intakeSource = document.getElementById("intakeSource");
const automationDepth = document.getElementById("automationDepth");
const securityNeed = document.getElementById("securityNeed");

const scopeName = document.getElementById("scopeName");
const scopeSummary = document.getElementById("scopeSummary");
const scopeTools = document.getElementById("scopeTools");
const briefText = document.getElementById("briefText");
const acceptanceList = document.getElementById("acceptanceList");
const riskList = document.getElementById("riskList");
const scopeOfferName = document.getElementById("scopeOfferName");
const scopeOfferNote = document.getElementById("scopeOfferNote");
const scopeOfferLink = document.getElementById("scopeOfferLink");
const copyBriefButton = document.getElementById("copyBriefButton");
const copyCriteriaButton = document.getElementById("copyCriteriaButton");

const toBulletHtml = (items) => items.map((item) => `<p>- ${item}</p>`).join("");
const unique = (items) => [...new Set(items.filter(Boolean))];

const renderScopeBuilder = () => {
  const approval = approvalGate?.value || "none";
  const templates = templateReuse?.value || "none";
  const pdf = pdfPain?.value || "low";
  const intake = intakeSource?.value || "form";
  const automation = automationDepth?.value || "none";
  const security = securityNeed?.value || "standard";

  const tools = [];
  const acceptance = [];
  const risks = [];
  let complexity = 0;
  let lane = "Approval-Gated Signing Lane";
  let summary = "Start with one controlled intake-to-approval-to-signing path before broader workspace rollout.";

  if (intake !== "form") {
    tools.push("formbricks");
    acceptance.push("One structured intake form replaces loose email or chat starts for the target lane.");
    risks.push("If request fields are not standardized early, operators will keep bypassing the new lane.");
    complexity += 1;
  }

  if (approval === "basic") {
    tools.push("docuseal");
    acceptance.push("Signers are not contacted until the blocking approval step is complete.");
    risks.push("If approval ownership is not explicit, the signing lane will still stall in inbox threads.");
    complexity += 1;
  }

  if (approval === "multi") {
    tools.push("documenso");
    acceptance.push("Each approval stage is visible and signatures stay blocked until required approvals are complete.");
    risks.push("Multi-stage approval logic will fail if the team cannot agree on owner order and exception rules.");
    complexity += 2;
  }

  if (templates === "medium") {
    tools.push("docuseal");
    acceptance.push("The first document template is reusable without rebuilding fields for every send.");
    risks.push("Template sprawl will continue if old document versions are not retired.");
    complexity += 1;
  }

  if (templates === "high") {
    tools.push(approval === "multi" ? "documenso" : "docuseal");
    acceptance.push("The phase-one stack supports reusable templates or modular document assembly for the chosen lane.");
    risks.push("High template reuse pressure requires naming and governance rules, not only software selection.");
    complexity += 2;
  }

  if (pdf === "medium") {
    tools.push("stirling");
    acceptance.push("Operators can clean, merge, split, or OCR the target documents without leaving the lane.");
    risks.push("Medium PDF pain often hides inconsistent input quality that needs separate operating rules.");
    complexity += 1;
  }

  if (pdf === "high") {
    tools.push("stirling");
    acceptance.push("High-friction PDF tasks are reduced to a repeatable operator flow with OCR and cleanup support.");
    risks.push("Scanned or restricted documents may still break if OCR language packs and hosting limits are not validated.");
    complexity += 2;
    lane = "Secure PDF Intake Lane";
    summary = "Fix the document cleanup bottleneck first so intake, OCR, review, and delivery stop collapsing into manual rescue work.";
  }

  if (automation === "basic") {
    tools.push("activepieces");
    acceptance.push("The lane sends status notifications and handoff signals without manual chasing.");
    risks.push("Basic automation still needs explicit handoff events or it becomes another silent failure layer.");
    complexity += 1;
  }

  if (automation === "advanced") {
    tools.push("n8n");
    acceptance.push("Cross-system state changes run from one orchestration flow instead of scattered manual actions.");
    risks.push("Advanced orchestration creates hidden failure states if retries, approvals, and audit logging are not scoped up front.");
    complexity += 2;
  }

  if (security === "restricted") {
    acceptance.push("The phase-one design documents hosting restrictions, environment assumptions, and operator-safe execution boundaries.");
    risks.push("Restricted environments can block OCR, temp-file handling, or container permissions unless validated first.");
    complexity += 1;
  }

  if (approval === "multi" || automation === "advanced") {
    lane = "Multi-Team Document Control Lane";
    summary = "This lane needs explicit owner handoffs, approval stages, and orchestration boundaries before scale makes it worse.";
  } else if (templates === "high" && approval !== "none") {
    lane = "Reusable Signing Template Lane";
    summary = "Prioritize one repeatable template and approval path before expanding into broader bundle logic.";
  }

  let offerKey = "audit";
  if (complexity >= 4) {
    offerKey = "sprint";
  }
  if (complexity >= 7 || approval === "multi" || automation === "advanced") {
    offerKey = "workspace";
  }

  if (approval === "none" && templates === "none" && pdf === "low" && automation === "none" && intake === "form") {
    lane = "Audit Before Build";
    summary = "The workflow is still too undefined to justify a concrete implementation lane without discovery.";
    risks.unshift("There is not yet enough pressure defined to choose the right stack or build sequence.");
    acceptance.unshift("The team agrees on one lane, owner set, and success measure before implementation starts.");
    offerKey = "audit";
  }

  const toolList = unique(tools);
  const offer = scopeOfferCatalog[offerKey];
  const firstCriterion = acceptance[0]
    ? acceptance[0].replace(/\.$/, "").toLowerCase()
    : "the workflow can be measured clearly";
  const brief = `Phase one should implement ${lane.toLowerCase()} using ${
    toolList.length ? toolList.map((key) => scopeCatalog[key]).join(", ") : "a documented process map"
  }. The first release should focus on the single document path where ${firstCriterion}. Keep the scope narrow enough that owners, approvals, PDF handling, and handoff states are visible before adding more automation or document variants.`;

  scopeName.textContent = lane;
  scopeSummary.textContent = summary;
  scopeTools.innerHTML = toolList.length
    ? toolList.map((key) => `<span class="stack-chip">${scopeCatalog[key]}</span>`).join("")
    : '<span class="stack-chip">Map workflow first</span>';
  briefText.textContent = brief;
  acceptanceList.innerHTML = toBulletHtml(acceptance.slice(0, 4));
  riskList.innerHTML = toBulletHtml(unique(risks).slice(0, 4));
  scopeOfferName.textContent = offer.label;
  scopeOfferNote.textContent = offer.note;
  scopeOfferLink.href = offer.link;
  scopeOfferLink.textContent = `Open ${offer.label}`;

  copyBriefButton.dataset.copy = brief;
  copyCriteriaButton.dataset.copy = acceptance.slice(0, 4).map((item) => `- ${item}`).join("\n");
};

const copyText = async (button) => {
  const text = button?.dataset.copy || "";
  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    const original = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1200);
  } catch (_error) {
    const original = button.textContent;
    button.textContent = "Copy failed";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1200);
  }
};

[approvalGate, templateReuse, pdfPain, intakeSource, automationDepth, securityNeed].forEach((input) =>
  input?.addEventListener("input", renderScopeBuilder)
);

copyBriefButton?.addEventListener("click", () => copyText(copyBriefButton));
copyCriteriaButton?.addEventListener("click", () => copyText(copyCriteriaButton));

renderScopeBuilder();
