const pickerToolCatalog = {
  documenso: {
    label: "Documenso",
    link: "https://github.com/documenso/documenso",
    note: "Better when signing needs stronger team control, routing, and audit visibility.",
  },
  docuseal: {
    label: "Docuseal",
    link: "https://github.com/docusealco/docuseal",
    note: "Better when the buyer wants a lighter fill-and-sign lane without a broader rollout yet.",
  },
  stirling: {
    label: "Stirling-PDF",
    link: "https://github.com/Stirling-Tools/Stirling-PDF",
    note: "Relieves PDF merge, OCR, redaction, and cleanup pressure fast.",
  },
  formbricks: {
    label: "Formbricks",
    link: "https://github.com/formbricks/formbricks",
    note: "Turns messy email intake into structured requests and field capture.",
  },
  activepieces: {
    label: "Activepieces",
    link: "https://github.com/activepieces/activepieces",
    note: "Useful for lighter routing, notifications, and operator glue.",
  },
  n8n: {
    label: "n8n",
    link: "https://github.com/n8n-io/n8n",
    note: "Better when the workflow crosses many tools, states, and owners.",
  },
};

const offerCatalog = {
  audit: {
    label: "DocSafe Audit",
    link: "./docsafe-audit-start.html",
    note: "Best when the buyer still needs the lane mapped before implementation starts.",
    deploy: "Map field ownership, state changes, approvals, and delivery boundaries before choosing a broader build.",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    link: "./docsafe-setup-sprint-start.html",
    note: "Best when one production lane is already clear enough to implement now.",
    deploy: "Implement one live lane first: intake, review, sign, and delivery with clear states.",
  },
  workspace: {
    label: "DocSafe Workspace",
    link: "./docsafe-workspace-start.html",
    note: "Best when multiple owners and repeated approvals justify a fuller branded operating environment.",
    deploy: "Package the workflow as a controlled workspace with roles, approvals, routing logic, and repeated operating rules.",
  },
};

const signingNeed = document.getElementById("signingNeed");
const pdfLoad = document.getElementById("pdfLoad");
const intakeNeed = document.getElementById("intakeNeed");
const automationNeed = document.getElementById("automationNeed");
const coordinationNeed = document.getElementById("coordinationNeed");
const hostingPreference = document.getElementById("hostingPreference");

const stackName = document.getElementById("stackName");
const stackSummary = document.getElementById("stackSummary");
const stackReason = document.getElementById("stackReason");
const stackComponents = document.getElementById("stackComponents");
const offerName = document.getElementById("offerName");
const offerNote = document.getElementById("offerNote");
const deployNote = document.getElementById("deployNote");
const offerLink = document.getElementById("offerLink");
const stackLinks = document.getElementById("stackLinks");

const getSigningTool = (signing, coordination, hosting) => {
  if (signing === "none") {
    return null;
  }

  if (signing === "advanced" || coordination === "multi" || hosting === "self") {
    return "documenso";
  }

  return "docuseal";
};

const getAutomationTool = (automation, coordination) => {
  if (automation === "none") {
    return null;
  }

  if (automation === "heavy" || coordination === "multi") {
    return "n8n";
  }

  return "activepieces";
};

const uniqueKeys = (items) => [...new Set(items.filter(Boolean))];

const renderStackPicker = () => {
  const signing = signingNeed?.value || "none";
  const pdf = pdfLoad?.value || "low";
  const intake = intakeNeed?.value || "no";
  const automation = automationNeed?.value || "none";
  const coordination = coordinationNeed?.value || "solo";
  const hosting = hostingPreference?.value || "flexible";

  const components = [];
  const reasons = [];
  let complexity = 0;

  if (intake === "yes") {
    components.push("formbricks");
    reasons.push("structured intake should replace loose inbound requests first");
    complexity += 1;
  }

  if (pdf === "medium") {
    components.push("stirling");
    reasons.push("PDF handling already creates enough drag to justify a relief layer");
    complexity += 1;
  }

  if (pdf === "high") {
    components.push("stirling");
    reasons.push("high PDF volume means merge, OCR, redaction, and repackaging are likely eating team time");
    complexity += 2;
  }

  const signingTool = getSigningTool(signing, coordination, hosting);
  if (signingTool) {
    components.push(signingTool);
    reasons.push(
      signingTool === "documenso"
        ? "signing needs stronger owner control and audit visibility"
        : "a lighter signing lane should go live before a broader platform build"
    );
    complexity += signing === "advanced" ? 2 : 1;
  }

  const automationTool = getAutomationTool(automation, coordination);
  if (automationTool) {
    components.push(automationTool);
    reasons.push(
      automationTool === "n8n"
        ? "cross-system states are heavy enough to justify a stronger orchestration layer"
        : "light routing and notifications can be automated without overbuilding the stack"
    );
    complexity += automation === "heavy" ? 2 : 1;
  }

  if (coordination === "small") {
    complexity += 1;
  }

  if (coordination === "multi") {
    reasons.push("multi-owner approvals raise the cost of unclear states");
    complexity += 2;
  }

  if (hosting === "self") {
    reasons.push("self-hosted preference pushes the stack toward control and implementation depth");
    complexity += 1;
  }

  const componentKeys = uniqueKeys(components);

  let recommendation = "audit";
  let stackLabel = "Lean Document Lane";
  let summary = "Keep the first stack narrow and get one visible lane under control before layering more software.";

  if (coordination === "multi" || automation === "heavy" || complexity >= 7) {
    recommendation = "workspace";
    stackLabel = "Document Control Workspace";
    summary = "You need a controlled multi-owner environment, not another disconnected point tool.";
  } else if (complexity >= 4) {
    recommendation = "sprint";
    stackLabel = "Operator Routing Lane";
    summary = "There is already enough recurring pressure to justify implementing one production lane now.";
  }

  if (signing === "none" && pdf === "high" && automation === "none") {
    stackLabel = "PDF Operations Lane";
    summary = "Start with PDF cleanup pressure before expanding into a broader workflow stack.";
    recommendation = complexity >= 5 ? "sprint" : "audit";
  }

  if (intake === "yes" && signing !== "none" && automation === "none" && coordination !== "multi") {
    stackLabel = "Intake + Signing Lane";
    summary = "Start with structured intake and one clean signing path before you automate further.";
  }

  if (componentKeys.length === 0) {
    stackLabel = "Audit Before Tooling";
    summary = "There is not enough recurring workflow pressure selected yet to justify a software stack recommendation.";
    recommendation = "audit";
  }

  const offer = offerCatalog[recommendation];
  const priorityReason = reasons.length
    ? `Priority reason: ${reasons.slice(0, 2).join("; ")}.`
    : "Priority reason: the workflow is still too undefined to recommend tooling before an audit.";

  stackName.textContent = stackLabel;
  stackSummary.textContent = summary;
  stackReason.textContent = priorityReason;
  offerName.textContent = offer.label;
  offerNote.textContent = offer.note;
  deployNote.textContent = offer.deploy;
  offerLink.href = offer.link;
  offerLink.textContent = `Open ${offer.label}`;

  stackComponents.innerHTML = componentKeys.length
    ? componentKeys
        .map((key) => `<span class="stack-chip">${pickerToolCatalog[key].label}</span>`)
        .join("")
    : '<span class="stack-chip">Map workflow first</span>';

  stackLinks.innerHTML = componentKeys
    .map(
      (key) =>
        `<a class="table-link" href="${pickerToolCatalog[key].link}" target="_blank" rel="noreferrer">${pickerToolCatalog[key].label}</a>`
    )
    .join("");
};

[signingNeed, pdfLoad, intakeNeed, automationNeed, coordinationNeed, hostingPreference].forEach((input) =>
  input?.addEventListener("input", renderStackPicker)
);

renderStackPicker();
