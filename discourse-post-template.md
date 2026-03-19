# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-field-schema-builder.html

What this update is:
- Added an interactive GitHub-backed field schema builder for DocSafe.
- This new page is a DocSafe field schema builder:
  buyers choose template source, recipient model, field density, prefill source, metadata discipline, and renewal tracking, then get a standard field map, a schema starter preview, a copyable implementation brief, and the right DocSafe starting offer.
- It turns public template-field and metadata pain into a buyer-facing planning tool instead of another static board.

Decision:
- Keep the same document workflow wedge, but move one level deeper into template architecture instead of only send and follow-up behavior.
- The next bottleneck is field clarity: what the stable field keys are, how they map to template labels, how prefill sources align with them, and which lifecycle dates need dedicated fields.

Why this wedge:
- Public repo issues and repo docs still show repeated demand around richer custom fields, field inventory APIs, placeholder names matching CSV keys, and prefill from spreadsheets or apps.
- Documenso issue 1178 explicitly asks for `GET /api/v1/documents/{id}/fields`, which is the exact kind of field inventory step buyers need before touching a live template.
- Docuseal docs already document PDF text tags, DOCX variables, and HTML field tags, so the buyer problem is no longer “can templates exist” but “what stable field schema should every path inherit”.
- Buyers need a concrete field schema before they can safely automate batch sends, reminders, renewals, and app-driven prefill.
- A field schema builder is directly useful in pre-sale and internal workflow design because it answers the question “what are the stable field keys and lifecycle dates” before the template starts spreading through ops.

What the page now sells:
- one interactive field map
- one copyable implementation brief
- one template and metadata rule pack
- one suggested DocSafe first step
- one more buyer-facing utility page that helps lock real template architecture before payment

Target buyers:
- legal or contract ops owner
- onboarding and HR operator
- SaaS or platform team with app prefill
- anyone trying to lock stable field keys and lifecycle dates before implementation

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

GitHub issues used in this tool:
- https://github.com/documenso/documenso/issues/662
- https://github.com/documenso/documenso/issues/1178
- https://github.com/documenso/documenso/issues/1695
- https://github.com/docusealco/docuseal/issues/303
- https://github.com/docusealco/docuseal-js
- https://github.com/docusealco/docuseal

Verification:
- Added the new field schema builder and linked it from the main DocSafe flow, batch mapper, reminder ladder, and close-stage toolbar.
- The builder was checked locally in Chrome with both the default state and a high-complexity live-template plus API-prefill scenario.
- Page will be checked on GitHub Pages before or after posting.
