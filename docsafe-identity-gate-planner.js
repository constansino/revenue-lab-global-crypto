const identityOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs its identity boundary, signer verification policy, and recovery model mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the buyer already knows the main trust boundary and needs the identity gate implemented cleanly.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when SSO, branded portal entry, signer verification, secure sessions, and recovery operations need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const deploymentSurface = document.getElementById("deploymentSurface");
const workforceLogin = document.getElementById("workforceLogin");
const signerVerification = document.getElementById("signerVerification");
const inviteChannel = document.getElementById("inviteChannel");
const sessionPolicy = document.getElementById("sessionPolicy");
const recoveryLane = document.getElementById("recoveryLane");

const identityPlanName = document.getElementById("identityPlanName");
const identityPlanSummary = document.getElementById("identityPlanSummary");
const identityMethods = document.getElementById("identityMethods");
const identityMap = document.getElementById("identityMap");
const identityPreview = document.getElementById("identityPreview");
const identityRules = document.getElementById("identityRules");
const identityBrief = document.getElementById("identityBrief");
const identityChecklist = document.getElementById("identityChecklist");
const identityOfferName = document.getElementById("identityOfferName");
const identityOfferNote = document.getElementById("identityOfferNote");
const identityOfferLink = document.getElementById("identityOfferLink");
const copyIdentityPreview = document.getElementById("copyIdentityPreview");
const copyIdentityBrief = document.getElementById("copyIdentityBrief");
const copyIdentityChecklist = document.getElementById("copyIdentityChecklist");

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

const copyIdentityText = async (button) => {
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

const renderIdentityGatePlanner = () => {
  const selectedSurface = deploymentSurface?.value || "internal";
  const selectedWorkforce = workforceLogin?.value || "sso";
  const selectedSigner = signerVerification?.value || "email";
  const selectedInvite = inviteChannel?.value || "email";
  const selectedSession = sessionPolicy?.value || "secure";
  const selectedRecovery = recoveryLane?.value || "backup";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "SSO-Controlled Email OTP Workspace";
  let summary =
    "Use one IdP for workforce access, add email OTP before signing, secure authenticated sessions over HTTPS, and keep a vault-backed TOTP recovery runbook.";

  pushCard(
    map,
    "Trust boundary",
    "Identity stage",
    "One identity boundary should explain how operators authenticate, how signers verify, and how exceptions recover without guesswork."
  );

  if (selectedSurface === "internal") {
    methods.push("Internal self-hosted workspace");
    checklist.push(
      "Internal operators and external signers are not forced through the same login path."
    );
    complexity += 1;
  }

  if (selectedSurface === "client") {
    methods.push("Branded client portal");
    pushCard(
      map,
      "Portal trust lane",
      "Surface stage",
      "Client portals need identity choices that feel branded and private instead of exposing a generic signing surface."
    );
    checklist.push(
      "Client-facing access uses a branded trust path that matches the portal the user already expects."
    );
    complexity += 2;
    plan = "Branded Client Identity Lane";
    summary =
      "Combine a private portal entry with deliberate signer verification so external users trust the branded workspace instead of treating it like a generic link.";
  }

  if (selectedSurface === "embedded") {
    methods.push("Embedded product signing");
    pushCard(
      map,
      "Embedded trust lane",
      "Surface stage",
      "Embedded signing needs an identity handoff that feels native to the product instead of a detached email-only experience."
    );
    checklist.push(
      "Embedded users enter the signing session through a product-controlled handoff rather than an orphaned external link."
    );
    complexity += 2;
    plan = "Embedded App Trust Gate";
    summary =
      "Map workforce login and signer verification into one product-controlled handoff so embedded signing feels owned instead of bolted on.";
  }

  if (selectedSurface === "regulated") {
    methods.push("Regulated signing lane");
    pushCard(
      map,
      "High-assurance lane",
      "Surface stage",
      "Regulated environments need stricter session, verification, and recovery controls than a normal internal signing flow."
    );
    checklist.push(
      "The identity gate matches the assurance level of the documents instead of reusing a low-friction default."
    );
    complexity += 3;
    plan = "High-Assurance Signer Gate";
    summary =
      "Use a higher-assurance trust lane so stronger verification, secure sessions, and recovery controls match the sensitivity of the signing workflow.";
  }

  if (selectedWorkforce === "password") {
    methods.push("Local operator accounts");
    rules.push(
      "Local operator accounts are acceptable only for smaller teams because they create a separate credential surface to provision, audit, and recover."
    );
    complexity += 1;
  }

  if (selectedWorkforce === "sso") {
    methods.push("SAML or SSO IdP");
    pushCard(
      map,
      "IdP federation lane",
      "Workforce stage",
      "SSO works only when IdP mapping, provisioning, and the first login path are tested before rollout."
    );
    checklist.push(
      "IdP attribute mapping and user provisioning are tested before production login is offered to operators."
    );
    complexity += 2;
  }

  if (selectedWorkforce === "oauth") {
    methods.push("OAuth or modern auth");
    pushCard(
      map,
      "OAuth tenant lane",
      "Workforce stage",
      "OAuth and modern auth need one approved provider and redirect path instead of drifting into ad hoc login exceptions."
    );
    checklist.push(
      "OAuth provider, scopes, and redirect behavior are fixed before rollout instead of being debugged live with end users."
    );
    complexity += 2;
    plan = "Modern Auth Workspace";
    summary =
      "Use one OAuth or modern-auth tenant for workforce access, then layer signer verification and recovery without falling back to scattered local logins.";
  }

  if (selectedWorkforce === "hybrid") {
    methods.push("Hybrid IdP plus break-glass admin");
    pushCard(
      map,
      "Break-glass auth lane",
      "Workforce stage",
      "Hybrid access should keep one controlled local recovery account without letting it become the default operator login."
    );
    checklist.push(
      "One break-glass local admin path exists for recovery without replacing the main workforce login system."
    );
    complexity += 3;
  }

  if (selectedSigner === "link") {
    methods.push("Link-only signer access");
    rules.push(
      "Link-only signer access is suitable only for lower-risk flows because the document URL itself is not strong identity proof."
    );
    complexity += 1;
  }

  if (selectedSigner === "email") {
    methods.push("Email OTP gate");
    pushCard(
      map,
      "Email proof step",
      "Signer stage",
      "Email OTP adds one lightweight signer confirmation step when a bare document link is too weak for the buyer."
    );
    checklist.push(
      "Signer access requires one email confirmation step before the document is opened."
    );
    complexity += 1;
  }

  if (selectedSigner === "sms") {
    methods.push("SMS OTP gate");
    pushCard(
      map,
      "SMS verification lane",
      "Signer stage",
      "SMS verification should be placed deliberately so signers are not forced to verify the same number twice in one flow."
    );
    checklist.push(
      "SMS verification occurs once in the signer journey and does not loop users back through the same gate."
    );
    complexity += 2;
  }

  if (selectedSigner === "stepup") {
    methods.push("Risk-based step-up verification");
    pushCard(
      map,
      "Step-up proof lane",
      "Signer stage",
      "Higher-risk signers should escalate from a lighter proof step to a stronger one instead of making every flow equally heavy."
    );
    checklist.push(
      "Higher-risk documents trigger stronger signer verification without adding the same friction to every submission."
    );
    complexity += 3;
    plan = "High-Assurance Signer Gate";
    summary =
      "Use a step-up trust gate so stronger signer verification appears only where document risk justifies the extra friction.";
  }

  if (selectedInvite === "email") {
    methods.push("Default email invite");
    complexity += 1;
  }

  if (selectedInvite === "brand") {
    methods.push("Branded private invite");
    pushCard(
      map,
      "Invite brand layer",
      "Invite stage",
      "Invite copy, sender identity, and portal language should match the private workspace so recipients trust the first contact."
    );
    checklist.push(
      "Invite copy and sender identity match the private portal or client brand instead of looking generic."
    );
    complexity += 1;
  }

  if (selectedInvite === "smsassist") {
    methods.push("SMS-assisted reminder path");
    pushCard(
      map,
      "SMS assist lane",
      "Invite stage",
      "SMS reminders need controlled wording so verification codes and nudges do not feel suspicious or inconsistent with email invites."
    );
    rules.push(
      "SMS wording should be controlled so reminders and verification messages reinforce trust instead of looking like disconnected system spam."
    );
    complexity += 2;
  }

  if (selectedInvite === "portal") {
    methods.push("Portal-first login handoff");
    pushCard(
      map,
      "Portal entry lane",
      "Invite stage",
      "Portal-first entry works when users clearly know they should begin in the product or portal instead of chasing mixed link behaviors."
    );
    checklist.push(
      "Users know whether they start from the portal or a link, instead of bouncing unpredictably between both."
    );
    complexity += 2;
  }

  if (selectedSession === "standard") {
    methods.push("Standard authenticated session");
    complexity += 1;
  }

  if (selectedSession === "secure") {
    methods.push("Secure-cookie HTTPS-only session");
    pushCard(
      map,
      "Secure session lane",
      "Session stage",
      "Authenticated sessions should enforce secure-cookie transport on trusted HTTPS paths so the trust boundary is consistent with the signing surface."
    );
    checklist.push(
      "Authenticated sessions use secure-cookie transport on trusted HTTPS paths."
    );
    complexity += 2;
  }

  if (selectedSession === "short") {
    methods.push("Short-lived signer session");
    pushCard(
      map,
      "Short TTL lane",
      "Session stage",
      "Short-lived sessions make signer access expire on purpose instead of leaving stale trusted entry points active for too long."
    );
    checklist.push(
      "Signer links and sessions expire intentionally and are reissued deliberately when access must continue."
    );
    complexity += 2;
  }

  if (selectedSession === "strict") {
    methods.push("Strict secure-cookie plus short TTL");
    pushCard(
      map,
      "Strict session envelope",
      "Session stage",
      "Strict session policy combines secure transport and short TTL so high-trust flows are not relying on a soft default session."
    );
    checklist.push(
      "Secure cookies and short session lifetimes are configured together for the highest-trust flows."
    );
    complexity += 3;
    plan = "Strict Session Identity Gate";
    summary =
      "Use a stricter session envelope so authenticated traffic, signer link lifetime, and exception handling all match the trust level of the workflow.";
  }

  if (selectedRecovery === "manual") {
    methods.push("Manual helpdesk recovery");
    rules.push(
      "Manual recovery is acceptable only when the team has a written script, because improvising 2FA resets under pressure creates avoidable risk."
    );
    complexity += 1;
  }

  if (selectedRecovery === "backup") {
    methods.push("TOTP backup seed runbook");
    pushCard(
      map,
      "Backup seed lane",
      "Recovery stage",
      "A backup TOTP seed workflow keeps recovery realistic when operators use password managers or vaults instead of only a QR scan."
    );
    checklist.push(
      "Admins can store or recover a plaintext TOTP seed through an approved vault workflow."
    );
    complexity += 2;
  }

  if (selectedRecovery === "admin") {
    methods.push("Admin-reviewed 2FA reset");
    pushCard(
      map,
      "Reviewed reset lane",
      "Recovery stage",
      "2FA resets should require operator review and logging instead of becoming an undocumented database trick."
    );
    checklist.push(
      "2FA reset requests require operator review and logging before access is restored."
    );
    complexity += 2;
  }

  if (selectedRecovery === "migration") {
    methods.push("Migration recovery drill");
    pushCard(
      map,
      "Migration safety lane",
      "Recovery stage",
      "Identity recovery should be tested before storage or host migration so the team is not discovering TOTP failure after the move."
    );
    checklist.push(
      "Infrastructure migrations include a tested identity recovery drill before cutover."
    );
    complexity += 3;
    plan = "Migration-Safe Identity Lane";
    summary =
      "Build identity recovery into migration planning so a host move or volume change does not trap operators behind broken 2FA.";
  }

  if (
    selectedWorkforce === "sso" &&
    selectedSigner === "email" &&
    selectedSession === "secure"
  ) {
    plan = "SSO-Controlled Email OTP Workspace";
    summary =
      "Use one IdP for workforce access, add email OTP before signing, secure authenticated sessions over HTTPS, and keep a vault-backed TOTP recovery runbook.";
  }

  if (
    selectedSurface === "embedded" &&
    selectedWorkforce === "oauth" &&
    selectedSigner === "stepup"
  ) {
    plan = "Embedded Step-Up Trust Gate";
    summary =
      "Tie modern auth and a product-controlled embed handoff to risk-based signer verification so high-value signatures stay inside the app without weakening trust.";
  }

  if (
    selectedSurface === "client" &&
    selectedInvite === "brand" &&
    selectedSigner === "sms"
  ) {
    plan = "Branded Client Verification Portal";
    summary =
      "Pair a branded invite path with one deliberate SMS verification step so external users trust the client portal without suffering duplicate proof loops.";
  }

  if (
    selectedSurface === "regulated" &&
    selectedSession === "strict" &&
    selectedRecovery === "backup"
  ) {
    plan = "High-Assurance Recovery Model";
    summary =
      "Use a high-assurance session policy with a vault-backed TOTP backup workflow so stronger verification survives operator turnover and device changes.";
  }

  const preview = {
    deployment_surface:
      selectedSurface === "internal"
        ? "internal_self_hosted_workspace"
        : selectedSurface === "client"
          ? "branded_client_portal"
          : selectedSurface === "embedded"
            ? "embedded_product_signing"
            : "regulated_signing_lane",
    workforce_login:
      selectedWorkforce === "password"
        ? "local_operator_accounts"
        : selectedWorkforce === "sso"
          ? "saml_or_sso_idp"
          : selectedWorkforce === "oauth"
            ? "oauth_modern_auth"
            : "hybrid_idp_plus_break_glass_local_admin",
    signer_verification:
      selectedSigner === "link"
        ? "link_only_signer_access"
        : selectedSigner === "email"
          ? "email_otp_gate"
          : selectedSigner === "sms"
            ? "sms_otp_gate"
            : "risk_based_step_up",
    invite_channel:
      selectedInvite === "email"
        ? "default_email_invite"
        : selectedInvite === "brand"
          ? "branded_private_invite"
          : selectedInvite === "smsassist"
            ? "sms_assisted_reminders"
            : "portal_first_login_handoff",
    session_policy:
      selectedSession === "standard"
        ? "standard_authenticated_session"
        : selectedSession === "secure"
          ? "secure_cookie_https_only"
          : selectedSession === "short"
            ? "short_lived_signer_session"
            : "strict_secure_cookie_plus_short_ttl",
    recovery_lane:
      selectedRecovery === "manual"
        ? "manual_helpdesk_recovery"
        : selectedRecovery === "backup"
          ? "totp_backup_seed_runbook"
          : selectedRecovery === "admin"
            ? "admin_reviewed_2fa_reset"
            : "migration_recovery_drill",
    identity_controls: [],
  };

  if (selectedWorkforce === "sso") {
    preview.identity_controls.push("sso_saml_idp");
    preview.idp_example = "authentik";
  }

  if (selectedWorkforce === "oauth") {
    preview.identity_controls.push("oauth_modern_auth");
    preview.oauth_provider = "microsoft_365";
  }

  if (selectedWorkforce === "hybrid") {
    preview.identity_controls.push("break_glass_local_admin");
  }

  if (selectedSigner === "email") {
    preview.identity_controls.push("email_otp");
  }

  if (selectedSigner === "sms") {
    preview.identity_controls.push("sms_otp");
  }

  if (selectedSigner === "stepup") {
    preview.identity_controls.push("risk_based_step_up");
  }

  if (selectedInvite === "brand") {
    preview.identity_controls.push("branded_sender_identity");
  }

  if (selectedInvite === "portal") {
    preview.identity_controls.push("portal_entry");
  }

  if (selectedSession === "secure" || selectedSession === "strict") {
    preview.identity_controls.push("secure_cookie_transport");
  }

  if (selectedSession === "short" || selectedSession === "strict") {
    preview.identity_controls.push("short_lived_signer_sessions");
  }

  if (selectedRecovery === "backup") {
    preview.identity_controls.push("totp_seed_backup");
    preview.backup_storage = "vault_or_password_manager";
  }

  if (selectedRecovery === "admin") {
    preview.identity_controls.push("reviewed_2fa_reset");
  }

  if (selectedRecovery === "migration") {
    preview.identity_controls.push("migration_recovery_drill");
  }

  if (selectedSurface === "embedded") {
    preview.entry_surface = "application_controlled_embed";
  }

  if (selectedSurface === "regulated") {
    preview.assurance_level = "high_assurance";
  }

  const previewText = JSON.stringify(preview, null, 2);
  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules);
  if (!uniqueRules.length) {
    uniqueRules.push(
      "Identity design should define one operator login boundary, one signer proof step, and one recovery runbook before the workspace goes live."
    );
  }
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the identity boundary is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one workforce login boundary, one signer proof step, and one recovery rule. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the trust gate narrow enough that operators can explain who authenticates where, how signers verify, and how recovery works without guesswork.`;

  let offerKey = "audit";
  if (complexity >= 5) {
    offerKey = "sprint";
  }
  if (
    complexity >= 10 ||
    (selectedSurface === "embedded" &&
      selectedWorkforce === "oauth" &&
      selectedSigner === "stepup") ||
    (selectedSurface === "regulated" &&
      selectedSession === "strict" &&
      selectedRecovery === "backup")
  ) {
    offerKey = "workspace";
  }

  const offer = identityOfferCatalog[offerKey];

  if (identityPlanName) {
    identityPlanName.textContent = plan;
  }

  if (identityPlanSummary) {
    identityPlanSummary.textContent = summary;
  }

  if (identityMethods) {
    identityMethods.innerHTML = uniqueMethods
      .map((method) => `<span class="stack-chip">${method}</span>`)
      .join("");
  }

  if (identityMap) {
    identityMap.innerHTML = renderCards(map);
  }

  if (identityPreview) {
    identityPreview.textContent = previewText;
  }

  if (identityRules) {
    identityRules.innerHTML = asBullets(uniqueRules.slice(0, 5));
  }

  if (identityBrief) {
    identityBrief.textContent = brief;
  }

  if (identityChecklist) {
    identityChecklist.innerHTML = asBullets(uniqueChecklist);
  }

  if (identityOfferName) {
    identityOfferName.textContent = offer.label;
  }

  if (identityOfferNote) {
    identityOfferNote.textContent = offer.note;
  }

  if (identityOfferLink) {
    identityOfferLink.href = offer.link;
    identityOfferLink.textContent = `Open ${offer.label}`;
  }

  if (copyIdentityPreview) {
    copyIdentityPreview.dataset.copy = previewText;
  }

  if (copyIdentityBrief) {
    copyIdentityBrief.dataset.copy = brief;
  }

  if (copyIdentityChecklist) {
    copyIdentityChecklist.dataset.copy = uniqueChecklist
      .map((item) => `- ${item}`)
      .join("\n");
  }
};

[
  deploymentSurface,
  workforceLogin,
  signerVerification,
  inviteChannel,
  sessionPolicy,
  recoveryLane,
].forEach((input) => {
  input?.addEventListener("input", renderIdentityGatePlanner);
  input?.addEventListener("change", renderIdentityGatePlanner);
});

copyIdentityPreview?.addEventListener("click", () =>
  copyIdentityText(copyIdentityPreview)
);
copyIdentityBrief?.addEventListener("click", () =>
  copyIdentityText(copyIdentityBrief)
);
copyIdentityChecklist?.addEventListener("click", () =>
  copyIdentityText(copyIdentityChecklist)
);

renderIdentityGatePlanner();
