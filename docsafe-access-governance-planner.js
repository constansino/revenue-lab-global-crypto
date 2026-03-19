const governanceOfferCatalog = {
  audit: {
    label: "DocSafe Audit",
    note: "Best when the buyer still needs its role, visibility, and archive access model mapped before implementation.",
    link: "./docsafe-audit-start.html",
  },
  sprint: {
    label: "DocSafe Setup Sprint",
    note: "Best when the buyer already knows the main access boundary and just needs the governance model implemented cleanly.",
    link: "./docsafe-setup-sprint-start.html",
  },
  workspace: {
    label: "DocSafe Workspace",
    note: "Best when access control, archive retrieval, branded surfaces, and external storage sync need one controlled environment.",
    link: "./docsafe-workspace-start.html",
  },
};

const workspaceScope = document.getElementById("workspaceScope");
const roleModel = document.getElementById("roleModel");
const visibilityModel = document.getElementById("visibilityModel");
const folderStrategy = document.getElementById("folderStrategy");
const exposurePolicy = document.getElementById("exposurePolicy");
const archiveAccess = document.getElementById("archiveAccess");

const governancePlanName = document.getElementById("governancePlanName");
const governancePlanSummary = document.getElementById("governancePlanSummary");
const governanceMethods = document.getElementById("governanceMethods");
const governanceMap = document.getElementById("governanceMap");
const governancePreview = document.getElementById("governancePreview");
const governanceRules = document.getElementById("governanceRules");
const governanceBrief = document.getElementById("governanceBrief");
const governanceChecklist = document.getElementById("governanceChecklist");
const governanceOfferName = document.getElementById("governanceOfferName");
const governanceOfferNote = document.getElementById("governanceOfferNote");
const governanceOfferLink = document.getElementById("governanceOfferLink");
const copyGovernancePreview = document.getElementById("copyGovernancePreview");
const copyGovernanceBrief = document.getElementById("copyGovernanceBrief");
const copyGovernanceChecklist = document.getElementById("copyGovernanceChecklist");

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

const copyGovernanceText = async (button) => {
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

const renderAccessGovernancePlanner = () => {
  const selectedScope = workspaceScope?.value || "single";
  const selectedRole = roleModel?.value || "split";
  const selectedVisibility = visibilityModel?.value || "private";
  const selectedFolder = folderStrategy?.value || "tree";
  const selectedExposure = exposurePolicy?.value || "minimal";
  const selectedArchive = archiveAccess?.value || "mirror";

  const methods = [];
  const map = [];
  const rules = [];
  const checklist = [];
  let complexity = 0;
  let plan = "Role-Split Private Workspace";
  let summary =
    "Split editors from viewers, keep visibility private by default, and mirror final artifacts into a controlled internal archive path.";

  pushCard(
    map,
    "Authority boundary",
    "Governance stage",
    "One explicit authority model should decide who can edit, who can view, and who can only retrieve completed artifacts."
  );

  if (selectedScope === "single") {
    methods.push("Single-team workspace");
    checklist.push(
      "One internal team boundary is defined before external viewers or archive consumers are added."
    );
    complexity += 1;
  }

  if (selectedScope === "multi") {
    methods.push("Multi-team workspace");
    pushCard(
      map,
      "Team boundary",
      "Scope stage",
      "Several internal teams need an explicit boundary or files will start looking shared by accident rather than by policy."
    );
    checklist.push(
      "Internal teams have an explicit boundary instead of inheriting accidental visibility from one shared admin surface."
    );
    complexity += 2;
  }

  if (selectedScope === "client") {
    methods.push("Client-isolated workspace");
    pushCard(
      map,
      "Client isolation lane",
      "Scope stage",
      "Client-facing workspaces need a separate visibility model from internal operator workspaces even when they share the same infrastructure."
    );
    checklist.push(
      "Client-facing visibility is isolated from internal operator visibility."
    );
    complexity += 2;
    plan = "Client-Isolated Portal";
    summary =
      "Separate internal operators from client-facing viewers so brand, access, and file visibility stay predictable across the workspace.";
  }

  if (selectedScope === "archive") {
    methods.push("Archive-heavy workspace");
    pushCard(
      map,
      "Archive retrieval lane",
      "Scope stage",
      "Archive-heavy environments need their own retrieval and storage rules rather than reusing the same path as active signing work."
    );
    checklist.push(
      "Archive retrieval has a dedicated governance lane instead of borrowing active signer or operator access paths."
    );
    complexity += 3;
    plan = "Archive-Safe Access Model";
    summary =
      "Separate active workspace access from archive retrieval so operators can retrieve records safely without exposing them through public delivery paths.";
  }

  if (selectedRole === "admin") {
    methods.push("Admins only");
    rules.push(
      "Admin-only workspaces are acceptable only for very small teams because they collapse edit, view, and governance authority into one risky role."
    );
    complexity += 1;
  }

  if (selectedRole === "split") {
    methods.push("Editor-viewer split");
    pushCard(
      map,
      "Role split lane",
      "Role stage",
      "Editors and viewers need separate capabilities so file access is useful without forcing every operator to become admin."
    );
    checklist.push(
      "Editors and viewers are separated so normal work does not require admin-level access."
    );
    complexity += 2;
  }

  if (selectedRole === "owner") {
    methods.push("Workspace owners");
    pushCard(
      map,
      "Owner override lane",
      "Role stage",
      "Owner roles should be scoped to the relevant tenant or workspace instead of quietly becoming global admins."
    );
    checklist.push(
      "Owner privileges are scoped to a workspace or tenant rather than defaulting to global admin behavior."
    );
    complexity += 2;
  }

  if (selectedRole === "external") {
    methods.push("External viewer lane");
    pushCard(
      map,
      "External viewer gate",
      "Role stage",
      "External viewers need a constrained lane that does not inherit the same file access as internal operators."
    );
    complexity += 2;
  }

  if (selectedVisibility === "shared") {
    methods.push("Shared workspace visibility");
    rules.push(
      "Shared visibility should be deliberate because ambiguous sharing is how users end up seeing each other's files unexpectedly."
    );
    complexity += 1;
  }

  if (selectedVisibility === "private") {
    methods.push("Private-by-default visibility");
    pushCard(
      map,
      "Private default",
      "Visibility stage",
      "Private-by-default visibility makes later sharing explicit rather than leaving users to guess what they can see."
    );
    checklist.push(
      "Visibility starts private by default so sharing must be intentional rather than accidental."
    );
    complexity += 1;
  }

  if (selectedVisibility === "team") {
    methods.push("Team-scoped visibility");
    pushCard(
      map,
      "Team visibility boundary",
      "Visibility stage",
      "Files should be visible to the relevant team only, not to everyone in the instance and not to just one unpredictable owner."
    );
    checklist.push(
      "Team-scoped visibility behaves consistently so users can predict which files and folders they should see."
    );
    complexity += 2;
  }

  if (selectedVisibility === "client") {
    methods.push("Client-isolated visibility");
    pushCard(
      map,
      "Client access boundary",
      "Visibility stage",
      "Client access must stay isolated from internal files, templates, and archives even when branding makes the portal feel shared."
    );
    complexity += 2;
  }

  if (selectedFolder === "top") {
    methods.push("Top-level folders only");
    rules.push(
      "Flat top-level folder models are manageable only for very small workspaces because real teams already operate with nested categories."
    );
    complexity += 1;
  }

  if (selectedFolder === "tree") {
    methods.push("Tree-like folder hierarchy");
    pushCard(
      map,
      "Folder tree lane",
      "Folder stage",
      "Tree-like hierarchy keeps operators aligned with real organizational structure instead of forcing everything into flat roots."
    );
    checklist.push(
      "Folder selection and routing reflect a tree-like hierarchy instead of flattening nested operational structure."
    );
    complexity += 1;
  }

  if (selectedFolder === "mirror") {
    methods.push("Mirror archive paths");
    pushCard(
      map,
      "Path mirror",
      "Folder stage",
      "Mirror internal archive paths when the workspace should align to existing storage or compliance structure."
    );
    complexity += 2;
  }

  if (selectedFolder === "sync") {
    methods.push("Storage sync workspace");
    pushCard(
      map,
      "External storage sync",
      "Folder stage",
      "Storage-synced folders need a governance boundary so the external system does not silently redefine visibility rules."
    );
    checklist.push(
      "External storage sync is mapped deliberately instead of letting external folders dictate access implicitly."
    );
    complexity += 2;
  }

  if (selectedExposure === "minimal") {
    methods.push("Minimal public exposure");
    pushCard(
      map,
      "Public metadata suppression",
      "Exposure stage",
      "Hide version numbers, activity counters, and other unnecessary public signals when the workspace should look quiet and private."
    );
    checklist.push(
      "Unnecessary public exposure like version or document-count signals is removed from public-facing surfaces."
    );
    complexity += 1;
  }

  if (selectedExposure === "brand") {
    methods.push("Branded private portal");
    pushCard(
      map,
      "Brand layer",
      "Exposure stage",
      "Branded private surfaces matter when the workspace should feel internal or client-owned rather than obviously generic."
    );
    checklist.push(
      "Branding is aligned with a private workspace posture instead of making self-hosted access feel unfinished."
    );
    complexity += 2;
    plan = "Branded Private Portal";
    summary =
      "Apply a branded private surface on top of role-split access so self-hosted users get a portal that feels owned without leaking governance cues.";
  }

  if (selectedExposure === "internal") {
    methods.push("Internal-only operator surface");
    complexity += 1;
  }

  if (selectedExposure === "public") {
    methods.push("Minimized public invite landing");
    rules.push(
      "Public invite surfaces should expose the minimum necessary context or they become an avoidable information leak."
    );
    complexity += 1;
  }

  if (selectedArchive === "app") {
    methods.push("App download access");
    complexity += 1;
  }

  if (selectedArchive === "mirror") {
    methods.push("Internal archive mirror");
    pushCard(
      map,
      "Mirror retrieval lane",
      "Archive stage",
      "Mirror final records internally so operators can retrieve them without depending on signer-facing delivery or public links."
    );
    checklist.push(
      "Archived records are mirrored internally so retrieval does not depend on public or signer-facing access paths."
    );
    complexity += 2;
  }

  if (selectedArchive === "nextcloud") {
    methods.push("Nextcloud or storage sync");
    pushCard(
      map,
      "External archive sync",
      "Archive stage",
      "Use external storage sync when records should live in an existing storage estate with separate group and audit controls."
    );
    checklist.push(
      "External archive sync defines where signed files, audit trail, and team-visible folders should land."
    );
    complexity += 3;
    plan = "External Storage Governance Lane";
    summary =
      "Sync records into external storage deliberately so folder structure, team groups, and archive controls stay aligned across systems.";
  }

  if (selectedArchive === "db") {
    methods.push("Database-side retrieval");
    pushCard(
      map,
      "DB retrieval boundary",
      "Archive stage",
      "Use a controlled internal retrieval lane when operators should fetch archived documents without traversing public internet paths."
    );
    checklist.push(
      "Archive retrieval policy defines when operators use internal retrieval instead of public download paths."
    );
    complexity += 3;
    plan = "Internal Retrieval Vault";
    summary =
      "Create a controlled internal retrieval lane for archived records so operators can fetch documents without overexposing them through public paths.";
  }

  if (selectedScope === "multi" && selectedRole === "owner" && selectedVisibility === "team") {
    plan = "Team-Scoped Governance Model";
    summary =
      "Scope ownership and visibility by team so several internal groups can share one instance without accidental file exposure.";
  }

  const preview = {
    workspace_scope:
      selectedScope === "single"
        ? "single_internal_team"
        : selectedScope === "multi"
          ? "multi_team_workspace"
          : selectedScope === "client"
            ? "client_isolated_workspace"
            : "archive_heavy_workspace",
    role_model:
      selectedRole === "admin"
        ? "admins_only"
        : selectedRole === "split"
          ? "editor_viewer_split"
          : selectedRole === "owner"
            ? "workspace_owner_scope"
            : "external_viewer_lane",
    visibility_model:
      selectedVisibility === "shared"
        ? "shared_workspace"
        : selectedVisibility === "private"
          ? "private_by_default"
          : selectedVisibility === "team"
            ? "team_scoped"
            : "client_isolated",
    folder_strategy:
      selectedFolder === "top"
        ? "top_level_only"
        : selectedFolder === "tree"
          ? "tree_like_hierarchy"
          : selectedFolder === "mirror"
            ? "mirror_archive_paths"
            : "external_storage_sync",
    exposure_policy:
      selectedExposure === "minimal"
        ? "hide_sensitive_public_details"
        : selectedExposure === "brand"
          ? "branded_private_portal"
          : selectedExposure === "internal"
            ? "internal_only_surface"
            : "minimized_public_invite_surface",
    archive_access:
      selectedArchive === "app"
        ? "app_download_only"
        : selectedArchive === "mirror"
          ? "internal_archive_mirror"
          : selectedArchive === "nextcloud"
            ? "nextcloud_or_storage_sync"
            : "database_side_retrieval",
    governance_controls: [],
  };

  if (selectedRole === "split" || selectedRole === "owner") {
    preview.governance_controls.push("user_roles");
  }

  if (selectedExposure === "brand") {
    preview.governance_controls.push("white_label_branding");
  }

  if (selectedExposure === "minimal") {
    preview.governance_controls.push("hide_public_version_and_counts");
  }

  if (selectedArchive === "nextcloud") {
    preview.governance_controls.push("external_storage_backend");
    preview.storage_target = "nextcloud";
  }

  if (selectedArchive === "db") {
    preview.governance_controls.push("internal_retrieval_only");
  }

  if (selectedFolder === "tree") {
    preview.folder_path_example = "/clients/acme/contracts/2026";
  }

  if (selectedFolder === "mirror") {
    preview.folder_path_example = "/archive/legal/signed/acme";
  }

  if (selectedVisibility === "client") {
    preview.client_visibility = "isolated_from_internal_templates_and_submissions";
  }

  const previewText = JSON.stringify(preview, null, 2);
  const uniqueMethods = uniqueItems(methods);
  const uniqueRules = uniqueItems(rules);
  if (!uniqueRules.length) {
    uniqueRules.push(
      "Access governance should define one authority boundary, one visibility default, and one archive retrieval lane before the workspace goes live."
    );
  }
  const uniqueChecklist = uniqueItems(checklist).slice(0, 5);
  const firstObjective = uniqueChecklist[0]
    ? uniqueChecklist[0].replace(/\.$/, "")
    : "the workspace governance model is clearly defined before launch";
  const brief = `Phase one should implement ${plan.toLowerCase()} with one role boundary, one visibility default, and one archive retrieval rule. The first release should prove that ${lowerSentenceLead(firstObjective)}. Keep the governance model narrow enough that operators can explain who sees what and why without guesswork.`;

  let offerKey = "audit";
  if (complexity >= 5) {
    offerKey = "sprint";
  }
  if (
    complexity >= 10 ||
    (selectedScope === "archive" && selectedArchive === "db") ||
    (selectedScope === "client" && selectedExposure === "brand" && selectedArchive === "nextcloud")
  ) {
    offerKey = "workspace";
  }

  const offer = governanceOfferCatalog[offerKey];

  if (governancePlanName) {
    governancePlanName.textContent = plan;
  }

  if (governancePlanSummary) {
    governancePlanSummary.textContent = summary;
  }

  if (governanceMethods) {
    governanceMethods.innerHTML = uniqueMethods
      .map((method) => `<span class="stack-chip">${method}</span>`)
      .join("");
  }

  if (governanceMap) {
    governanceMap.innerHTML = renderCards(map);
  }

  if (governancePreview) {
    governancePreview.textContent = previewText;
  }

  if (governanceRules) {
    governanceRules.innerHTML = asBullets(uniqueRules.slice(0, 5));
  }

  if (governanceBrief) {
    governanceBrief.textContent = brief;
  }

  if (governanceChecklist) {
    governanceChecklist.innerHTML = asBullets(uniqueChecklist);
  }

  if (governanceOfferName) {
    governanceOfferName.textContent = offer.label;
  }

  if (governanceOfferNote) {
    governanceOfferNote.textContent = offer.note;
  }

  if (governanceOfferLink) {
    governanceOfferLink.href = offer.link;
    governanceOfferLink.textContent = `Open ${offer.label}`;
  }

  if (copyGovernancePreview) {
    copyGovernancePreview.dataset.copy = previewText;
  }

  if (copyGovernanceBrief) {
    copyGovernanceBrief.dataset.copy = brief;
  }

  if (copyGovernanceChecklist) {
    copyGovernanceChecklist.dataset.copy = uniqueChecklist.map((item) => `- ${item}`).join("\n");
  }
};

[workspaceScope, roleModel, visibilityModel, folderStrategy, exposurePolicy, archiveAccess].forEach((input) => {
  input?.addEventListener("input", renderAccessGovernancePlanner);
  input?.addEventListener("change", renderAccessGovernancePlanner);
});

copyGovernancePreview?.addEventListener("click", () => copyGovernanceText(copyGovernancePreview));
copyGovernanceBrief?.addEventListener("click", () => copyGovernanceText(copyGovernanceBrief));
copyGovernanceChecklist?.addEventListener("click", () => copyGovernanceText(copyGovernanceChecklist));

renderAccessGovernancePlanner();
