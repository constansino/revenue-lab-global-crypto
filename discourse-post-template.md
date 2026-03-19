# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-access-governance-planner.html

What this update is:
- Added an interactive GitHub-backed access governance planner for DocSafe.
- This new page is a DocSafe access governance planner:
  buyers choose workspace scope, role model, visibility model, folder strategy, exposure policy, and archive access, then get a governance map, a starter policy preview, a copyable implementation brief, and the right DocSafe starting offer.
- It turns public self-hosted role, visibility, and archive-governance pain into a buyer-facing planning tool instead of another static board.

Decision:
- Keep the same document workflow wedge, but move one level deeper into self-hosted governance instead of only focusing on signing flow, recovery, or packaging.
- The next bottleneck is not just getting the workflow working. It is whether roles, file visibility, folder structure, public exposure, and archive retrieval are governed well enough that teams can trust the system at all.

Why this wedge:
- Public repo issues now point at the governance layer: buyers want role split without making everyone admin, consistent file visibility, real folder hierarchy, safer archive access than public download paths, and less unnecessary information exposed on public-facing surfaces.
- Docuseal issue 413 asks for editor and viewer roles on on-prem installs because admin-only is not acceptable for real organizations.
- Docuseal issue 392 shows users seeing each other’s files unpredictably, which makes visibility policy and workspace boundaries a buyer problem, not just a bug.
- Docuseal issue 564 shows top-level-only folder selection does not fit real operational hierarchy and existing storage structure.
- Docuseal issue 458 shows archive retrieval becomes risky and awkward when operators must rely on public download paths instead of an internal retrieval model.
- Docuseal issue 446 shows teams want to hide version number and document-count exposure because those public details can create unnecessary security and trust concerns.
- Docuseal issue 519 shows storage sync, user groups, templates, and audit trail alignment with Nextcloud is a real self-hosted buyer ask.
- Docuseal issue 451 shows self-hosted teams still expect branded private surfaces without being pushed to a SaaS plan just to change the logo.

What the page now sells:
- one interactive access governance architecture
- one starter governance preview
- one role, visibility, and archive rule pack
- one copyable implementation brief
- one more buyer-facing utility page that helps lock real self-hosted governance before payment

Target buyers:
- public sector or compliance team that needs tighter self-hosted visibility and archive retrieval
- small organization that cannot make every operator admin just to let them work
- client-facing self-hosted portal owner that needs isolated visibility and branding
- anyone trying to standardize self-hosted roles, folder hierarchy, and external storage sync before the instance scales

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

GitHub issues used in this tool:
- https://github.com/docusealco/docuseal/issues/446
- https://github.com/docusealco/docuseal/issues/413
- https://github.com/docusealco/docuseal/issues/392
- https://github.com/docusealco/docuseal/issues/564
- https://github.com/docusealco/docuseal/issues/458
- https://github.com/docusealco/docuseal/issues/519
- https://github.com/docusealco/docuseal/issues/451
- https://github.com/docusealco/docuseal

Verification:
- Added the new access governance planner and linked it from the main DocSafe flow, embed launchpad, webhook router, and completion package planner.
- The planner will be checked locally in Chrome with both the default role-split private workspace state and a high-complexity branded client-isolated plus external-storage scenario.
- Page will be checked on GitHub Pages before or after posting.
