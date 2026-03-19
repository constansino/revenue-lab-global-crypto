const batchOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the batch lane still needs column, owner, and validation rules mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the batch lane is already defined clearly enough to implement and test.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when high-volume sending, staged approvals, and row-level recovery need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const batchVolume = document.getElementById("batchVolume");
const recipientPattern = document.getElementById("recipientPattern");
const mergeFieldDepth = document.getElementById("mergeFieldDepth");
const rowVariance = document.getElementById("rowVariance");
const qaGate = document.getElementById("qaGate");
const failureMode = document.getElementById("failureMode");

const batchPlanName = document.getElementById("batchPlanName");
const batchPlanSummary = document.getElementById("batchPlanSummary");
const batchSchema = document.getElementById("batchSchema");
const batchRules = document.getElementById("batchRules");
const batchCsvPreview = document.getElementById("batchCsvPreview");
const batchBrief = document.getElementById("batchBrief");
const batchChecklist = document.getElementById("batchChecklist");
const batchOfferName = document.getElementById("batchOfferName");
const batchOfferNote = document.getElementById("batchOfferNote");
const batchOfferLink = document.getElementById("batchOfferLink");
const copyCsvStarter = document.getElementById("copyCsvStarter");
const copyBatchBrief = document.getElementById("copyBatchBrief");
const copyBatchChecklist = document.getElementById("copyBatchChecklist");

const uniqueItems = (items) => [...new Set(items.filter(Boolean))];
const asBullets = (items) => items.map((item) => `<p>- ${item}</p>`).join("");

const sampleValueMap = {
  row_id: "row_001",
  document_label: "msa_q2_renewal",
  batch_group: "wave_north_america",
  signer_1_name: "Avery Stone",
  signer_1_email: "avery@northwind.com",
  signer_2_name: "Jordan West",
  signer_2_email: "jordan@northwind.com",
  approver_1_name: "Morgan Lee",
  approver_1_email: "morgan@legalops.com",
  observer_1_name: "Legal Desk",
  observer_1_email: "legal@northwind.com",
  client_name: "Northwind Labs",
  company_name: "Northwind Holdings",
  effective_date: "2026-04-01",
  amount: "2400",
  owner_name: "Mina Chen",
  renewal_date: "2027-04-01",
  template_name: "master-service-agreement",
  reply_owner: "ops@vendor.com",
  locale: "en",
  send_after: "2026-04-03T09:00:00Z",
  pilot_row: "yes",
  approval_stage: "legal-review",
  retry_group: "wave_a_retry",
};

const copyBatchText = async (button) => {
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

const makeColumn = (name, note, required = true) => ({ name, note, required });

const renderSchemaCards = (columns) =>
  columns
    .map(
      (column) => `
        <article class="matrix-card">
          <p class="matrix-role">${column.required ? "Required column" : "Optional column"}</p>
          <strong>${column.name}</strong>
          <p>${column.note}</p>
        </article>
      `
    )
    .join("");

const renderBatchMapper = () => {
  const volume = batchVolume?.value || "medium";
  const recipients = recipientPattern?.value || "sequential";
  const mergeDepth = mergeFieldDepth?.value || "basic";
  const variance = rowVariance?.value || "mixed";
  const qa = qaGate?.value || "sample";
  const failures = failureMode?.value || "retry";

  const columns = [
    makeColumn("row_id", "Unique row key so ops can isolate and retry one document without guessing."),
    makeColumn("document_label", "Human-readable label for the document or send group."),
  ];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Controlled Batch Send";
  let summary = "Map recipient order, send a pilot slice first, and isolate failed rows instead of hiding errors inside one giant CSV.";

  if (volume === "medium") {
    columns.push(makeColumn("batch_group", "Useful when ops splits one file into smaller send waves.", false));
    rules.push("Medium-volume sends should keep a batch-group label so pilot rows and retry rows stay traceable.");
    checklist.push("Ops can isolate one send wave without rebuilding the entire CSV.");
    complexity += 1;
  }

  if (volume === "large") {
    columns.push(makeColumn("batch_group", "Required wave label for high-volume sends so retries and approvals stay segmented."));
    rules.push("High-volume sends should be broken into named waves instead of one untracked file.");
    checklist.push("Large sends are segmented into reviewable waves before the main release.");
    complexity += 2;
    plan = "High-Volume Batch Control";
    summary = "Treat large batch sending like an operating lane, not one upload, or row-level failures will contaminate the whole run.";
  }

  if (recipients === "single") {
    columns.push(
      makeColumn("signer_1_name", "Primary signer display name."),
      makeColumn("signer_1_email", "Primary signer email address.")
    );
    checklist.push("Every row clearly identifies the intended signer and only one active signer receives the request.");
  }

  if (recipients === "sequential") {
    columns.push(
      makeColumn("signer_1_name", "First signer display name."),
      makeColumn("signer_1_email", "First signer email address."),
      makeColumn("signer_2_name", "Second signer display name."),
      makeColumn("signer_2_email", "Second signer email address.")
    );
    rules.push("CSV recipient columns must follow the same recipient order as the template sequence.");
    checklist.push("Sequential signers stay in the intended order across every row.");
    complexity += 1;
  }

  if (recipients === "approval") {
    columns.push(
      makeColumn("approver_1_name", "Blocking approver display name."),
      makeColumn("approver_1_email", "Blocking approver email address."),
      makeColumn("signer_1_name", "Signer display name after approval."),
      makeColumn("signer_1_email", "Signer email address after approval.")
    );
    rules.push("Approver columns must be separate from signer columns so the batch never sends the action link to the wrong owner first.");
    checklist.push("Approvers and signers are distinguished clearly in every batch row.");
    complexity += 2;
    plan = "Approval-Gated Batch Send";
    summary = "Separate approver and signer columns early so the batch does not skip governance under volume pressure.";
  }

  if (recipients === "oversight") {
    columns.push(
      makeColumn("signer_1_name", "Primary signer display name."),
      makeColumn("signer_1_email", "Primary signer email address."),
      makeColumn("observer_1_email", "Observer or CC email address."),
      makeColumn("observer_1_name", "Observer label if needed in exported ops views.", false)
    );
    rules.push("Observer columns should never inherit signer privileges or send timing.");
    checklist.push("Signer rows and observer rows stay visibly distinct.");
    complexity += 1;
    plan = "Observed Batch Send";
    summary = "Keep signer columns separate from observer visibility so passive recipients never look like action owners.";
  }

  if (mergeDepth === "none") {
    columns.push(makeColumn("template_name", "Template identifier when the row only changes recipient data.", false));
    rules.push("If the row only changes recipient data, keep document content fixed at the template level.");
  }

  if (mergeDepth === "basic") {
    columns.push(
      makeColumn("client_name", "Basic merge field used inside the document."),
      makeColumn("effective_date", "Row-level start or effective date.")
    );
    checklist.push("Basic placeholders resolve cleanly without forcing operators to edit the document manually.");
    complexity += 1;
  }

  if (mergeDepth === "advanced") {
    columns.push(
      makeColumn("client_name", "Primary merge field for the party or account name."),
      makeColumn("company_name", "Organization name used inside the document."),
      makeColumn("effective_date", "Row-level effective date."),
      makeColumn("amount", "Commercial or billing amount when the template needs row-specific values."),
      makeColumn("owner_name", "Internal owner name or operator variable."),
      makeColumn("renewal_date", "Future renewal date or follow-up marker.")
    );
    rules.push("Advanced merge data should be validated before send so blank placeholders do not produce broken contracts.");
    checklist.push("Every row provides the required merge fields before the send starts.");
    complexity += 2;
    plan = "Dynamic Merge Batch Lane";
    summary = "When document content changes per row, the batch schema matters as much as the template itself.";
  }

  if (variance === "mixed") {
    columns.push(
      makeColumn("locale", "Optional locale override when some rows need different language or copy.", false)
    );
    rules.push("Mixed default and row-driven values need one agreed fallback rule for blank cells.");
    checklist.push("The team knows which values come from the template and which values must be present in the CSV.");
    complexity += 1;
  }

  if (variance === "dynamic") {
    columns.push(
      makeColumn("reply_owner", "Reply destination or owner-of-record for this row."),
      makeColumn("locale", "Locale override when row content changes by market.", false),
      makeColumn("send_after", "Scheduled send timestamp when rows cannot all launch at once.")
    );
    rules.push("Mostly row-driven sends need stricter validation because blank cells cannot safely fall back to template defaults.");
    checklist.push("Reply ownership and send timing can be controlled per row when needed.");
    complexity += 2;
    if (plan !== "Approval-Gated Batch Send") {
      plan = "Dynamic Row Batch Control";
      summary = "When most of the batch is row-driven, template defaults stop protecting you from bad data.";
    }
  }

  if (qa === "sample") {
    columns.push(makeColumn("pilot_row", "Mark the first small sample set before the full wave is released.", false));
    rules.push("Send a pilot slice first so the real template, merge fields, and recipient order are proven before the full batch.");
    checklist.push("The first few rows are checked in production before the main wave goes out.");
    complexity += 1;
  }

  if (qa === "staged") {
    columns.push(makeColumn("approval_stage", "Stage label for legal, ops, or account QA before the wave is released."));
    rules.push("Staged batch approval should block the main wave until the sample rows and schema pass review.");
    checklist.push("A named owner approves the batch before the main wave becomes active.");
    complexity += 2;
    plan = "Staged Batch Release";
    summary = "High-risk batches should move through named review stages instead of one blind upload.";
  }

  if (failures === "skip") {
    rules.push("Skipped rows need a failure log so the team does not assume the whole batch succeeded.");
  }

  if (failures === "stop") {
    rules.push("Critical errors should stop the run when row order or merge integrity would make later rows unsafe.");
    checklist.push("The batch stops when a critical schema mismatch would compromise later sends.");
    complexity += 1;
  }

  if (failures === "retry") {
    columns.push(makeColumn("retry_group", "Retry bucket so failed rows can be resent without rebuilding the successful rows.", false));
    rules.push("Retry mode should isolate failed rows into a clean retry group instead of forcing a full resend.");
    checklist.push("Failed rows can be retried independently from the successful rows.");
    complexity += 2;
    if (volume === "large" || mergeDepth === "advanced") {
      plan = "Retry-Safe Batch Orchestration";
      summary = "At scale, row-level recovery is part of the product, not a backup plan for when the CSV breaks.";
    }
  }

  if (
    volume === "small" &&
    recipients === "single" &&
    mergeDepth === "none" &&
    variance === "fixed" &&
    qa === "none" &&
    failures === "skip"
  ) {
    plan = "Pilot CSV Send Lane";
    summary = "Keep the first batch simple: one signer, one template, and enough row IDs to prove the workflow safely.";
  }

  const uniqueColumns = uniqueItems(columns.map((column) => column.name)).map((name) =>
    columns.find((column) => column.name === name)
  );
  const header = uniqueColumns.map((column) => column.name).join(",");
  const sampleRow = uniqueColumns
    .map((column) => sampleValueMap[column.name] || "sample_value")
    .join(",");
  const csvStarter = `${header}\n${sampleRow}`;
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the batch lane is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one shared CSV starter, one pilot validation step, and one documented retry path. The first release should prove that ${firstObjective.charAt(0).toLowerCase()}${firstObjective.slice(1)}. Keep the batch narrow enough that recipient order, merge fields, and failed rows can all be inspected without rebuilding the whole send.`;

  let offerKey = "audit";
  if (complexity >= 3) {
    offerKey = "sprint";
  }
  if (complexity >= 7 || volume === "large" || qa === "staged" || failures === "retry") {
    offerKey = "workspace";
  }
  if (complexity <= 2 && qa !== "staged" && mergeDepth !== "advanced") {
    offerKey = "audit";
  }

  const offer = batchOfferCatalog[offerKey];

  batchPlanName.textContent = plan;
  batchPlanSummary.textContent = summary;
  batchSchema.innerHTML = renderSchemaCards(uniqueColumns);
  batchRules.innerHTML = asBullets(uniqueRules);
  batchCsvPreview.textContent = csvStarter;
  batchBrief.textContent = brief;
  batchChecklist.innerHTML = asBullets(uniqueChecklist);
  batchOfferName.textContent = offer.label;
  batchOfferNote.textContent = offer.note;
  batchOfferLink.href = offer.link;
  batchOfferLink.textContent = `Open ${offer.label}`;

  copyCsvStarter.dataset.copy = csvStarter;
  copyBatchBrief.dataset.copy = brief;
  copyBatchChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
};

[batchVolume, recipientPattern, mergeFieldDepth, rowVariance, qaGate, failureMode].forEach((input) =>
  input?.addEventListener("input", renderBatchMapper)
);

copyCsvStarter?.addEventListener("click", () => copyBatchText(copyCsvStarter));
copyBatchBrief?.addEventListener("click", () => copyBatchText(copyBatchBrief));
copyBatchChecklist?.addEventListener("click", () => copyBatchText(copyBatchChecklist));

renderBatchMapper();
