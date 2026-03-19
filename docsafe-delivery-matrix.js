const deliveryOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when recipient timing and ownership are still too ambiguous to automate safely.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the lane already has a clear recipient map and just needs implementation.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when several owners, observers, reply paths, and escalations need one controlled operating environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const deliveryApprovalMode = document.getElementById("deliveryApprovalMode");
const ccTiming = document.getElementById("ccTiming");
const signedFileDelivery = document.getElementById("signedFileDelivery");
const replyOwner = document.getElementById("replyOwner");
const responsePath = document.getElementById("responsePath");
const deliveryReminderMode = document.getElementById("deliveryReminderMode");

const deliveryPlanName = document.getElementById("deliveryPlanName");
const deliveryPlanSummary = document.getElementById("deliveryPlanSummary");
const recipientMatrix = document.getElementById("recipientMatrix");
const deliveryRules = document.getElementById("deliveryRules");
const deliveryBrief = document.getElementById("deliveryBrief");
const deliveryChecklist = document.getElementById("deliveryChecklist");
const deliveryOfferName = document.getElementById("deliveryOfferName");
const deliveryOfferNote = document.getElementById("deliveryOfferNote");
const deliveryOfferLink = document.getElementById("deliveryOfferLink");
const copyDeliveryBrief = document.getElementById("copyDeliveryBrief");
const copyDeliveryChecklist = document.getElementById("copyDeliveryChecklist");

const toBulletList = (items) => items.map((item) => `<p>- ${item}</p>`).join("");
const uniqueItems = (items) => [...new Set(items.filter(Boolean))];

const copyMatrixText = async (button) => {
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

const renderRecipientCards = (rows) =>
  rows
    .map(
      (row) => `
        <article class="matrix-card">
          <p class="matrix-role">${row.role}</p>
          <strong>${row.timing}</strong>
          <p>${row.message}</p>
        </article>
      `
    )
    .join("");

const renderDeliveryMatrix = () => {
  const approval = deliveryApprovalMode?.value || "none";
  const observers = ccTiming?.value || "none";
  const signedDelivery = signedFileDelivery?.value || "issuer";
  const reply = replyOwner?.value || "workspace";
  const response = responsePath?.value || "email";
  const reminders = deliveryReminderMode?.value || "none";

  const rows = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Controlled Approval Delivery";
  let summary = "Block signers until approval clears, keep observers out of the action path, and only release the signed file to the intended recipients.";

  if (approval === "none") {
    rows.push({
      role: "Signer",
      timing: "Active Immediately",
      message: "The signer receives the first action request without waiting for internal approval.",
    });
    checklist.push("The signer receives the right request and completion message without extra internal workflow noise.");
  }

  if (approval === "single") {
    rows.push({
      role: "Approver",
      timing: "Before Signing",
      message: "The approver gets the only active request, and signers stay blocked until approval completes.",
    });
    rows.push({
      role: "Signer",
      timing: "After Approval",
      message: "The signer is notified only after the blocking approval clears.",
    });
    rules.push("Do not send signature requests until the blocking approver clears the document.");
    checklist.push("Approvers see the pending state first and signers do not receive active links early.");
    complexity += 1;
  }

  if (approval === "staged") {
    rows.push({
      role: "Approver Group",
      timing: "Staged Gates",
      message: "Each approval stage receives its own request and later phases stay blocked until the gate is complete.",
    });
    rows.push({
      role: "Signer",
      timing: "After Final Approval",
      message: "Signers only enter the action path after all staged approvals finish.",
    });
    rules.push("Each approval stage must block the next notification wave until the required owners finish.");
    checklist.push("Staged approvals visibly control when signers and observers become active.");
    complexity += 2;
    plan = "Staged Delivery Governance";
    summary = "Use explicit approval gates before any signer or observer sees the wrong action state.";
  }

  if (observers === "none") {
    rows.push({
      role: "Observer / CC",
      timing: "Not Used",
      message: "No passive viewers are included in the lane.",
    });
  }

  if (observers === "complete") {
    rows.push({
      role: "Observer / CC",
      timing: "After Completion",
      message: "Observers receive the final document only after the signing path is complete.",
    });
    rules.push("Completion-only observers should not receive unsigned action links or premature status emails.");
    checklist.push("Observers only receive the final document at the intended completion moment.");
  }

  if (observers === "request") {
    rows.push({
      role: "Observer / CC",
      timing: "At Request Time",
      message: "Observers receive visibility when the request starts, but they never become active signers.",
    });
    rules.push("Request-time observers must receive view-only access without inheriting signer permissions.");
    checklist.push("Request-time CC viewers can see the intended state without being treated as action owners.");
    complexity += 1;
    if (approval !== "none") {
      plan = "Approval + Observer Delivery Path";
      summary = "Keep approvals blocking while giving observers visibility at the right moment without mixing them into signer actions.";
    }
  }

  if (signedDelivery === "issuer") {
    rows.push({
      role: "Issuer / Operator",
      timing: "Completion Delivery",
      message: "Only the issuer receives the final signed document unless distribution is handled elsewhere.",
    });
    rules.push("If only the issuer receives the signed file, the signer-facing completion message must say so clearly.");
  }

  if (signedDelivery === "signer") {
    rows.push({
      role: "Issuer + Signer",
      timing: "Completion Delivery",
      message: "The issuer and signer both receive the final signed document when the lane completes.",
    });
    checklist.push("Signers and issuers both receive the signed file at completion when that is the promised behavior.");
    complexity += 1;
  }

  if (signedDelivery === "all") {
    rows.push({
      role: "Issuer + Signer + Observer",
      timing: "Completion Delivery",
      message: "The final signed document is distributed to every included recipient group.",
    });
    rules.push("All-recipient delivery needs explicit final-distribution rules so passive viewers do not get action prompts.");
    checklist.push("All intended parties receive the final file, and no one mistakes the completion email for a pending action.");
    complexity += 1;
  }

  if (reply === "sender") {
    rules.push("Reply-to stays with the original sender, so ownership and support expectations must match that choice.");
  }

  if (reply === "workspace") {
    rows.push({
      role: "Ops Owner",
      timing: "Reply Handling",
      message: "Replies route to the shared workspace or ops owner instead of the template author.",
    });
    checklist.push("Replies land with the owner who can actually act on stalled approvals or signer questions.");
    complexity += 1;
  }

  if (reply === "tenant") {
    rows.push({
      role: "Tenant Owner",
      timing: "Reply Handling",
      message: "Replies route to the tenant-specific owner so delegated or multi-tenant delivery stays aligned.",
    });
    rules.push("Tenant delivery should not leak reply ownership back to the original author or template source.");
    checklist.push("Tenant-owned templates and notifications resolve replies to the correct tenant owner.");
    complexity += 1;
    if (observers !== "none" || approval !== "none") {
      plan = "Tenant-Controlled Delivery Matrix";
      summary = "This lane needs recipient timing and reply ownership to stay aligned across delegated or tenant-specific delivery.";
    }
  }

  if (response === "portal") {
    rules.push("Portal or signing-link delivery needs an explicit completion state so recipients know whether the workflow is still active.");
    complexity += 1;
  }

  if (response === "wait") {
    rows.push({
      role: "Responder",
      timing: "Response Capture",
      message: "The response path waits for a structured action, so broken response links or dead buttons become a delivery risk.",
    });
    rules.push("Send-and-wait style messages must have a tested response path so recipients do not see dead or no-action states.");
    checklist.push("Response links actually resolve to an actionable step instead of a dead end.");
    complexity += 2;
    plan = "Interactive Response Delivery Path";
    summary = "Treat the response path as part of delivery, not an optional add-on, or recipients will hit dead-end action states.";
  }

  if (reminders === "basic") {
    rules.push("Reminder timing must match the active recipient role so approvers, signers, and observers do not receive the same follow-up.");
    complexity += 1;
  }

  if (reminders === "escalate") {
    rows.push({
      role: "Fallback Owner",
      timing: "Escalation",
      message: "If the active recipient stalls, the lane escalates to a fallback owner instead of silently waiting.",
    });
    rules.push("Escalation should target the correct fallback owner rather than looping the same inactive recipient.");
    checklist.push("Reminder and escalation rules route stalled steps to an owner who can actually unblock the lane.");
    complexity += 2;
  }

  if (approval === "none" && observers === "none" && response === "email" && reminders === "none") {
    plan = "Simple Completion Delivery";
    summary = "Keep the lane minimal: one active signer, one clear completion rule, and no observer or escalation noise.";
  }

  let offerKey = "audit";
  if (complexity >= 3) {
    offerKey = "sprint";
  }
  if (complexity >= 6 || approval === "staged" || response === "wait" || reminders === "escalate") {
    offerKey = "workspace";
  }
  if (approval === "none" && observers === "none" && response === "email" && reminders === "none") {
    offerKey = "sprint";
  }

  const uniqueRules = uniqueItems(rules);
  const uniqueChecklist = uniqueItems(checklist);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the delivery path is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()}. The first release should prove that ${firstObjective.charAt(0).toLowerCase()}${firstObjective.slice(1)}. Keep delivery narrow enough that every recipient only receives the message, file, and reply path they should see at that stage.`;
  const offer = deliveryOfferCatalog[offerKey];

  deliveryPlanName.textContent = plan;
  deliveryPlanSummary.textContent = summary;
  recipientMatrix.innerHTML = renderRecipientCards(rows);
  deliveryRules.innerHTML = toBulletList(uniqueRules.slice(0, 5));
  deliveryChecklist.innerHTML = toBulletList(uniqueChecklist.slice(0, 5));
  deliveryBrief.textContent = brief;
  deliveryOfferName.textContent = offer.label;
  deliveryOfferNote.textContent = offer.note;
  deliveryOfferLink.href = offer.link;
  deliveryOfferLink.textContent = `Open ${offer.label}`;

  copyDeliveryBrief.dataset.copy = brief;
  copyDeliveryChecklist.dataset.copy = uniqueChecklist
    .slice(0, 5)
    .map((item) => `- ${item}`)
    .join("\n");
};

[deliveryApprovalMode, ccTiming, signedFileDelivery, replyOwner, responsePath, deliveryReminderMode].forEach((input) =>
  input?.addEventListener("input", renderDeliveryMatrix)
);

copyDeliveryBrief?.addEventListener("click", () => copyMatrixText(copyDeliveryBrief));
copyDeliveryChecklist?.addEventListener("click", () => copyMatrixText(copyDeliveryChecklist));

renderDeliveryMatrix();
