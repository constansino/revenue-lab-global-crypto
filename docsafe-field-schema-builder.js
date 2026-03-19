const schemaOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the template path, field names, and renewal metadata still need to be mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when one live template lane already has a clear field model and can be implemented now.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when field inventory, app prefill, lifecycle dates, and several template paths need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const templateSource = document.getElementById("templateSource");
const recipientSchema = document.getElementById("recipientSchema");
const fieldDensity = document.getElementById("fieldDensity");
const prefillSource = document.getElementById("prefillSource");
const metadataDiscipline = document.getElementById("metadataDiscipline");
const renewalTracking = document.getElementById("renewalTracking");

const schemaPlanName = document.getElementById("schemaPlanName");
const schemaPlanSummary = document.getElementById("schemaPlanSummary");
const schemaMethods = document.getElementById("schemaMethods");
const schemaFieldMap = document.getElementById("schemaFieldMap");
const schemaPreview = document.getElementById("schemaPreview");
const schemaRules = document.getElementById("schemaRules");
const schemaBrief = document.getElementById("schemaBrief");
const schemaChecklist = document.getElementById("schemaChecklist");
const schemaOfferName = document.getElementById("schemaOfferName");
const schemaOfferNote = document.getElementById("schemaOfferNote");
const schemaOfferLink = document.getElementById("schemaOfferLink");
const copySchemaPreview = document.getElementById("copySchemaPreview");
const copySchemaBrief = document.getElementById("copySchemaBrief");
const copySchemaChecklist = document.getElementById("copySchemaChecklist");

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

const toTitle = (value) =>
  value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const copySchemaText = async (button) => {
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

const renderFieldCards = (fields) =>
  fields
    .map(
      (field) => `
        <article class="matrix-card">
          <p class="matrix-role">${field.label}</p>
          <strong>${field.key}</strong>
          <p>${field.note}</p>
        </article>
      `
    )
    .join("");

const pushField = (fields, key, label, note) => {
  if (!fields.some((field) => field.key === key)) {
    fields.push({ key, label, note });
  }
};

const renderSchemaBuilder = () => {
  const source = templateSource?.value || "docx";
  const recipients = recipientSchema?.value || "dual";
  const density = fieldDensity?.value || "extended";
  const prefill = prefillSource?.value || "csv";
  const metadata = metadataDiscipline?.value || "standard";
  const renewal = renewalTracking?.value || "end";

  const methods = [];
  const fields = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Standardized Contract Schema";
  let summary = "Name fields once, align them with prefill inputs, and keep lifecycle dates queryable before the template spreads across ops.";

  pushField(fields, "customer_name", "Core party field", "Primary customer or counterparty name used across template, filters, and exports.");
  pushField(fields, "signer_1_email", "Recipient field", "Primary signer email used for sends, reminders, and joins back to source data.");

  if (source === "pdf") {
    methods.push("PDF text tags");
    rules.push("PDF tag labels should be stabilized before the template is reused, or later CSV and API mappings will drift.");
    complexity += 1;
  }

  if (source === "docx") {
    methods.push("DOCX variables");
    rules.push("DOCX variables should use stable names because merge keys become part of the recurring workflow.");
    complexity += 1;
  }

  if (source === "html") {
    methods.push("HTML field tags");
    rules.push("HTML field tags let the team control field labels and required rules directly, so naming discipline matters even more.");
    complexity += 1;
  }

  if (source === "live") {
    methods.push("Fields API inventory");
    rules.push("Existing live templates should be inventoried before editing fields so updates do not break downstream automation.");
    checklist.push("The team can inspect the current field inventory before changing the live template.");
    complexity += 2;
    plan = "Live Template Field Inventory";
    summary = "Inventory existing fields before editing live templates so hidden label drift does not break production sends.";
  }

  if (recipients === "single") {
    pushField(fields, "signer_1_name", "Recipient field", "Primary signer name for the only active signing role.");
  }

  if (recipients === "dual") {
    pushField(fields, "signer_1_name", "Recipient field", "First signer name for the customer or first party.");
    pushField(fields, "signer_2_name", "Recipient field", "Second signer name for counterparty or internal co-signer.");
    pushField(fields, "signer_2_email", "Recipient field", "Second signer email used in dual-party template distribution.");
    complexity += 1;
  }

  if (recipients === "sequential") {
    pushField(fields, "signer_1_name", "Recipient field", "First signer name for the first active signature step.");
    pushField(fields, "signer_2_name", "Recipient field", "Second signer name for the delayed sequential step.");
    pushField(fields, "signer_2_email", "Recipient field", "Second signer email used only after earlier signature stages complete.");
    rules.push("Sequential recipient roles should be reflected in field names so batch sends and reminders can target the right owner.");
    complexity += 2;
  }

  if (recipients === "approval") {
    pushField(fields, "approver_name", "Approval field", "Blocking approver name used before the signing stage begins.");
    pushField(fields, "approver_email", "Approval field", "Blocking approver email used for approval-stage notifications.");
    pushField(fields, "signer_1_name", "Recipient field", "Signer name activated only after approval.");
    pushField(fields, "signer_1_email", "Recipient field", "Signer email aligned to the post-approval send.");
    rules.push("Approval roles should have their own stable field keys rather than being disguised as signer fields.");
    complexity += 2;
    plan = "Approval-Aware Field Schema";
    summary = "Separate approval and signing fields early so the template can support governance without renaming everything later.";
  }

  if (density === "core") {
    pushField(fields, "effective_date", "Date field", "Start or signature-effective date when the template only needs the essentials.");
  }

  if (density === "extended") {
    pushField(fields, "effective_date", "Date field", "Core effective date used by contract operations and renewal timing.");
    pushField(fields, "contract_value", "Commercial field", "Commercial amount or fee when contracts need more than identity data.");
    pushField(fields, "signer_title", "Role field", "Position or title that validates authority on standard contracts.");
    complexity += 1;
  }

  if (density === "form") {
    pushField(fields, "effective_date", "Date field", "Core effective date used by the wider packet.");
    pushField(fields, "contract_value", "Commercial field", "Commercial amount or package value.");
    pushField(fields, "signer_title", "Role field", "Position or title for authority checks.");
    pushField(fields, "delivery_location", "Form field", "Location or routing value needed in operational forms.");
    pushField(fields, "tax_identifier", "Compliance field", "Tax or entity identifier used in heavier packets.");
    pushField(fields, "address_line_1", "Address field", "Address detail used when the form packet carries identity or legal notices.");
    rules.push("Form-heavy packets need grouped field naming because ad hoc labels become unmanageable after the first version.");
    complexity += 2;
    plan = "Form-Heavy Document Schema";
    summary = "When the template is more than a signature sheet, field grouping and naming rules become part of the product.";
  }

  if (prefill === "none") {
    rules.push("Manual-only field entry still needs stable labels so templates can be audited and evolved safely.");
  }

  if (prefill === "csv") {
    methods.push("CSV or CRM export");
    pushField(fields, "external_row_id", "Source key", "Source row identifier so document data can be traced back to the CSV or CRM export.");
    rules.push("Prefill keys should line up with CSV column names so operators do not rebuild mappings for every batch.");
    checklist.push("CSV or CRM export columns match the chosen field keys before the first batch goes live.");
    complexity += 1;
  }

  if (prefill === "api") {
    methods.push("API prefill");
    pushField(fields, "external_record_id", "Source key", "Source system ID used to sync template data with an app or CRM.");
    pushField(fields, "schema_version", "Control field", "Schema version marker so API consumers know which field model they are targeting.");
    rules.push("API-prefilled templates need stable field keys and versioning so app integrations survive schema changes.");
    checklist.push("The app or API payload can prefill the chosen field keys without ad hoc translation logic.");
    complexity += 2;
    plan = "API-Synced Field Schema";
    summary = "Once app data is prefilling documents, field keys and schema versions become part of the integration contract.";
  }

  if (metadata === "labels") {
    rules.push("Label-only templates are faster to start, but they will be harder to filter and evolve once volume increases.");
  }

  if (metadata === "standard") {
    methods.push("Standard external keys");
    checklist.push("Human-readable labels and stable external field keys are both documented before rollout.");
    complexity += 1;
  }

  if (metadata === "lifecycle") {
    methods.push("Lifecycle keys");
    pushField(fields, "document_status", "Lifecycle field", "Current document state used for filtering and ops reporting.");
    pushField(fields, "renewal_owner", "Lifecycle field", "Owner responsible when the document reaches renewal or review boundaries.");
    rules.push("Lifecycle filtering needs dedicated keys instead of burying status and dates inside free-text fields.");
    checklist.push("Lifecycle states and owners are queryable without reading the full document body.");
    complexity += 2;
    plan = "Lifecycle-Tracked Schema";
    summary = "If the business needs to filter and renew documents later, lifecycle fields must be designed up front.";
  }

  if (renewal === "none") {
    rules.push("If renewal is not tracked in the template, the team still needs a separate system for contract end-state visibility.");
  }

  if (renewal === "end") {
    pushField(fields, "end_date", "Lifecycle date", "Contract or document end date used for expiry and follow-up timing.");
    checklist.push("The template has a dedicated end_date field instead of hiding contract expiry in free text.");
    complexity += 1;
  }

  if (renewal === "full") {
    pushField(fields, "start_date", "Lifecycle date", "Contract start date for lifecycle reporting.");
    pushField(fields, "end_date", "Lifecycle date", "Contract end date for expiry and renewal tracking.");
    pushField(fields, "renewal_date", "Lifecycle date", "Renewal or review date used before the contract actually ends.");
    rules.push("Renewal-ready templates need separate start, end, and renewal dates so ops can follow the lifecycle without parsing prose.");
    checklist.push("Start, end, and renewal dates are separate fields that support reminder and renewal workflows.");
    complexity += 2;
    plan = "Renewal-Tracked Schema";
    summary = "Use dedicated lifecycle dates when the template needs to support renewals, reminders, and later filtering.";
  }

  const uniqueMethods = uniqueItems(methods);
  const uniqueFields = fields;
  const previewLines = [];

  if (source === "pdf") {
    previewLines.push("Customer Name | role=Signer1 | type=text");
    previewLines.push("Effective Date | role=Signer1 | type=date");
    if (renewal !== "none") {
      previewLines.push(`${toTitle(renewal === "full" ? "renewal_date" : "end_date")} | role=Signer1 | type=date`);
    }
  }

  if (source === "docx") {
    previewLines.push("[[customer_name]]");
    previewLines.push("[[effective_date]]");
    if (renewal === "end") {
      previewLines.push("[[end_date]]");
    }
    if (renewal === "full") {
      previewLines.push("[[start_date]]");
      previewLines.push("[[end_date]]");
      previewLines.push("[[renewal_date]]");
    }
    previewLines.push("{{signature}}");
  }

  if (source === "html") {
    previewLines.push('<text-field name="Customer Name" role="First Party" required="true"></text-field>');
    previewLines.push('<text-field name="Effective Date" role="First Party" required="true"></text-field>');
    if (renewal !== "none") {
      previewLines.push(`<text-field name="${renewal === "full" ? "Renewal Date" : "End Date"}" role="First Party" required="false"></text-field>`);
    }
  }

  if (source === "live") {
    previewLines.push("GET /api/v1/documents/{id}/fields");
    previewLines.push("Map existing field labels to stable external keys");
    if (prefill !== "none") {
      previewLines.push("Align external keys with CSV or API payload names");
    }
  }

  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the field schema is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one standard field map, one chosen template path, and one documented prefill rule. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the schema narrow enough that field labels, merge keys, and lifecycle dates can be updated without breaking the send and renewal lanes.`;

  let offerKey = "audit";
  if (complexity >= 3) {
    offerKey = "sprint";
  }
  if (complexity >= 7 || source === "live" || prefill === "api" || metadata === "lifecycle") {
    offerKey = "workspace";
  }
  if (complexity <= 2 && source !== "live" && prefill !== "api") {
    offerKey = "audit";
  }

  const offer = schemaOfferCatalog[offerKey];

  schemaPlanName.textContent = plan;
  schemaPlanSummary.textContent = summary;
  schemaMethods.innerHTML = uniqueMethods.length
    ? uniqueMethods.map((method) => `<span class="stack-chip">${method}</span>`).join("")
    : '<span class="stack-chip">Map fields first</span>';
  schemaFieldMap.innerHTML = renderFieldCards(uniqueFields);
  schemaPreview.textContent = previewLines.join("\n");
  schemaRules.innerHTML = asBullets(uniqueRules);
  schemaBrief.textContent = brief;
  schemaChecklist.innerHTML = asBullets(uniqueChecklist);
  schemaOfferName.textContent = offer.label;
  schemaOfferNote.textContent = offer.note;
  schemaOfferLink.href = offer.link;
  schemaOfferLink.textContent = `Open ${offer.label}`;

  copySchemaPreview.dataset.copy = previewLines.join("\n");
  copySchemaBrief.dataset.copy = brief;
  copySchemaChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
};

[templateSource, recipientSchema, fieldDensity, prefillSource, metadataDiscipline, renewalTracking].forEach((input) =>
  input?.addEventListener("input", renderSchemaBuilder)
);

copySchemaPreview?.addEventListener("click", () => copySchemaText(copySchemaPreview));
copySchemaBrief?.addEventListener("click", () => copySchemaText(copySchemaBrief));
copySchemaChecklist?.addEventListener("click", () => copySchemaText(copySchemaChecklist));

renderSchemaBuilder();
