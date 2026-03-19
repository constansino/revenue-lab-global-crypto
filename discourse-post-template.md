# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-batch-send-mapper.html

What this update is:
- Added an interactive GitHub-backed batch-send mapper for DocSafe.
- This new page is a DocSafe batch-send mapper:
  buyers choose batch size, recipient order, CSV merge depth, row variance, QA gates, and failure handling, then get a starter CSV schema, delivery rules, a copyable workflow brief, and the right DocSafe starting offer.
- It turns public bulk-send and template-data pain into a buyer-facing planning tool instead of another static board.

Decision:
- Keep the same document workflow wedge, but move into repeated sending instead of only single-lane approval and delivery logic.
- The next bottleneck is batch clarity: what the CSV columns are, how recipients line up with template order, which fields vary per row, and how failed rows are retried safely.

Why this wedge:
- Public repo issues and repo docs still show repeated demand around CSV bulk send, merge fields, spreadsheet prefill, and mass generation from templates.
- Buyers need a concrete starter schema before they can safely automate repeated document sending.
- A batch-send mapper is directly useful in pre-sale and internal workflow design because it answers the question “which columns and control rules do we need” before the team uploads a real file.

What the page now sells:
- one interactive starter CSV schema
- one copyable batch-send brief
- one batch validation and retry rule pack
- one suggested DocSafe first step
- one more buyer-facing utility page that helps lock real repeated sending before payment

Target buyers:
- onboarding operator
- vendor or agency ops lead
- finance or renewal owner
- anyone trying to lock repeated sending, field mapping, and row-level recovery before implementation

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

GitHub issues used in this tool:
- https://github.com/documenso/documenso/issues/1550
- https://github.com/documenso/documenso/issues/1695
- https://github.com/docusealco/docuseal/issues/303
- https://github.com/docusealco/docuseal/issues/531
- https://github.com/docusealco/docuseal

Verification:
- Added the new batch-send mapper and linked it from the main DocSafe flow, approval planner, delivery matrix, and close-stage toolbar.
- The mapper will be checked locally in Chrome before deploy.
- Page will be checked on GitHub Pages before or after posting.
