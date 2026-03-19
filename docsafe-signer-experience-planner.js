const signerOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs the signer surface, prepared-review boundary, and finish-state risks mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when one signer path is already clear and needs to be implemented with the right completion and QA controls.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when embedded signing, prepared review, signature policy, and timestamp-safe completion all need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const signingSurface = document.getElementById("signingSurface");
const reviewMode = document.getElementById("reviewMode");
const guidanceMode = document.getElementById("guidanceMode");
const signaturePolicy = document.getElementById("signaturePolicy");
const datePolicy = document.getElementById("datePolicy");
const completionFallback = document.getElementById("completionFallback");

const signerPlanName = document.getElementById("signerPlanName");
const signerPlanSummary = document.getElementById("signerPlanSummary");
const signerMethods = document.getElementById("signerMethods");
const signerMap = document.getElementById("signerMap");
const signerPreview = document.getElementById("signerPreview");
const signerRules = document.getElementById("signerRules");
const signerBrief = document.getElementById("signerBrief");
const signerChecklist = document.getElementById("signerChecklist");
const signerOfferName = document.getElementById("signerOfferName");
const signerOfferNote = document.getElementById("signerOfferNote");
const signerOfferLink = document.getElementById("signerOfferLink");
const copySignerPreview = document.getElementById("copySignerPreview");
const copySignerBrief = document.getElementById("copySignerBrief");
const copySignerChecklist = document.getElementById("copySignerChecklist");

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

const copySignerText = async (button) => {
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

const renderSignerExperiencePlanner = () => {
  const selectedSurface = signingSurface?.value || "hosted";
  const selectedReview = reviewMode?.value || "readonly_text";
  const selectedGuidance = guidanceMode?.value || "titles";
  const selectedSignature = signaturePolicy?.value || "drawn";
  const selectedDate = datePolicy?.value || "bounded";
  const selectedCompletion = completionFallback?.value || "review_submit";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Guided Review Finish Lane";
  let summary =
    "Give signers a prepared review path with visible instructions, bounded dates, and one clear submit action.";

  pushCard(
    map,
    "Finish action",
    "Completion stage",
    "Every signer flow needs one unmistakable action that ends review or signing instead of leaving the signer inside a passive document."
  );
  rules.push(
    "Signer experience should be QA'd on the exact surface the buyer will own, because prepared review, signature policy, and finish state often drift between demo and production."
  );
  checklist.push(
    "One unmistakable finish action exists before the document reaches production."
  );

  if (selectedSurface === "hosted") {
    methods.push("Hosted signing link");
    pushCard(
      map,
      "Hosted entry",
      "Surface stage",
      "Keep the signer flow legible on the provider-hosted page so the buyer can promise a stable signing path without building a full app shell first."
    );
    complexity += 1;
  }

  if (selectedSurface === "embedded") {
    methods.push("Embedded signer");
    pushCard(
      map,
      "Host shell",
      "Surface stage",
      "Embedded signing raises the bar because completion and prepared review have to survive the host application, not just the signing provider."
    );
    rules.push(
      "Embedded signer flows need host-owned completion proof because the buyer will blame the product shell, not the provider, when users get stuck."
    );
    complexity += 2;
    plan = "Embedded Signer Finish Lane";
    summary =
      "Keep the signer inside the product while proving prepared review and completion survive the host shell.";
  }

  if (selectedSurface === "portal") {
    methods.push("Portal review shell");
    pushCard(
      map,
      "Portal return",
      "Surface stage",
      "Portal-led signing should carry the signer from review into completion without losing context, ownership, or the path back to the workspace."
    );
    complexity += 2;
    plan = "Portal Review Finish Lane";
    summary =
      "Use the portal as a controlled review shell so signers can finish and return without confusion.";
  }

  if (selectedSurface === "mobile") {
    methods.push("Mobile-first signing");
    pushCard(
      map,
      "Mobile viewport",
      "Surface stage",
      "Mobile-first flows need thumb-friendly review, safe date pickers, and a completion step that still makes sense when the viewport is tight."
    );
    rules.push(
      "Mobile signing should be treated as a deliberate surface, not an accidental side effect of a desktop flow."
    );
    checklist.push(
      "The signer path is tested in the mobile viewport sizes the buyer actually expects to support."
    );
    complexity += 2;
    plan = "Mobile Signer Finish Path";
    summary =
      "Treat mobile signing as its own completion path so review, signature, and finish states remain usable on smaller screens.";
  }

  if (selectedReview === "editable") {
    methods.push("Editable signer fields");
    rules.push(
      "Editable signer flows are easier to finish, but the buyer should still define which values remain signer-owned instead of letting prepared data drift."
    );
    complexity += 1;
  }

  if (selectedReview === "readonly_text") {
    methods.push("Prepared text review");
    pushCard(
      map,
      "Prepared review",
      "Review stage",
      "Lock prepared text fields for verification while keeping the next action obvious enough that the signer does not feel trapped in a static document."
    );
    checklist.push(
      "Prepared text values stay visible while the signer can still move forward cleanly."
    );
    complexity += 1;
  }

  if (selectedReview === "readonly_mixed") {
    methods.push("Read-only mixed review");
    pushCard(
      map,
      "Choice review",
      "Review stage",
      "Prepared checkbox and radio states need their own review behavior so choice fields do not become editable, duplicated, or ambiguous."
    );
    rules.push(
      "Read-only mixed review should handle checkbox and radio states deliberately instead of assuming text-locking solves every prepared field."
    );
    checklist.push(
      "Prepared checkbox and radio states behave as intended in review instead of requiring workarounds."
    );
    complexity += 2;
    plan = "Mixed Review Sign Lane";
    summary =
      "Handle prepared text and choice review together so the signer can confirm data without falling into field-state ambiguity.";
  }

  if (selectedReview === "full_prefilled") {
    methods.push("Fully prefilled review");
    pushCard(
      map,
      "Completion proof",
      "Review stage",
      "A fully prepared session has to prove the signer can still complete the document when no visible editable field remains."
    );
    rules.push(
      "Fully prefilled review is high-risk because the signer can end up with no obvious action to finish after all values are locked."
    );
    checklist.push(
      "A fully prepared review-only session still exposes a completion action the signer can trigger."
    );
    complexity += 3;
    plan = "Read-Only Completion Path";
    summary =
      "Prove a fully prepared signer session can still finish before the buyer promises low-effort review and signing.";
  }

  if (selectedGuidance === "guided") {
    methods.push("Guided required stepper");
    pushCard(
      map,
      "Guided sequence",
      "Guidance stage",
      "Use a required stepper when the signer must touch a fixed set of steps and the buyer wants that order made explicit."
    );
    complexity += 1;
  }

  if (selectedGuidance === "optional_hidden") {
    methods.push("Optional-step cleanup");
    pushCard(
      map,
      "Stepper cleanup",
      "Guidance stage",
      "Optional or hidden fields should fall out of the guided path so the signer does not burn trust clicking through steps that do not matter."
    );
    rules.push(
      "Optional fields should not stay inside the guided stepper once the buyer has decided they are skippable or hidden."
    );
    checklist.push(
      "Optional or hidden fields disappear from guided navigation when they are not required."
    );
    complexity += 2;
    plan = "Optional-Step Signer Flow";
    summary =
      "Clean optional steps out of the guided path so prepared signers can finish without dead clicks or false blockers.";
  }

  if (selectedGuidance === "titles") {
    methods.push("Field titles and descriptions");
    pushCard(
      map,
      "Instruction layer",
      "Guidance stage",
      "Titles and descriptions help signers understand why a field exists before the workflow starts to feel like support debt."
    );
    checklist.push(
      "Signer instructions are visible enough that field purpose does not have to be explained out of band."
    );
    complexity += 1;
  }

  if (selectedGuidance === "minimal") {
    methods.push("Minimal navigation");
    rules.push(
      "Minimal navigation reduces chrome, but only works if field order and finish state remain obvious without extra coaching."
    );
    complexity += 1;
  }

  if (selectedSignature === "drawn") {
    methods.push("Drawn signature default");
    pushCard(
      map,
      "Signature choice",
      "Signature stage",
      "Make the preferred signature mode visible before the signer reaches the signature field so the final step feels expected."
    );
    checklist.push(
      "The preferred signature mode is visible before the signer reaches the final sign step."
    );
    complexity += 1;
  }

  if (selectedSignature === "typed") {
    methods.push("Typed signature allowed");
    rules.push(
      "Typed signatures are easier to finish quickly, but the buyer should be explicit when that mode is acceptable for its risk and compliance posture."
    );
    complexity += 1;
  }

  if (selectedSignature === "locked_drawn") {
    methods.push("Locked drawn signature");
    pushCard(
      map,
      "Signature lock",
      "Signature stage",
      "If the buyer promises drawn-only signing, the UI has to enforce that promise instead of quietly exposing typed fallback later."
    );
    rules.push(
      "Drawn-only signature policies need QA on every signer surface so typed signature does not reappear unexpectedly."
    );
    checklist.push(
      "Typed signature is unavailable wherever the buyer says drawn-only signing should apply."
    );
    complexity += 2;
    plan = "Locked-Signature Review Flow";
    summary =
      "Lock signature mode deliberately so prepared review does not collapse when the signer reaches the final signing step.";
  }

  if (selectedSignature === "mixed_initials") {
    methods.push("Mixed signature and initials modes");
    pushCard(
      map,
      "Initials mode",
      "Signature stage",
      "Initials and full signatures should preserve their own behavior instead of inheriting whichever mode was used in a previous field."
    );
    rules.push(
      "Initials and signatures need separate mode QA because signer expectations break when one field inherits the wrong behavior from another."
    );
    checklist.push(
      "Signature and initials fields preserve the intended mode instead of drifting across the flow."
    );
    complexity += 2;
    plan = "Signature-Mode Consistency Flow";
    summary =
      "Keep initials and full signatures consistent so the buyer can enforce a real signing policy instead of a best effort.";
  }

  if (selectedDate === "free") {
    methods.push("Free date entry");
    rules.push(
      "Free date entry is the lightest launch path, but it moves responsibility to operations if buyers later need bounded or auditable dates."
    );
    complexity += 1;
  }

  if (selectedDate === "bounded") {
    methods.push("Bounded min and max dates");
    pushCard(
      map,
      "Date guardrails",
      "Date stage",
      "Use min and max date rules when the signer should only select dates that fit a real business window."
    );
    checklist.push(
      "Date fields enforce the intended minimum and maximum values before the signer submits."
    );
    complexity += 2;
  }

  if (selectedDate === "reviewed") {
    methods.push("Reviewed date confirmation");
    pushCard(
      map,
      "Date confirmation",
      "Date stage",
      "Treat critical dates as review items when the signer should confirm a prepared date instead of editing it freely."
    );
    complexity += 1;
  }

  if (selectedDate === "timezone_safe") {
    methods.push("Timezone-safe completion proof");
    pushCard(
      map,
      "Timestamp reconciliation",
      "Date stage",
      "Reconcile displayed signature dates with completion timestamps so operations can trust what day the signer actually finished."
    );
    rules.push(
      "Signature date and completion timestamp should reconcile in the intended timezone instead of drifting across day boundaries."
    );
    checklist.push(
      "Signature date and completion timestamp agree in the timezone the buyer expects to report against."
    );
    complexity += 3;
    plan = "Timezone-Safe Completion Proof";
    summary =
      "Design signer evidence so dates, timestamps, and finish-state reporting still agree after the document is complete.";
  }

  if (selectedCompletion === "confirm") {
    methods.push("Explicit confirm step");
    pushCard(
      map,
      "Confirm action",
      "Completion stage",
      "Expose one visible confirm action so signers know exactly what ends the flow after review and signing."
    );
    checklist.push(
      "The signer sees a visible confirm or complete action at the end of the flow."
    );
    complexity += 1;
  }

  if (selectedCompletion === "review_submit") {
    methods.push("Review then submit");
    pushCard(
      map,
      "Submit state",
      "Completion stage",
      "Use a deliberate review-then-submit boundary when the buyer wants one last signer confirmation before the document is locked."
    );
    checklist.push(
      "The signer can reach review and submit without a hidden blocker or dead end."
    );
    complexity += 1;
  }

  if (selectedCompletion === "host_callback") {
    methods.push("Host callback verification");
    pushCard(
      map,
      "Host verification",
      "Completion stage",
      "Pair signer completion with a host-controlled callback so business state changes are not driven by front-end guesswork."
    );
    rules.push(
      "Host systems should verify signer completion before changing downstream business state, especially in embedded or portal flows."
    );
    checklist.push(
      "The host app receives and verifies a completion callback before it advances the workflow."
    );
    complexity += 2;
    plan = "Verified Signer Completion";
    summary =
      "Treat the finish state as a verified event so prepared signer flows can safely trigger the next business action.";
  }

  if (selectedCompletion === "ops_recovery") {
    methods.push("Ops recovery lane");
    pushCard(
      map,
      "Recovery handoff",
      "Completion stage",
      "Give operations a deliberate rescue path when a signer gets stranded by policy, device state, or an incomplete prepared review."
    );
    rules.push(
      "Stuck signers need a documented rescue lane instead of forcing support to improvise on every failed completion."
    );
    checklist.push(
      "Support can rescue, reroute, or restart a stalled signer session without rebuilding the whole document."
    );
    complexity += 2;
    plan = "Signer Recovery Safety Net";
    summary =
      "Add a controlled rescue lane so signer-side edge cases do not become unowned support debt.";
  }

  if (
    selectedReview === "full_prefilled" &&
    selectedGuidance === "optional_hidden"
  ) {
    plan = "Read-Only Optional-Step Finish Lane";
    summary =
      "Let fully prepared signers skip irrelevant guided steps while still exposing a clear finish action for the session.";
  }

  if (selectedSurface === "embedded" && selectedCompletion === "host_callback") {
    plan = "Host-Verified Embedded Signer Flow";
    summary =
      "Keep the signer inside the host product and verify completion before the application advances business state.";
  }

  if (selectedSignature === "locked_drawn" && selectedReview !== "editable") {
    plan = "Locked-Signature Review Flow";
    summary =
      "Combine prepared review with a real drawn-only signature lock so the finish path stays aligned with buyer policy.";
  }

  if (selectedDate === "timezone_safe" && selectedCompletion === "host_callback") {
    plan = "Verified Timestamp-Safe Completion";
    summary =
      "Pair host verification with timezone-safe evidence so the signer finish state still stands up in audit and downstream reporting.";
  }

  if (
    selectedSurface === "embedded" &&
    selectedReview === "full_prefilled" &&
    selectedGuidance === "optional_hidden" &&
    selectedSignature === "locked_drawn" &&
    selectedDate === "bounded" &&
    selectedCompletion === "host_callback"
  ) {
    plan = "Verified Read-Only Signer Flow";
    summary =
      "Open a fully prepared embedded session that still finishes cleanly: optional steps stay out of the way, drawn-only signatures stay locked, dates are bounded, and the host app verifies completion.";
  }

  const preview = {
    signing_surface:
      selectedSurface === "hosted"
        ? "hosted_signing_link"
        : selectedSurface === "embedded"
          ? "embedded_signer_inside_product"
          : selectedSurface === "portal"
            ? "review_portal_or_workspace"
            : "mobile_first_signing_path",
    review_mode:
      selectedReview === "editable"
        ? "editable_signer_fields"
        : selectedReview === "readonly_text"
          ? "read_only_prepared_text_review"
          : selectedReview === "readonly_mixed"
            ? "read_only_mixed_fields_and_choices"
            : "fully_prefilled_review_only_session",
    guidance_layer:
      selectedGuidance === "guided"
        ? "guided_required_stepper"
        : selectedGuidance === "optional_hidden"
          ? "optional_fields_removed_from_stepper"
          : selectedGuidance === "titles"
            ? "field_titles_and_descriptions"
            : "minimal_navigation_only",
    signature_policy:
      selectedSignature === "drawn"
        ? "drawn_signature_default"
        : selectedSignature === "typed"
          ? "typed_signature_allowed"
          : selectedSignature === "locked_drawn"
            ? "drawn_signature_locked"
            : "mixed_signature_and_initials_modes",
    date_policy:
      selectedDate === "free"
        ? "free_date_entry"
        : selectedDate === "bounded"
          ? "bounded_min_max_dates"
          : selectedDate === "reviewed"
            ? "reviewed_date_confirmation"
            : "timezone_safe_completion_proof",
    completion_fallback:
      selectedCompletion === "confirm"
        ? "explicit_confirm_step"
        : selectedCompletion === "review_submit"
          ? "review_then_submit"
          : selectedCompletion === "host_callback"
            ? "host_callback_verification"
            : "ops_recovery_lane",
    signer_controls: ["explicit_finish_action"],
  };

  if (selectedSurface === "embedded") {
    preview.signer_controls.push("embedded_host_shell");
  }
  if (selectedSurface === "portal") {
    preview.signer_controls.push("portal_return_path");
  }
  if (selectedSurface === "mobile") {
    preview.signer_controls.push("mobile_viewport_qa");
  }
  if (selectedReview === "readonly_text") {
    preview.signer_controls.push("prepared_text_review");
  }
  if (selectedReview === "readonly_mixed") {
    preview.signer_controls.push("read_only_choice_review");
  }
  if (selectedReview === "full_prefilled") {
    preview.signer_controls.push("fully_prefilled_completion_check");
  }
  if (selectedGuidance === "guided") {
    preview.signer_controls.push("guided_stepper");
  }
  if (selectedGuidance === "optional_hidden") {
    preview.signer_controls.push("optional_steps_removed");
  }
  if (selectedGuidance === "titles") {
    preview.signer_controls.push("field_titles_and_descriptions");
  }
  if (selectedSignature === "locked_drawn") {
    preview.signer_controls.push("typed_signature_disabled_verified");
  }
  if (selectedSignature === "mixed_initials") {
    preview.signer_controls.push("signature_and_initials_mode_separation");
  }
  if (selectedDate === "bounded") {
    preview.signer_controls.push("min_max_date_validation");
  }
  if (selectedDate === "timezone_safe") {
    preview.signer_controls.push("completion_timestamp_reconciliation");
  }
  if (selectedCompletion === "host_callback") {
    preview.signer_controls.push("host_completion_verification");
  }
  if (selectedCompletion === "ops_recovery") {
    preview.signer_controls.push("operator_rescue_lane");
  }

  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the signer can still finish the document cleanly";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one chosen signer surface, one explicit instruction model, and one verified finish event. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the signer path narrow enough that review state, signature mode, and date handling can be QA'd without manual operator rescue.`;

  let offerKey = "audit";
  if (complexity >= 4) {
    offerKey = "sprint";
  }
  if (
    complexity >= 8 ||
    selectedDate === "timezone_safe" ||
    (selectedSurface === "embedded" && selectedCompletion === "host_callback") ||
    (selectedReview === "full_prefilled" && selectedSignature === "locked_drawn")
  ) {
    offerKey = "workspace";
  }
  if (
    complexity <= 3 &&
    selectedSurface === "hosted" &&
    selectedCompletion !== "host_callback" &&
    selectedDate !== "timezone_safe"
  ) {
    offerKey = "audit";
  }

  const offer = signerOfferCatalog[offerKey];
  const previewText = JSON.stringify(preview, null, 2);

  signerPlanName.textContent = plan;
  signerPlanSummary.textContent = summary;
  signerMethods.innerHTML = uniqueMethods.length
    ? uniqueMethods.map((method) => `<span class="stack-chip">${method}</span>`).join("")
    : '<span class="stack-chip">Map signer finish path first</span>';
  signerMap.innerHTML = renderCards(map);
  signerPreview.textContent = previewText;
  signerRules.innerHTML = asBullets(uniqueRules);
  signerBrief.textContent = brief;
  signerChecklist.innerHTML = asBullets(uniqueChecklist);
  signerOfferName.textContent = offer.label;
  signerOfferNote.textContent = offer.note;
  signerOfferLink.href = offer.link;
  signerOfferLink.textContent = `Open ${offer.label}`;

  copySignerPreview.dataset.copy = previewText;
  copySignerBrief.dataset.copy = brief;
  copySignerChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
};

[signingSurface, reviewMode, guidanceMode, signaturePolicy, datePolicy, completionFallback].forEach((input) =>
  input?.addEventListener("input", renderSignerExperiencePlanner)
);

copySignerPreview?.addEventListener("click", () => copySignerText(copySignerPreview));
copySignerBrief?.addEventListener("click", () => copySignerText(copySignerBrief));
copySignerChecklist?.addEventListener("click", () => copySignerText(copySignerChecklist));

renderSignerExperiencePlanner();
