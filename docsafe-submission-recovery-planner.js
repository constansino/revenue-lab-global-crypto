const recoveryOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs the exception map, reassignment risk, and recovery policy defined before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the buyer already knows the main reject, resubmit, or reassign path and needs it implemented cleanly.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when recovery, archive, reassignment, and downstream status handling need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const recoveryTrigger = document.getElementById("recoveryTrigger");
const recoveryOwner = document.getElementById("recoveryOwner");
const recoveryMode = document.getElementById("recoveryMode");
const dataCarry = document.getElementById("dataCarry");
const linkPolicy = document.getElementById("linkPolicy");
const notifyPolicy = document.getElementById("notifyPolicy");

const recoveryPlanName = document.getElementById("recoveryPlanName");
const recoveryPlanSummary = document.getElementById("recoveryPlanSummary");
const recoveryMethods = document.getElementById("recoveryMethods");
const recoveryMap = document.getElementById("recoveryMap");
const recoveryPreview = document.getElementById("recoveryPreview");
const recoveryRules = document.getElementById("recoveryRules");
const recoveryBrief = document.getElementById("recoveryBrief");
const recoveryChecklist = document.getElementById("recoveryChecklist");
const recoveryOfferName = document.getElementById("recoveryOfferName");
const recoveryOfferNote = document.getElementById("recoveryOfferNote");
const recoveryOfferLink = document.getElementById("recoveryOfferLink");
const copyRecoveryPreview = document.getElementById("copyRecoveryPreview");
const copyRecoveryBrief = document.getElementById("copyRecoveryBrief");
const copyRecoveryChecklist = document.getElementById("copyRecoveryChecklist");

const uniqueItems = (items) => [...new Set(items.filter(Boolean))];
const asBullets = (items) => items.map((item) => `<p>- ${item}</p>`).join("");
const lowerSentenceLead = (value) => {
  if (!value) {
    return value;
  }

  return /^[A-Z]{2,}\b/.test(value)
    ? value
    : value.charAt(0).toLowerCase() + value.slice(1);
};

const copyRecoveryText = async (button) => {
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

const renderCards = (cards) =>
  cards
    .map(
      (card) => `
        <article class="matrix-card">
          <p class="matrix-role">${card.label}</p>
          <strong>${card.key}</strong>
          <p>${card.note}</p>
        </article>
      `
    )
    .join("");

const pushCard = (cards, key, label, note) => {
  if (!cards.some((card) => card.key === key)) {
    cards.push({ key, label, note });
  }
};

const renderSubmissionRecoveryPlanner = () => {
  const selectedTrigger = recoveryTrigger?.value || "reject";
  const selectedOwner = recoveryOwner?.value || "ops";
  const selectedMode = recoveryMode?.value || "resubmit";
  const selectedCarry = dataCarry?.value || "prefill";
  const selectedLink = linkPolicy?.value || "rotate";
  const selectedNotify = notifyPolicy?.value || "affected";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Correction-Safe Resubmission";
  let summary =
    "Keep one owned recovery owner, prefill safe corrections where possible, and make notification and link invalidation explicit before the next resend.";

  pushCard(
    map,
    "Exception owner",
    "Recovery stage",
    "One owner should decide the next recovery action so rejects, resubmits, and reassignments do not bounce between inboxes."
  );

  if (selectedTrigger === "reject") {
    methods.push("Rejected submission recovery");
    pushCard(
      map,
      "Reject event",
      "Trigger stage",
      "Treat a reject as a first-class recovery event instead of assuming the workflow simply ends."
    );
    rules.push(
      "Rejected submissions need an explicit owner and next-state label or they silently disappear into support debt."
    );
    checklist.push(
      "Rejected submissions trigger an owned recovery path instead of silently stopping in the queue."
    );
    complexity += 1;
  }

  if (selectedTrigger === "wrong_data") {
    methods.push("Wrong-data correction");
    pushCard(
      map,
      "Correction trigger",
      "Trigger stage",
      "Small mistakes should activate a correction lane that does not force every field to be re-entered from scratch."
    );
    checklist.push(
      "Wrong-data corrections can be handled without forcing the signer to refill the entire form."
    );
    complexity += 1;
  }

  if (selectedTrigger === "wrong_recipient") {
    methods.push("Wrong-recipient reassignment");
    pushCard(
      map,
      "Recipient mismatch",
      "Trigger stage",
      "Recipient mismatch should open a reassignment lane immediately because stale access is itself a security risk."
    );
    checklist.push(
      "Wrong-recipient cases immediately switch into a reassignment path rather than relying on ad hoc email follow-up."
    );
    complexity += 2;
  }

  if (selectedTrigger === "timing") {
    methods.push("Invite timing recovery");
    pushCard(
      map,
      "Send timing gate",
      "Trigger stage",
      "Invitation timing should be recoverable when the original send moment would be awkward or unprofessional in the recipient's timezone."
    );
    checklist.push(
      "Invitation timing can be moved deliberately when the original send moment is wrong for the recipient."
    );
    complexity += 1;
  }

  if (selectedOwner === "ops") {
    methods.push("Ops-owned exception desk");
    complexity += 1;
  }

  if (selectedOwner === "sender") {
    methods.push("Sender-owned follow-up");
    rules.push(
      "Sender-owned recovery works only when the sender can actually reissue, reassign, and explain the exception safely."
    );
    complexity += 1;
  }

  if (selectedOwner === "legal") {
    methods.push("Legal-controlled recovery");
    pushCard(
      map,
      "Legal review gate",
      "Owner stage",
      "Use legal-owned recovery when the submission or contract risk is high enough that resets, voids, or rejects require controlled approval."
    );
    complexity += 2;
  }

  if (selectedOwner === "account") {
    methods.push("Account-owner recovery");
    complexity += 1;
  }

  if (selectedMode === "resubmit") {
    methods.push("Resubmit with correction");
    pushCard(
      map,
      "Correction lane",
      "Mode stage",
      "Resubmit only the corrected path when the original issue was a small mistake instead of a broken signer assignment."
    );
    checklist.push(
      "Minor mistakes use a correction lane instead of a full void-and-reissue cycle."
    );
    complexity += 1;
  }

  if (selectedMode === "void") {
    methods.push("Void and reissue");
    pushCard(
      map,
      "Void boundary",
      "Mode stage",
      "Void completed or compromised submissions deliberately, then reissue a clean version with a new traceable identity."
    );
    rules.push(
      "Void-and-reissue needs an explicit archive rule so the original remains visible to admins without remaining active for signers."
    );
    checklist.push(
      "Void or reset actions produce a clearly separated replacement submission instead of editing the original in place."
    );
    complexity += 2;
  }

  if (selectedMode === "reassign") {
    methods.push("Recipient reassignment");
    pushCard(
      map,
      "Recipient swap lane",
      "Mode stage",
      "Reassign the signer only when the old recipient loses access and the new recipient gets a clean handoff."
    );
    checklist.push(
      "Recipient reassignment invalidates the old access path before the new recipient is contacted."
    );
    complexity += 2;
  }

  if (selectedMode === "schedule") {
    methods.push("Scheduled re-send");
    pushCard(
      map,
      "Scheduled invite lane",
      "Mode stage",
      "Prepare the recovery message now, but schedule the actual invite when the recipient should receive it."
    );
    checklist.push(
      "Scheduled recovery sends respect timezone and professionalism constraints instead of firing immediately."
    );
    complexity += 1;
  }

  if (selectedCarry === "prefill") {
    methods.push("Safe prefill reuse");
    pushCard(
      map,
      "Prefill carry lane",
      "Data stage",
      "Carry prior answers into the correction flow when the signer should only fix a small subset of fields."
    );
    checklist.push(
      "The correction flow reuses safe prior answers so the signer only fixes the wrong part."
    );
    complexity += 1;
  }

  if (selectedCarry === "clean") {
    methods.push("Fresh restart");
    rules.push(
      "Fresh restarts should be used when prior answers are no longer trustworthy enough to carry into the corrected submission."
    );
    complexity += 1;
  }

  if (selectedCarry === "archive") {
    methods.push("Archive original before reissue");
    pushCard(
      map,
      "Original evidence lane",
      "Data stage",
      "Archive the original submission before reissuing when the initial artifact still matters for traceability."
    );
    checklist.push(
      "Original submissions are archived before replacement when traceability matters."
    );
    complexity += 2;
  }

  if (selectedCarry === "diff") {
    methods.push("Correction-note diff");
    complexity += 1;
  }

  if (selectedLink === "rotate") {
    methods.push("Rotate stale access links");
    pushCard(
      map,
      "Link invalidation",
      "Access stage",
      "Regenerate or rotate the signer access link when recipient identity changes so the old recipient can no longer use the previous URL."
    );
    checklist.push(
      "Recipient changes regenerate access links so the previous recipient cannot keep using the old URL."
    );
    complexity += 2;
  }

  if (selectedLink === "new_submission") {
    methods.push("New submission link");
    checklist.push(
      "Recovery creates a new submission identity when the old link and old audit context should not continue."
    );
    complexity += 1;
  }

  if (selectedLink === "forward") {
    methods.push("Forward to replacement signer");
    rules.push(
      "Forwarding should still define whether the original recipient loses access or merely receives no further reminders."
    );
    complexity += 2;
  }

  if (selectedLink === "hold") {
    methods.push("Hold link during review");
    complexity += 1;
  }

  if (selectedNotify === "affected") {
    methods.push("Notify affected parties");
    complexity += 1;
  }

  if (selectedNotify === "all") {
    methods.push("Notify all involved parties");
    pushCard(
      map,
      "Global notice lane",
      "Notification stage",
      "Send the recovery notice to everyone touched by the submission when partial context would create confusion or mistrust."
    );
    complexity += 2;
  }

  if (selectedNotify === "signed") {
    methods.push("Notify already-signed parties");
    pushCard(
      map,
      "Signed-party notice",
      "Notification stage",
      "Already-signed parties need an explicit notification path when a later reject or reset changes the status they thought was final."
    );
    checklist.push(
      "Already-signed parties are explicitly informed when a reject or reset changes the submission outcome."
    );
    complexity += 2;
  }

  if (selectedNotify === "scheduled") {
    methods.push("Scheduled recovery notices");
    complexity += 1;
  }

  if (selectedTrigger === "wrong_recipient" && selectedMode === "reassign") {
    plan = "Recipient Reassignment Guard";
    summary =
      "Swap the signer deliberately, rotate stale access, and archive the old context before the new recipient enters the workflow.";
  }

  if (selectedTrigger === "wrong_data" && selectedMode === "resubmit" && selectedCarry === "prefill") {
    plan = "Correction-Safe Resubmission";
    summary =
      "Carry safe prior answers into a correction flow so the signer fixes only the wrong detail instead of starting the whole submission again.";
  }

  if (selectedMode === "void" && selectedCarry === "archive") {
    plan = "Void And Reissue Control";
    summary =
      "Archive the original submission cleanly, void the compromised artifact, and reissue a traceable replacement without blurring the audit trail.";
  }

  if (selectedTrigger === "timing" && selectedMode === "schedule") {
    plan = "Scheduled Recovery Send";
    summary =
      "Prepare the recovery workflow now, but send the next invite at the right time for the recipient and the business context.";
  }

  const preview = {
    recovery_trigger:
      selectedTrigger === "reject"
        ? "signer_reject"
        : selectedTrigger === "wrong_data"
          ? "data_correction"
          : selectedTrigger === "wrong_recipient"
            ? "recipient_reassignment"
            : "invite_timing_change",
    recovery_owner:
      selectedOwner === "ops"
        ? "ops_owner"
        : selectedOwner === "sender"
          ? "original_sender"
          : selectedOwner === "legal"
            ? "legal_or_compliance"
            : "account_owner",
    recovery_mode:
      selectedMode === "resubmit"
        ? "resubmit_with_correction"
        : selectedMode === "void"
          ? "void_and_reissue"
          : selectedMode === "reassign"
            ? "reassign_recipient"
            : "schedule_recovery_send",
    data_carry:
      selectedCarry === "prefill"
        ? "prefill_safe_prior_answers"
        : selectedCarry === "clean"
          ? "fresh_restart"
          : selectedCarry === "archive"
            ? "archive_original_submission"
            : "keep_correction_notes_only",
    link_policy:
      selectedLink === "rotate"
        ? "rotate_signing_link"
        : selectedLink === "new_submission"
          ? "new_submission_new_link"
          : selectedLink === "forward"
            ? "forward_to_replacement_signer"
            : "hold_current_link_during_review",
    notification_policy:
      selectedNotify === "affected"
        ? "notify_affected_parties"
        : selectedNotify === "all"
          ? "notify_all_involved_parties"
          : selectedNotify === "signed"
            ? "notify_already_signed_parties"
            : "schedule_recovery_notices",
    api_actions: [],
  };

  if (selectedMode === "resubmit") {
    preview.api_actions.push("updateSubmitter");
  }

  if (selectedMode === "reassign") {
    preview.api_actions.push("updateSubmitter");
  }

  if (selectedMode === "void" || selectedCarry === "archive") {
    preview.api_actions.push("archiveSubmission");
  }

  if (selectedMode === "schedule") {
    preview.api_actions.push("createSubmission");
  }

  if (selectedCarry === "prefill") {
    preview.prefill_policy = "reuse_previous_field_values_where_safe";
  }

  if (selectedLink === "rotate") {
    preview.slug_policy = "regenerate_slug_on_recipient_change";
  }

  if (selectedNotify === "signed") {
    preview.notice_targets = ["already_signed_parties", "current_owner"];
  }

  if (selectedNotify === "all") {
    preview.notice_targets = ["all_submitters", "ops_owner", "internal_watchers"];
  }

  if (selectedTrigger === "timing") {
    preview.send_policy = "prepare_now_send_later";
  }

  const previewText = JSON.stringify(preview, null, 2);
  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the recovery path is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one recovery owner, one access-link rule, and one notification policy. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the recovery path narrow enough that rejects, reassignment, and corrections can be handled without improvisation.`;

  let offerKey = "audit";
  if (complexity >= 5) {
    offerKey = "sprint";
  }
  if (
    complexity >= 10 ||
    (selectedTrigger === "wrong_recipient" && selectedMode === "reassign" && selectedLink === "rotate") ||
    (selectedMode === "void" && selectedCarry === "archive" && selectedNotify === "all")
  ) {
    offerKey = "workspace";
  }

  const offer = recoveryOfferCatalog[offerKey];

  if (recoveryPlanName) {
    recoveryPlanName.textContent = plan;
  }

  if (recoveryPlanSummary) {
    recoveryPlanSummary.textContent = summary;
  }

  if (recoveryMethods) {
    recoveryMethods.innerHTML = uniqueMethods
      .map((method) => `<span class="stack-chip">${method}</span>`)
      .join("");
  }

  if (recoveryMap) {
    recoveryMap.innerHTML = renderCards(map);
  }

  if (recoveryPreview) {
    recoveryPreview.textContent = previewText;
  }

  if (recoveryRules) {
    recoveryRules.innerHTML = asBullets(uniqueRules);
  }

  if (recoveryBrief) {
    recoveryBrief.textContent = brief;
  }

  if (recoveryChecklist) {
    recoveryChecklist.innerHTML = asBullets(uniqueChecklist);
  }

  if (recoveryOfferName) {
    recoveryOfferName.textContent = offer.label;
  }

  if (recoveryOfferNote) {
    recoveryOfferNote.textContent = offer.note;
  }

  if (recoveryOfferLink) {
    recoveryOfferLink.href = offer.link;
    recoveryOfferLink.textContent = `Open ${offer.label}`;
  }

  if (copyRecoveryPreview) {
    copyRecoveryPreview.dataset.copy = previewText;
  }

  if (copyRecoveryBrief) {
    copyRecoveryBrief.dataset.copy = brief;
  }

  if (copyRecoveryChecklist) {
    copyRecoveryChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
  }
};

[recoveryTrigger, recoveryOwner, recoveryMode, dataCarry, linkPolicy, notifyPolicy].forEach((input) => {
  input?.addEventListener("input", renderSubmissionRecoveryPlanner);
  input?.addEventListener("change", renderSubmissionRecoveryPlanner);
});

copyRecoveryPreview?.addEventListener("click", () => copyRecoveryText(copyRecoveryPreview));
copyRecoveryBrief?.addEventListener("click", () => copyRecoveryText(copyRecoveryBrief));
copyRecoveryChecklist?.addEventListener("click", () => copyRecoveryText(copyRecoveryChecklist));

renderSubmissionRecoveryPlanner();
