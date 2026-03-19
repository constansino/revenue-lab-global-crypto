const webhookOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs the webhook receiver, routing keys, and downstream write path mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the buyer already knows the source system, downstream target, and the first webhook route to implement.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when fan-out routing, archive sync, retry control, and multi-system observability need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const eventScope = document.getElementById("eventScope");
const identityMode = document.getElementById("identityMode");
const destinationMode = document.getElementById("destinationMode");
const securityMode = document.getElementById("securityMode");
const retryMode = document.getElementById("retryMode");
const artifactMode = document.getElementById("artifactMode");

const routePlanName = document.getElementById("routePlanName");
const routePlanSummary = document.getElementById("routePlanSummary");
const routeMethods = document.getElementById("routeMethods");
const routeStageMap = document.getElementById("routeStageMap");
const routeKeyMap = document.getElementById("routeKeyMap");
const routePreview = document.getElementById("routePreview");
const routeRules = document.getElementById("routeRules");
const routeBrief = document.getElementById("routeBrief");
const routeChecklist = document.getElementById("routeChecklist");
const routeOfferName = document.getElementById("routeOfferName");
const routeOfferNote = document.getElementById("routeOfferNote");
const routeOfferLink = document.getElementById("routeOfferLink");
const copyRoutePreview = document.getElementById("copyRoutePreview");
const copyRouteBrief = document.getElementById("copyRouteBrief");
const copyRouteChecklist = document.getElementById("copyRouteChecklist");

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

const copyRouteText = async (button) => {
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

const renderWebhookRouter = () => {
  const selectedEventScope = eventScope?.value || "complete";
  const selectedIdentityMode = identityMode?.value || "external";
  const selectedDestinationMode = destinationMode?.value || "crm";
  const selectedSecurityMode = securityMode?.value || "verify";
  const selectedRetryMode = retryMode?.value || "capped";
  const selectedArtifactMode = artifactMode?.value || "pdf";

  const methods = ["Canonical webhook receiver"];
  const stages = [];
  const keys = [];
  const rules = [];
  const checklist = [
    "One canonical receiver exists before the webhook payload fans out to business systems.",
  ];

  let complexity = 0;
  let plan = "Verified Completion Route";
  let summary =
    "Resolve one external record, verify vendor state once, and write only completion-safe actions into the source system.";

  pushCard(
    stages,
    "Inbound receiver",
    "Route stage",
    "Accept one vendor event, normalize it, and keep business logic out of the public webhook endpoint."
  );
  pushCard(
    keys,
    "event_type",
    "Event key",
    "Canonical event name used to route completion, decline, or expiry logic."
  );
  pushCard(
    keys,
    "submission_id",
    "Submission key",
    "Stable submission or document instance identifier used for idempotency and replay control."
  );
  pushCard(
    keys,
    "received_at",
    "Timing key",
    "Receiver timestamp used for observability, deduping, and replay review."
  );

  if (selectedEventScope === "complete") {
    methods.push("Completion event routing");
    pushCard(
      stages,
      "Completion write",
      "Business stage",
      "Only completion-safe actions can update the downstream system in phase one."
    );
    pushCard(
      keys,
      "completed_at",
      "Lifecycle key",
      "Completion timestamp used to prove when the downstream write became valid."
    );
    rules.push(
      "Completion-only routes should avoid sending draft or viewed states into downstream billing, archive, or renewal logic."
    );
    checklist.push(
      "Only the completion-safe event can create downstream side effects in phase one."
    );
  }

  if (selectedEventScope === "lifecycle") {
    methods.push("Lifecycle status sync");
    pushCard(
      stages,
      "Status transition sync",
      "Business stage",
      "Track state changes without letting every transition trigger the same downstream mutation."
    );
    pushCard(
      keys,
      "status",
      "Lifecycle key",
      "Normalized document or submission state used to route downstream logic."
    );
    pushCard(
      keys,
      "viewed_at",
      "Lifecycle key",
      "Optional view timestamp used when ops wants to separate seen from signed."
    );
    rules.push(
      "Lifecycle routes need explicit state handling so viewed, completed, and expired events do not collapse into one path."
    );
    complexity += 1;
    plan = "Lifecycle Status Route";
    summary =
      "Normalize status transitions once so downstream systems can react without treating every event like a completion.";
  }

  if (selectedEventScope === "decline") {
    methods.push("Decline handling");
    pushCard(
      stages,
      "Decline branch",
      "Business stage",
      "Move failed signatures into an actionable path instead of leaving operations with a dead-end status."
    );
    pushCard(
      keys,
      "decline_reason",
      "Failure key",
      "Reason captured when a submission is declined and needs human follow-up."
    );
    rules.push(
      "Decline-aware routes should preserve the reason and owner instead of collapsing every failure into a generic not-signed status."
    );
    checklist.push(
      "A decline event can create an actionable downstream task with the reason preserved."
    );
    complexity += 1;
    plan = "Decline-Aware Route";
    summary =
      "Treat declines as a first-class downstream event so the buyer can recover the record instead of losing context.";
  }

  if (selectedEventScope === "full") {
    methods.push("Lifecycle status sync", "Decline and expiry handling");
    pushCard(
      stages,
      "Status transition sync",
      "Business stage",
      "Track completion, decline, and expiry without forcing one event contract to do every job."
    );
    pushCard(
      stages,
      "Exception branch",
      "Failure stage",
      "Send declines and expiries into a separate recovery or follow-up path."
    );
    pushCard(
      keys,
      "status",
      "Lifecycle key",
      "Normalized state used to route multi-event workflows."
    );
    pushCard(
      keys,
      "decline_reason",
      "Failure key",
      "Reason captured when the signer refuses or cannot complete the flow."
    );
    pushCard(
      keys,
      "expires_at",
      "Lifecycle key",
      "Expiry boundary used when routing stalled records into a renewal or recovery process."
    );
    rules.push(
      "Full lifecycle routes should separate success, failure, and expiry logic so one payload consumer does not own every downstream write."
    );
    checklist.push(
      "Success, decline, and expiry routes are distinct enough that each has a clear downstream owner."
    );
    complexity += 2;
    plan = "Full Lifecycle Event Route";
    summary =
      "Separate success, failure, and expiry handling before the workflow starts mutating several systems with one brittle consumer.";
  }

  if (selectedIdentityMode === "email") {
    methods.push("Email identity join");
    pushCard(
      keys,
      "signer_email",
      "Identity key",
      "Signer email used as the only downstream lookup key."
    );
    rules.push(
      "Email-only joins are easy to start with, but they drift when aliases, shared inboxes, or multi-record customers appear."
    );
  }

  if (selectedIdentityMode === "external") {
    methods.push("External record ID");
    pushCard(
      stages,
      "Record resolution",
      "Identity stage",
      "Resolve the target record from an external ID instead of trying to infer ownership from email or labels."
    );
    pushCard(
      keys,
      "external_record_id",
      "Identity key",
      "Stable business record ID used to update the correct CRM, HR, SIS, or deal record."
    );
    pushCard(
      keys,
      "schema_version",
      "Control key",
      "Version marker used when the receiving system needs to know which payload contract it is parsing."
    );
    checklist.push(
      "The receiving system can resolve the correct record from an external_record_id without manual lookup."
    );
    complexity += 1;
  }

  if (selectedIdentityMode === "hidden") {
    methods.push("Hidden routing fields");
    pushCard(
      stages,
      "Hidden record resolution",
      "Identity stage",
      "Use hidden prefilled identifiers so the receiver can route the event even when visible form labels change."
    );
    pushCard(
      keys,
      "hidden_record_id",
      "Identity key",
      "Hidden record identifier injected upstream so post-processing can target the exact downstream record."
    );
    pushCard(
      keys,
      "tenant_id",
      "Tenant key",
      "Tenant or workspace boundary used when the same receiver serves several buyers or lanes."
    );
    rules.push(
      "Hidden routing fields are useful when downstream systems need stable IDs that should not be edited or exposed in the signing UI."
    );
    checklist.push(
      "A hidden routing field is prefilled before send so the webhook never has to guess the target record."
    );
    complexity += 2;
    plan = "Hidden-ID Webhook Route";
    summary =
      "Inject hidden record IDs upstream so the receiving system can resolve the correct record even when visible field labels change.";
  }

  if (selectedIdentityMode === "fieldmap") {
    methods.push("Field identifier map");
    pushCard(
      stages,
      "Field value disambiguation",
      "Identity stage",
      "Map repeated radio, checkbox, or form values through stable identifiers instead of depending on duplicated labels."
    );
    pushCard(
      keys,
      "field_identifier",
      "Identity key",
      "Stable field identifier used when repeated yes or no options would otherwise look identical in the payload."
    );
    pushCard(
      keys,
      "option_identifier",
      "Identity key",
      "Option-level identifier used when checkbox or radio groups need reliable downstream mapping."
    );
    rules.push(
      "Complicated forms need stable field identifiers because duplicated visible labels are not enough for safe API or webhook routing."
    );
    checklist.push(
      "Repeated radio and checkbox values can be distinguished without relying on visible labels alone."
    );
    complexity += 2;
    plan = "Field-Identifier Event Route";
    summary =
      "Give complicated forms stable machine identifiers before the webhook consumer has to interpret several identical answers.";
  }

  if (selectedDestinationMode === "crm") {
    methods.push("CRM update");
    pushCard(
      stages,
      "CRM mutation",
      "Destination stage",
      "Write the minimal state change back to the system of record after the event is verified."
    );
    checklist.push(
      "One target system of record is updated in a bounded write path before more destinations are added."
    );
    complexity += 1;
  }

  if (selectedDestinationMode === "archive") {
    methods.push("CRM update", "Archive sync");
    pushCard(
      stages,
      "Archive handoff",
      "Destination stage",
      "Push the signed file package into archive or storage without tying the receiver to human inbox handling."
    );
    pushCard(
      keys,
      "archive_path",
      "Destination key",
      "Canonical archive destination or storage target used for signed file handoff."
    );
    checklist.push(
      "The signed artifact lands in the archive path the buyer actually uses after completion."
    );
    complexity += 1;
  }

  if (selectedDestinationMode === "ops") {
    methods.push("CRM update", "Ops alerting");
    pushCard(
      stages,
      "Ops alert",
      "Destination stage",
      "Send actionable notifications when the event requires human review, recovery, or follow-up."
    );
    pushCard(
      keys,
      "owner_email",
      "Destination key",
      "Responsible owner or queue used when the event needs operational follow-up."
    );
    pushCard(
      keys,
      "escalation_channel",
      "Destination key",
      "Slack, email, or ticket destination used for downstream exceptions."
    );
    checklist.push(
      "Ops alerts land in the correct queue instead of staying trapped inside the vendor dashboard."
    );
    complexity += 1;
  }

  if (selectedDestinationMode === "fanout") {
    methods.push("Fan-out router", "Normalized payload contract");
    pushCard(
      stages,
      "Fan-out router",
      "Destination stage",
      "Normalize the event once, then dispatch the same internal contract to CRM, archive, and ops subscribers."
    );
    pushCard(
      keys,
      "subscriber_key",
      "Destination key",
      "Internal routing selector used when several subscribers consume the same normalized event."
    );
    rules.push(
      "If more than one destination needs the same event, normalize once and fan out internally instead of coupling several business systems to raw vendor webhook formats."
    );
    checklist.push(
      "One normalized internal payload can fan out to every downstream subscriber without re-parsing the raw webhook."
    );
    complexity += 2;
    plan = "Fan-Out Event Router";
    summary =
      "Normalize once, then route the same event into each downstream system without binding business logic to the vendor payload shape.";
  }

  if (selectedSecurityMode === "secret") {
    methods.push("Secret URL hardening");
    rules.push(
      "A secret webhook URL reduces noise, but it is not enough by itself when the downstream write changes high-value business records."
    );
  }

  if (selectedSecurityMode === "signed") {
    methods.push("Signed request verification");
    pushCard(
      keys,
      "signature_header",
      "Security key",
      "Request signature or verification header used to prove the request origin."
    );
    rules.push(
      "Signed requests should be verified before any downstream mutation so a spoofed call cannot create false state changes."
    );
    checklist.push(
      "Signature verification passes before any downstream write, file fetch, or alert is triggered."
    );
    complexity += 1;
  }

  if (selectedSecurityMode === "verify") {
    methods.push("API state verification");
    pushCard(
      stages,
      "Verification lookup",
      "Security stage",
      "Confirm the current submission or document state with the vendor API before changing downstream records."
    );
    pushCard(
      keys,
      "vendor_lookup_id",
      "Security key",
      "Lookup key used to re-check current vendor state before applying side effects."
    );
    pushCard(
      keys,
      "verified_status",
      "Security key",
      "Verified status captured after the receiver confirms the current state with the vendor API."
    );
    rules.push(
      "Webhook consumers that verify current vendor state can contain replay, spoofing, or stale payload risk before touching the system of record."
    );
    checklist.push(
      "The receiver can verify the current vendor state before mutating the downstream record."
    );
    complexity += 2;
    if (plan === "Verified Completion Route" || plan === "Lifecycle Status Route") {
      plan = "Verified State Route";
      summary =
        "Verify current vendor state before every downstream mutation so the receiver does not trust stale or spoofed webhook payloads.";
    }
  }

  if (selectedRetryMode === "basic") {
    rules.push(
      "Vendor default retries without clear caps or backoff can overload the receiver if downstream writes fail or return a client error."
    );
  }

  if (selectedRetryMode === "capped") {
    methods.push("Retry cap and backoff");
    pushCard(
      keys,
      "delivery_attempt",
      "Resilience key",
      "Attempt counter used to stop endless retries and track whether the route is burning capacity."
    );
    checklist.push(
      "Retry attempts have a clear cap and backoff policy before the route goes live."
    );
    complexity += 1;
  }

  if (selectedRetryMode === "queue") {
    methods.push("Queue and dead-letter lane");
    pushCard(
      stages,
      "Failure queue",
      "Resilience stage",
      "Acknowledge fast, then move expensive writes and file sync into a queue-backed worker with a dead-letter path."
    );
    pushCard(
      keys,
      "dedupe_key",
      "Resilience key",
      "Event dedupe key used to keep replay or retry storms from duplicating downstream actions."
    );
    pushCard(
      keys,
      "retry_after",
      "Resilience key",
      "Backoff timing key used when retries are handled by an internal queue or worker layer."
    );
    rules.push(
      "Queue-backed routes should acknowledge quickly, cap retries, and send poison events into a dead-letter lane instead of retrying forever."
    );
    checklist.push(
      "A dead-letter lane exists for events that cannot be processed safely after the retry budget is exhausted."
    );
    complexity += 2;
    plan = "Queued Event Router";
    summary =
      "Acknowledge fast, isolate expensive writes in workers, and keep poison events out of the hot path before they bloat logs or databases.";
  }

  if (selectedArtifactMode === "metadata") {
    rules.push(
      "Metadata-only routes should avoid fetching signed files unless a downstream archive or customer-facing system actually needs them."
    );
  }

  if (selectedArtifactMode === "pdf") {
    methods.push("Signed PDF fetch");
    pushCard(
      stages,
      "Signed PDF handoff",
      "Artifact stage",
      "Fetch and deliver the signed PDF only after the event is verified and the receiving system is ready to store it."
    );
    pushCard(
      keys,
      "signed_pdf_url",
      "Artifact key",
      "Signed file URL or fetch handle used when the buyer needs the executed PDF downstream."
    );
    checklist.push(
      "The signed PDF can be fetched and stored without blocking the public receiver path."
    );
    complexity += 1;
  }

  if (selectedArtifactMode === "packet") {
    methods.push("Signed packet archive", "Audit trail sync");
    pushCard(
      stages,
      "Signed packet handoff",
      "Artifact stage",
      "Move the signed PDF, audit trail, and related metadata into the right archive or case folder."
    );
    pushCard(
      keys,
      "signed_pdf_url",
      "Artifact key",
      "Signed file URL used to fetch the completed document for archive or downstream delivery."
    );
    pushCard(
      keys,
      "audit_trail_url",
      "Artifact key",
      "Audit trail or evidence artifact used for compliance, archive, or dispute handling."
    );
    rules.push(
      "If the buyer needs a full signed packet, fetch and archive the evidence set deliberately instead of attaching file sync to every low-value event."
    );
    checklist.push(
      "The signed PDF and audit trail both land in the target archive with the correct record link."
    );
    complexity += 2;
    if (plan !== "Queued Event Router") {
      plan = "Signed Packet Route";
      summary =
        "Fetch the signed PDF and audit trail deliberately so archive and compliance systems inherit a complete packet instead of partial evidence.";
    }
  }

  if (
    selectedDestinationMode === "fanout" &&
    selectedRetryMode === "queue"
  ) {
    plan = "Queued Fan-Out Event Router";
    summary =
      "Normalize once, verify once, then fan out through queue-backed workers so one bad subscriber cannot poison every downstream system.";
  }

  if (
    selectedIdentityMode === "hidden" &&
    selectedSecurityMode === "verify"
  ) {
    plan = "Verified Hidden-ID Route";
    summary =
      "Resolve the exact target record from hidden routing IDs and verify current vendor state before any downstream mutation happens.";
  }

  if (
    selectedIdentityMode === "fieldmap" &&
    selectedEventScope === "full"
  ) {
    plan = "Full Lifecycle Identifier Route";
    summary =
      "Use stable field identifiers across success, decline, and expiry flows so complicated forms remain mappable after go-live.";
  }

  const destinations = [];
  if (selectedDestinationMode === "crm") {
    destinations.push("crm_update");
  }
  if (selectedDestinationMode === "archive") {
    destinations.push("crm_update", "archive_sync");
  }
  if (selectedDestinationMode === "ops") {
    destinations.push("crm_update", "ops_alert");
  }
  if (selectedDestinationMode === "fanout") {
    destinations.push("crm_update", "archive_sync", "ops_alert");
  }

  const artifacts = [];
  if (selectedArtifactMode === "metadata") {
    artifacts.push("metadata_only");
  }
  if (selectedArtifactMode === "pdf") {
    artifacts.push("signed_pdf");
  }
  if (selectedArtifactMode === "packet") {
    artifacts.push("signed_pdf", "audit_trail");
  }

  const preview = {
    event_type:
      selectedEventScope === "complete"
        ? "completion_event"
        : selectedEventScope === "lifecycle"
          ? "lifecycle_event"
          : selectedEventScope === "decline"
            ? "decline_event"
            : "full_lifecycle_event",
    submission_id: "sub_12345",
    identity_key:
      selectedIdentityMode === "email"
        ? "signer_email"
        : selectedIdentityMode === "external"
          ? "external_record_id"
          : selectedIdentityMode === "hidden"
            ? "hidden_record_id"
            : "field_identifier_map",
    destinations,
    security:
      selectedSecurityMode === "secret"
        ? "secret_url_only"
        : selectedSecurityMode === "signed"
          ? "signed_request_check"
          : "verify_current_state_with_api",
    retry_policy:
      selectedRetryMode === "basic"
        ? "vendor_default"
        : selectedRetryMode === "capped"
          ? "capped_backoff"
          : "queue_with_dead_letter",
    artifacts,
  };

  if (selectedIdentityMode === "external") {
    preview.external_record_id = "deal_4821";
    preview.schema_version = "v1";
  }

  if (selectedIdentityMode === "hidden") {
    preview.hidden_record_id = "student_2049";
    preview.tenant_id = "district_ops";
  }

  if (selectedIdentityMode === "fieldmap") {
    preview.field_identifier_map = {
      consent_yes: true,
      pickup_required: false,
    };
  }

  if (selectedSecurityMode === "signed") {
    preview.signature_header = "sha256=...";
  }

  if (selectedSecurityMode === "verify") {
    preview.verified_status = "completed";
  }

  if (selectedEventScope === "decline" || selectedEventScope === "full") {
    preview.decline_reason = "placeholder_reason";
  }

  if (selectedArtifactMode === "pdf" || selectedArtifactMode === "packet") {
    preview.signed_pdf_url = "https://example.com/signed.pdf";
  }

  if (selectedArtifactMode === "packet") {
    preview.audit_trail_url = "https://example.com/audit-trail.pdf";
  }

  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const previewText = JSON.stringify(preview, null, 2);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the webhook route is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one canonical receiver, one stable routing identity, and one bounded downstream write path. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the route narrow enough that retries, signatures, and file-sync steps can fail without corrupting the source system.`;

  let offerKey = "audit";
  if (complexity >= 3) {
    offerKey = "sprint";
  }
  if (
    complexity >= 8 ||
    selectedDestinationMode === "fanout" ||
    selectedRetryMode === "queue" ||
    selectedArtifactMode === "packet" ||
    (selectedIdentityMode === "hidden" && selectedSecurityMode !== "secret")
  ) {
    offerKey = "workspace";
  }
  if (
    complexity <= 2 &&
    selectedSecurityMode === "secret" &&
    selectedArtifactMode === "metadata" &&
    selectedDestinationMode !== "fanout"
  ) {
    offerKey = "audit";
  }

  const offer = webhookOfferCatalog[offerKey];

  routePlanName.textContent = plan;
  routePlanSummary.textContent = summary;
  routeMethods.innerHTML = uniqueMethods.length
    ? uniqueMethods.map((method) => `<span class="stack-chip">${method}</span>`).join("")
    : '<span class="stack-chip">Route events first</span>';
  routeStageMap.innerHTML = renderCards(stages);
  routeKeyMap.innerHTML = renderCards(keys);
  routePreview.textContent = previewText;
  routeRules.innerHTML = asBullets(uniqueRules);
  routeBrief.textContent = brief;
  routeChecklist.innerHTML = asBullets(uniqueChecklist);
  routeOfferName.textContent = offer.label;
  routeOfferNote.textContent = offer.note;
  routeOfferLink.href = offer.link;
  routeOfferLink.textContent = `Open ${offer.label}`;

  copyRoutePreview.dataset.copy = previewText;
  copyRouteBrief.dataset.copy = brief;
  copyRouteChecklist.dataset.copy = uniqueChecklist
    .map((item) => `- ${item}`)
    .join("\n");
};

[eventScope, identityMode, destinationMode, securityMode, retryMode, artifactMode].forEach((input) =>
  input?.addEventListener("input", renderWebhookRouter)
);

copyRoutePreview?.addEventListener("click", () => copyRouteText(copyRoutePreview));
copyRouteBrief?.addEventListener("click", () => copyRouteText(copyRouteBrief));
copyRouteChecklist?.addEventListener("click", () => copyRouteText(copyRouteChecklist));

renderWebhookRouter();
