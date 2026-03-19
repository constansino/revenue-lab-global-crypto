const ladderOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when reminder ownership, expiry boundaries, and escalation rules still need to be mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when one reminder and expiry path is already clear enough to implement and test.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when reminders, response paths, expiry rules, and throttled delivery all need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const reminderStart = document.getElementById("reminderStart");
const reminderCadence = document.getElementById("reminderCadence");
const expiryMode = document.getElementById("expiryMode");
const escalationOwner = document.getElementById("escalationOwner");
const ladderResponsePath = document.getElementById("ladderResponsePath");
const sendRateMode = document.getElementById("sendRateMode");

const ladderPlanName = document.getElementById("ladderPlanName");
const ladderPlanSummary = document.getElementById("ladderPlanSummary");
const ladderPhases = document.getElementById("ladderPhases");
const ladderCards = document.getElementById("ladderCards");
const ladderRules = document.getElementById("ladderRules");
const ladderBrief = document.getElementById("ladderBrief");
const ladderChecklist = document.getElementById("ladderChecklist");
const ladderOfferName = document.getElementById("ladderOfferName");
const ladderOfferNote = document.getElementById("ladderOfferNote");
const ladderOfferLink = document.getElementById("ladderOfferLink");
const copyLadderBrief = document.getElementById("copyLadderBrief");
const copyLadderChecklist = document.getElementById("copyLadderChecklist");

const uniqueItems = (items) => [...new Set(items.filter(Boolean))];
const asBullets = (items) => items.map((item) => `<p>- ${item}</p>`).join("");

const copyLadderText = async (button) => {
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

const renderLadderCards = (rows) =>
  rows
    .map(
      (row) => `
        <article class="matrix-card">
          <p class="matrix-role">${row.label}</p>
          <strong>${row.timing}</strong>
          <p>${row.note}</p>
        </article>
      `
    )
    .join("");

const renderReminderLadder = () => {
  const start = reminderStart?.value || "day3";
  const cadence = reminderCadence?.value || "weekly";
  const expiry = expiryMode?.value || "signby";
  const owner = escalationOwner?.value || "ops";
  const response = ladderResponsePath?.value || "email";
  const rate = sendRateMode?.value || "limited";

  const phases = ["Send"];
  const cards = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Controlled Reminder Ladder";
  let summary = "Start early enough to recover unsigned documents, keep reminders distinguishable from the first send, and hand stalled cases to the right owner before expiry.";

  cards.push({
    label: "Initial request",
    timing: "Day 0",
    note: "The first send needs a clear owner-of-record so the reminder ladder does not begin from ambiguity.",
  });

  if (start === "manual") {
    phases.push("Manual Chase");
    cards.push({
      label: "Manual resend",
      timing: "Operator decides",
      note: "No automatic reminder is sent, so the team must notice pending documents and resend them intentionally.",
    });
    rules.push("Manual resend should target only unsigned recipients so completed parties do not get unnecessary reminders.");
  }

  if (start === "day3") {
    phases.push("Reminder 1");
    cards.push({
      label: "First reminder",
      timing: "Day 3",
      note: "A light reminder starts early enough to recover stalled documents before they go cold.",
    });
    checklist.push("Unsigned documents enter the first reminder state before the team forgets they are pending.");
    complexity += 1;
  }

  if (start === "day7") {
    phases.push("Reminder 1");
    cards.push({
      label: "First reminder",
      timing: "Day 7",
      note: "A later first touch reduces noise but increases the risk of slow-moving documents falling off the radar.",
    });
    checklist.push("The team agrees on a deliberate first reminder moment instead of ad hoc nudging.");
    complexity += 1;
  }

  if (start === "expiry") {
    phases.push("Expiry Warning");
    cards.push({
      label: "Expiry reminder",
      timing: "At boundary",
      note: "The first active follow-up happens when the document is close to or at its expiry boundary.",
    });
    rules.push("Expiry-first reminder modes need a very clear sign-by date because the ladder has no earlier recovery step.");
    complexity += 1;
  }

  if (cadence === "manual") {
    rules.push("On-demand resend must still make reminder content visibly different from the first request.");
  }

  if (cadence === "weekly") {
    phases.push("Weekly Reminder");
    cards.push({
      label: "Recurring reminder",
      timing: "Every 7 days",
      note: "Recurring reminders continue until completion, expiry, or an operator stops the lane.",
    });
    rules.push("Reminder messages should be clearly marked as reminders so recipients do not mistake them for the original send.");
    checklist.push("Recipients can distinguish a reminder from the original request in the inbox.");
    complexity += 1;
  }

  if (cadence === "escalating") {
    phases.push("Reminder 2", "Escalation");
    cards.push({
      label: "Escalation reminder",
      timing: "Later touches",
      note: "Later reminders use stronger ownership and language so pending documents do not sit in an endless resend loop.",
    });
    rules.push("Escalating ladders should change owner or message strength instead of repeating identical reminders forever.");
    checklist.push("Later reminders and escalations are visibly different from the first reminder wave.");
    complexity += 2;
    plan = "Escalating Reminder Ladder";
    summary = "Use increasingly explicit follow-up steps so unsigned documents do not stay trapped in a flat resend loop.";
  }

  if (expiry === "none") {
    rules.push("If no expiry exists, the team still needs a stop rule so the reminder ladder does not run indefinitely.");
  }

  if (expiry === "signby") {
    phases.push("Sign-By Boundary");
    cards.push({
      label: "Sign-by deadline",
      timing: "Before deadline",
      note: "The ladder should warn both operators and recipients before the sign-by boundary arrives.",
    });
    checklist.push("The reminder path clearly tells recipients when the document stops being valid for signing.");
    complexity += 1;
  }

  if (expiry === "fixed") {
    phases.push("Expiry", "Renewal Trigger");
    cards.push({
      label: "Expiry trigger",
      timing: "Validity end",
      note: "An expired document should hand off into a renewal, review, or re-sign lane instead of silently dying.",
    });
    rules.push("Fixed-validity documents need a clear renewal or re-sign handoff once expiry is reached.");
    checklist.push("Expired documents trigger a visible next step instead of disappearing into archive ambiguity.");
    complexity += 2;
    plan = "Expiry-To-Renewal Ladder";
    summary = "Treat expiry as a handoff event, not just an end state, when the business needs renewal or re-sign follow-through.";
  }

  if (owner === "sender") {
    cards.push({
      label: "Escalation owner",
      timing: "Owner path",
      note: "The original sender stays responsible for follow-up and exceptions.",
    });
    rules.push("If the sender remains the escalation owner, they must still have enough context to resolve stalled cases quickly.");
  }

  if (owner === "ops") {
    cards.push({
      label: "Escalation owner",
      timing: "Ops desk",
      note: "Ops becomes the owner for stalls, resends, and expiry handling instead of leaving the trail with the original sender.",
    });
    checklist.push("A named ops owner can act on stalled or expired documents without waiting for the original sender.");
    complexity += 1;
  }

  if (owner === "legal") {
    cards.push({
      label: "Escalation owner",
      timing: "Legal review",
      note: "Legal or compliance steps in when the reminder ladder reaches a governance or expiry boundary.",
    });
    rules.push("Legal-owned escalations should appear only at the stages where governance really matters.");
    checklist.push("Legal only receives the reminder states that require legal action, not every routine nudge.");
    complexity += 2;
  }

  if (owner === "account") {
    cards.push({
      label: "Escalation owner",
      timing: "Account follow-up",
      note: "The account owner takes over stalled documents when relationship context matters more than pure ops execution.",
    });
    rules.push("Account-owned escalations need a clear point where relationship follow-up becomes more effective than automated reminders.");
    checklist.push("The account owner receives the document at the right escalation point instead of too early or too late.");
    complexity += 1;
  }

  if (response === "portal") {
    rules.push("Portal reminder messages must make it obvious that the active step still lives in the portal or signing link.");
    complexity += 1;
  }

  if (response === "wait") {
    phases.push("Response Check");
    cards.push({
      label: "Response validation",
      timing: "After click",
      note: "The response button path itself must be tested so reminders do not send users into a no-action dead end.",
    });
    rules.push("Send-and-wait reminder paths need a verified response action so the ladder does not escalate around a broken button.");
    checklist.push("The response path behind reminder actions resolves to a live next step instead of a no-action message.");
    complexity += 2;
    plan = "Interactive Response Ladder";
    summary = "When reminder actions depend on a button path, the response step is part of the ladder, not an implementation detail.";
  }

  if (rate === "normal") {
    rules.push("Small-volume reminder flows can send immediately, but they still need a clear distinction between first send and reminder.");
  }

  if (rate === "limited") {
    cards.push({
      label: "Rate limit guard",
      timing: "Provider threshold",
      note: "Reminder delivery respects provider limits so follow-up does not fail or get throttled unexpectedly.",
    });
    rules.push("Rate-limited providers need reminder pacing rules so the ladder does not exceed mail throughput caps.");
    checklist.push("Reminder delivery respects provider limits instead of assuming infinite send capacity.");
    complexity += 1;
  }

  if (rate === "batched") {
    phases.push("Wave Send");
    cards.push({
      label: "Reminder wave",
      timing: "Staggered send",
      note: "Reminders are released in waves so high-volume follow-up can be controlled and audited safely.",
    });
    rules.push("Wave-based reminder sending should segment recipients so delivery volume and retries stay visible.");
    checklist.push("High-volume reminder waves are segmented and tracked rather than released in one burst.");
    complexity += 2;
    if (cadence !== "manual") {
      plan = "Throttled Reminder Orchestration";
      summary = "At scale, reminder timing and provider limits need orchestration rules or the chase path breaks under load.";
    }
  }

  if (
    start === "manual" &&
    cadence === "manual" &&
    expiry === "none" &&
    response === "email" &&
    rate === "normal"
  ) {
    plan = "Manual Recovery Path";
    summary = "Keep the first ladder minimal: targeted manual resend, one clear owner, and no automatic cadence until the lane is proven.";
  }

  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const uniquePhases = uniqueItems(phases);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the follow-up ladder is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one explicit reminder start, one expiry rule, and one named escalation owner. The first release should prove that ${firstObjective.charAt(0).toLowerCase()}${firstObjective.slice(1)}. Keep the ladder narrow enough that reminders, expiry handling, and response actions can be traced without guesswork.`;

  let offerKey = "audit";
  if (complexity >= 3) {
    offerKey = "sprint";
  }
  if (complexity >= 7 || expiry === "fixed" || response === "wait" || rate === "batched") {
    offerKey = "workspace";
  }
  if (complexity <= 2 && cadence === "manual" && expiry !== "fixed") {
    offerKey = "audit";
  }

  const offer = ladderOfferCatalog[offerKey];

  ladderPlanName.textContent = plan;
  ladderPlanSummary.textContent = summary;
  ladderPhases.innerHTML = uniquePhases.map((phase) => `<span class="phase-chip">${phase}</span>`).join("");
  ladderCards.innerHTML = renderLadderCards(cards);
  ladderRules.innerHTML = asBullets(uniqueRules);
  ladderBrief.textContent = brief;
  ladderChecklist.innerHTML = asBullets(uniqueChecklist);
  ladderOfferName.textContent = offer.label;
  ladderOfferNote.textContent = offer.note;
  ladderOfferLink.href = offer.link;
  ladderOfferLink.textContent = `Open ${offer.label}`;

  copyLadderBrief.dataset.copy = brief;
  copyLadderChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
};

[reminderStart, reminderCadence, expiryMode, escalationOwner, ladderResponsePath, sendRateMode].forEach((input) =>
  input?.addEventListener("input", renderReminderLadder)
);

copyLadderBrief?.addEventListener("click", () => copyLadderText(copyLadderBrief));
copyLadderChecklist?.addEventListener("click", () => copyLadderText(copyLadderChecklist));

renderReminderLadder();
