const packetOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs the packet structure, reusable template list, and shared field model mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the buyer already knows the first packet lane and just needs a reusable packet structure instead of repeated one-off edits.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when bundle composition, shared field governance, optional parties, and multi-document launch control need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const packetScope = document.getElementById("packetScope");
const sourceModel = document.getElementById("sourceModel");
const fieldReuse = document.getElementById("fieldReuse");
const partyModel = document.getElementById("partyModel");
const prefillModel = document.getElementById("prefillModel");
const changeMode = document.getElementById("changeMode");

const packetPlanName = document.getElementById("packetPlanName");
const packetPlanSummary = document.getElementById("packetPlanSummary");
const packetMethods = document.getElementById("packetMethods");
const packetBundleMap = document.getElementById("packetBundleMap");
const packetPreview = document.getElementById("packetPreview");
const packetRules = document.getElementById("packetRules");
const packetBrief = document.getElementById("packetBrief");
const packetChecklist = document.getElementById("packetChecklist");
const packetOfferName = document.getElementById("packetOfferName");
const packetOfferNote = document.getElementById("packetOfferNote");
const packetOfferLink = document.getElementById("packetOfferLink");
const copyPacketPreview = document.getElementById("copyPacketPreview");
const copyPacketBrief = document.getElementById("copyPacketBrief");
const copyPacketChecklist = document.getElementById("copyPacketChecklist");

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

const copyPacketText = async (button) => {
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

const renderPacketBuilder = () => {
  const selectedScope = packetScope?.value || "contract";
  const selectedSource = sourceModel?.value || "existing";
  const selectedReuse = fieldReuse?.value || "shared";
  const selectedParty = partyModel?.value || "fixed";
  const selectedPrefill = prefillModel?.value || "template";
  const selectedChange = changeMode?.value || "snapshot";

  const methods = [];
  const bundleMap = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Modular Contract Packet";
  let summary =
    "Keep each recurring document as a reusable unit, then define one packet layer that decides how shared roles and fields flow across the whole send.";

  pushCard(
    bundleMap,
    "Packet shell",
    "Packet stage",
    "Define one reusable packet shell that decides document order, shared roles, and packet-level launch rules."
  );

  if (selectedScope === "contract") {
    methods.push("Main agreement plus annexes");
    pushCard(
      bundleMap,
      "Contract core",
      "Document block",
      "Main agreement acts as the packet anchor while annexes, pricing, and DPAs inherit shared parties and data blocks."
    );
    pushCard(
      bundleMap,
      "Annex layer",
      "Document block",
      "Annexes and schedules stay modular so legal edits do not force one giant template rebuild."
    );
    complexity += 1;
  }

  if (selectedScope === "onboarding") {
    methods.push("Onboarding packet");
    pushCard(
      bundleMap,
      "Identity and tax forms",
      "Document block",
      "Core identity and tax docs share the same person profile and signer lane."
    );
    pushCard(
      bundleMap,
      "Policy and consent docs",
      "Document block",
      "Acknowledgements and consents inherit the same prepared person data instead of asking again."
    );
    plan = "Reusable Onboarding Packet";
    summary =
      "Break onboarding into reusable document blocks so identity, policy, and consent forms can share data without becoming one giant template.";
    complexity += 2;
  }

  if (selectedScope === "compliance") {
    methods.push("Consent and compliance packet");
    pushCard(
      bundleMap,
      "Consent stack",
      "Document block",
      "Consent, disclosure, and supporting forms share role logic but still need separate documents for governance and revision control."
    );
    pushCard(
      bundleMap,
      "Evidence annexes",
      "Document block",
      "Additional forms and evidence annexes can be added without redrawing shared identity or parent fields."
    );
    plan = "Compliance Packet Bundle";
    summary =
      "Keep each compliance form modular while sharing the right roles and prepared data across the packet.";
    complexity += 2;
  }

  if (selectedScope === "client") {
    methods.push("Client intake packet");
    pushCard(
      bundleMap,
      "Client profile intake",
      "Document block",
      "Core profile and consent data should only be prepared once, then reused across later intake docs."
    );
    pushCard(
      bundleMap,
      "Supporting service forms",
      "Document block",
      "Service-specific forms inherit the same client data instead of being rebuilt as isolated one-offs."
    );
    plan = "Client Intake Packet";
    summary =
      "Use a modular intake packet so shared client profile data can drive several related forms without duplicate maintenance.";
    complexity += 2;
  }

  if (selectedSource === "existing") {
    methods.push("Existing template library");
    pushCard(
      bundleMap,
      "Template library reuse",
      "Source stage",
      "Keep reusable templates as first-class assets and compose packets from them instead of flattening them into static uploads."
    );
    checklist.push(
      "The first packet reuses existing templates instead of rebuilding every document from uploaded PDFs."
    );
    complexity += 1;
  }

  if (selectedSource === "mixed") {
    methods.push("Mixed templates and uploads");
    pushCard(
      bundleMap,
      "Hybrid packet source",
      "Source stage",
      "Combine reusable templates with uploaded documents only where the packet still lacks a clean reusable source."
    );
    rules.push(
      "Mixed packet sources need a clear boundary for which documents are reusable templates and which remain temporary uploads."
    );
    complexity += 2;
  }

  if (selectedSource === "master") {
    methods.push("Master template split plan");
    pushCard(
      bundleMap,
      "Master split boundary",
      "Source stage",
      "One large master template should be split into reusable document blocks before the next revision makes maintenance worse."
    );
    rules.push(
      "Master templates are fast at first but become brittle when several annexes evolve at different speeds."
    );
    complexity += 2;
    plan = "Master Template Split Plan";
    summary =
      "Split the giant master template into reusable blocks before packet maintenance turns every minor change into a high-risk edit.";
  }

  if (selectedSource === "scratch") {
    methods.push("Bundle-from-scratch scaffold");
    pushCard(
      bundleMap,
      "Greenfield packet shell",
      "Source stage",
      "Design the packet as reusable document blocks from day one so field and role duplication never becomes the baseline."
    );
    complexity += 1;
  }

  if (selectedReuse === "shared") {
    methods.push("Shared profile field blocks");
    pushCard(
      bundleMap,
      "Shared field block",
      "Reuse stage",
      "Core profile data like name, address, DOB, or legal entity fields should be defined once and reused across documents."
    );
    checklist.push(
      "Core profile fields are defined once and mapped consistently across every document in the packet."
    );
    complexity += 1;
  }

  if (selectedReuse === "copy") {
    methods.push("Exact field copy pattern");
    pushCard(
      bundleMap,
      "Field copy lane",
      "Reuse stage",
      "Reuse the exact field positions and types when design refreshes create a new template with only minor visual changes."
    );
    rules.push(
      "Exact field-copy patterns matter when minor visual refreshes would otherwise force teams to redraw the same field layout."
    );
    checklist.push(
      "Minor template refreshes can inherit the exact core field layout instead of requiring a full redraw."
    );
    complexity += 2;
  }

  if (selectedReuse === "inherit") {
    methods.push("Template-linked inheritance");
    pushCard(
      bundleMap,
      "Linked inheritance boundary",
      "Reuse stage",
      "Define whether the packet references live templates or snapshots them so packet behavior stays predictable after template updates."
    );
    rules.push(
      "Template-linked inheritance needs a clear policy for whether bundle members track template changes or freeze a packet version."
    );
    checklist.push(
      "The packet defines whether linked templates stay live or are snapped into a fixed bundle version."
    );
    complexity += 2;
    plan = "Linked Packet Bundle";
    summary =
      "Compose the packet from reusable template units while making link-versus-snapshot behavior explicit before governance gets messy.";
  }

  if (selectedReuse === "party") {
    methods.push("Party-level field copying");
    pushCard(
      bundleMap,
      "Party field reuse",
      "Reuse stage",
      "Allow similar field sequences to be copied or reassigned between parties instead of rebuilding each signer lane from scratch."
    );
    rules.push(
      "Party-level field reuse matters when similar data blocks belong to several parties and accidents in assignment would otherwise force manual rebuilds."
    );
    checklist.push(
      "Similar field sequences can be copied or reassigned between parties without rebuilding them one by one."
    );
    complexity += 2;
  }

  if (selectedParty === "fixed") {
    methods.push("Fixed signer roles");
    checklist.push(
      "The packet has one stable signer-role map before documents are bundled together."
    );
    complexity += 1;
  }

  if (selectedParty === "optional") {
    methods.push("Optional second party");
    pushCard(
      bundleMap,
      "Optional role boundary",
      "Party stage",
      "The packet can handle a second signer only when needed without forcing every send into a two-party workflow."
    );
    rules.push(
      "Optional parties should be handled deliberately or family and consent packets will either over-collect signatures or break when the second signer is absent."
    );
    checklist.push(
      "The packet can safely run with or without the optional second party when the workflow requires that flexibility."
    );
    complexity += 2;
  }

  if (selectedParty === "review") {
    methods.push("Signer and reviewer mix");
    pushCard(
      bundleMap,
      "Review lane",
      "Party stage",
      "Separate review-only or acknowledgement roles from actual signers before packet reuse hides the approval path inside each document."
    );
    complexity += 1;
  }

  if (selectedParty === "parallel") {
    methods.push("Several similar parties");
    pushCard(
      bundleMap,
      "Parallel role lane",
      "Party stage",
      "Parallel parties need shared field sequences and consistent packet logic or the bundle becomes too expensive to maintain."
    );
    rules.push(
      "Parallel party packets should reuse role patterns instead of drawing a fresh copy of similar field groups for each participant."
    );
    complexity += 2;
  }

  if (selectedPrefill === "manual") {
    rules.push(
      "Manual packet prep is acceptable only when the document count and repeated identity fields stay small enough to control."
    );
  }

  if (selectedPrefill === "template") {
    methods.push("Shared packet data blocks");
    pushCard(
      bundleMap,
      "Packet data block",
      "Prefill stage",
      "Prepared data blocks should flow through every packet document that uses the same identity or company profile values."
    );
    checklist.push(
      "Prepared packet data blocks can prefill the repeated identity and profile fields across the packet."
    );
    complexity += 1;
  }

  if (selectedPrefill === "db") {
    methods.push("DB or spreadsheet population");
    pushCard(
      bundleMap,
      "Population source",
      "Prefill stage",
      "Use source records to pre-populate long packets before the signer sees them."
    );
    rules.push(
      "DB or spreadsheet population matters most when the packet is long enough that repeated manual entry would make review painful."
    );
    checklist.push(
      "The packet can be pre-populated from DB or spreadsheet records before the signer starts reviewing."
    );
    complexity += 2;
  }

  if (selectedPrefill === "review") {
    methods.push("Prepared values with review correction");
    pushCard(
      bundleMap,
      "Review correction lane",
      "Prefill stage",
      "Prepared values should reduce effort without blocking the signer from correcting the few fields that may still need edits."
    );
    rules.push(
      "Review-correction packets should clearly separate locked identity data from fields the signer is allowed to fix."
    );
    complexity += 2;
  }

  if (selectedChange === "snapshot") {
    methods.push("Snapshot packet version");
    checklist.push(
      "The packet has a fixed version boundary so later template changes do not silently change in-flight packets."
    );
    complexity += 1;
  }

  if (selectedChange === "linked") {
    methods.push("Linked template updates");
    pushCard(
      bundleMap,
      "Update policy",
      "Change stage",
      "Linked packet members can inherit template updates, but only if governance and release timing are explicit."
    );
    rules.push(
      "Linked update behavior should be deliberate because one template edit can alter several packets at once."
    );
    complexity += 2;
  }

  if (selectedChange === "clone") {
    methods.push("Clone then customize");
    pushCard(
      bundleMap,
      "Clone boundary",
      "Change stage",
      "Clone stable packet members before making customer- or version-specific changes that should not flow back to the reusable core."
    );
    checklist.push(
      "Customer-specific or version-specific changes happen in clones, not in the core reusable packet members."
    );
    complexity += 1;
  }

  if (selectedChange === "refresh") {
    methods.push("Minor-design refresh reuse");
    pushCard(
      bundleMap,
      "Refresh reuse path",
      "Change stage",
      "Preserve the core field structure when a visual refresh or minor redesign creates a new packet variant."
    );
    rules.push(
      "Minor-design refreshes should not reset the packet architecture or force a full field redraw if the underlying business structure stayed the same."
    );
    checklist.push(
      "Minor packet design refreshes can reuse the core field and role structure without a full rebuild."
    );
    complexity += 2;
  }

  if (selectedScope === "onboarding" && selectedParty === "optional") {
    plan = "Flexible Onboarding Packet";
    summary =
      "Use reusable onboarding packet blocks that can carry shared profile data while handling optional family or secondary-party roles cleanly.";
  }

  if (selectedSource === "existing" && selectedReuse === "inherit") {
    plan = "Template-Composed Packet";
    summary =
      "Compose the packet from reusable templates and shared role blocks before duplicate maintenance turns the packet into several drifting copies.";
  }

  if (selectedReuse === "copy" && selectedChange === "refresh") {
    plan = "Refresh-Safe Packet Reuse";
    summary =
      "Preserve the exact core field layout through visual refreshes so packet updates do not force a redraw of the same recurring forms.";
  }

  if (selectedSource === "mixed" && selectedChange === "linked") {
    plan = "Hybrid Packet Governance";
    summary =
      "Separate reusable template members from one-off uploads and make link behavior explicit before mixed packet maintenance becomes chaotic.";
  }

  if (selectedSource === "master" && selectedReuse !== "copy") {
    plan = "Master Packet Split Plan";
    summary =
      "Break the giant packet template into reusable blocks before legal, onboarding, and consent changes start colliding inside one file.";
  }

  const preview = {
    packet_scope:
      selectedScope === "contract"
        ? "contract_annex_packet"
        : selectedScope === "onboarding"
          ? "onboarding_packet"
          : selectedScope === "compliance"
            ? "consent_compliance_packet"
            : "client_intake_packet",
    source_model:
      selectedSource === "existing"
        ? "existing_templates"
        : selectedSource === "mixed"
          ? "mixed_templates_and_uploads"
          : selectedSource === "master"
            ? "single_master_template"
            : "bundle_from_scratch",
    field_reuse:
      selectedReuse === "shared"
        ? "shared_profile_fields"
        : selectedReuse === "copy"
          ? "copy_exact_fields"
          : selectedReuse === "inherit"
            ? "template_linked_inheritance"
            : "copy_or_move_between_parties",
    party_model:
      selectedParty === "fixed"
        ? "fixed_roles"
        : selectedParty === "optional"
          ? "optional_second_party"
          : selectedParty === "review"
            ? "signer_reviewer_mix"
            : "parallel_similar_parties",
    prefill_model:
      selectedPrefill === "manual"
        ? "manual_packet_prep"
        : selectedPrefill === "template"
          ? "shared_packet_data_blocks"
          : selectedPrefill === "db"
            ? "db_or_spreadsheet_population"
            : "prepared_values_with_review_correction",
    change_mode:
      selectedChange === "snapshot"
        ? "snapshot_bundle_version"
        : selectedChange === "linked"
          ? "linked_template_updates"
          : selectedChange === "clone"
            ? "clone_then_customize"
            : "minor_design_refresh_reuse",
    packet_members: [],
  };

  if (selectedScope === "contract") {
    preview.packet_members = ["main_agreement", "dpa", "pricing_annex"];
  }

  if (selectedScope === "onboarding") {
    preview.packet_members = ["identity_form", "tax_form", "policy_acknowledgement"];
  }

  if (selectedScope === "compliance") {
    preview.packet_members = ["consent_form", "disclosure_form", "supporting_annex"];
  }

  if (selectedScope === "client") {
    preview.packet_members = ["client_profile", "service_intake", "consent_annex"];
  }

  if (selectedSource === "existing") {
    preview.packet_strategy = "compose_from_template_ids";
  }

  if (selectedSource === "mixed") {
    preview.packet_strategy = "templates_plus_uploaded_docs";
  }

  if (selectedSource === "master") {
    preview.packet_strategy = "split_master_into_reusable_blocks";
  }

  if (selectedSource === "scratch") {
    preview.packet_strategy = "greenfield_bundle_scaffold";
  }

  if (selectedReuse === "inherit") {
    preview.merge_method = "mergeTemplates";
  }

  if (selectedReuse === "copy" || selectedChange === "refresh") {
    preview.template_refresh = "reuse_core_field_layout";
  }

  if (selectedParty === "optional") {
    preview.optional_roles = ["second_parent_or_secondary_signer"];
  }

  if (selectedPrefill === "db") {
    preview.prefill_source = "db_or_spreadsheet";
  }

  if (selectedPrefill === "template" || selectedPrefill === "review") {
    preview.shared_fields = ["customer_name", "address_line_1", "dob"];
  }

  const previewText = JSON.stringify(preview, null, 2);
  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules).slice(0, 5);
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the packet structure is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one reusable packet shell, one explicit field reuse rule, and one bounded change-control policy. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the packet narrow enough that bundle members, signer roles, and prepared field blocks can evolve without forcing a full rebuild.`;

  let offerKey = "audit";
  if (complexity >= 3) {
    offerKey = "sprint";
  }
  if (
    complexity >= 8 ||
    selectedReuse === "inherit" ||
    selectedSource === "mixed" ||
    selectedParty === "optional" ||
    selectedChange === "linked"
  ) {
    offerKey = "workspace";
  }
  if (
    complexity <= 2 &&
    selectedSource !== "mixed" &&
    selectedChange !== "linked"
  ) {
    offerKey = "audit";
  }

  const offer = packetOfferCatalog[offerKey];

  packetPlanName.textContent = plan;
  packetPlanSummary.textContent = summary;
  packetMethods.innerHTML = uniqueMethods.length
    ? uniqueMethods.map((method) => `<span class="stack-chip">${method}</span>`).join("")
    : '<span class="stack-chip">Map the packet first</span>';
  packetBundleMap.innerHTML = renderCards(bundleMap);
  packetPreview.textContent = previewText;
  packetRules.innerHTML = asBullets(uniqueRules);
  packetBrief.textContent = brief;
  packetChecklist.innerHTML = asBullets(uniqueChecklist);
  packetOfferName.textContent = offer.label;
  packetOfferNote.textContent = offer.note;
  packetOfferLink.href = offer.link;
  packetOfferLink.textContent = `Open ${offer.label}`;

  copyPacketPreview.dataset.copy = previewText;
  copyPacketBrief.dataset.copy = brief;
  copyPacketChecklist.dataset.copy = uniqueChecklist
    .map((item) => `- ${item}`)
    .join("\n");
};

[packetScope, sourceModel, fieldReuse, partyModel, prefillModel, changeMode].forEach((input) => {
  input?.addEventListener("input", renderPacketBuilder);
  input?.addEventListener("change", renderPacketBuilder);
});

copyPacketPreview?.addEventListener("click", () => copyPacketText(copyPacketPreview));
copyPacketBrief?.addEventListener("click", () => copyPacketText(copyPacketBrief));
copyPacketChecklist?.addEventListener("click", () => copyPacketText(copyPacketChecklist));

renderPacketBuilder();
