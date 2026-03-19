const evidenceOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs its signature-proof target, verification burden, and archive evidence model mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when one signed artifact already has a clear proof target and needs the evidence policy implemented cleanly.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when signature proof, archive validation, signer metadata, and regulated evidence handling need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const visibleProofMode = document.getElementById("visibleProofMode");
const timestampSource = document.getElementById("timestampSource");
const signerMetadataMode = document.getElementById("signerMetadataMode");
const signatureStandard = document.getElementById("signatureStandard");
const verificationOutput = document.getElementById("verificationOutput");
const archiveEvidence = document.getElementById("archiveEvidence");

const evidencePlanName = document.getElementById("evidencePlanName");
const evidencePlanSummary = document.getElementById("evidencePlanSummary");
const evidenceMethods = document.getElementById("evidenceMethods");
const evidenceMap = document.getElementById("evidenceMap");
const evidencePreview = document.getElementById("evidencePreview");
const evidenceRules = document.getElementById("evidenceRules");
const evidenceBrief = document.getElementById("evidenceBrief");
const evidenceChecklist = document.getElementById("evidenceChecklist");
const evidenceOfferName = document.getElementById("evidenceOfferName");
const evidenceOfferNote = document.getElementById("evidenceOfferNote");
const evidenceOfferLink = document.getElementById("evidenceOfferLink");
const copyEvidencePreview = document.getElementById("copyEvidencePreview");
const copyEvidenceBrief = document.getElementById("copyEvidenceBrief");
const copyEvidenceChecklist = document.getElementById("copyEvidenceChecklist");

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

const copyEvidenceText = async (button) => {
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

const renderSignatureEvidencePlanner = () => {
  const selectedVisible = visibleProofMode?.value || "signature_mark";
  const selectedTime = timestampSource?.value || "signing_time";
  const selectedMetadata = signerMetadataMode?.value || "ip_date";
  const selectedStandard = signatureStandard?.value || "pades";
  const selectedVerify = verificationOutput?.value || "pdf_verify";
  const selectedArchive = archiveEvidence?.value || "proof_pack";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Verified Signature Proof Pack";
  let summary =
    "Keep a visible signature mark on the final PDF, pair it with stable signing time and signer metadata, and archive a proof pack that can be verified later.";

  pushCard(
    map,
    "Proof boundary",
    "Evidence stage",
    "One owned proof boundary should define what the completed artifact shows visually, what it proves cryptographically, and what archive package backs it up later."
  );
  rules.push(
    "Signature evidence should be tested on the exact completed PDF and archive outputs the buyer will review, because proof often drifts between signing success and final delivery."
  );
  checklist.push(
    "One owned proof boundary exists before signed artifacts are released externally."
  );

  if (selectedVisible === "signature_mark") {
    methods.push("Visible signature mark");
    pushCard(
      map,
      "Visual signature",
      "Visible proof",
      "A visible signature mark keeps the completed PDF legible for reviewers who expect to see the signing event without opening a separate audit system."
    );
    checklist.push(
      "The final PDF visibly shows the completed signature instead of looking unsigned."
    );
    complexity += 1;
  }

  if (selectedVisible === "signature_plus_date") {
    methods.push("Signature plus date");
    pushCard(
      map,
      "Signed date block",
      "Visible proof",
      "Pair the visible signature with a visible signing date when legal or operational reviewers expect the PDF itself to tell them when it was executed."
    );
    checklist.push(
      "Visible signature proof includes the signing date in the final PDF when policy requires it."
    );
    complexity += 2;
  }

  if (selectedVisible === "full_visual_block") {
    methods.push("Full signer evidence block");
    pushCard(
      map,
      "Signer evidence block",
      "Visible proof",
      "A full evidence block helps when the PDF should visibly show signer name, date, and supporting proof cues without requiring another system."
    );
    checklist.push(
      "The final PDF visibly carries the signer evidence block the buyer expects to defend later."
    );
    complexity += 3;
    plan = "Visible Signer Evidence Block";
    summary =
      "Render a full signer evidence block on the PDF so reviewers can see signature proof, timing, and signer context without hunting through logs.";
  }

  if (selectedVisible === "hidden_crypto") {
    methods.push("Cryptographic proof only");
    rules.push(
      "Proof-only cryptographic signing is workable only when the buyer accepts that many human reviewers will not see evidence directly on the PDF page."
    );
    complexity += 1;
  }

  if (selectedTime === "app_time") {
    methods.push("Application completion time");
    rules.push(
      "Application completion time is the lightest timestamp source, but buyers should accept that the date on the PDF and the date in audit may still need explanation."
    );
    complexity += 1;
  }

  if (selectedTime === "signing_time") {
    methods.push("Embedded signing time");
    pushCard(
      map,
      "Signing-time source",
      "Timestamp stage",
      "Use signer-time evidence when the buyer wants the proof tied closely to the actual signing event rather than only the workflow completion state."
    );
    checklist.push(
      "The signature proof uses the intended signing-time source instead of an unrelated completion timestamp."
    );
    complexity += 2;
  }

  if (selectedTime === "tsa") {
    methods.push("Trusted timestamp server");
    pushCard(
      map,
      "TSA chain",
      "Timestamp stage",
      "Trusted timestamp servers matter when the buyer wants a stronger proof chain that stands up outside the application itself."
    );
    checklist.push(
      "The signed artifact can reference the intended trusted timestamp source where policy requires it."
    );
    complexity += 3;
    plan = "Timestamped Signature Proof";
    summary =
      "Use visible signature proof plus TSA-backed timing so the finished artifact carries stronger evidence than app-local completion alone.";
  }

  if (selectedTime === "dual_time") {
    methods.push("Display and audit timestamp pair");
    pushCard(
      map,
      "Time reconciliation",
      "Timestamp stage",
      "Pair visible and audit timestamps deliberately when the buyer needs to explain the difference between signer-facing date and system completion time."
    );
    rules.push(
      "Visible and audit timestamps should reconcile under one policy so legal or compliance reviewers do not see two unexplained dates."
    );
    checklist.push(
      "Visible proof date and audit timestamp are reconciled under one documented policy."
    );
    complexity += 2;
  }

  if (selectedMetadata === "basic") {
    methods.push("Name only metadata");
    rules.push(
      "Name-only evidence is the simplest launch path, but buyers should be explicit if later reviews may still ask for IP, signer method, or regulated markers."
    );
    complexity += 1;
  }

  if (selectedMetadata === "ip_date") {
    methods.push("IP plus date metadata");
    pushCard(
      map,
      "Basic metadata layer",
      "Metadata stage",
      "IP and signing date add useful review context when the buyer needs more than a visible signature image."
    );
    checklist.push(
      "The proof layer includes the signer metadata the buyer expects to review later."
    );
    complexity += 2;
  }

  if (selectedMetadata === "compliance") {
    methods.push("Compliance metadata");
    pushCard(
      map,
      "Compliance metadata layer",
      "Metadata stage",
      "Compliance-oriented proof should capture signer method, email, and other trace data without forcing operators to reconstruct it manually."
    );
    checklist.push(
      "Compliance reviewers can see signer metadata without rebuilding it from separate systems."
    );
    complexity += 3;
  }

  if (selectedMetadata === "regulated") {
    methods.push("Regulated signer markers");
    pushCard(
      map,
      "Regulated proof markers",
      "Metadata stage",
      "Regulated proof needs explicit markers when the buyer cares about eIDAS posture or other higher-assurance interpretation of the signature."
    );
    checklist.push(
      "The evidence layer includes the regulated signer markers the buyer expects to defend."
    );
    complexity += 3;
    plan = "Regulated Signature Evidence Pack";
    summary =
      "Combine visible proof with regulated signer markers so the signed record carries stronger meaning for legal and compliance review.";
  }

  if (selectedStandard === "platform") {
    methods.push("Platform e-signature default");
    complexity += 1;
  }

  if (selectedStandard === "pades") {
    methods.push("PAdES-aware PDF signing");
    pushCard(
      map,
      "PAdES proof posture",
      "Standard stage",
      "PAdES-aware signing matters when buyers want the PDF artifact to align more closely with recognized PDF signature expectations."
    );
    checklist.push(
      "The proof target is documented as a PAdES-aware artifact where the buyer expects stronger PDF-signing posture."
    );
    complexity += 2;
  }

  if (selectedStandard === "ltv") {
    methods.push("LTV-enabled proof");
    pushCard(
      map,
      "Long-term validation",
      "Standard stage",
      "LTV matters when the buyer expects the signed artifact to remain easier to validate later rather than only at the moment of completion."
    );
    checklist.push(
      "Long-term validation expectations are defined before the buyer archives the finished PDF."
    );
    complexity += 3;
    plan = "Long-Term Validation Proof Pack";
    summary =
      "Build a proof pack that supports longer-term validation instead of treating completion day as the only moment the artifact needs to verify.";
  }

  if (selectedStandard === "eidas") {
    methods.push("eIDAS-oriented posture");
    pushCard(
      map,
      "eIDAS posture",
      "Standard stage",
      "eIDAS-oriented evidence matters when the buyer needs stronger language around signature interpretation, regulated acceptance, or trust services."
    );
    checklist.push(
      "The proof posture is explicit enough for teams that care about eIDAS-style interpretation of the signature."
    );
    complexity += 3;
    plan = "eIDAS-Oriented Signature Pack";
    summary =
      "Define a higher-assurance proof pack so the buyer can align signature evidence with stronger regulated expectations.";
  }

  if (selectedVerify === "viewer") {
    methods.push("Viewer-visible validation");
    complexity += 1;
  }

  if (selectedVerify === "pdf_verify") {
    methods.push("PDF verification-ready artifact");
    pushCard(
      map,
      "Verification artifact",
      "Verification stage",
      "Give reviewers a signed artifact that can be checked directly instead of relying only on screenshots or platform status."
    );
    checklist.push(
      "Reviewers can validate the completed PDF with the intended verification path instead of trusting a generic status label."
    );
    complexity += 2;
  }

  if (selectedVerify === "manifest") {
    methods.push("Verification manifest");
    pushCard(
      map,
      "Hash manifest",
      "Verification stage",
      "Manifest-based verification helps when the buyer wants a clearer proof bundle with hashes, record IDs, or independent evidence references."
    );
    checklist.push(
      "The proof pack includes a manifest or equivalent record that explains how to verify the artifact later."
    );
    complexity += 2;
  }

  if (selectedVerify === "ops_check") {
    methods.push("Ops verification checklist");
    pushCard(
      map,
      "Human review lane",
      "Verification stage",
      "A human verification checklist matters when operators still need to inspect signed artifacts before sending or archiving them."
    );
    checklist.push(
      "Operators have a defined review checklist before they release or archive the signed artifact."
    );
    complexity += 1;
  }

  if (selectedArchive === "pdf_only") {
    methods.push("Signed PDF only");
    rules.push(
      "PDF-only archives are lightweight, but buyers should accept that later proof questions may require reconstructing context from outside the archive."
    );
    complexity += 1;
  }

  if (selectedArchive === "pdf_plus_log") {
    methods.push("Signed PDF plus audit log");
    pushCard(
      map,
      "Audit attachment",
      "Archive stage",
      "Attach the signed PDF to a separate audit log when archive consumers still need a lightweight proof bundle."
    );
    checklist.push(
      "Archive retrieval can access both the signed PDF and its audit trace together."
    );
    complexity += 2;
  }

  if (selectedArchive === "proof_pack") {
    methods.push("Proof pack with metadata");
    pushCard(
      map,
      "Proof bundle",
      "Archive stage",
      "Keep the signed PDF, metadata, and verification context together so downstream reviewers are not forced to rebuild the proof story manually."
    );
    checklist.push(
      "Archive retrieval includes the signed PDF plus the metadata needed to explain the proof later."
    );
    complexity += 2;
  }

  if (selectedArchive === "regulated_bundle") {
    methods.push("Regulated archive bundle");
    pushCard(
      map,
      "Regulated retention pack",
      "Archive stage",
      "Regulated bundles matter when the buyer wants stronger retention, retrieval, and proof expectations than a simple signed PDF download."
    );
    checklist.push(
      "The archive bundle preserves the regulated evidence set the buyer expects to retain."
    );
    complexity += 3;
    plan = "Regulated Signature Evidence Pack";
    summary =
      "Archive a stronger regulated evidence bundle so the finished record still carries defensible proof after delivery and retention.";
  }

  if (
    selectedVisible === "full_visual_block" &&
    selectedTime === "tsa" &&
    selectedMetadata === "regulated" &&
    selectedStandard === "eidas"
  ) {
    plan = "Regulated Signature Evidence Pack";
    summary =
      "Combine visible signer proof, trusted timestamps, regulated signer markers, and higher-assurance signature posture so the signed artifact stands up in stricter review environments.";
  }

  if (
    selectedVisible === "signature_mark" &&
    selectedTime === "signing_time" &&
    selectedMetadata === "ip_date" &&
    selectedStandard === "pades" &&
    selectedVerify === "pdf_verify" &&
    selectedArchive === "proof_pack"
  ) {
    plan = "Verified Signature Proof Pack";
    summary =
      "Keep a visible signature mark on the final PDF, pair it with stable signing time and signer metadata, and archive a proof pack that can be verified later.";
  }

  const preview = {
    visible_proof_mode:
      selectedVisible === "signature_mark"
        ? "visible_signature_mark_on_pdf"
        : selectedVisible === "signature_plus_date"
          ? "signature_plus_signed_date"
          : selectedVisible === "full_visual_block"
            ? "full_signer_evidence_block"
            : "cryptographic_proof_only",
    timestamp_source:
      selectedTime === "app_time"
        ? "application_completion_time"
        : selectedTime === "signing_time"
          ? "embedded_signing_time"
          : selectedTime === "tsa"
            ? "trusted_timestamp_server"
            : "display_and_audit_timestamp_pair",
    signer_metadata_mode:
      selectedMetadata === "basic"
        ? "name_only"
        : selectedMetadata === "ip_date"
          ? "ip_plus_date"
          : selectedMetadata === "compliance"
            ? "ip_email_and_signer_method"
            : "regulated_signer_markers",
    signature_standard:
      selectedStandard === "platform"
        ? "platform_esignature_default"
        : selectedStandard === "pades"
          ? "pades_aware_pdf_signing"
          : selectedStandard === "ltv"
            ? "ltv_enabled_pdf_proof"
            : "eidas_oriented_signature_posture",
    verification_output:
      selectedVerify === "viewer"
        ? "viewer_visible_signature_validation"
        : selectedVerify === "pdf_verify"
          ? "pdf_verification_ready_artifact"
          : selectedVerify === "manifest"
            ? "verification_manifest_and_hash_record"
            : "ops_verification_checklist",
    archive_evidence:
      selectedArchive === "pdf_only"
        ? "signed_pdf_only"
        : selectedArchive === "pdf_plus_log"
          ? "signed_pdf_plus_audit_log"
          : selectedArchive === "proof_pack"
            ? "proof_pack_with_metadata"
            : "regulated_archive_bundle",
    evidence_controls: ["owned_proof_boundary"],
  };

  if (selectedVisible === "signature_mark") {
    preview.evidence_controls.push("visible_signature_render");
  }
  if (selectedVisible === "full_visual_block") {
    preview.evidence_controls.push("full_signer_evidence_overlay");
  }
  if (selectedTime === "tsa") {
    preview.evidence_controls.push("trusted_timestamp_reference");
  }
  if (selectedTime === "dual_time") {
    preview.evidence_controls.push("timestamp_reconciliation_policy");
  }
  if (selectedMetadata === "ip_date") {
    preview.evidence_controls.push("ip_and_date_metadata");
  }
  if (selectedMetadata === "regulated") {
    preview.evidence_controls.push("regulated_signature_markers");
  }
  if (selectedStandard === "pades") {
    preview.evidence_controls.push("pades_target");
  }
  if (selectedStandard === "ltv") {
    preview.evidence_controls.push("ltv_target");
  }
  if (selectedStandard === "eidas") {
    preview.evidence_controls.push("eidas_oriented_posture");
  }
  if (selectedVerify === "pdf_verify") {
    preview.evidence_controls.push("verification_ready_pdf");
  }
  if (selectedVerify === "manifest") {
    preview.evidence_controls.push("hash_manifest");
  }
  if (selectedArchive === "proof_pack") {
    preview.evidence_controls.push("archive_proof_pack");
  }
  if (selectedArchive === "regulated_bundle") {
    preview.evidence_controls.push("regulated_archive_retention");
  }

  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the signed artifact carries the intended proof";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one explicit proof target, one verification path, and one archive evidence rule. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the evidence policy narrow enough that visible proof, timestamps, and metadata can be checked before the artifact is released or retained.`;

  let offerKey = "audit";
  if (complexity >= 4) {
    offerKey = "sprint";
  }
  if (
    complexity >= 8 ||
    selectedStandard === "ltv" ||
    selectedStandard === "eidas" ||
    selectedArchive === "regulated_bundle" ||
    selectedTime === "tsa"
  ) {
    offerKey = "workspace";
  }
  if (
    complexity <= 3 &&
    selectedStandard === "platform" &&
    selectedArchive === "pdf_only"
  ) {
    offerKey = "audit";
  }

  const offer = evidenceOfferCatalog[offerKey];
  const previewText = JSON.stringify(preview, null, 2);

  evidencePlanName.textContent = plan;
  evidencePlanSummary.textContent = summary;
  evidenceMethods.innerHTML = uniqueMethods.length
    ? uniqueMethods.map((method) => `<span class="stack-chip">${method}</span>`).join("")
    : '<span class="stack-chip">Map proof target first</span>';
  evidenceMap.innerHTML = renderCards(map);
  evidencePreview.textContent = previewText;
  evidenceRules.innerHTML = asBullets(uniqueRules);
  evidenceBrief.textContent = brief;
  evidenceChecklist.innerHTML = asBullets(uniqueChecklist);
  evidenceOfferName.textContent = offer.label;
  evidenceOfferNote.textContent = offer.note;
  evidenceOfferLink.href = offer.link;
  evidenceOfferLink.textContent = `Open ${offer.label}`;

  copyEvidencePreview.dataset.copy = previewText;
  copyEvidenceBrief.dataset.copy = brief;
  copyEvidenceChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
};

[visibleProofMode, timestampSource, signerMetadataMode, signatureStandard, verificationOutput, archiveEvidence].forEach((input) =>
  input?.addEventListener("input", renderSignatureEvidencePlanner)
);

copyEvidencePreview?.addEventListener("click", () => copyEvidenceText(copyEvidencePreview));
copyEvidenceBrief?.addEventListener("click", () => copyEvidenceText(copyEvidenceBrief));
copyEvidenceChecklist?.addEventListener("click", () => copyEvidenceText(copyEvidenceChecklist));

renderSignatureEvidencePlanner();
