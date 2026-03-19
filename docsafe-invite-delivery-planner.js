const inviteOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs its sender boundary, observer policy, and delivery evidence model mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the buyer already knows the main sender, reply, and observer path and needs the outbound mail lane implemented cleanly.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when branded sender identity, tenant-safe replies, observer routing, delivery visibility, and SMTP controls need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const inviteSurface = document.getElementById("inviteSurface");
const senderIdentity = document.getElementById("senderIdentity");
const transportMode = document.getElementById("transportMode");
const observerMode = document.getElementById("observerMode");
const responseOwner = document.getElementById("responseOwner");
const deliveryEvidence = document.getElementById("deliveryEvidence");

const invitePlanName = document.getElementById("invitePlanName");
const invitePlanSummary = document.getElementById("invitePlanSummary");
const inviteMethods = document.getElementById("inviteMethods");
const inviteMap = document.getElementById("inviteMap");
const invitePreview = document.getElementById("invitePreview");
const inviteRules = document.getElementById("inviteRules");
const inviteBrief = document.getElementById("inviteBrief");
const inviteChecklist = document.getElementById("inviteChecklist");
const inviteOfferName = document.getElementById("inviteOfferName");
const inviteOfferNote = document.getElementById("inviteOfferNote");
const inviteOfferLink = document.getElementById("inviteOfferLink");
const copyInvitePreview = document.getElementById("copyInvitePreview");
const copyInviteBrief = document.getElementById("copyInviteBrief");
const copyInviteChecklist = document.getElementById("copyInviteChecklist");

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

const copyInviteText = async (button) => {
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

const renderInviteDeliveryPlanner = () => {
  const selectedSurface = inviteSurface?.value || "client";
  const selectedSender = senderIdentity?.value || "customfrom";
  const selectedTransport = transportMode?.value || "env";
  const selectedObserver = observerMode?.value || "completion";
  const selectedResponse = responseOwner?.value || "shared";
  const selectedEvidence = deliveryEvidence?.value || "webhook";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Branded Shared Inbox Sender";
  let summary =
    "Use a visible branded sender, keep SMTP config reproducible outside the UI, route replies to a monitored shared inbox, and record outbound delivery in one audit path.";

  pushCard(
    map,
    "Sender boundary",
    "Invite stage",
    "One mail boundary should explain which address appears to recipients, which mailbox receives replies, and how operators verify that the invite actually left the system."
  );

  if (selectedSurface === "client") {
    methods.push("Client-facing invite lane");
    pushCard(
      map,
      "Brand invite lane",
      "Surface stage",
      "Client-facing invites need sender identity and reply routing that feel owned by the buyer instead of a generic relay."
    );
    checklist.push(
      "Client-facing invites match the portal or client brand instead of exposing an unrelated mailbox identity."
    );
    complexity += 2;
  }

  if (selectedSurface === "internal") {
    methods.push("Internal ops invite lane");
    checklist.push(
      "Internal operators and external signers are not forced through one anonymous sender profile."
    );
    complexity += 1;
  }

  if (selectedSurface === "tenant") {
    methods.push("Tenant-distributed template lane");
    pushCard(
      map,
      "Tenant ownership lane",
      "Surface stage",
      "Tenant-distributed templates need sender and reply ownership that stay attached to the tenant instead of the original author."
    );
    checklist.push(
      "Template distribution preserves tenant sender and reply ownership instead of inheriting the original author by accident."
    );
    complexity += 2;
    plan = "Tenant-Safe Reply Route";
    summary =
      "Keep From and Reply-To attached to the right tenant so cloned templates, branded mail, and response ownership do not drift back to the original author.";
  }

  if (selectedSurface === "regulated") {
    methods.push("Regulated notice lane");
    pushCard(
      map,
      "Legal notice lane",
      "Surface stage",
      "Regulated sends need stronger observer policy, traceability, and reply handling because the invite itself can carry legal meaning."
    );
    checklist.push(
      "Invite observers, sender identity, and reply handling reflect the legal or compliance obligations of the workflow."
    );
    complexity += 3;
    plan = "Regulated Verified Mail Path";
    summary =
      "Use a stricter mail lane so regulated or legal-notice invites preserve sender trust, observer routing, and delivery evidence together.";
  }

  if (selectedSender === "workspace") {
    methods.push("Workspace default sender");
    rules.push(
      "Workspace-default sender identity is acceptable only when one team owns all replies and there is no tenant or client-specific mailbox expectation."
    );
    complexity += 1;
  }

  if (selectedSender === "customfrom") {
    methods.push("Custom FROM address");
    pushCard(
      map,
      "Custom sender lane",
      "Sender stage",
      "The visible From address should be chosen deliberately instead of silently collapsing to the SMTP login username."
    );
    checklist.push(
      "The displayed From address is independent from the SMTP login username and matches the mailbox the buyer expects recipients to trust."
    );
    complexity += 2;
  }

  if (selectedSender === "tenantreply") {
    methods.push("Tenant-owned reply-to");
    pushCard(
      map,
      "Reply ownership lane",
      "Sender stage",
      "Tenant-specific reply handling should stay with the tenant mailbox instead of following the original template author."
    );
    checklist.push(
      "Reply-to resolves to the tenant mailbox rather than the original template author or a hidden workspace default."
    );
    complexity += 2;
    plan = "Tenant-Safe Reply Route";
    summary =
      "Keep tenant reply ownership intact so cloned templates, delegated sending, and mailbox routing stay aligned with the buyer-facing tenant surface.";
  }

  if (selectedSender === "branded") {
    methods.push("Branded sender profile");
    pushCard(
      map,
      "Brand sender lane",
      "Sender stage",
      "Sender name, company identity, and mailbox choice should reinforce the private workspace or client brand from the first email."
    );
    checklist.push(
      "Company name and sender address reinforce the private workspace or client brand instead of looking generic."
    );
    complexity += 2;
  }

  if (selectedTransport === "ui") {
    methods.push("UI-managed SMTP settings");
    rules.push(
      "UI-only SMTP setup is suitable only for smaller teams because mail configuration drifts faster when the reproducible setup lives in a browser form only."
    );
    complexity += 1;
  }

  if (selectedTransport === "env") {
    methods.push("Environment-driven SMTP config");
    pushCard(
      map,
      "Reproducible config lane",
      "Transport stage",
      "Environment-driven SMTP should cover the same transport and sender choices as the UI so infrastructure changes do not rewrite mail behavior."
    );
    checklist.push(
      "SMTP security, verify mode, app URL, and sender identity can be recreated outside the UI."
    );
    complexity += 2;
  }

  if (selectedTransport === "tls465") {
    methods.push("Explicit 465 or implicit TLS route");
    pushCard(
      map,
      "TLS transport lane",
      "Transport stage",
      "Implicit TLS on port 465 should be tested deliberately so StartTLS expectations do not break the invite lane."
    );
    checklist.push(
      "Implicit TLS on port 465 is tested without forcing StartTLS behavior that the server does not support."
    );
    complexity += 2;
  }

  if (selectedTransport === "limitedrelay") {
    methods.push("Provider-limited relay");
    pushCard(
      map,
      "Provider throttle lane",
      "Transport stage",
      "Provider-limited relays need owned retry and visibility rules before larger send waves hide delivery failures."
    );
    checklist.push(
      "Provider limits, retries, and relay behavior are planned before invite volume increases."
    );
    complexity += 2;
  }

  if (selectedObserver === "none") {
    methods.push("No observer copy");
    complexity += 1;
  }

  if (selectedObserver === "completion") {
    methods.push("Completion-only observer copy");
    checklist.push(
      "Observers receive only the final completed package, not the live request that belongs to signers."
    );
    complexity += 1;
  }

  if (selectedObserver === "request") {
    methods.push("Request-time observer copy");
    pushCard(
      map,
      "Observer request lane",
      "Observer stage",
      "Request-time observers need explicit visibility without accidentally becoming signers or blocking the sequence."
    );
    checklist.push(
      "Non-signing observers can view the request at send time without being mistaken for signers."
    );
    complexity += 2;
  }

  if (selectedObserver === "linkedcc") {
    methods.push("Signer-coupled CC or counsel copy");
    pushCard(
      map,
      "Counsel CC lane",
      "Observer stage",
      "A signer can have a linked observer or counsel copy that follows the request without becoming a signing role."
    );
    checklist.push(
      "A signer can have a linked CC or counsel observer who follows the request without becoming a signer."
    );
    complexity += 3;
    plan = "Request-CC Legal Notice Path";
    summary =
      "Pair signer requests with a linked observer or counsel copy so request-time notice is preserved without turning observers into signers.";
  }

  if (selectedResponse === "sender") {
    methods.push("Original sender inbox");
    complexity += 1;
  }

  if (selectedResponse === "shared") {
    methods.push("Shared ops inbox");
    pushCard(
      map,
      "Shared inbox lane",
      "Response stage",
      "Shared reply ownership works when one monitored mailbox handles signer, client, and observer questions instead of leaving them with one individual sender."
    );
    checklist.push(
      "Reply handling is owned by a monitored shared mailbox rather than one individual sender."
    );
    complexity += 1;
  }

  if (selectedResponse === "tenant") {
    methods.push("Tenant-specific inbox");
    pushCard(
      map,
      "Tenant inbox lane",
      "Response stage",
      "Tenant mail should route replies to the right tenant queue instead of a global mailbox that cannot resolve ownership quickly."
    );
    checklist.push(
      "Each tenant's invites route replies to the correct tenant mailbox."
    );
    complexity += 2;
    plan = "Tenant-Safe Reply Route";
    summary =
      "Keep tenant sender identity and tenant reply ownership aligned so distributed workspaces do not leak responses into the wrong inbox.";
  }

  if (selectedResponse === "portal") {
    methods.push("No-reply plus portal handoff");
    pushCard(
      map,
      "Portal handoff lane",
      "Response stage",
      "No-reply mail is only safe when the invite clearly tells users how to continue inside the portal instead of encouraging dead-end replies."
    );
    checklist.push(
      "Invite copy tells recipients whether to reply by email or continue inside a portal."
    );
    complexity += 2;
  }

  if (selectedEvidence === "manual") {
    methods.push("Manual spot-check only");
    rules.push(
      "Manual delivery checks are acceptable only at low volume because missing invites become invisible once more than a few recipients are involved."
    );
    complexity += 1;
  }

  if (selectedEvidence === "smtp") {
    methods.push("SMTP log review");
    pushCard(
      map,
      "Delivery log lane",
      "Evidence stage",
      "SMTP submission logs should show whether the message left the application and reached the provider at all."
    );
    checklist.push(
      "Operators can see whether mail was handed to the SMTP provider."
    );
    complexity += 1;
  }

  if (selectedEvidence === "webhook") {
    methods.push("Webhook plus delivery audit");
    pushCard(
      map,
      "Audit signal lane",
      "Evidence stage",
      "Outbound send and downstream delivery state should be captured in one audit path so operators are not guessing whether invites disappeared."
    );
    checklist.push(
      "Submission, send, and downstream notification status are captured in one audit trail."
    );
    complexity += 2;
    plan = "Observed Delivery Relay";
    summary =
      "Use one monitored invite lane so sender identity, reply handling, and outbound delivery evidence stay visible from send through follow-up.";
  }

  if (selectedEvidence === "bounce") {
    methods.push("Bounce and failure desk");
    pushCard(
      map,
      "Bounce queue lane",
      "Evidence stage",
      "Failed and missing deliveries need an owned queue with retry and escalation rules instead of disappearing after SMTP submission."
    );
    checklist.push(
      "Missing or failed deliveries land in an owned queue with retry and escalation rules."
    );
    complexity += 3;
    plan = "Observed Delivery Relay";
    summary =
      "Use a monitored relay path with bounce visibility so invites, retries, and failure handling stay owned instead of disappearing after handoff to SMTP.";
  }

  if (
    selectedSurface === "client" &&
    (selectedSender === "customfrom" || selectedSender === "branded") &&
    selectedResponse === "shared"
  ) {
    plan = "Branded Shared Inbox Sender";
    summary =
      "Use a visible branded sender, keep SMTP config reproducible outside the UI, route replies to a monitored shared inbox, and record outbound delivery in one audit path.";
  }

  if (
    selectedSurface === "regulated" &&
    selectedTransport === "tls465" &&
    selectedObserver === "linkedcc" &&
    selectedEvidence === "bounce"
  ) {
    plan = "Regulated Verified Mail Path";
    summary =
      "Use explicit secure transport, request-time legal observers, and owned bounce handling so regulated invites preserve notice, sender trust, and delivery evidence together.";
  }

  const preview = {
    invite_surface:
      selectedSurface === "client"
        ? "client_facing_invite_lane"
        : selectedSurface === "internal"
          ? "internal_ops_invite_lane"
          : selectedSurface === "tenant"
            ? "tenant_distributed_template_lane"
            : "regulated_notice_lane",
    sender_identity:
      selectedSender === "workspace"
        ? "workspace_default_sender"
        : selectedSender === "customfrom"
          ? "custom_from_address"
          : selectedSender === "tenantreply"
            ? "tenant_owned_reply_to"
            : "branded_sender_profile",
    transport_mode:
      selectedTransport === "ui"
        ? "ui_managed_smtp_settings"
        : selectedTransport === "env"
          ? "environment_driven_smtp"
          : selectedTransport === "tls465"
            ? "explicit_465_or_implicit_tls"
            : "provider_limited_relay",
    observer_policy:
      selectedObserver === "none"
        ? "no_observer_copy"
        : selectedObserver === "completion"
          ? "completion_only_observer_copy"
          : selectedObserver === "request"
            ? "request_time_observer_copy"
            : "signer_coupled_cc",
    response_owner:
      selectedResponse === "sender"
        ? "original_sender_inbox"
        : selectedResponse === "shared"
          ? "shared_ops_inbox"
          : selectedResponse === "tenant"
            ? "tenant_specific_inbox"
            : "portal_handoff_only",
    delivery_evidence:
      selectedEvidence === "manual"
        ? "manual_spot_check"
        : selectedEvidence === "smtp"
          ? "smtp_log_review"
          : selectedEvidence === "webhook"
            ? "webhook_plus_delivery_audit"
            : "bounce_and_failure_desk",
    invite_controls: [],
  };

  if (selectedSender === "customfrom" || selectedSender === "branded") {
    preview.invite_controls.push("visible_from_address");
  }

  if (selectedSender === "tenantreply" || selectedResponse === "tenant") {
    preview.invite_controls.push("tenant_reply_owner");
  }

  if (selectedTransport === "env") {
    preview.invite_controls.push("config_as_code_smtp");
  }

  if (selectedTransport === "tls465") {
    preview.invite_controls.push("explicit_tls_mode");
  }

  if (selectedTransport === "limitedrelay") {
    preview.invite_controls.push("provider_throttle_guard");
  }

  if (selectedObserver === "request" || selectedObserver === "linkedcc") {
    preview.invite_controls.push("request_time_observer");
  }

  if (selectedObserver === "linkedcc") {
    preview.invite_controls.push("linked_cc");
  }

  if (selectedEvidence === "smtp") {
    preview.invite_controls.push("smtp_delivery_log");
  }

  if (selectedEvidence === "webhook") {
    preview.invite_controls.push("delivery_audit_trail");
  }

  if (selectedEvidence === "bounce") {
    preview.invite_controls.push("bounce_retry_queue");
  }

  if (selectedSurface === "client") {
    preview.brand_context = "client_portal";
  }

  if (selectedSurface === "tenant") {
    preview.template_distribution = "tenant_cloned_templates";
  }

  if (selectedResponse === "shared") {
    preview.reply_mailbox = "shared_ops_inbox";
  }

  if (selectedResponse === "portal") {
    preview.reply_mailbox = "portal_handoff_only";
  }

  if (selectedTransport === "env" || selectedTransport === "tls465") {
    preview.smtp_security_review = "required";
  }

  const previewText = JSON.stringify(preview, null, 2);
  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules);
  if (!uniqueRules.length) {
    uniqueRules.push(
      "Invite delivery should define one visible sender, one reply owner, and one delivery-evidence path before the workflow goes live."
    );
  }
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the outbound mail lane is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one sender identity, one reply boundary, and one delivery-evidence rule. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the invite lane narrow enough that operators can explain who sends, who gets copied, where replies land, and how failures are surfaced without guesswork.`;

  let offerKey = "audit";
  if (complexity >= 5) {
    offerKey = "sprint";
  }
  if (
    complexity >= 10 ||
    (selectedSurface === "tenant" &&
      selectedSender === "tenantreply" &&
      selectedResponse === "tenant") ||
    (selectedSurface === "regulated" &&
      selectedTransport === "tls465" &&
      selectedObserver === "linkedcc" &&
      selectedEvidence === "bounce")
  ) {
    offerKey = "workspace";
  }

  const offer = inviteOfferCatalog[offerKey];

  if (invitePlanName) {
    invitePlanName.textContent = plan;
  }

  if (invitePlanSummary) {
    invitePlanSummary.textContent = summary;
  }

  if (inviteMethods) {
    inviteMethods.innerHTML = uniqueMethods
      .map((method) => `<span class="stack-chip">${method}</span>`)
      .join("");
  }

  if (inviteMap) {
    inviteMap.innerHTML = renderCards(map);
  }

  if (invitePreview) {
    invitePreview.textContent = previewText;
  }

  if (inviteRules) {
    inviteRules.innerHTML = asBullets(uniqueRules.slice(0, 5));
  }

  if (inviteBrief) {
    inviteBrief.textContent = brief;
  }

  if (inviteChecklist) {
    inviteChecklist.innerHTML = asBullets(uniqueChecklist);
  }

  if (inviteOfferName) {
    inviteOfferName.textContent = offer.label;
  }

  if (inviteOfferNote) {
    inviteOfferNote.textContent = offer.note;
  }

  if (inviteOfferLink) {
    inviteOfferLink.href = offer.link;
    inviteOfferLink.textContent = `Open ${offer.label}`;
  }

  if (copyInvitePreview) {
    copyInvitePreview.dataset.copy = previewText;
  }

  if (copyInviteBrief) {
    copyInviteBrief.dataset.copy = brief;
  }

  if (copyInviteChecklist) {
    copyInviteChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
  }
};

[inviteSurface, senderIdentity, transportMode, observerMode, responseOwner, deliveryEvidence].forEach((input) => {
  input?.addEventListener("input", renderInviteDeliveryPlanner);
  input?.addEventListener("change", renderInviteDeliveryPlanner);
});

copyInvitePreview?.addEventListener("click", () => copyInviteText(copyInvitePreview));
copyInviteBrief?.addEventListener("click", () => copyInviteText(copyInviteBrief));
copyInviteChecklist?.addEventListener("click", () => copyInviteText(copyInviteChecklist));

renderInviteDeliveryPlanner();
