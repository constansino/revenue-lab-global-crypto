const approvalOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the approval order and observer rules are still too fuzzy to implement safely.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when one approval lane is already clear enough to implement and test.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when several owners, viewers, and automations need one controlled operating environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const approvalToolCatalog = {
  documenso: "Documenso",
  docuseal: "Docuseal",
  activepieces: "Activepieces",
  n8n: "n8n",
};

const approvalDepth = document.getElementById("approvalDepth");
const signingMode = document.getElementById("signingMode");
const viewerMode = document.getElementById("viewerMode");
const deliveryPath = document.getElementById("deliveryPath");
const reminderMode = document.getElementById("reminderMode");
const automationSupport = document.getElementById("automationSupport");

const approvalPlanName = document.getElementById("approvalPlanName");
const approvalPlanSummary = document.getElementById("approvalPlanSummary");
const approvalPhases = document.getElementById("approvalPhases");
const approvalTools = document.getElementById("approvalTools");
const notificationRules = document.getElementById("notificationRules");
const approvalBrief = document.getElementById("approvalBrief");
const approvalChecklist = document.getElementById("approvalChecklist");
const approvalOfferName = document.getElementById("approvalOfferName");
const approvalOfferNote = document.getElementById("approvalOfferNote");
const approvalOfferLink = document.getElementById("approvalOfferLink");
const copyApprovalBrief = document.getElementById("copyApprovalBrief");
const copyApprovalChecklist = document.getElementById("copyApprovalChecklist");

const uniqueKeys = (items) => [...new Set(items.filter(Boolean))];
const asBullets = (items) => items.map((item) => `<p>- ${item}</p>`).join("");

const copyPlannerText = async (button) => {
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

const renderApprovalPlanner = () => {
  const approvals = approvalDepth?.value || "none";
  const signers = signingMode?.value || "single";
  const viewers = viewerMode?.value || "none";
  const delivery = deliveryPath?.value || "email";
  const reminders = reminderMode?.value || "none";
  const automation = automationSupport?.value || "manual";

  const phases = ["Intake"];
  const rules = [];
  const checklist = [];
  const tools = [];
  let complexity = 0;
  let plan = "Sequential Approval Chain";
  let summary = "Keep the first approver blocking, then move signers in order, and only send completion observers after the lane finishes.";

  if (approvals === "single") {
    phases.push("Approval");
    rules.push("Do not notify signers until the blocking approver completes review.");
    checklist.push("The workflow visibly pauses in a pending-approval state before any signer can act.");
    tools.push("docuseal");
    complexity += 1;
  }

  if (approvals === "staged") {
    phases.push("Approval 1", "Approval 2");
    rules.push("Each approval stage must block the next phase until the required owner completes it.");
    checklist.push("Approvers act in explicit order and signatures stay blocked until staged approvals finish.");
    tools.push("documenso");
    complexity += 2;
    plan = "Staged Approval Control Path";
    summary = "Use explicit approval stages before signatures so internal governance stops leaking into signer confusion.";
  }

  if (signers === "single") {
    phases.push("Signature");
    rules.push("Only the intended signer receives the active signing request.");
    checklist.push("The target signer is clearly marked and receives the correct request and completion message.");
  }

  if (signers === "sequential") {
    phases.push("Signer 1", "Signer 2");
    rules.push("Later signers should not receive requests until earlier signers complete their step.");
    checklist.push("Sequential signers are notified in order and cannot jump ahead in the path.");
    complexity += 1;
  }

  if (signers === "parallel") {
    phases.push("Parallel Signers");
    rules.push("All signers can act in parallel, but completion should remain visible to operators.");
    checklist.push("Parallel signers receive the same active state without ambiguity about remaining signatures.");
    complexity += 1;
    if (approvals === "none") {
      plan = "Parallel Signature Broadcast";
      summary = "Skip blocking approvals and send one visible signature round when the lane does not need staged governance.";
    }
  }

  if (viewers === "complete") {
    phases.push("Completion Send");
    rules.push("Observers receive the finished document after signatures complete, not the unsigned draft.");
    checklist.push("Completion-only viewers receive the final document without getting premature action links.");
  }

  if (viewers === "request") {
    phases.push("CC View");
    rules.push("Request-time viewers get visibility without signing permissions, and their access follows the chosen phase order.");
    checklist.push("CC viewers can observe the right state without being treated like active signers.");
    tools.push(approvals === "staged" ? "documenso" : "docuseal");
    complexity += 1;
    if (approvals !== "none") {
      plan = "Approval + CC Oversight Path";
      summary = "Keep internal approvals blocking while giving observers visibility at the right moment without letting them act as signers.";
    }
  }

  if (delivery === "portal") {
    rules.push("Portal or signing-link delivery needs an explicit post-sign completion rule so recipients know whether the document is done.");
    checklist.push("Portal recipients and operators can both see the correct final status after signing.");
    complexity += 1;
  }

  if (delivery === "mixed") {
    rules.push("Mixed link and email delivery should follow one owner-of-record rule for status and reminders.");
    checklist.push("The team knows whether email or link state is the source of truth for the lane.");
    complexity += 1;
  }

  if (reminders === "basic") {
    rules.push("Reminder timing is defined before the lane goes live so stalled approvals do not disappear in inboxes.");
    tools.push("activepieces");
    complexity += 1;
  }

  if (reminders === "escalate") {
    phases.push("Fallback Escalation");
    rules.push("If an approver or signer stalls, the lane escalates to a fallback owner instead of waiting silently.");
    checklist.push("Reminder and fallback escalation rules are documented for every blocking step.");
    tools.push("n8n");
    complexity += 2;
    if (approvals !== "none") {
      plan = "Escalated Approval Governance Path";
      summary = "This lane needs blocking approvals, reminder logic, and fallback ownership so money-critical documents do not stall silently.";
    }
  }

  if (automation === "light") {
    tools.push(reminders === "none" ? "activepieces" : null);
    rules.push("Light routing automation can notify operators and keep state changes visible without overbuilding the flow.");
    complexity += 1;
  }

  if (automation === "heavy") {
    tools.push("n8n");
    rules.push("Heavy orchestration requires one explicit system to manage approval events, signer transitions, and completion distribution.");
    checklist.push("Automation owns the transitions between approvals, signatures, reminders, and final delivery.");
    complexity += 2;
    if (approvals === "staged" || viewers === "request") {
      plan = "Multi-System Approval Orchestration";
      summary = "Approvals, signer sequencing, observers, and reminders all need one controlled orchestration layer before the lane becomes trustworthy.";
    }
  }

  if (approvals === "none" && signers === "single" && viewers === "none" && reminders === "none" && automation === "manual") {
    plan = "Simple Signature Route";
    summary = "Keep the lane minimal: one signer, one delivery path, and no extra approval or observer complexity.";
    tools.push("docuseal");
  }

  let offerKey = "audit";
  if (complexity >= 3) {
    offerKey = "sprint";
  }
  if (complexity >= 6 || approvals === "staged" || automation === "heavy") {
    offerKey = "workspace";
  }
  if (approvals === "none" && viewers === "none" && automation === "manual" && delivery === "email") {
    offerKey = "sprint";
  }

  const phaseChips = phases;
  const toolKeys = uniqueKeys(tools);
  const firstObjective = checklist[0]
    ? checklist[0].replace(/\.$/, "")
    : "The approval path is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} using ${
    toolKeys.length ? toolKeys.map((key) => approvalToolCatalog[key]).join(", ") : "a documented operating path"
  }. The first release should prove that ${firstObjective.charAt(0).toLowerCase()}${firstObjective.slice(1)}. Keep the first release narrow enough that approvers, signers, and viewers each receive only the notifications they should see at that moment.`;
  const offer = approvalOfferCatalog[offerKey];

  approvalPlanName.textContent = plan;
  approvalPlanSummary.textContent = summary;
  approvalPhases.innerHTML = phaseChips.map((phase) => `<span class="phase-chip">${phase}</span>`).join("");
  approvalTools.innerHTML = toolKeys.length
    ? toolKeys.map((key) => `<span class="stack-chip">${approvalToolCatalog[key]}</span>`).join("")
    : '<span class="stack-chip">Map approval path first</span>';
  notificationRules.innerHTML = asBullets(uniqueKeys(rules).slice(0, 5));
  approvalChecklist.innerHTML = asBullets(uniqueKeys(checklist).slice(0, 5));
  approvalBrief.textContent = brief;
  approvalOfferName.textContent = offer.label;
  approvalOfferNote.textContent = offer.note;
  approvalOfferLink.href = offer.link;
  approvalOfferLink.textContent = `Open ${offer.label}`;

  copyApprovalBrief.dataset.copy = brief;
  copyApprovalChecklist.dataset.copy = uniqueKeys(checklist)
    .slice(0, 5)
    .map((item) => `- ${item}`)
    .join("\n");
};

[approvalDepth, signingMode, viewerMode, deliveryPath, reminderMode, automationSupport].forEach((input) =>
  input?.addEventListener("input", renderApprovalPlanner)
);

copyApprovalBrief?.addEventListener("click", () => copyPlannerText(copyApprovalBrief));
copyApprovalChecklist?.addEventListener("click", () => copyPlannerText(copyApprovalChecklist));

renderApprovalPlanner();
