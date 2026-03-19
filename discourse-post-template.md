# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-embed-launchpad.html

What this update is:
- Added an interactive GitHub-backed embed launch planner for DocSafe.
- This new page is a DocSafe embed launchpad:
  buyers choose embed surface, auth handoff, prefill mode, field lock mode, completion return, and mobile policy, then get a launch stage map, an embed session preview, a copyable QA brief, and the right DocSafe starting offer.
- It turns public embedded-signing, prefill, and mobile pain into a buyer-facing planning tool instead of another static board.

Decision:
- Keep the same document workflow wedge, but move one level deeper into in-app signing launch instead of stopping at field and webhook design.
- The next bottleneck is not just the payload. It is whether the embedded session can survive auth handoff, show the prepared data, still expose completion, behave on mobile, and return control to the host app cleanly.

Why this wedge:
- Public repo issues now point at the embed launch layer: authoring auth tokens not reaching requests, prefill disappearing in the embedded session, all-read-only forms losing completion controls, locked choice fields lacking a review path, mobile signature views breaking on rotate, and prefilled proofs not surviving download.
- Documenso issue 2001 explicitly shows embedded authoring can fail with a 401 because the expected auth header is not populated during the create call.
- Documenso issue 1716 shows using `/api/v1/documents/{id}/generate-document` is not enough if the prefilled values still arrive blank inside the embed.
- Docuseal issue 573 shows an all-read-only embedded form can leave the user with no visible way to complete the session.
- A buyer-facing embed launchpad is directly useful because it answers the question “which embed session can we ship safely inside our app” before product teams promise in-app signing to customers.

What the page now sells:
- one interactive embed launch map
- one host-session starter preview
- one auth, prefill, and mobile QA rule pack
- one copyable implementation brief
- one more buyer-facing utility page that helps lock real embedded signing before payment

Target buyers:
- SaaS or platform team embedding contracts inside the product
- HR or onboarding portal owner embedding prepared documents for review and signature
- partner or customer portal team trying to keep signatures inside the host app
- anyone trying to launch embedded signing without shipping auth, prefill, or mobile failures

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

GitHub issues used in this tool:
- https://github.com/documenso/documenso/issues/2001
- https://github.com/documenso/documenso/issues/1716
- https://github.com/docusealco/docuseal/issues/573
- https://github.com/docusealco/docuseal/issues/559
- https://github.com/docusealco/docuseal/issues/383
- https://github.com/docusealco/docuseal/issues/609

Verification:
- Added the new embed launchpad and linked it from the main DocSafe flow, field schema builder, and webhook router.
- The launchpad will be checked locally in Chrome with both the default state and a high-complexity read-only plus host-verified scenario.
- Page will be checked on GitHub Pages before or after posting.
