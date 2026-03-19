const embedOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs the embed surface, session boundary, and QA traps mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the buyer already knows the host app, signing lane, and first embedded session to launch.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when embedded authoring, prefill, mobile fallback, and host-controlled completion all need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const embedSurface = document.getElementById("embedSurface");
const embedAuthMode = document.getElementById("embedAuthMode");
const embedPrefillMode = document.getElementById("embedPrefillMode");
const fieldLockMode = document.getElementById("fieldLockMode");
const completionMode = document.getElementById("completionMode");
const mobileMode = document.getElementById("mobileMode");

const embedPlanName = document.getElementById("embedPlanName");
const embedPlanSummary = document.getElementById("embedPlanSummary");
const embedMethods = document.getElementById("embedMethods");
const embedStageMap = document.getElementById("embedStageMap");
const embedPreview = document.getElementById("embedPreview");
const embedRules = document.getElementById("embedRules");
const embedBrief = document.getElementById("embedBrief");
const embedChecklist = document.getElementById("embedChecklist");
const embedOfferName = document.getElementById("embedOfferName");
const embedOfferNote = document.getElementById("embedOfferNote");
const embedOfferLink = document.getElementById("embedOfferLink");
const copyEmbedPreview = document.getElementById("copyEmbedPreview");
const copyEmbedBrief = document.getElementById("copyEmbedBrief");
const copyEmbedChecklist = document.getElementById("copyEmbedChecklist");

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

const copyEmbedText = async (button) => {
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

const renderEmbedLaunchpad = () => {
  const selectedSurface = embedSurface?.value || "signer";
  const selectedAuth = embedAuthMode?.value || "direct";
  const selectedPrefill = embedPrefillMode?.value || "template";
  const selectedFieldLock = fieldLockMode?.value || "editable";
  const selectedCompletion = completionMode?.value || "callback";
  const selectedMobile = mobileMode?.value || "responsive";

  const methods = [];
  const stages = [];
  const rules = [];
  const checklist = [];

  let complexity = 0;
  let plan = "Verified Signer Embed";
  let summary =
    "Carry one signer into an embedded session, prefill the right fields, and return completion cleanly to the host app.";

  pushCard(
    stages,
    "Host surface",
    "Launch stage",
    "Open the signer inside the exact product surface the buyer already controls instead of sending users into a disconnected flow."
  );
  pushCard(
    stages,
    "QA lane",
    "Launch stage",
    "Validate auth, prefill, completion, and mobile behavior in the host environment before the session goes live."
  );
  checklist.push(
    "One host-owned embed surface is chosen before auth, prefill, and return logic are implemented."
  );

  if (selectedSurface === "signer") {
    methods.push("Embedded signing view");
    pushCard(
      stages,
      "Signer viewport",
      "Surface stage",
      "Keep the signer inside the app while preserving a clear path to review, sign, and finish."
    );
    complexity += 1;
  }

  if (selectedSurface === "authoring") {
    methods.push("Embed authoring");
    pushCard(
      stages,
      "Authoring shell",
      "Surface stage",
      "Create and configure the document inside the host product without losing the session before document creation."
    );
    rules.push(
      "Embedded authoring needs a deliberate session boundary because document creation can fail before the user reaches signing if auth is not handed off correctly."
    );
    complexity += 2;
    plan = "Embedded Authoring Launch";
    summary =
      "Carry authoring and document creation through one controlled host surface so the session does not fail before the embedded document exists.";
  }

  if (selectedSurface === "review") {
    methods.push("Review-and-sign shell");
    pushCard(
      stages,
      "Review viewport",
      "Surface stage",
      "Let the user verify prepared values first, then sign or confirm inside the same session."
    );
    complexity += 1;
    plan = "Review-and-Sign Embed";
    summary =
      "Treat the embedded lane as a guided review session so prepared data and signing actions stay inside one host flow.";
  }

  if (selectedSurface === "partner") {
    methods.push("Partner portal shell");
    pushCard(
      stages,
      "Partner session",
      "Surface stage",
      "Open the document inside a partner-facing portal where completion and return behavior need to feel native to the host product."
    );
    complexity += 2;
    plan = "Portal Embed Launch";
    summary =
      "Launch the signing lane inside the partner portal the buyer already owns so the host product controls entry, return, and trust.";
  }

  if (selectedAuth === "direct") {
    methods.push("Direct signer token");
    pushCard(
      stages,
      "Token handoff",
      "Auth stage",
      "Issue one direct signing session token from the server and open the embedded view without leaking auth decisions into the client."
    );
    checklist.push(
      "The embedded session receives the intended direct sign token from a server-owned handoff."
    );
    complexity += 1;
  }

  if (selectedAuth === "presign") {
    methods.push("Presign token handoff");
    pushCard(
      stages,
      "Presign boundary",
      "Auth stage",
      "Create the session through a presigned handoff path that survives the exact request shape used by the embedded component."
    );
    rules.push(
      "Presign-based embed flows should verify the token actually reaches the create request in the intended auth channel instead of assuming the component sends it correctly."
    );
    checklist.push(
      "The presign token reaches the embedded create request in the expected auth channel."
    );
    complexity += 2;
    if (selectedSurface === "authoring") {
      plan = "Presigned Authoring Launch";
      summary =
        "Validate the presign handoff before embedded authoring goes live so document creation does not fail with silent auth mismatches.";
    }
  }

  if (selectedAuth === "session") {
    methods.push("Server session relay");
    pushCard(
      stages,
      "Host session boundary",
      "Auth stage",
      "Keep session creation and token exchange on the server side so the host app owns the identity boundary."
    );
    rules.push(
      "Server-side session relays reduce client leakage, but they raise the bar on host callbacks, expiry handling, and QA coverage."
    );
    checklist.push(
      "The host app can mint or relay the embed session without exposing unsafe auth decisions to the browser."
    );
    complexity += 2;
    plan = "Host-Controlled Embed Launch";
    summary =
      "Keep auth and embed session creation in a server-owned boundary so the host app controls identity before the embedded view opens.";
  }

  if (selectedAuth === "email") {
    methods.push("Email rescue fallback");
    pushCard(
      stages,
      "Fallback entry",
      "Auth stage",
      "Provide a backup route when the buyer needs a host-owned session first but still needs a recoverable signing path."
    );
    rules.push(
      "Email fallback is useful for rescue, but it should not become the primary completion path for a product that claims in-app signing."
    );
    complexity += 1;
  }

  if (selectedPrefill === "none") {
    rules.push(
      "Manual-entry embed sessions should stay narrow, or the buyer will recreate the same form-filling workload they wanted to remove."
    );
  }

  if (selectedPrefill === "template") {
    methods.push("Template field ID prefill");
    pushCard(
      stages,
      "Template prefill",
      "Prefill stage",
      "Generate the document from known template field IDs before the signer opens the embedded lane."
    );
    rules.push(
      "Template-prefill embed flows should verify that values actually appear in the embedded signer session, not just in the generation request."
    );
    checklist.push(
      "Template field IDs are resolved before launch and the prefilled values are visible in the embedded session."
    );
    complexity += 1;
  }

  if (selectedPrefill === "api") {
    methods.push("API prefill before open");
    pushCard(
      stages,
      "API prefill injection",
      "Prefill stage",
      "Inject prepared values before the document opens so the embedded session starts from a controlled payload instead of ad hoc field entry."
    );
    rules.push(
      "API-prefilled sessions should prove both the live embed view and the final downloaded proof still carry the prepared values."
    );
    checklist.push(
      "API-prefilled values are visible to the signer and survive into the final proof artifact."
    );
    complexity += 2;
    plan = "Prefilled Embed Launch";
    summary =
      "Prepare the payload before open and prove those values survive both the embedded session and the final proof package.";
  }

  if (selectedFieldLock === "editable") {
    rules.push(
      "Editable fields are simpler to launch, but buyers should still know exactly which values remain signer-owned inside the embedded session."
    );
  }

  if (selectedFieldLock === "text") {
    methods.push("Read-only text review");
    pushCard(
      stages,
      "Review field pass",
      "Interaction stage",
      "Let the signer verify prepared text values while still exposing a clear action to proceed and sign."
    );
    rules.push(
      "Read-only review flows still need an explicit completion control or the signer can end up stuck in a passive document view."
    );
    checklist.push(
      "The embedded session still exposes a clear completion action when prepared text values are read-only."
    );
    complexity += 1;
    plan = "Review-Only Text Embed";
    summary =
      "Lock prepared text values for review while keeping a visible next action so the embedded session does not feel unfinished.";
  }

  if (selectedFieldLock === "mixed") {
    methods.push("Locked choice QA");
    pushCard(
      stages,
      "Choice-field review",
      "Interaction stage",
      "Handle review-only checkbox and radio choices deliberately so duplicated yes or no fields do not become ambiguous or editable by accident."
    );
    rules.push(
      "Mixed review flows need a checkbox and radio lock strategy because review-only text fields alone do not solve prepared choice-field behavior."
    );
    checklist.push(
      "Checkbox and radio review fields behave as intended instead of forcing ad hoc party or auto-complete workarounds."
    );
    complexity += 2;
    plan = "Mixed Review Embed";
    summary =
      "Treat review-only choice fields as a launch risk before the buyer promises a prepared, low-effort signing experience.";
  }

  if (selectedFieldLock === "full") {
    methods.push("Full read-only review");
    pushCard(
      stages,
      "Completion control check",
      "Interaction stage",
      "Prove the signer can still submit or complete the session when every visible field is already prepared."
    );
    rules.push(
      "Fully read-only sessions are high-risk because the embed can end up showing a document with no visible action to finish."
    );
    checklist.push(
      "A fully read-only embedded session still exposes a completion action the signer can actually trigger."
    );
    complexity += 2;
    plan = "Read-Only Review Embed";
    summary =
      "Prove a prepared review-only session can still be completed before the buyer sells a low-effort embedded signing flow.";
  }

  if (selectedCompletion === "confirm") {
    methods.push("Explicit confirm CTA");
    pushCard(
      stages,
      "Confirm action",
      "Return stage",
      "Expose one visible completion control inside the embedded lane so the user can finish without guessing what counts as done."
    );
    checklist.push(
      "The embedded lane has a visible confirm or complete action when the user reaches the end of review or signing."
    );
    complexity += 1;
  }

  if (selectedCompletion === "callback") {
    methods.push("Host callback return");
    pushCard(
      stages,
      "Host callback",
      "Return stage",
      "Return control to the product with a host-owned callback once the embedded session reaches completion."
    );
    checklist.push(
      "The host app receives a reliable callback when the embedded session completes."
    );
    complexity += 1;
  }

  if (selectedCompletion === "redirect") {
    methods.push("Redirect return");
    pushCard(
      stages,
      "Redirect handoff",
      "Return stage",
      "Send the user back to the correct product screen with enough context to confirm what happened."
    );
    checklist.push(
      "The user returns to the right host screen after signing instead of landing in a dead-end state."
    );
    complexity += 1;
  }

  if (selectedCompletion === "verified") {
    methods.push("Callback plus webhook verification");
    pushCard(
      stages,
      "Verified completion",
      "Return stage",
      "Pair the host callback with downstream event verification so the product does not trust the front-end signal alone."
    );
    rules.push(
      "Host completion callbacks are stronger when paired with verified downstream events, especially if the embed controls money, onboarding, or legal state changes."
    );
    checklist.push(
      "The host app can verify completion with a downstream event before marking the workflow fully done."
    );
    complexity += 2;
    plan = "Verified Completion Embed";
    summary =
      "Return control to the host app and verify the downstream event before the product treats the embedded session as fully done.";
  }

  if (selectedMobile === "desktop") {
    rules.push(
      "Desktop-first signing is easier to control, but the buyer should be explicit that risky mobile sessions are not part of phase one."
    );
  }

  if (selectedMobile === "responsive") {
    methods.push("Responsive signer QA");
    pushCard(
      stages,
      "Responsive viewport",
      "Mobile stage",
      "Validate the embedded signer in common device sizes before the buyer assumes the host shell is safe on mobile."
    );
    checklist.push(
      "The embedded signing lane is tested in the mobile viewport sizes the buyer actually expects to support."
    );
    complexity += 1;
  }

  if (selectedMobile === "rotate") {
    methods.push("Orientation QA");
    pushCard(
      stages,
      "Orientation fallback",
      "Mobile stage",
      "Test portrait and landscape signature behavior so the signature pad does not shift or displace user input."
    );
    rules.push(
      "Orientation-sensitive signing needs explicit QA because rotation can move the signature surface and damage the signing experience."
    );
    checklist.push(
      "Portrait and landscape signing both behave correctly on the mobile devices the buyer expects to support."
    );
    complexity += 2;
    plan = "Orientation-Safe Sign Flow";
    summary =
      "Treat mobile orientation as a launch scope item before the buyer promises embedded signing on phones and tablets.";
  }

  if (selectedMobile === "external") {
    methods.push("Mobile escape hatch");
    pushCard(
      stages,
      "Hosted mobile fallback",
      "Mobile stage",
      "Open the safer hosted signing page when mobile conditions make the embedded shell too risky."
    );
    rules.push(
      "A mobile escape hatch is better than forcing a broken embedded signature experience through a host shell that cannot safely support it."
    );
    checklist.push(
      "Risky mobile sessions can fall back to a hosted signing page instead of forcing a broken in-app signature flow."
    );
    complexity += 2;
    plan = "Mobile-Safe Embed Launch";
    summary =
      "Keep the embedded experience for stable sessions and send risky mobile traffic to a safer hosted path before signatures fail.";
  }

  if (selectedSurface === "authoring" && selectedAuth === "presign") {
    plan = "Presigned Authoring Launch";
    summary =
      "Validate the presign handoff inside the authoring shell before document creation reaches production and fails on auth mismatch.";
  }

  if (
    selectedFieldLock === "full" &&
    (selectedCompletion === "confirm" || selectedCompletion === "verified")
  ) {
    plan = "Review-and-Confirm Embed";
    summary =
      "Lock the session for review but keep a visible completion path so fully prepared documents can still be finished inside the host product.";
  }

  if (selectedAuth === "session" && selectedCompletion === "verified") {
    plan = "Host-Verified Embed Launch";
    summary =
      "Keep auth server-side and pair host completion with verified downstream events so the product can trust embedded signing before changing business state.";
  }

  if (selectedPrefill === "api" && selectedFieldLock !== "editable") {
    plan = "Prepared Review Embed";
    summary =
      "Inject prepared values before open and prove the signer can review, confirm, and complete the embedded session without field drift.";
  }

  const preview = {
    surface:
      selectedSurface === "signer"
        ? "embedded_signer"
        : selectedSurface === "authoring"
          ? "embedded_authoring"
          : selectedSurface === "review"
            ? "review_sign_portal"
            : "partner_portal_embed",
    auth_mode:
      selectedAuth === "direct"
        ? "direct_signer_token"
        : selectedAuth === "presign"
          ? "presign_token"
          : selectedAuth === "session"
            ? "server_session_relay"
            : "email_fallback_link",
    prefill_mode:
      selectedPrefill === "none"
        ? "manual_entry"
        : selectedPrefill === "template"
          ? "template_field_id_prefill"
          : "api_prefill_before_open",
    field_lock_mode:
      selectedFieldLock === "editable"
        ? "editable_fields"
        : selectedFieldLock === "text"
          ? "readonly_text_review"
          : selectedFieldLock === "mixed"
            ? "readonly_text_plus_locked_choices"
            : "fully_readonly_session",
    completion_mode:
      selectedCompletion === "confirm"
        ? "explicit_confirm_cta"
        : selectedCompletion === "callback"
          ? "host_callback"
          : selectedCompletion === "redirect"
            ? "redirect_back_to_app"
            : "callback_plus_webhook_verification",
    mobile_policy:
      selectedMobile === "desktop"
        ? "desktop_first"
        : selectedMobile === "responsive"
          ? "responsive_signer_qa"
          : selectedMobile === "rotate"
            ? "orientation_sensitive_qa"
            : "hosted_mobile_escape_hatch",
    host_callbacks: [],
  };

  if (selectedAuth === "direct") {
    preview.sign_token = "sign_12345";
  }

  if (selectedAuth === "presign") {
    preview.presign_token = "jwt_here";
    preview.embed_component = "@documenso/embed-react";
  }

  if (selectedAuth === "session") {
    preview.session_boundary = "server_owned";
  }

  if (selectedPrefill === "template" || selectedPrefill === "api") {
    preview.generate_endpoint = "/api/v1/documents/{id}/generate-document";
    preview.prefill_fields = [{ id: 409, value: "customer_name" }];
  }

  if (selectedFieldLock === "mixed" || selectedFieldLock === "full") {
    preview.readonly_fields = ["customer_name", "consent_yes"];
  }

  if (selectedCompletion === "callback" || selectedCompletion === "verified") {
    preview.host_callbacks.push("onDocumentCompleted");
  }

  if (selectedCompletion === "redirect") {
    preview.redirect_url = "https://app.example.com/contracts/4821";
  }

  if (selectedCompletion === "verified") {
    preview.host_callbacks.push("webhook_verification");
  }

  if (selectedMobile === "external") {
    preview.mobile_fallback = "hosted_signing_link";
  }

  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const previewText = JSON.stringify(preview, null, 2);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the embed lane is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one host-owned surface, one explicit session boundary, and one bounded completion path. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the launch narrow enough that auth, prefill, and mobile failures can be caught without breaking the buyer's live workflow.`;

  let offerKey = "audit";
  if (complexity >= 3) {
    offerKey = "sprint";
  }
  if (
    complexity >= 8 ||
    selectedSurface === "authoring" ||
    selectedAuth === "session" ||
    selectedCompletion === "verified" ||
    (selectedFieldLock !== "editable" && selectedMobile !== "desktop")
  ) {
    offerKey = "workspace";
  }
  if (
    complexity <= 2 &&
    selectedPrefill === "none" &&
    selectedFieldLock === "editable" &&
    selectedCompletion !== "verified"
  ) {
    offerKey = "audit";
  }

  const offer = embedOfferCatalog[offerKey];

  embedPlanName.textContent = plan;
  embedPlanSummary.textContent = summary;
  embedMethods.innerHTML = uniqueMethods.length
    ? uniqueMethods.map((method) => `<span class="stack-chip">${method}</span>`).join("")
    : '<span class="stack-chip">Map the embed lane first</span>';
  embedStageMap.innerHTML = renderCards(stages);
  embedPreview.textContent = previewText;
  embedRules.innerHTML = asBullets(uniqueRules);
  embedBrief.textContent = brief;
  embedChecklist.innerHTML = asBullets(uniqueChecklist);
  embedOfferName.textContent = offer.label;
  embedOfferNote.textContent = offer.note;
  embedOfferLink.href = offer.link;
  embedOfferLink.textContent = `Open ${offer.label}`;

  copyEmbedPreview.dataset.copy = previewText;
  copyEmbedBrief.dataset.copy = brief;
  copyEmbedChecklist.dataset.copy = uniqueChecklist
    .map((item) => `- ${item}`)
    .join("\n");
};

[embedSurface, embedAuthMode, embedPrefillMode, fieldLockMode, completionMode, mobileMode].forEach((input) =>
  input?.addEventListener("input", renderEmbedLaunchpad)
);

copyEmbedPreview?.addEventListener("click", () => copyEmbedText(copyEmbedPreview));
copyEmbedBrief?.addEventListener("click", () => copyEmbedText(copyEmbedBrief));
copyEmbedChecklist?.addEventListener("click", () => copyEmbedText(copyEmbedChecklist));

renderEmbedLaunchpad();
