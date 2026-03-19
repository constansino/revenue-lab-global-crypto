const validationOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs its input-quality rules, exception model, and review burden mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when one validation-heavy form lane is already clear and needs to be implemented with the right feedback and fallback behavior.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when regulated input rules, live validation UX, exception handling, and review gates need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const validationScope = document.getElementById("validationScope");
const ruleStyle = document.getElementById("ruleStyle");
const feedbackTiming = document.getElementById("feedbackTiming");
const exceptionHandling = document.getElementById("exceptionHandling");
const recipientAssist = document.getElementById("recipientAssist");
const reviewGate = document.getElementById("reviewGate");

const validationPlanName = document.getElementById("validationPlanName");
const validationPlanSummary = document.getElementById("validationPlanSummary");
const validationMethods = document.getElementById("validationMethods");
const validationMap = document.getElementById("validationMap");
const validationPreview = document.getElementById("validationPreview");
const validationRules = document.getElementById("validationRules");
const validationBrief = document.getElementById("validationBrief");
const validationChecklist = document.getElementById("validationChecklist");
const validationOfferName = document.getElementById("validationOfferName");
const validationOfferNote = document.getElementById("validationOfferNote");
const validationOfferLink = document.getElementById("validationOfferLink");
const copyValidationPreview = document.getElementById("copyValidationPreview");
const copyValidationBrief = document.getElementById("copyValidationBrief");
const copyValidationChecklist = document.getElementById("copyValidationChecklist");

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

const copyValidationText = async (button) => {
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

const renderFieldValidationPlanner = () => {
  const selectedScope = validationScope?.value || "identity";
  const selectedRule = ruleStyle?.value || "pattern";
  const selectedFeedback = feedbackTiming?.value || "change";
  const selectedException = exceptionHandling?.value || "fallback";
  const selectedAssist = recipientAssist?.value || "prefill";
  const selectedReview = reviewGate?.value || "operator";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Realtime Pattern Validation Lane";
  let summary =
    "Use real-time feedback, pattern rules that actually clear once input is fixed, and an operator review lane for the few records that still need help.";

  pushCard(
    map,
    "Validation boundary",
    "Validation stage",
    "One owned validation boundary should explain which inputs are blocked, which are guided, and which can still flow into review when the default rules are not enough."
  );
  rules.push(
    "Validation should be QA'd on the exact recipient flow the buyer will ship, because rule correctness still fails commercially if stale errors or hidden constraints make the form feel broken."
  );
  checklist.push(
    "One owned validation boundary exists before the form reaches production recipients."
  );

  if (selectedScope === "identity") {
    methods.push("Identity and contact fields");
    pushCard(
      map,
      "Identity rule set",
      "Scope stage",
      "Identity and contact inputs need format rules that catch bad data without trapping valid recipients in false invalid states."
    );
    checklist.push(
      "Identity and contact fields enforce the expected format before bad records move downstream."
    );
    complexity += 2;
  }

  if (selectedScope === "dates") {
    methods.push("Date and lifecycle fields");
    pushCard(
      map,
      "Date rule set",
      "Scope stage",
      "Date fields should reflect actual business boundaries such as start, end, renewal, or approval windows."
    );
    checklist.push(
      "Date and lifecycle fields follow the intended business ranges instead of accepting any calendar value."
    );
    complexity += 2;
    plan = "Bounded Date Validation Lane";
    summary =
      "Constrain date fields to the real lifecycle window and give recipients immediate feedback before invalid dates reach approval or signing.";
  }

  if (selectedScope === "packet") {
    methods.push("Multi-field packet validation");
    pushCard(
      map,
      "Packet rule bundle",
      "Scope stage",
      "Packet-style forms need cross-field validation because one valid field rarely means the overall submission is usable."
    );
    checklist.push(
      "Cross-field validation rules are defined for the packet instead of validating each field in isolation only."
    );
    complexity += 3;
    plan = "Cross-Field Packet Validation";
    summary =
      "Use a packet-level validation bundle so multi-field submissions are checked for consistency before operators touch them.";
  }

  if (selectedScope === "regulated") {
    methods.push("Regulated intake rules");
    pushCard(
      map,
      "Regulated validation set",
      "Scope stage",
      "Regulated intake needs stricter format, range, and exception policies because downstream cleanup is more expensive than early blocking."
    );
    checklist.push(
      "Regulated fields follow a defined compliance-oriented validation policy before submissions are accepted."
    );
    complexity += 4;
    plan = "Regulated Intake Validation";
    summary =
      "Use stronger input rules, fallback guidance, and review control so regulated forms stop bad data before compliance inherits it.";
  }

  if (selectedRule === "required") {
    methods.push("Required fields only");
    rules.push(
      "Required-only rules are acceptable only when the buyer explicitly accepts weaker input quality and later cleanup outside the form."
    );
    complexity += 1;
  }

  if (selectedRule === "pattern") {
    methods.push("Pattern and regex rules");
    pushCard(
      map,
      "Pattern rule engine",
      "Rule stage",
      "Pattern rules should validate real formats like email or ID structures without leaving false errors after assisted entry."
    );
    checklist.push(
      "Pattern validation clears correctly once the recipient has actually fixed the input."
    );
    complexity += 2;
  }

  if (selectedRule === "bounded") {
    methods.push("Bounded dates and ranges");
    pushCard(
      map,
      "Range guardrails",
      "Rule stage",
      "Use min and max constraints when the buyer wants dates or numbers limited to real business boundaries."
    );
    checklist.push(
      "Range rules reflect the intended business guardrails rather than generic required-field fallback."
    );
    complexity += 2;
  }

  if (selectedRule === "composite") {
    methods.push("Composite validation bundle");
    pushCard(
      map,
      "Composite rule stack",
      "Rule stage",
      "Composite rules matter when one field depends on format, date, and cross-field consistency instead of a single simple constraint."
    );
    checklist.push(
      "Composite validation rules are documented where single-rule validation would miss real submission errors."
    );
    complexity += 3;
  }

  if (selectedFeedback === "submit") {
    methods.push("Submit-time feedback");
    rules.push(
      "Submit-time validation is the lightest approach, but buyers should accept that recipients may only discover problems after finishing the whole form."
    );
    complexity += 1;
  }

  if (selectedFeedback === "blur") {
    methods.push("Blur-time feedback");
    complexity += 1;
  }

  if (selectedFeedback === "change") {
    methods.push("Real-time on-change feedback");
    pushCard(
      map,
      "Live feedback",
      "Feedback stage",
      "Real-time validation helps recipients recover immediately after correcting input instead of carrying stale error states through the rest of the form."
    );
    checklist.push(
      "Validation errors disappear as soon as recipients correct the input instead of lingering until another interaction."
    );
    complexity += 2;
  }

  if (selectedFeedback === "review_gate") {
    methods.push("Pre-submit review gate");
    pushCard(
      map,
      "Review checkpoint",
      "Feedback stage",
      "A review gate works when the buyer wants recipients to confirm corrected values before the system treats the data as final."
    );
    checklist.push(
      "Recipients reach a clear review checkpoint before invalid or incomplete data is finally submitted."
    );
    complexity += 2;
  }

  if (selectedException === "hard_stop") {
    methods.push("Hard stop on invalid input");
    complexity += 1;
  }

  if (selectedException === "fallback") {
    methods.push("Fallback guidance and retry");
    pushCard(
      map,
      "Retry lane",
      "Exception stage",
      "Fallback guidance is useful when the buyer wants strong validation but still needs a humane way to recover from common entry mistakes."
    );
    checklist.push(
      "Recipients who hit validation errors get a clear retry path instead of a silent dead end."
    );
    complexity += 2;
  }

  if (selectedException === "ops_review") {
    methods.push("Ops review override");
    pushCard(
      map,
      "Review override lane",
      "Exception stage",
      "Ops review overrides matter when legitimate records occasionally fail strict rules and a team still needs a controlled exception lane."
    );
    checklist.push(
      "Operators can review and override the few flagged submissions that should not be rejected automatically."
    );
    complexity += 3;
  }

  if (selectedException === "escalation") {
    methods.push("Escalation to manual intake");
    pushCard(
      map,
      "Manual intake fallback",
      "Exception stage",
      "Escalation lanes matter when the buyer would rather move a complex record into manual handling than weaken the default validation policy."
    );
    checklist.push(
      "Complex validation failures can be escalated into a controlled manual-intake lane."
    );
    complexity += 3;
  }

  if (selectedAssist === "none") {
    rules.push(
      "No-assist validation works only when recipients already know the expected format well enough to avoid frequent mistakes."
    );
    complexity += 1;
  }

  if (selectedAssist === "inline_help") {
    methods.push("Inline hints and examples");
    checklist.push(
      "Recipients can see examples or hints for the fields most likely to be entered incorrectly."
    );
    complexity += 1;
  }

  if (selectedAssist === "prefill") {
    methods.push("Prefill and suggestions");
    pushCard(
      map,
      "Assistive entry",
      "Assist stage",
      "Prefill and suggestions should accelerate entry without leaving the form stuck in an invalid state after a valid selection is made."
    );
    checklist.push(
      "Assistive entry does not leave false invalid-state warnings after recipient selection or prefill."
    );
    complexity += 2;
  }

  if (selectedAssist === "mask") {
    methods.push("Input masks and guided format");
    pushCard(
      map,
      "Guided input format",
      "Assist stage",
      "Masks help when the buyer wants to guide entry before validation has to reject malformed values later."
    );
    checklist.push(
      "Input masks or guided format cues reduce malformed entries in the target fields."
    );
    complexity += 2;
  }

  if (selectedReview === "none") {
    rules.push(
      "No extra review gate is acceptable only when the buyer trusts automated validation enough to accept most records as final immediately."
    );
    complexity += 1;
  }

  if (selectedReview === "recipient") {
    methods.push("Recipient confirms corrected data");
    complexity += 1;
  }

  if (selectedReview === "operator") {
    methods.push("Operator checks flagged records");
    pushCard(
      map,
      "Flagged-record review",
      "Review stage",
      "Operator review works when the buyer wants automation for most records but still needs a place to resolve the ambiguous few."
    );
    checklist.push(
      "Flagged submissions can be reviewed by an operator before they become downstream cleanup work."
    );
    complexity += 2;
  }

  if (selectedReview === "audit") {
    methods.push("Audit-ready rejection log");
    pushCard(
      map,
      "Rejection evidence",
      "Review stage",
      "Audit-ready rejection logs matter when the buyer needs to prove why a submission was blocked or rerouted."
    );
    checklist.push(
      "Rejected or rerouted submissions leave an audit-friendly reason trail instead of disappearing into support."
    );
    complexity += 3;
  }

  if (
    selectedScope === "identity" &&
    selectedRule === "pattern" &&
    selectedFeedback === "change" &&
    selectedAssist === "prefill"
  ) {
    plan = "Realtime Pattern Validation Lane";
    summary =
      "Use real-time feedback, pattern rules that actually clear once input is fixed, and an operator review lane for the few records that still need help.";
  }

  if (
    selectedScope === "regulated" &&
    selectedRule === "composite" &&
    selectedException === "ops_review" &&
    selectedReview === "audit"
  ) {
    plan = "Regulated Intake Validation";
    summary =
      "Use strict composite validation, controlled exception review, and audit-ready rejection logs so regulated intake catches bad records before compliance cleanup begins.";
  }

  const preview = {
    validation_scope:
      selectedScope === "identity"
        ? "identity_and_contact_fields"
        : selectedScope === "dates"
          ? "date_and_lifecycle_fields"
          : selectedScope === "packet"
            ? "multi_field_packet_validation"
            : "regulated_intake_and_kyc_rules",
    rule_style:
      selectedRule === "required"
        ? "required_fields_only"
        : selectedRule === "pattern"
          ? "pattern_and_regex_rules"
          : selectedRule === "bounded"
            ? "bounded_dates_and_ranges"
            : "composite_validation_bundle",
    feedback_timing:
      selectedFeedback === "submit"
        ? "submit_time_only"
        : selectedFeedback === "blur"
          ? "blur_time_feedback"
          : selectedFeedback === "change"
            ? "real_time_on_change_feedback"
            : "pre_submit_review_gate",
    exception_handling:
      selectedException === "hard_stop"
        ? "hard_stop_on_invalid_input"
        : selectedException === "fallback"
          ? "fallback_guidance_and_retry"
          : selectedException === "ops_review"
            ? "ops_review_override_lane"
            : "escalation_to_manual_intake",
    recipient_assist:
      selectedAssist === "none"
        ? "no_assist_copy"
        : selectedAssist === "inline_help"
          ? "inline_hints_and_examples"
          : selectedAssist === "prefill"
            ? "prefill_and_suggestions"
            : "input_masks_and_guided_format",
    review_gate:
      selectedReview === "none"
        ? "no_extra_review_gate"
        : selectedReview === "recipient"
          ? "recipient_confirms_corrected_data"
          : selectedReview === "operator"
            ? "operator_checks_flagged_records"
            : "audit_ready_rejection_log",
    validation_controls: ["owned_validation_boundary"],
  };

  if (selectedRule === "pattern") {
    preview.validation_controls.push("pattern_validation");
  }
  if (selectedRule === "bounded") {
    preview.validation_controls.push("range_guardrails");
  }
  if (selectedRule === "composite") {
    preview.validation_controls.push("cross_field_validation");
  }
  if (selectedFeedback === "change") {
    preview.validation_controls.push("realtime_error_clear");
  }
  if (selectedFeedback === "review_gate") {
    preview.validation_controls.push("pre_submit_review_checkpoint");
  }
  if (selectedException === "ops_review") {
    preview.validation_controls.push("operator_override_lane");
  }
  if (selectedException === "escalation") {
    preview.validation_controls.push("manual_intake_escalation");
  }
  if (selectedAssist === "prefill") {
    preview.validation_controls.push("assistive_selection_sync");
  }
  if (selectedAssist === "mask") {
    preview.validation_controls.push("guided_input_format");
  }
  if (selectedReview === "audit") {
    preview.validation_controls.push("rejection_reason_log");
  }

  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the validation path is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one explicit validation target, one feedback-timing policy, and one exception lane. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the rules narrow enough that recipients, operators, and downstream systems can all understand why data is accepted, flagged, or rejected.`;

  let offerKey = "audit";
  if (complexity >= 4) {
    offerKey = "sprint";
  }
  if (
    complexity >= 8 ||
    selectedScope === "regulated" ||
    selectedRule === "composite" ||
    selectedException === "ops_review" ||
    selectedReview === "audit"
  ) {
    offerKey = "workspace";
  }
  if (
    complexity <= 3 &&
    selectedScope !== "regulated" &&
    selectedRule !== "composite"
  ) {
    offerKey = "audit";
  }

  const offer = validationOfferCatalog[offerKey];
  const previewText = JSON.stringify(preview, null, 2);

  validationPlanName.textContent = plan;
  validationPlanSummary.textContent = summary;
  validationMethods.innerHTML = uniqueMethods.length
    ? uniqueMethods.map((method) => `<span class="stack-chip">${method}</span>`).join("")
    : '<span class="stack-chip">Map validation first</span>';
  validationMap.innerHTML = renderCards(map);
  validationPreview.textContent = previewText;
  validationRules.innerHTML = asBullets(uniqueRules);
  validationBrief.textContent = brief;
  validationChecklist.innerHTML = asBullets(uniqueChecklist);
  validationOfferName.textContent = offer.label;
  validationOfferNote.textContent = offer.note;
  validationOfferLink.href = offer.link;
  validationOfferLink.textContent = `Open ${offer.label}`;

  copyValidationPreview.dataset.copy = previewText;
  copyValidationBrief.dataset.copy = brief;
  copyValidationChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
};

[
  validationScope,
  ruleStyle,
  feedbackTiming,
  exceptionHandling,
  recipientAssist,
  reviewGate,
].forEach((input) => {
  input?.addEventListener("input", renderFieldValidationPlanner);
  input?.addEventListener("change", renderFieldValidationPlanner);
});

copyValidationPreview?.addEventListener("click", () => copyValidationText(copyValidationPreview));
copyValidationBrief?.addEventListener("click", () => copyValidationText(copyValidationBrief));
copyValidationChecklist?.addEventListener("click", () => copyValidationText(copyValidationChecklist));

renderFieldValidationPlanner();
