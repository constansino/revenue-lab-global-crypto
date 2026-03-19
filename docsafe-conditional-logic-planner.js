const logicOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs the branch model, hidden-field behavior, and QA scope mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the buyer already knows the first conditional lane and needs it implemented and QA'd correctly.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when conditional branches, embedded review paths, and packet-wide governance need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const logicScope = document.getElementById("logicScope");
const triggerModel = document.getElementById("triggerModel");
const ruleDepth = document.getElementById("ruleDepth");
const dataPolicy = document.getElementById("dataPolicy");
const implementationPath = document.getElementById("implementationPath");
const qaSurface = document.getElementById("qaSurface");

const logicPlanName = document.getElementById("logicPlanName");
const logicPlanSummary = document.getElementById("logicPlanSummary");
const logicMethods = document.getElementById("logicMethods");
const logicMap = document.getElementById("logicMap");
const logicPreview = document.getElementById("logicPreview");
const logicRules = document.getElementById("logicRules");
const logicBrief = document.getElementById("logicBrief");
const logicChecklist = document.getElementById("logicChecklist");
const logicOfferName = document.getElementById("logicOfferName");
const logicOfferNote = document.getElementById("logicOfferNote");
const logicOfferLink = document.getElementById("logicOfferLink");
const copyLogicPreview = document.getElementById("copyLogicPreview");
const copyLogicBrief = document.getElementById("copyLogicBrief");
const copyLogicChecklist = document.getElementById("copyLogicChecklist");

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

const copyLogicText = async (button) => {
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

const renderConditionalPlanner = () => {
  const selectedScope = logicScope?.value || "field";
  const selectedTrigger = triggerModel?.value || "radio";
  const selectedRule = ruleDepth?.value || "equals";
  const selectedData = dataPolicy?.value || "clear";
  const selectedImplementation = implementationPath?.value || "api";
  const selectedQa = qaSurface?.value || "completed";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "API-Defined Conditional Template";
  let summary =
    "Define conditional branches deliberately in the template payload so field visibility and final output do not drift apart.";

  pushCard(
    map,
    "Decision trigger",
    "Logic stage",
    "One visible or hidden trigger should own the branch instead of scattering conditional rules across unrelated fields."
  );

  if (selectedScope === "field") {
    methods.push("Field-level reveal");
    pushCard(
      map,
      "Follow-up field",
      "Scope stage",
      "Reveal exactly one dependent field or short group so the user can still see why the branch changed."
    );
    checklist.push(
      "One trigger reveals only the relevant follow-up field instead of hiding several unrelated inputs."
    );
    complexity += 1;
  }

  if (selectedScope === "section") {
    methods.push("Section branch");
    pushCard(
      map,
      "Conditional section",
      "Scope stage",
      "Keep the common document shell stable, then swap in the right section based on one explicit trigger."
    );
    checklist.push(
      "The document has one stable common section and one clearly conditional section instead of overlapping branches."
    );
    complexity += 2;
  }

  if (selectedScope === "document") {
    methods.push("Document branch");
    pushCard(
      map,
      "Document router",
      "Scope stage",
      "One trigger should determine which whole document or annex appears so the inactive document never needs cleanup later."
    );
    checklist.push(
      "The trigger selects the correct document branch and the inactive document branch stays absent."
    );
    complexity += 2;
  }

  if (selectedScope === "hidden") {
    methods.push("Hidden routing question");
    pushCard(
      map,
      "Hidden question lane",
      "Scope stage",
      "Collect a routing answer that decides the visible branch even when the question itself should not appear on the final document."
    );
    checklist.push(
      "Hidden routing questions are documented and mapped to the visible branch they control."
    );
    plan = "Hidden Intake Branch Plan";
    summary =
      "Collect one routing question off-document and use it to reveal the right visible branch without printing the routing question itself.";
    complexity += 3;
  }

  if (selectedTrigger === "checkbox") {
    methods.push("Checkbox toggle");
    rules.push(
      "Checkbox toggles need a safe return path when unchecked so the trigger never disappears with the dependent field."
    );
    complexity += 1;
  }

  if (selectedTrigger === "radio") {
    methods.push("Radio choice routing");
    pushCard(
      map,
      "Choice router",
      "Trigger stage",
      "Radio choices work best when every option maps to a named branch instead of relying on generic presence logic."
    );
    checklist.push(
      "Each radio option maps to a named branch so the logic is explainable in QA and support."
    );
    complexity += 1;
  }

  if (selectedTrigger === "dropdown") {
    methods.push("Dropdown branch path");
    pushCard(
      map,
      "Option matrix",
      "Trigger stage",
      "Dropdown options need an explicit value list because hidden or legacy option names often drift over time."
    );
    complexity += 1;
  }

  if (selectedTrigger === "hidden") {
    methods.push("Internal hidden trigger");
    pushCard(
      map,
      "Internal routing source",
      "Trigger stage",
      "Use a reviewer or admin-set trigger only when the downstream branch should never be chosen directly by the signer."
    );
    rules.push(
      "Hidden triggers should have one operator-owned source of truth or branch behavior will become impossible to debug."
    );
    complexity += 2;
  }

  if (selectedRule === "presence") {
    methods.push("Presence checks");
    rules.push(
      "Presence-only rules are safe only when simple not-empty behavior is enough and no exact branch value matters."
    );
    complexity += 1;
  }

  if (selectedRule === "equals") {
    methods.push("Explicit equals branches");
    pushCard(
      map,
      "Value matcher",
      "Rule stage",
      "Match exact field values for each branch instead of assuming every conditional flow can be modeled as not-empty."
    );
    checklist.push(
      "Value-based branches use explicit equals logic instead of generic presence checks."
    );
    complexity += 1;
  }

  if (selectedRule === "grouped") {
    methods.push("Grouped AND or OR logic");
    pushCard(
      map,
      "Grouped rule set",
      "Rule stage",
      "Grouped logic needs positive and negative paths designed explicitly or NOT-EQUAL OR chains will match unexpectedly."
    );
    rules.push(
      "Grouped branch logic should avoid OR chains that accidentally make both documents appear or neither appear."
    );
    checklist.push(
      "The branch design is tested against both positive and negative selections so grouped conditions do not over-match."
    );
    complexity += 2;
  }

  if (selectedRule === "formula") {
    methods.push("Conditional formulas");
    pushCard(
      map,
      "Formula guard",
      "Rule stage",
      "Formula-driven branches can work, but they still need one reviewer-readable explanation for why a field or document appears."
    );
    rules.push(
      "Formula-driven conditions still need a clear trigger narrative or operators will not understand why a branch fired."
    );
    complexity += 2;
  }

  if (selectedData === "clear") {
    methods.push("Clear stale branch values");
    pushCard(
      map,
      "Stale value guard",
      "Data stage",
      "When the signer switches branches, old branch values should be cleared or reset before completion."
    );
    checklist.push(
      "Values entered into an inactive branch are cleared or reset when the signer switches to another branch."
    );
    complexity += 2;
  }

  if (selectedData === "audit") {
    methods.push("Audit-only history");
    rules.push(
      "If prior branch values are retained, they should remain in audit history rather than staying visible in the active document output."
    );
    complexity += 1;
  }

  if (selectedData === "offpdf") {
    methods.push("Keep routing answers off final PDF");
    pushCard(
      map,
      "Output visibility guard",
      "Data stage",
      "Collect routing answers when needed, but keep them off the final PDF if they exist only to choose the right branch."
    );
    checklist.push(
      "Routing questions that only decide branches are kept off the final PDF output."
    );
    complexity += 1;
  }

  if (selectedData === "review") {
    methods.push("Reviewer branch confirmation");
    rules.push(
      "Before completion, reviewers should confirm the active branch and the hidden-state behavior for sensitive sections."
    );
    checklist.push(
      "A reviewer confirms the active branch before completion when the workflow is sensitive or regulated."
    );
    complexity += 1;
  }

  if (selectedImplementation === "builder") {
    methods.push("Builder-first setup");
    checklist.push(
      "The first branch can be configured and previewed in the builder before automation expands it."
    );
    complexity += 1;
  }

  if (selectedImplementation === "tags") {
    methods.push("PDF or DOCX field tags");
    pushCard(
      map,
      "Tag naming boundary",
      "Implementation stage",
      "Conditional references only stay stable when field-tag names remain consistent across PDF and DOCX revisions."
    );
    rules.push(
      "Field tags need stable names because conditional references break as soon as tag names drift across versions."
    );
    complexity += 1;
  }

  if (selectedImplementation === "api") {
    methods.push("Template API branch config");
    pushCard(
      map,
      "API condition schema",
      "Implementation stage",
      "REST-defined conditions need explicit field references, values, and actions instead of assuming builder defaults."
    );
    rules.push(
      "API-defined conditional fields need explicit field references, values, and actions instead of assuming builder defaults."
    );
    checklist.push(
      "REST-created conditions are tested for both not-empty and exact-value branches before launch."
    );
    complexity += 2;
  }

  if (selectedImplementation === "embed") {
    methods.push("Embedded conditional session");
    pushCard(
      map,
      "Embed completion boundary",
      "Implementation stage",
      "Embedded sessions need a completion path that still works after the active branch is prefilled, locked, or hidden."
    );
    rules.push(
      "Embedded review flows need host-side verification for branch display, completion, and return state."
    );
    checklist.push(
      "The embedded session still exposes a clear completion action after the active branch is fully prefilled or read-only."
    );
    complexity += 2;
  }

  if (selectedQa === "preview") {
    methods.push("Preview sanity check");
  }

  if (selectedQa === "toggle") {
    methods.push("Toggle-back regression");
    checklist.push(
      "The trigger can be switched back and forth without the control itself disappearing or the wrong branch persisting."
    );
    complexity += 2;
    if (selectedScope === "field") {
      plan = "Toggle-Safe Conditional Form";
      summary =
        "Keep the trigger visible and reversible so showing one follow-up field never breaks the whole form.";
    }
  }

  if (selectedQa === "completed") {
    methods.push("Completed-output regression");
    pushCard(
      map,
      "Output regression",
      "QA stage",
      "The completed document must be checked to prove inactive-branch text does not survive after the signer changes direction."
    );
    rules.push(
      "Completed documents should not keep text from an inactive branch after the signer switches to another path."
    );
    checklist.push(
      "Completed outputs are checked to confirm inactive-branch text and data are absent."
    );
    complexity += 2;
  }

  if (selectedQa === "embedded") {
    methods.push("Embedded read-only regression");
    rules.push(
      "Read-only or heavily prefilled embedded sessions still need explicit completion and return-state checks."
    );
    checklist.push(
      "Embedded regression covers branch visibility, locked fields, completion, and host return behavior."
    );
    complexity += 2;
  }

  if (selectedScope === "document" && selectedRule === "grouped") {
    plan = "Conditional Document Router";
    summary =
      "Make document-branch logic explicit so one choice activates the right document set without OR-chain mistakes.";
  }

  if (
    selectedImplementation === "api" &&
    (selectedRule === "equals" || selectedRule === "grouped")
  ) {
    plan = "API-Defined Conditional Template";
    summary =
      "Define conditional branches deliberately in template payloads instead of relying on GUI defaults that do not survive automation.";
  }

  if (selectedImplementation === "embed" && selectedQa === "embedded") {
    plan = "Embedded Conditional Review Flow";
    summary =
      "Validate the active branch, locked fields, and completion return inside the real host session before shipping embedded signing.";
  }

  const preview = {
    conditional_scope:
      selectedScope === "field"
        ? "single_follow_up_field"
        : selectedScope === "section"
          ? "conditional_section"
          : selectedScope === "document"
            ? "conditional_documents"
            : "hidden_question_with_visible_branches",
    trigger_model:
      selectedTrigger === "checkbox"
        ? "checkbox_toggle"
        : selectedTrigger === "radio"
          ? "radio_choice"
          : selectedTrigger === "dropdown"
            ? "dropdown_option"
            : "hidden_internal_field",
    rule_depth:
      selectedRule === "presence"
        ? "not_empty"
        : selectedRule === "equals"
          ? "explicit_equals"
          : selectedRule === "grouped"
            ? "grouped_and_or"
            : "conditional_formula",
    hidden_data_policy:
      selectedData === "clear"
        ? "clear_stale_values"
        : selectedData === "audit"
          ? "audit_history_only"
          : selectedData === "offpdf"
            ? "keep_routing_answers_off_pdf"
            : "review_before_completion",
    implementation_path:
      selectedImplementation === "builder"
        ? "builder_only"
        : selectedImplementation === "tags"
          ? "pdf_or_docx_tags"
          : selectedImplementation === "api"
            ? "template_api_rest"
            : "embedded_session",
    qa_surface:
      selectedQa === "preview"
        ? "preview_only"
        : selectedQa === "toggle"
          ? "toggle_regression"
          : selectedQa === "completed"
            ? "completed_document_regression"
            : "embedded_read_only_regression",
    trigger_field: "branch_selector",
    branches: [],
  };

  if (selectedScope === "field") {
    preview.trigger_field =
      selectedTrigger === "checkbox" ? "needs_guarantor" : "contact_method";
    preview.branches = ["base_fields", "follow_up_field"];
  }

  if (selectedScope === "section") {
    preview.trigger_field =
      selectedTrigger === "radio" ? "entity_type" : "policy_path";
    preview.branches = ["common_section", "conditional_section_a", "conditional_section_b"];
  }

  if (selectedScope === "document") {
    preview.trigger_field =
      selectedTrigger === "radio" ? "damage_type" : "document_route";
    preview.branches = ["document_a", "document_b"];
  }

  if (selectedScope === "hidden") {
    preview.trigger_field =
      selectedTrigger === "hidden" ? "reviewer_route" : "us_person_or_entity";
    preview.branches = ["hidden_question", "branch_a", "branch_b"];
  }

  if (selectedRule === "equals") {
    preview.conditions = [
      {
        field: preview.trigger_field,
        action: "equal",
        value: "branch_a",
      },
    ];
  }

  if (selectedRule === "grouped") {
    preview.conditions = [
      {
        group: "branch_a",
        mode: "or",
        values: ["water", "mold", "sewage"],
      },
      {
        group: "branch_b",
        mode: "not_in",
        values: ["water", "mold", "sewage"],
      },
    ];
  }

  if (selectedRule === "formula") {
    preview.formula_guard = "show_follow_up_when(total_income > 0)";
  }

  if (selectedData === "clear") {
    preview.stale_value_policy = "clear_branch_values_on_switch";
  }

  if (selectedData === "audit") {
    preview.stale_value_policy = "retain_history_outside_active_output";
  }

  if (selectedData === "offpdf") {
    preview.output_visibility = "routing_question_hidden_from_final_pdf";
  }

  if (selectedImplementation === "tags") {
    preview.tag_pattern = "{{Branch Selector;type=radio}}";
  }

  if (selectedImplementation === "api") {
    preview.api_note = "configure conditions with explicit field references and actions";
  }

  if (selectedImplementation === "embed") {
    preview.embed_guard = "verify completion and return state for active branch";
  }

  if (selectedQa === "completed" || selectedQa === "embedded") {
    preview.qa_checks = [
      "switch_branch_after_entry",
      "verify_inactive_branch_hidden",
      "verify_completed_output",
    ];
  }

  const previewText = JSON.stringify(preview, null, 2);
  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the branch logic is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one owned trigger field, one explicit branch rule set, and one final-output guard. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the logic narrow enough that hidden fields, conditional documents, and completed-output behavior can be explained without guesswork.`;

  let offerKey = "audit";
  if (complexity >= 5) {
    offerKey = "sprint";
  }
  if (
    complexity >= 10 ||
    (selectedScope === "document" && selectedImplementation === "embed") ||
    (selectedScope === "hidden" && selectedRule === "grouped")
  ) {
    offerKey = "workspace";
  }

  const offer = logicOfferCatalog[offerKey];

  if (logicPlanName) {
    logicPlanName.textContent = plan;
  }

  if (logicPlanSummary) {
    logicPlanSummary.textContent = summary;
  }

  if (logicMethods) {
    logicMethods.innerHTML = uniqueMethods
      .map((method) => `<span class="stack-chip">${method}</span>`)
      .join("");
  }

  if (logicMap) {
    logicMap.innerHTML = renderCards(map);
  }

  if (logicPreview) {
    logicPreview.textContent = previewText;
  }

  if (logicRules) {
    logicRules.innerHTML = asBullets(uniqueRules);
  }

  if (logicBrief) {
    logicBrief.textContent = brief;
  }

  if (logicChecklist) {
    logicChecklist.innerHTML = asBullets(uniqueChecklist);
  }

  if (logicOfferName) {
    logicOfferName.textContent = offer.label;
  }

  if (logicOfferNote) {
    logicOfferNote.textContent = offer.note;
  }

  if (logicOfferLink) {
    logicOfferLink.href = offer.link;
    logicOfferLink.textContent = `Open ${offer.label}`;
  }

  if (copyLogicPreview) {
    copyLogicPreview.dataset.copy = previewText;
  }

  if (copyLogicBrief) {
    copyLogicBrief.dataset.copy = brief;
  }

  if (copyLogicChecklist) {
    copyLogicChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
  }
};

[logicScope, triggerModel, ruleDepth, dataPolicy, implementationPath, qaSurface].forEach((input) => {
  input?.addEventListener("input", renderConditionalPlanner);
  input?.addEventListener("change", renderConditionalPlanner);
});

copyLogicPreview?.addEventListener("click", () => copyLogicText(copyLogicPreview));
copyLogicBrief?.addEventListener("click", () => copyLogicText(copyLogicBrief));
copyLogicChecklist?.addEventListener("click", () => copyLogicText(copyLogicChecklist));

renderConditionalPlanner();
