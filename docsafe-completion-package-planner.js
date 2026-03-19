const packageOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs the delivery boundary, filename policy, and archive model mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the buyer already knows the first output lane and needs the package policy implemented cleanly.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when completed-document delivery, archive access, and multi-system evidence handling need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const packageScope = document.getElementById("packageScope");
const releaseTiming = document.getElementById("releaseTiming");
const packageMode = document.getElementById("packageMode");
const namingModel = document.getElementById("namingModel");
const accessPolicy = document.getElementById("accessPolicy");
const evidenceMode = document.getElementById("evidenceMode");

const packagePlanName = document.getElementById("packagePlanName");
const packagePlanSummary = document.getElementById("packagePlanSummary");
const packageMethods = document.getElementById("packageMethods");
const packageMap = document.getElementById("packageMap");
const packagePreview = document.getElementById("packagePreview");
const packageRules = document.getElementById("packageRules");
const packageBrief = document.getElementById("packageBrief");
const packageChecklist = document.getElementById("packageChecklist");
const packageOfferName = document.getElementById("packageOfferName");
const packageOfferNote = document.getElementById("packageOfferNote");
const packageOfferLink = document.getElementById("packageOfferLink");
const copyPackagePreview = document.getElementById("copyPackagePreview");
const copyPackageBrief = document.getElementById("copyPackageBrief");
const copyPackageChecklist = document.getElementById("copyPackageChecklist");

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

const copyPackageText = async (button) => {
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

const renderCompletionPackagePlanner = () => {
  const selectedScope = packageScope?.value || "single";
  const selectedRelease = releaseTiming?.value || "final";
  const selectedPackage = packageMode?.value || "separate";
  const selectedNaming = namingModel?.value || "template";
  const selectedAccess = accessPolicy?.value || "restricted";
  const selectedEvidence = evidenceMode?.value || "separate";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Controlled Final Package";
  let summary =
    "Release final artifacts only after all required signers finish, keep filenames predictable, and separate evidence from the main PDF unless policy says otherwise.";

  pushCard(
    map,
    "Release gate",
    "Package stage",
    "One owned release boundary should decide when recipients can access completed artifacts and when internal systems can replicate them."
  );

  if (selectedScope === "single") {
    methods.push("Single completed document");
    pushCard(
      map,
      "Single artifact lane",
      "Scope stage",
      "Keep one clear signed PDF path so recipients know exactly which finished file is canonical."
    );
    checklist.push(
      "One canonical completed document is defined before naming, evidence, and archive logic branch further."
    );
    complexity += 1;
  }

  if (selectedScope === "packet") {
    methods.push("Completed packet bundle");
    pushCard(
      map,
      "Packet artifact set",
      "Scope stage",
      "Treat the completed packet as a named output set so annexes, audit files, and related PDFs do not drift apart after signing."
    );
    checklist.push(
      "The completed packet has a defined output set instead of several loosely related files with no owner."
    );
    complexity += 2;
  }

  if (selectedScope === "batch") {
    methods.push("Weekly batch export");
    pushCard(
      map,
      "Batch export lane",
      "Scope stage",
      "Design one repeatable export lane when teams process many completed documents every week."
    );
    checklist.push(
      "The export process supports several completed documents at once instead of forcing manual one-by-one download."
    );
    plan = "Bulk Signed Export Lane";
    summary =
      "Package completed documents in a repeatable export lane with usable names, filters, and evidence support for weekly operations.";
    complexity += 3;
  }

  if (selectedScope === "archive") {
    methods.push("Archive retrieval lane");
    pushCard(
      map,
      "Archive access lane",
      "Scope stage",
      "Separate archive retrieval from signer delivery so long-term access and external distribution do not share the same trust boundary."
    );
    checklist.push(
      "Archive retrieval has a separate controlled lane instead of sharing the same access pattern as signer delivery."
    );
    plan = "Archive-Safe Document Vault";
    summary =
      "Replicate completed artifacts into a controlled archive lane so retrieval, export, and external delivery do not compete for the same path.";
    complexity += 3;
  }

  if (selectedRelease === "final") {
    methods.push("All-signers-complete release");
    pushCard(
      map,
      "Completion boundary",
      "Release stage",
      "Withhold the real completed artifact until all required signers finish so no one can act on a half-signed file."
    );
    checklist.push(
      "No externally downloadable artifact is released before all required signers complete the workflow."
    );
    complexity += 2;
  }

  if (selectedRelease === "staged") {
    methods.push("Internal preview then release");
    pushCard(
      map,
      "Internal preview gate",
      "Release stage",
      "Internal reviewers can inspect artifacts first, but the external release boundary still needs one explicit owner."
    );
    rules.push(
      "Staged release must separate internal preview from external release or recipients will still see the wrong artifact too early."
    );
    complexity += 2;
  }

  if (selectedRelease === "internal") {
    methods.push("Internal-only package first");
    rules.push(
      "Internal-first packaging should define which artifact can circulate inside ops without becoming the externally trusted final document."
    );
    complexity += 1;
  }

  if (selectedRelease === "archive") {
    methods.push("Archive-first replication");
    pushCard(
      map,
      "Archive replication step",
      "Release stage",
      "Replicate completed artifacts into the archive before broader delivery when records and retrieval discipline matter most."
    );
    complexity += 2;
  }

  if (selectedPackage === "separate") {
    methods.push("Separate signed PDFs");
    checklist.push(
      "Each completed PDF is retained as a separate artifact when downstream systems need independent files."
    );
    complexity += 1;
  }

  if (selectedPackage === "merged") {
    methods.push("Merged completion PDF");
    pushCard(
      map,
      "Merged artifact",
      "Package mode",
      "Merge related documents only when recipients truly need one combined output instead of several component files."
    );
    rules.push(
      "Merged outputs should be deliberate because combining files changes how recipients search, store, and validate the result."
    );
    complexity += 2;
  }

  if (selectedPackage === "zip") {
    methods.push("ZIP package and manifest");
    pushCard(
      map,
      "Manifest bundle",
      "Package mode",
      "Use ZIP packaging when the buyer needs several artifacts plus a small manifest rather than one flattened PDF."
    );
    checklist.push(
      "Bundle outputs include a manifest so recipients and archives can identify what the ZIP package contains."
    );
    complexity += 2;
  }

  if (selectedPackage === "api") {
    methods.push("API pickup");
    pushCard(
      map,
      "API artifact pickup",
      "Package mode",
      "Use submission-document APIs when the final package should flow into another system instead of being manually downloaded."
    );
    rules.push(
      "API-driven pickup needs a defined archive and retry policy or completed artifacts will disappear into an unreliable downstream lane."
    );
    checklist.push(
      "The package design identifies which artifacts are pulled through APIs and which stay as manual downloads."
    );
    complexity += 2;
  }

  if (selectedNaming === "template") {
    methods.push("Template-based filenames");
    pushCard(
      map,
      "Template naming source",
      "Naming stage",
      "Use the active template or cloned template name when the working document identity should follow the template lane."
    );
    checklist.push(
      "Downloaded artifact names match the active template or cloned template context instead of a stale upload filename."
    );
    complexity += 1;
  }

  if (selectedNaming === "submission") {
    methods.push("Submission-name tracking");
    pushCard(
      map,
      "Submission version key",
      "Naming stage",
      "Use submission names when several similar client documents need version-safe tracking inside ops."
    );
    checklist.push(
      "Submission names are visible in the output policy so similar client documents can be distinguished cleanly."
    );
    complexity += 1;
  }

  if (selectedNaming === "dynamic") {
    methods.push("Dynamic filename variables");
    pushCard(
      map,
      "Field-value filenames",
      "Naming stage",
      "Use selected field values in filenames when downstream ops would otherwise spend time renaming every final PDF."
    );
    rules.push(
      "Dynamic filenames should use a controlled set of field values or ops will inherit brittle naming conventions."
    );
    checklist.push(
      "The output naming policy defines which field values are allowed in filenames before launch."
    );
    complexity += 2;
  }

  if (selectedNaming === "client") {
    methods.push("Client and version naming");
    pushCard(
      map,
      "Client-version label",
      "Naming stage",
      "Add client and version context when the same template is reused repeatedly across many similar deals."
    );
    complexity += 2;
  }

  if (selectedAccess === "restricted") {
    methods.push("Issuer-controlled release");
    rules.push(
      "Restrict release until completion when partially signed artifacts would create legal or commercial risk."
    );
    complexity += 1;
  }

  if (selectedAccess === "signers") {
    methods.push("Completed-signer delivery");
    pushCard(
      map,
      "Signer copy lane",
      "Access stage",
      "Deliver copies to signers only after the completed package is ready, not while signatures are still accumulating."
    );
    checklist.push(
      "Completed signers receive the final package only after the artifact is fully ready for release."
    );
    complexity += 1;
  }

  if (selectedAccess === "observers") {
    methods.push("Observer final package");
    pushCard(
      map,
      "Observer access lane",
      "Access stage",
      "Observers can receive the final package only when their access belongs to the policy rather than leaking from the signer lane."
    );
    complexity += 2;
  }

  if (selectedAccess === "archive") {
    methods.push("Internal archive mirror");
    pushCard(
      map,
      "Archive mirror boundary",
      "Access stage",
      "Mirror completed artifacts internally with a tighter access lane than the public signer-delivery path."
    );
    checklist.push(
      "Archive access is defined separately from recipient delivery so archived artifacts are not fetched through a risky public path."
    );
    complexity += 2;
  }

  if (selectedEvidence === "separate") {
    methods.push("Separate audit evidence");
    checklist.push(
      "Audit evidence is preserved as a separate artifact when combining it would complicate the main PDF."
    );
    complexity += 1;
  }

  if (selectedEvidence === "combined") {
    methods.push("Combined PDF plus audit");
    pushCard(
      map,
      "Combined evidence artifact",
      "Evidence stage",
      "Combine the audit log only when the recipient truly needs one evidence package and the metadata tradeoff is acceptable."
    );
    rules.push(
      "Combined PDF and audit packages should be tested for metadata loss before becoming the default evidence mode."
    );
    complexity += 2;
  }

  if (selectedEvidence === "metadata") {
    methods.push("Metadata-safe output");
    pushCard(
      map,
      "Metadata preservation guard",
      "Evidence stage",
      "Preserve metadata intentionally when archive, search, or external record systems depend on it."
    );
    checklist.push(
      "Metadata-dependent outputs are checked after packaging so evidence preservation survives the final artifact build."
    );
    complexity += 2;
  }

  if (selectedEvidence === "bulk") {
    methods.push("Bulk export manifest");
    pushCard(
      map,
      "Export manifest",
      "Evidence stage",
      "Batch operations need a manifest or index so weekly exports remain filterable and traceable after download."
    );
    rules.push(
      "Bulk exports should include a manifest or filter context so the downloaded package can be reconciled later."
    );
    checklist.push(
      "Bulk export lanes include a manifest or index that explains what was exported and why."
    );
    complexity += 2;
  }

  if (selectedScope === "packet" && selectedPackage === "merged") {
    plan = "Merged Packet Completion Pack";
    summary =
      "Merge the final packet only after every member artifact is complete and the recipient genuinely needs one combined output.";
  }

  if (selectedScope === "batch" && selectedEvidence === "bulk") {
    plan = "Bulk Signed Export Lane";
    summary =
      "Package completed documents in a repeatable export lane with filterable manifests, usable names, and archive-safe evidence handling.";
  }

  if (selectedScope === "archive" && selectedAccess === "archive") {
    plan = "Archive-Safe Document Vault";
    summary =
      "Replicate completed artifacts into a controlled internal vault so archive retrieval and signer delivery do not compete for the same lane.";
  }

  if (selectedNaming === "dynamic" && selectedPackage === "zip") {
    plan = "Dynamic Export Pack";
    summary =
      "Bundle several completed artifacts with controlled filename variables and a manifest so downstream ops can reconcile the package quickly.";
  }

  const preview = {
    package_scope:
      selectedScope === "single"
        ? "single_completed_document"
        : selectedScope === "packet"
          ? "multi_document_packet"
          : selectedScope === "batch"
            ? "weekly_batch_export"
            : "archive_retrieval_lane",
    release_timing:
      selectedRelease === "final"
        ? "after_all_signers_complete"
        : selectedRelease === "staged"
          ? "internal_preview_then_external_release"
          : selectedRelease === "internal"
            ? "internal_only_first"
            : "archive_first_replication",
    package_mode:
      selectedPackage === "separate"
        ? "separate_signed_pdfs"
        : selectedPackage === "merged"
          ? "merged_completion_pdf"
          : selectedPackage === "zip"
            ? "zip_package_with_manifest"
            : "api_pickup",
    naming_model:
      selectedNaming === "template"
        ? "template_or_clone_name"
        : selectedNaming === "submission"
          ? "submission_name"
          : selectedNaming === "dynamic"
            ? "field_value_variables"
            : "client_plus_version",
    access_policy:
      selectedAccess === "restricted"
        ? "issuer_controlled_release"
        : selectedAccess === "signers"
          ? "completed_signers_receive_copies"
          : selectedAccess === "observers"
            ? "observers_receive_final_package"
            : "internal_archive_mirror",
    evidence_mode:
      selectedEvidence === "separate"
        ? "audit_log_separate"
        : selectedEvidence === "combined"
          ? "combine_pdf_and_audit_log"
          : selectedEvidence === "metadata"
            ? "metadata_safe_output"
            : "bulk_export_manifest",
    artifact_source: "getSubmissionDocuments",
    package_members: [],
  };

  if (selectedScope === "single") {
    preview.package_members = ["signed_pdf", "audit_log"];
  }

  if (selectedScope === "packet") {
    preview.package_members = ["main_document", "annexes", "audit_log"];
  }

  if (selectedScope === "batch") {
    preview.package_members = ["signed_documents", "export_manifest", "filter_context"];
  }

  if (selectedScope === "archive") {
    preview.package_members = ["signed_documents", "archive_index", "retention_record"];
  }

  if (selectedNaming === "dynamic") {
    preview.filename_pattern = "{{client_name}}-{{submission_name}}-signed.pdf";
  }

  if (selectedNaming === "submission") {
    preview.filename_pattern = "submission_name-signed.pdf";
  }

  if (selectedPackage === "zip") {
    preview.bundle_manifest = "package-manifest.json";
  }

  if (selectedPackage === "api") {
    preview.delivery_method = "api_pickup_and_archive_submission";
  }

  if (selectedEvidence === "combined") {
    preview.evidence_note = "verify metadata retention after combining audit log";
  }

  if (selectedEvidence === "bulk") {
    preview.export_filters = ["date_range", "template_name", "user"];
  }

  if (selectedAccess === "archive") {
    preview.archive_path = "internal_archive_only";
  }

  const previewText = JSON.stringify(preview, null, 2);
  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the final package policy is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one owned release boundary, one filename policy, and one archive or evidence rule. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the package narrow enough that completed-document delivery, archive access, and audit evidence can be explained without guesswork.`;

  let offerKey = "audit";
  if (complexity >= 5) {
    offerKey = "sprint";
  }
  if (
    complexity >= 10 ||
    (selectedScope === "batch" && selectedEvidence === "bulk") ||
    (selectedScope === "archive" && selectedPackage === "api")
  ) {
    offerKey = "workspace";
  }

  const offer = packageOfferCatalog[offerKey];

  if (packagePlanName) {
    packagePlanName.textContent = plan;
  }

  if (packagePlanSummary) {
    packagePlanSummary.textContent = summary;
  }

  if (packageMethods) {
    packageMethods.innerHTML = uniqueMethods
      .map((method) => `<span class="stack-chip">${method}</span>`)
      .join("");
  }

  if (packageMap) {
    packageMap.innerHTML = renderCards(map);
  }

  if (packagePreview) {
    packagePreview.textContent = previewText;
  }

  if (packageRules) {
    packageRules.innerHTML = asBullets(uniqueRules);
  }

  if (packageBrief) {
    packageBrief.textContent = brief;
  }

  if (packageChecklist) {
    packageChecklist.innerHTML = asBullets(uniqueChecklist);
  }

  if (packageOfferName) {
    packageOfferName.textContent = offer.label;
  }

  if (packageOfferNote) {
    packageOfferNote.textContent = offer.note;
  }

  if (packageOfferLink) {
    packageOfferLink.href = offer.link;
    packageOfferLink.textContent = `Open ${offer.label}`;
  }

  if (copyPackagePreview) {
    copyPackagePreview.dataset.copy = previewText;
  }

  if (copyPackageBrief) {
    copyPackageBrief.dataset.copy = brief;
  }

  if (copyPackageChecklist) {
    copyPackageChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
  }
};

[packageScope, releaseTiming, packageMode, namingModel, accessPolicy, evidenceMode].forEach((input) => {
  input?.addEventListener("input", renderCompletionPackagePlanner);
  input?.addEventListener("change", renderCompletionPackagePlanner);
});

copyPackagePreview?.addEventListener("click", () => copyPackageText(copyPackagePreview));
copyPackageBrief?.addEventListener("click", () => copyPackageText(copyPackageBrief));
copyPackageChecklist?.addEventListener("click", () => copyPackageText(copyPackageChecklist));

renderCompletionPackagePlanner();
