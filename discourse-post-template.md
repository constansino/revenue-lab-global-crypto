# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-conditional-logic-planner.html

What this update is:
- Added an interactive GitHub-backed conditional logic planner for DocSafe.
- This new page is a DocSafe conditional logic planner:
  buyers choose conditional scope, trigger model, rule depth, hidden-data policy, implementation path, and QA surface, then get a branch map, a starter logic preview, a copyable implementation brief, and the right DocSafe starting offer.
- It turns public hidden-field, branch-logic, and completed-output pain into a buyer-facing planning tool instead of another static board.

Decision:
- Keep the same document workflow wedge, but move one level deeper into conditional form behavior instead of only focusing on field naming, embed launch, or multi-document packets.
- The next bottleneck is not just rendering a field. It is whether hidden questions, exact branch values, grouped document rules, and completed-output cleanup all behave predictably when a signer changes direction.

Why this wedge:
- Public repo issues now point at the branch-logic layer: buyers want hidden routing questions that do not print on the final PDF, REST-defined conditions with explicit equals behavior, grouped document rules that do not over-match, and final outputs that do not keep stale text from an inactive branch.
- Docuseal issue 168 explicitly asks for hidden fields plus conditional fields so one question can decide whether W-9 or W-8 style sections appear.
- Docuseal issue 513 shows REST-created conditional fields are not obvious to map when moving from GUI behavior to API payloads.
- Docuseal issue 515 shows a yes or no radio choice should reveal different initials fields, but presence logic is not enough when the buyer needs exact value matching.
- Docuseal issue 523 shows a single radio group trying to control two different documents and exposing grouped AND or OR logic as the real design problem.
- Docuseal issue 291 shows inactive-branch values can still survive into the completed document, which makes branch cleanup and QA a real buyer concern before rollout.

What the page now sells:
- one interactive conditional branch architecture
- one starter logic preview
- one branch-governance and final-output rule pack
- one copyable implementation brief
- one more buyer-facing utility page that helps lock real conditional behavior before payment

Target buyers:
- tax or contractor ops team branching between different compliance sections
- claims or compliance operator whose radio choice should activate the right document set
- product team embedding conditional review flows inside its own app
- anyone trying to use hidden questions and conditional fields without stale values leaking into the completed output

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

GitHub issues used in this tool:
- https://github.com/docusealco/docuseal/issues/168
- https://github.com/docusealco/docuseal/issues/513
- https://github.com/docusealco/docuseal/issues/515
- https://github.com/docusealco/docuseal/issues/523
- https://github.com/docusealco/docuseal/issues/254
- https://github.com/docusealco/docuseal/issues/291
- https://github.com/docusealco/docuseal

Verification:
- Added the new conditional logic planner and linked it from the main DocSafe flow, field schema builder, embed launchpad, and packet bundle builder.
- The planner will be checked locally in Chrome with both the default API branch state and a high-complexity hidden-question plus grouped-document scenario.
- Page will be checked on GitHub Pages before or after posting.
