const brandOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs its brand surfaces, locale coverage, and ownership boundaries mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when one branded signer lane is already clear and needs to be implemented with the right email and locale controls.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when white-label branding, custom domains, multilingual signer flows, and tenant-owned sender settings need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const brandSurface = document.getElementById("brandSurface");
const domainMode = document.getElementById("domainMode");
const localeCoverage = document.getElementById("localeCoverage");
const emailRendering = document.getElementById("emailRendering");
const orgSync = document.getElementById("orgSync");
const trustProof = document.getElementById("trustProof");

const brandPlanName = document.getElementById("brandPlanName");
const brandPlanSummary = document.getElementById("brandPlanSummary");
const brandMethods = document.getElementById("brandMethods");
const brandMap = document.getElementById("brandMap");
const brandPreview = document.getElementById("brandPreview");
const brandRules = document.getElementById("brandRules");
const brandBrief = document.getElementById("brandBrief");
const brandChecklist = document.getElementById("brandChecklist");
const brandOfferName = document.getElementById("brandOfferName");
const brandOfferNote = document.getElementById("brandOfferNote");
const brandOfferLink = document.getElementById("brandOfferLink");
const copyBrandPreview = document.getElementById("copyBrandPreview");
const copyBrandBrief = document.getElementById("copyBrandBrief");
const copyBrandChecklist = document.getElementById("copyBrandChecklist");

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

const copyBrandText = async (button) => {
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

const renderBrandLocalePlanner = () => {
  const selectedSurface = brandSurface?.value || "signing_page";
  const selectedDomain = domainMode?.value || "app_domain";
  const selectedLocale = localeCoverage?.value || "multilingual";
  const selectedEmail = emailRendering?.value || "styled";
  const selectedOrg = orgSync?.value || "per_org";
  const selectedTrust = trustProof?.value || "localized_completion";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Branded Multilingual Signing Lane";
  let summary =
    "Use a custom signing domain, visible page branding, multilingual signer coverage, and localized completion copy so recipients trust the whole lane instead of only the mail envelope.";

  pushCard(
    map,
    "Brand boundary",
    "Brand stage",
    "One owned brand boundary should explain which logo, domain, sender identity, and locale the signer sees from invite through completion."
  );
  rules.push(
    "Brand and locale should be QA'd on the exact signer and mail surfaces the buyer will use, because logo, domain, and language expectations drift quickly between staging and production."
  );
  checklist.push(
    "One owned brand boundary exists before invites and signing pages reach production."
  );

  if (selectedSurface === "signing_page") {
    methods.push("Signing page first");
    pushCard(
      map,
      "Signer page chrome",
      "Surface stage",
      "Recipients often judge trust when they open the signing page, so visible brand elements should not disappear after the email click."
    );
    checklist.push(
      "The signing page shows the intended logo or brand markers instead of falling back to a generic provider surface."
    );
    complexity += 2;
  }

  if (selectedSurface === "invite_email") {
    methods.push("Invite email first");
    pushCard(
      map,
      "Mail first impression",
      "Surface stage",
      "If the invite email is the first trust touchpoint, its layout and sender presentation need to match the product the buyer says is sending the request."
    );
    checklist.push(
      "The invite email looks like the buyer's workflow instead of a generic relay message."
    );
    complexity += 1;
  }

  if (selectedSurface === "portal_shell") {
    methods.push("Portal and mail together");
    pushCard(
      map,
      "Portal handoff",
      "Surface stage",
      "Brand trust is stronger when email, portal shell, and signing page agree on who owns the workflow."
    );
    complexity += 2;
    plan = "Portal-Branded Signer Lane";
    summary =
      "Align email, portal shell, and signing page branding so the signer moves through one owned workflow instead of crossing visual seams.";
  }

  if (selectedSurface === "full_white_label") {
    methods.push("Full white-label tenant lane");
    pushCard(
      map,
      "Tenant white-label layer",
      "Surface stage",
      "Full white-label lanes need tenant-safe branding across mail, links, and signer UI instead of one shared workspace identity leaking through."
    );
    checklist.push(
      "Tenant-facing mail and signing surfaces do not leak another workspace or provider identity."
    );
    complexity += 3;
    plan = "Tenant White-Label Brand Stack";
    summary =
      "Build one tenant-safe white-label stack so branded mail, signing UI, and domain ownership stay aligned for every recipient touchpoint.";
  }

  if (selectedDomain === "provider") {
    methods.push("Provider domain only");
    rules.push(
      "Provider domains are acceptable for early validation, but buyers should be explicit that brand trust is still limited by a rented link surface."
    );
    complexity += 1;
  }

  if (selectedDomain === "sending_domain") {
    methods.push("Custom sending domain");
    pushCard(
      map,
      "Mail domain layer",
      "Domain stage",
      "A custom sending domain improves mail trust, but recipients can still lose confidence if the signing link later jumps to a generic host."
    );
    checklist.push(
      "The visible sender domain matches the mail ownership the buyer expects recipients to trust."
    );
    complexity += 2;
  }

  if (selectedDomain === "app_domain") {
    methods.push("Custom app or signing domain");
    pushCard(
      map,
      "Signing domain layer",
      "Domain stage",
      "A custom app or signing domain makes the signer lane feel owned after the email click, not only inside the mailbox preview."
    );
    checklist.push(
      "Recipients can open the signing page on a domain that matches the product or brand they were promised."
    );
    complexity += 2;
  }

  if (selectedDomain === "regional_stack") {
    methods.push("Regional brand stack");
    pushCard(
      map,
      "Regional domain stack",
      "Domain stage",
      "Regional stacks matter when one brand operates across markets that expect different domains, legal footers, or hosted surfaces."
    );
    checklist.push(
      "Regional recipients see the right domain and brand stack for their market instead of one generic global surface."
    );
    complexity += 3;
    plan = "Regional White-Label Brand Stack";
    summary =
      "Use market-specific domains and brand layers so cross-border recipients trust the signer lane without guessing who owns it.";
  }

  if (selectedLocale === "english") {
    methods.push("English only");
    rules.push(
      "English-only launch paths are simpler, but buyers should be explicit when their signer base does not actually need localized surfaces yet."
    );
    complexity += 1;
  }

  if (selectedLocale === "dual") {
    methods.push("Dual-language support");
    pushCard(
      map,
      "Locale pair",
      "Locale stage",
      "Dual-language support works when the buyer can clearly define one primary fallback pair instead of trying to localize everything at once."
    );
    checklist.push(
      "The signer lane supports the primary regional language pair the buyer actually needs in phase one."
    );
    complexity += 2;
  }

  if (selectedLocale === "multilingual") {
    methods.push("Multilingual signer support");
    pushCard(
      map,
      "Locale library",
      "Locale stage",
      "Multilingual lanes need consistent signer copy across invite, page chrome, and completion messaging instead of partial translation."
    );
    checklist.push(
      "Core signer messages stay consistent across the languages the buyer promises to support."
    );
    complexity += 2;
  }

  if (selectedLocale === "auto") {
    methods.push("Auto-routed locale");
    pushCard(
      map,
      "Locale routing",
      "Locale stage",
      "Auto-routed locale needs a reliable recipient signal or the wrong language can appear on the first brand touchpoint."
    );
    rules.push(
      "Automatic locale routing should have a deterministic fallback so recipients do not see the wrong language because one user attribute was missing."
    );
    checklist.push(
      "Locale routing has a deterministic fallback when the recipient's preferred language is missing."
    );
    complexity += 3;
    plan = "Auto-Routed Multilingual Signer Lane";
    summary =
      "Route recipients into the right language deliberately so brand trust survives across invite, signer page, and completion states.";
  }

  if (selectedEmail === "plain") {
    methods.push("Plain text only");
    rules.push(
      "Plain text invites are operationally light, but buyers should accept that their first impression will be functional rather than brand-rich."
    );
    complexity += 1;
  }

  if (selectedEmail === "styled") {
    methods.push("Styled invite blocks");
    pushCard(
      map,
      "Mail chrome",
      "Email stage",
      "Styled invite blocks help recipients recognize the workflow as owned by the buyer instead of a low-context system message."
    );
    complexity += 1;
  }

  if (selectedEmail === "html") {
    methods.push("HTML email sections");
    pushCard(
      map,
      "Template rendering",
      "Email stage",
      "HTML-capable templates let the buyer carry brand structure, support guidance, and visual hierarchy into the invite itself."
    );
    checklist.push(
      "Email templates can carry the intended visual hierarchy instead of collapsing all invite trust into plain text."
    );
    complexity += 2;
  }

  if (selectedEmail === "variant") {
    methods.push("Role-based branded variants");
    pushCard(
      map,
      "Recipient variants",
      "Email stage",
      "Role-specific invite variants matter when signers, observers, and approvers should see different branded explanations of the same workflow."
    );
    checklist.push(
      "Different recipient roles can receive the right branded message variant without forking the whole workflow."
    );
    complexity += 2;
  }

  if (selectedOrg === "shared") {
    methods.push("Shared ops identity");
    rules.push(
      "A shared ops identity is workable only when one team owns the full workflow and no tenant or regional brand boundary needs to be preserved."
    );
    complexity += 1;
  }

  if (selectedOrg === "per_org") {
    methods.push("Per-organization sender settings");
    pushCard(
      map,
      "Org settings sync",
      "Organization stage",
      "Organization-level sender settings should stay in sync with the chosen brand surface so operator changes do not silently rewrite recipient trust."
    );
    checklist.push(
      "Organization sender settings stay aligned with the chosen logo, sender identity, and signer domain."
    );
    complexity += 2;
  }

  if (selectedOrg === "tenant_owned") {
    methods.push("Tenant-owned sender and reply");
    pushCard(
      map,
      "Tenant owner settings",
      "Organization stage",
      "Tenant-owned brand settings matter when white-label buyers expect each workspace to own the visible sender, reply-to, and support posture."
    );
    checklist.push(
      "Tenant owners can preserve their sender, reply, and brand settings without inheriting another workspace's defaults."
    );
    complexity += 3;
    plan = "Tenant White-Label Brand Stack";
    summary =
      "Preserve tenant-owned sender, reply, and domain settings so white-label recipients see one coherent brand instead of shared-workspace leakage.";
  }

  if (selectedOrg === "delegated") {
    methods.push("Delegated brand owner controls");
    pushCard(
      map,
      "Brand owner workflow",
      "Organization stage",
      "Delegated controls help when marketing, compliance, or tenant success owns parts of the visible brand system without owning the whole signing infrastructure."
    );
    complexity += 2;
  }

  if (selectedTrust === "logo_footer") {
    methods.push("Logo plus legal footer");
    checklist.push(
      "Invite and signer surfaces show the correct logo and legal footer before rollout."
    );
    complexity += 1;
  }

  if (selectedTrust === "help_contact") {
    methods.push("Branded help contact");
    pushCard(
      map,
      "Escalation surface",
      "Trust stage",
      "Brand trust is stronger when recipients can see where to ask for help without falling back to a generic platform contact."
    );
    checklist.push(
      "Recipients can find a branded support or escalation contact on the main brand surfaces."
    );
    complexity += 1;
  }

  if (selectedTrust === "localized_completion") {
    methods.push("Localized completion copy");
    pushCard(
      map,
      "Completion language layer",
      "Trust stage",
      "Localized completion messaging helps the signer stay inside the buyer's language and trust context even after the signature is done."
    );
    checklist.push(
      "Completion copy stays localized in the languages the buyer promises instead of reverting to generic default text."
    );
    complexity += 2;
  }

  if (selectedTrust === "audit_followup") {
    methods.push("Branded audit follow-up pack");
    pushCard(
      map,
      "Post-sign proof",
      "Trust stage",
      "A branded follow-up pack matters when buyers want proof, archive cues, and next-step messaging to look owned after the signer finishes."
    );
    checklist.push(
      "Post-sign proof and follow-up assets still reinforce the same brand system instead of reverting to a neutral export."
    );
    complexity += 2;
  }

  if (
    selectedSurface === "full_white_label" &&
    selectedDomain === "regional_stack" &&
    selectedLocale === "auto"
  ) {
    plan = "Regional White-Label Brand Stack";
    summary =
      "Coordinate tenant branding, market-specific domains, and locale routing so white-label recipients see the right brand and language from the first email through completion.";
  }

  if (
    selectedSurface === "signing_page" &&
    selectedDomain === "app_domain" &&
    selectedLocale === "multilingual" &&
    selectedTrust === "localized_completion"
  ) {
    plan = "Branded Multilingual Signing Lane";
    summary =
      "Use a custom signing domain, visible page branding, multilingual signer coverage, and localized completion copy so recipients trust the whole lane instead of only the mail envelope.";
  }

  const preview = {
    brand_surface:
      selectedSurface === "signing_page"
        ? "signing_page_first"
        : selectedSurface === "invite_email"
          ? "invite_email_first"
          : selectedSurface === "portal_shell"
            ? "portal_and_mail_together"
            : "full_white_label_tenant_lane",
    domain_mode:
      selectedDomain === "provider"
        ? "provider_domain_only"
        : selectedDomain === "sending_domain"
          ? "custom_sending_domain"
          : selectedDomain === "app_domain"
            ? "custom_app_or_signing_domain"
            : "regional_brand_stack",
    locale_coverage:
      selectedLocale === "english"
        ? "english_only"
        : selectedLocale === "dual"
          ? "english_plus_one_regional_language"
          : selectedLocale === "multilingual"
            ? "multilingual_signer_support"
            : "auto_routed_locale_by_recipient",
    email_rendering:
      selectedEmail === "plain"
        ? "plain_text_only"
        : selectedEmail === "styled"
          ? "styled_invite_blocks"
          : selectedEmail === "html"
            ? "html_email_sections"
            : "role_based_branded_variants",
    organization_sync:
      selectedOrg === "shared"
        ? "shared_ops_identity"
        : selectedOrg === "per_org"
          ? "per_organization_sender_settings"
          : selectedOrg === "tenant_owned"
            ? "tenant_owned_sender_and_reply"
            : "delegated_brand_owner_controls",
    trust_proof:
      selectedTrust === "logo_footer"
        ? "logo_plus_legal_footer"
        : selectedTrust === "help_contact"
          ? "branded_help_contact"
          : selectedTrust === "localized_completion"
            ? "localized_completion_copy"
            : "branded_audit_follow_up_pack",
    brand_controls: ["owned_brand_boundary"],
  };

  if (selectedSurface === "signing_page") {
    preview.brand_controls.push("signing_page_logo");
  }
  if (selectedSurface === "full_white_label") {
    preview.brand_controls.push("tenant_safe_brand_layer");
  }
  if (selectedDomain === "sending_domain") {
    preview.brand_controls.push("owned_sender_domain");
  }
  if (selectedDomain === "app_domain") {
    preview.brand_controls.push("owned_signing_domain");
  }
  if (selectedDomain === "regional_stack") {
    preview.brand_controls.push("market_specific_domain_stack");
  }
  if (selectedLocale === "multilingual") {
    preview.brand_controls.push("multilingual_signer_copy");
  }
  if (selectedLocale === "auto") {
    preview.brand_controls.push("recipient_locale_routing");
  }
  if (selectedEmail === "html") {
    preview.brand_controls.push("html_email_template_blocks");
  }
  if (selectedEmail === "variant") {
    preview.brand_controls.push("role_specific_brand_variants");
  }
  if (selectedOrg === "per_org") {
    preview.brand_controls.push("org_level_sender_sync");
  }
  if (selectedOrg === "tenant_owned") {
    preview.brand_controls.push("tenant_owned_sender_and_reply");
  }
  if (selectedTrust === "localized_completion") {
    preview.brand_controls.push("localized_completion_state");
  }
  if (selectedTrust === "audit_followup") {
    preview.brand_controls.push("branded_post_sign_proof");
  }

  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the signer sees one coherent brand system";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one chosen brand boundary, one owned domain strategy, and one explicit locale model. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the rollout narrow enough that page branding, email rendering, and completion copy can be verified without brand drift between tenants or regions.`;

  let offerKey = "audit";
  if (complexity >= 4) {
    offerKey = "sprint";
  }
  if (
    complexity >= 8 ||
    selectedSurface === "full_white_label" ||
    selectedDomain === "regional_stack" ||
    selectedOrg === "tenant_owned" ||
    selectedLocale === "auto"
  ) {
    offerKey = "workspace";
  }
  if (
    complexity <= 3 &&
    selectedSurface !== "full_white_label" &&
    selectedDomain !== "regional_stack" &&
    selectedLocale === "english"
  ) {
    offerKey = "audit";
  }

  const offer = brandOfferCatalog[offerKey];
  const previewText = JSON.stringify(preview, null, 2);

  brandPlanName.textContent = plan;
  brandPlanSummary.textContent = summary;
  brandMethods.innerHTML = uniqueMethods.length
    ? uniqueMethods.map((method) => `<span class="stack-chip">${method}</span>`).join("")
    : '<span class="stack-chip">Map brand boundary first</span>';
  brandMap.innerHTML = renderCards(map);
  brandPreview.textContent = previewText;
  brandRules.innerHTML = asBullets(uniqueRules);
  brandBrief.textContent = brief;
  brandChecklist.innerHTML = asBullets(uniqueChecklist);
  brandOfferName.textContent = offer.label;
  brandOfferNote.textContent = offer.note;
  brandOfferLink.href = offer.link;
  brandOfferLink.textContent = `Open ${offer.label}`;

  copyBrandPreview.dataset.copy = previewText;
  copyBrandBrief.dataset.copy = brief;
  copyBrandChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
};

[brandSurface, domainMode, localeCoverage, emailRendering, orgSync, trustProof].forEach((input) =>
  input?.addEventListener("input", renderBrandLocalePlanner)
);

copyBrandPreview?.addEventListener("click", () => copyBrandText(copyBrandPreview));
copyBrandBrief?.addEventListener("click", () => copyBrandText(copyBrandBrief));
copyBrandChecklist?.addEventListener("click", () => copyBrandText(copyBrandChecklist));

renderBrandLocalePlanner();
