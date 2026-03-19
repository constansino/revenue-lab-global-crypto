const templateOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs its template library boundary, version rules, and tenant handoff model mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the buyer already knows the first reusable template lane and needs the library model implemented cleanly.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when a reusable template library, tenant distribution, packet composition, and branded outbound behavior need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const libraryScope = document.getElementById("libraryScope");
const reuseModel = document.getElementById("reuseModel");
const fieldTransfer = document.getElementById("fieldTransfer");
const namingSystem = document.getElementById("namingSystem");
const personalizationMode = document.getElementById("personalizationMode");
const rolloutQa = document.getElementById("rolloutQa");

const templatePlanName = document.getElementById("templatePlanName");
const templatePlanSummary = document.getElementById("templatePlanSummary");
const templateMethods = document.getElementById("templateMethods");
const templateMap = document.getElementById("templateMap");
const templatePreview = document.getElementById("templatePreview");
const templateRules = document.getElementById("templateRules");
const templateBrief = document.getElementById("templateBrief");
const templateChecklist = document.getElementById("templateChecklist");
const templateOfferName = document.getElementById("templateOfferName");
const templateOfferNote = document.getElementById("templateOfferNote");
const templateOfferLink = document.getElementById("templateOfferLink");
const copyTemplatePreview = document.getElementById("copyTemplatePreview");
const copyTemplateBrief = document.getElementById("copyTemplateBrief");
const copyTemplateChecklist = document.getElementById("copyTemplateChecklist");

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

const copyTemplateText = async (button) => {
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

const renderTemplateLibraryPlanner = () => {
  const selectedScope = libraryScope?.value || "master";
  const selectedReuse = reuseModel?.value || "linked";
  const selectedTransfer = fieldTransfer?.value || "exact";
  const selectedNaming = namingSystem?.value || "clientversion";
  const selectedPersonalization = personalizationMode?.value || "prefilled";
  const selectedQa = rolloutQa?.value || "download";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Reusable Master Template Library";
  let summary =
    "Keep one reusable source for core documents, carry fields forward exactly across small revisions, name submissions clearly, and run prefilled QA before the library spreads.";

  pushCard(
    map,
    "Library boundary",
    "Template stage",
    "One reusable library model should explain which templates are authoritative, how variants are produced, and how operators know a revision is still safe to send."
  );

  if (selectedScope === "master") {
    methods.push("Reusable master library");
    checklist.push(
      "One authoritative master template library exists before operators start creating parallel copies."
    );
    complexity += 1;
  }

  if (selectedScope === "tenant") {
    methods.push("Tenant-distributed template library");
    pushCard(
      map,
      "Tenant distribution lane",
      "Scope stage",
      "Tenant-distributed templates need owned cloning, naming, and reply behavior so the library can scale without leaking authorship."
    );
    checklist.push(
      "Tenant-distributed templates preserve tenant ownership instead of inheriting the original author by accident."
    );
    complexity += 2;
    plan = "Tenant-Safe Template Distribution";
    summary =
      "Distribute reusable templates to tenants deliberately so library ownership, reply behavior, and naming stay attached to the right tenant surface.";
  }

  if (selectedScope === "packet") {
    methods.push("Packet-ready modular library");
    pushCard(
      map,
      "Modular packet lane",
      "Scope stage",
      "Packet-ready libraries should let operators assemble bundles from existing templates instead of flattening everything into one re-uploaded document."
    );
    checklist.push(
      "Packet assembly can reuse existing templates instead of forcing a fresh field rebuild for each bundle."
    );
    complexity += 2;
    plan = "Modular Packet Template Stack";
    summary =
      "Keep each recurring document modular so packet composition can reuse existing templates, roles, and validation rules without rebuilding them.";
  }

  if (selectedScope === "volume") {
    methods.push("High-volume submission library");
    pushCard(
      map,
      "High-volume naming lane",
      "Scope stage",
      "High-volume libraries need visible submission naming and repeatable QA because many similar sends quickly outgrow operator memory."
    );
    checklist.push(
      "High-volume sends have a visible naming and versioning system instead of relying on memory or timestamps alone."
    );
    complexity += 2;
    plan = "Named Submission Library";
    summary =
      "Use a naming-first template library so many similar submissions can be versioned, reviewed, and audited without operator guesswork.";
  }

  if (selectedReuse === "linked") {
    methods.push("Linked reusable building blocks");
    pushCard(
      map,
      "Linked source lane",
      "Reuse stage",
      "Linked building blocks let one source update several dependent templates when the buyer values consistency more than local freedom."
    );
    checklist.push(
      "Reusable template blocks have one owned source of truth instead of drifting into many quiet forks."
    );
    complexity += 2;
  }

  if (selectedReuse === "snapshot") {
    methods.push("Snapshot copies per release");
    pushCard(
      map,
      "Snapshot release lane",
      "Reuse stage",
      "Snapshot copies work when each release needs a frozen version that can be audited without inheriting later template edits."
    );
    checklist.push(
      "Each released template version can be frozen and audited without inheriting later edits unexpectedly."
    );
    complexity += 2;
  }

  if (selectedReuse === "fieldcopy") {
    methods.push("Field-only carry forward");
    pushCard(
      map,
      "Field carry lane",
      "Reuse stage",
      "Field-only carry forward helps minor design revisions avoid the cost of redrawing the same exact field map."
    );
    checklist.push(
      "Minor design revisions can reuse the existing field map instead of redrawing every field."
    );
    complexity += 1;
  }

  if (selectedReuse === "variant") {
    methods.push("Master template variants");
    pushCard(
      map,
      "Variant branch lane",
      "Reuse stage",
      "Master variants work when one core template needs controlled client or product differences instead of uncontrolled duplication."
    );
    complexity += 2;
  }

  if (selectedTransfer === "exact") {
    methods.push("Exact field positions between revisions");
    pushCard(
      map,
      "Exact field lane",
      "Field stage",
      "Exact field transfer keeps revised documents aligned when the visual design changes only slightly but the field structure should survive."
    );
    checklist.push(
      "Revised templates can inherit exact field placement from the prior version."
    );
    complexity += 2;
  }

  if (selectedTransfer === "style") {
    methods.push("Style inheritance for new fields");
    pushCard(
      map,
      "Style carry lane",
      "Field stage",
      "Field styling should carry forward when consistency matters more than per-field hand tuning."
    );
    checklist.push(
      "New fields inherit the expected style so the library stays visually consistent."
    );
    complexity += 1;
  }

  if (selectedTransfer === "schema") {
    methods.push("Schema remap and standard keys");
    pushCard(
      map,
      "Schema remap lane",
      "Field stage",
      "Schema remap matters when many templates should share the same external keys even if the document layouts differ."
    );
    checklist.push(
      "Shared business fields use standard keys even when document layouts differ."
    );
    complexity += 2;
  }

  if (selectedTransfer === "tags") {
    methods.push("Tagged generation from HTML or DOCX");
    pushCard(
      map,
      "Tagged generation lane",
      "Field stage",
      "Tagged generation turns the library into code or source documents instead of only manual browser editing."
    );
    checklist.push(
      "The library can be regenerated from HTML, DOCX, or tagged source when needed."
    );
    complexity += 2;
  }

  if (selectedNaming === "clientversion") {
    methods.push("Client plus version naming");
    checklist.push(
      "Template and submission names show client context and version rather than generic duplicates."
    );
    complexity += 1;
  }

  if (selectedNaming === "submission") {
    methods.push("Submission-name tracking");
    pushCard(
      map,
      "Submission name lane",
      "Naming stage",
      "Visible submission naming helps operators track which client or version was sent when many similar documents share one template."
    );
    checklist.push(
      "Submission names are visible enough to track client-specific versions in the UI or operations view."
    );
    complexity += 2;
    plan = "Named Submission Library";
    summary =
      "Use a naming-first template library so many similar submissions can be tracked by client and version instead of disappearing into one generic template list.";
  }

  if (selectedNaming === "annex") {
    methods.push("Annex and packet component naming");
    pushCard(
      map,
      "Annex naming lane",
      "Naming stage",
      "Modular packets need names that distinguish the main agreement from annexes and reusable components."
    );
    checklist.push(
      "Packet components, annexes, and reusable documents are named distinctly enough to manage as a library."
    );
    complexity += 2;
  }

  if (selectedNaming === "tenantlabel") {
    methods.push("Tenant-owned labels");
    pushCard(
      map,
      "Tenant label lane",
      "Naming stage",
      "Tenant-owned labels help distributed libraries stay legible without forcing every workspace into one generic naming convention."
    );
    checklist.push(
      "Tenant labels and library names still preserve central governance instead of fragmenting the library."
    );
    complexity += 2;
  }

  if (selectedPersonalization === "prefilled") {
    methods.push("Prefilled-field email personalization");
    pushCard(
      map,
      "Mail merge lane",
      "Personalization stage",
      "Template-level personalization becomes valuable when prefilled values should also shape the invite copy, not only the document body."
    );
    checklist.push(
      "Prefilled template data can personalize recipient communication when the workflow requires it."
    );
    complexity += 2;
  }

  if (selectedPersonalization === "tenantreply") {
    methods.push("Tenant-specific sender and reply lane");
    pushCard(
      map,
      "Tenant reply lane",
      "Personalization stage",
      "Tenant libraries need sender and reply behavior aligned with the tenant, not the original author or a generic workspace."
    );
    checklist.push(
      "Tenant-level sender and reply ownership stay attached to the tenant library."
    );
    complexity += 2;
    plan = "Tenant-Safe Template Distribution";
    summary =
      "Combine tenant-specific sender behavior with tenant-owned library distribution so clones, invites, and replies all stay attached to the right workspace.";
  }

  if (selectedPersonalization === "neutral") {
    methods.push("Neutral ops messaging");
    complexity += 1;
  }

  if (selectedPersonalization === "portal") {
    methods.push("Portal-led handoff language");
    pushCard(
      map,
      "Portal handoff lane",
      "Personalization stage",
      "Template invites can reinforce a portal-led workflow when email exists mainly to route recipients into a branded signing experience."
    );
    complexity += 2;
  }

  if (selectedQa === "internal") {
    methods.push("Internal template review only");
    rules.push(
      "Internal review alone is acceptable only for low-complexity libraries because real template problems often appear after prefill, clone, or packet assembly."
    );
    complexity += 1;
  }

  if (selectedQa === "download") {
    methods.push("Prefilled download QA");
    pushCard(
      map,
      "Prefill QA lane",
      "QA stage",
      "Prefilled download QA should prove that what operators review and what recipients receive still reflect the same template data."
    );
    checklist.push(
      "Prefilled QA confirms the downloaded document still reflects the sent template data."
    );
    complexity += 2;
  }

  if (selectedQa === "tenantclone") {
    methods.push("Tenant clone validation");
    pushCard(
      map,
      "Clone QA lane",
      "QA stage",
      "Tenant clone validation should prove that naming, reply ownership, and key template behavior survive distribution into another workspace."
    );
    checklist.push(
      "Tenant clones are validated so ownership, replies, and template behavior survive distribution."
    );
    complexity += 3;
    plan = "Tenant-Safe Template Distribution";
    summary =
      "Validate tenant clones deliberately so reusable templates preserve naming, replies, and packet behavior after distribution.";
  }

  if (selectedQa === "bundle") {
    methods.push("Bundle composition regression check");
    pushCard(
      map,
      "Bundle QA lane",
      "QA stage",
      "Bundle composition QA should prove that reusable templates can still be assembled into packets without losing fields, roles, or naming clarity."
    );
    checklist.push(
      "Bundle composition tests confirm reusable templates still carry fields, roles, and names into packet assembly."
    );
    complexity += 3;
    plan = "Modular Packet Template Stack";
    summary =
      "Use a modular template stack with bundle regression checks so packet assembly can evolve without rebuilding every underlying template.";
  }

  if (
    selectedScope === "master" &&
    selectedReuse === "linked" &&
    selectedTransfer === "exact"
  ) {
    plan = "Reusable Master Template Library";
    summary =
      "Keep one reusable source for core documents, carry fields forward exactly across small revisions, name submissions clearly, and run prefilled QA before the library spreads.";
  }

  const preview = {
    library_scope:
      selectedScope === "master"
        ? "reusable_master_library"
        : selectedScope === "tenant"
          ? "tenant_distributed_template_library"
          : selectedScope === "packet"
            ? "packet_ready_modular_library"
            : "high_volume_submission_library",
    reuse_model:
      selectedReuse === "linked"
        ? "linked_reusable_building_blocks"
        : selectedReuse === "snapshot"
          ? "snapshot_copies_per_release"
          : selectedReuse === "fieldcopy"
            ? "field_only_carry_forward"
            : "master_template_variants",
    field_transfer:
      selectedTransfer === "exact"
        ? "exact_field_positions_between_revisions"
        : selectedTransfer === "style"
          ? "style_inheritance_for_new_fields"
          : selectedTransfer === "schema"
            ? "schema_remap_and_standard_keys"
            : "tagged_generation_from_html_or_docx",
    naming_system:
      selectedNaming === "clientversion"
        ? "client_plus_version_naming"
        : selectedNaming === "submission"
          ? "submission_name_tracking"
          : selectedNaming === "annex"
            ? "annex_and_packet_component_naming"
            : "tenant_owned_labels",
    personalization_mode:
      selectedPersonalization === "prefilled"
        ? "prefilled_field_email_personalization"
        : selectedPersonalization === "tenantreply"
          ? "tenant_specific_sender_and_reply"
          : selectedPersonalization === "neutral"
            ? "neutral_ops_messaging"
            : "portal_led_handoff_language",
    rollout_qa:
      selectedQa === "internal"
        ? "internal_template_review_only"
        : selectedQa === "download"
          ? "prefilled_download_qa"
          : selectedQa === "tenantclone"
            ? "tenant_clone_validation"
            : "bundle_composition_regression_check",
    template_controls: [],
  };

  if (selectedReuse === "linked") {
    preview.template_controls.push("linked_template_modules");
  }

  if (selectedReuse === "snapshot") {
    preview.template_controls.push("frozen_release_snapshots");
  }

  if (selectedTransfer === "exact") {
    preview.template_controls.push("exact_field_carry_forward");
  }

  if (selectedTransfer === "style") {
    preview.template_controls.push("style_inheritance");
  }

  if (selectedTransfer === "schema") {
    preview.template_controls.push("standard_external_keys");
  }

  if (selectedTransfer === "tags") {
    preview.template_controls.push("tagged_template_generation");
  }

  if (selectedNaming === "submission") {
    preview.template_controls.push("visible_submission_name");
  }

  if (selectedPersonalization === "prefilled") {
    preview.template_controls.push("prefilled_email_placeholders");
  }

  if (selectedPersonalization === "tenantreply") {
    preview.template_controls.push("tenant_reply_ownership");
  }

  if (selectedQa === "download") {
    preview.template_controls.push("prefilled_download_check");
  }

  if (selectedQa === "tenantclone") {
    preview.template_controls.push("tenant_clone_validation");
  }

  if (selectedQa === "bundle") {
    preview.template_controls.push("bundle_regression_check");
  }

  if (selectedScope === "tenant") {
    preview.distribution_target = "tenant_workspace";
  }

  if (selectedScope === "packet") {
    preview.packet_target = "modular_bundle";
  }

  if (selectedNaming === "clientversion") {
    preview.name_example = "acme-msa-v3";
  }

  if (selectedNaming === "submission") {
    preview.name_example = "acme-nda-2026-q1";
  }

  const previewText = JSON.stringify(preview, null, 2);
  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules);
  if (!uniqueRules.length) {
    uniqueRules.push(
      "Template library design should define one reuse boundary, one naming rule, and one rollout QA path before the library goes live."
    );
  }
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the template library boundary is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one reuse boundary, one naming rule, and one rollout QA lane. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the library model narrow enough that operators can explain which template is authoritative, how variants are created, and how revisions stay safe without guesswork.`;

  let offerKey = "audit";
  if (complexity >= 5) {
    offerKey = "sprint";
  }
  if (
    complexity >= 10 ||
    (selectedScope === "tenant" &&
      selectedPersonalization === "tenantreply" &&
      selectedQa === "tenantclone") ||
    (selectedScope === "packet" &&
      selectedReuse === "linked" &&
      selectedQa === "bundle")
  ) {
    offerKey = "workspace";
  }

  const offer = templateOfferCatalog[offerKey];

  if (templatePlanName) {
    templatePlanName.textContent = plan;
  }

  if (templatePlanSummary) {
    templatePlanSummary.textContent = summary;
  }

  if (templateMethods) {
    templateMethods.innerHTML = uniqueMethods
      .map((method) => `<span class="stack-chip">${method}</span>`)
      .join("");
  }

  if (templateMap) {
    templateMap.innerHTML = renderCards(map);
  }

  if (templatePreview) {
    templatePreview.textContent = previewText;
  }

  if (templateRules) {
    templateRules.innerHTML = asBullets(uniqueRules.slice(0, 5));
  }

  if (templateBrief) {
    templateBrief.textContent = brief;
  }

  if (templateChecklist) {
    templateChecklist.innerHTML = asBullets(uniqueChecklist);
  }

  if (templateOfferName) {
    templateOfferName.textContent = offer.label;
  }

  if (templateOfferNote) {
    templateOfferNote.textContent = offer.note;
  }

  if (templateOfferLink) {
    templateOfferLink.href = offer.link;
    templateOfferLink.textContent = `Open ${offer.label}`;
  }

  if (copyTemplatePreview) {
    copyTemplatePreview.dataset.copy = previewText;
  }

  if (copyTemplateBrief) {
    copyTemplateBrief.dataset.copy = brief;
  }

  if (copyTemplateChecklist) {
    copyTemplateChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
  }
};

[libraryScope, reuseModel, fieldTransfer, namingSystem, personalizationMode, rolloutQa].forEach((input) => {
  input?.addEventListener("input", renderTemplateLibraryPlanner);
  input?.addEventListener("change", renderTemplateLibraryPlanner);
});

copyTemplatePreview?.addEventListener("click", () => copyTemplateText(copyTemplatePreview));
copyTemplateBrief?.addEventListener("click", () => copyTemplateText(copyTemplateBrief));
copyTemplateChecklist?.addEventListener("click", () => copyTemplateText(copyTemplateChecklist));

renderTemplateLibraryPlanner();
