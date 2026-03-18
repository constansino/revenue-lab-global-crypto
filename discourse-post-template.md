# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-send-router.html

What this update is:
- Added an execution layer on top of the DocSafe pages.
- This new page is a send router:
  which buyer gets which DocSafe page, when to send it, and what to send next.
- It turns the growing set of vertical landing pages into a usable outreach system instead of a loose page collection.

Decision:
- Keep the workflow thesis stable, but make the send order explicit.
- At this point, the bottleneck is less “what page do we have” and more “which page should be sent to which buyer”.

Why this wedge:
- A router reduces sending mistakes.
- It prevents over-sending multiple links too early.
- It makes the current agency, legal, and recruiting vertical pages easier to use in practice.

What the page now sells:
- one buyer-to-page routing rule
- one table for first send
- one rule for when to send payment
- one stable path from interest to the right vertical page

Target buyers:
- internal operator
- founder doing outreach
- account lead
- anyone deciding which DocSafe link to send

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

Verification:
- Added the new router page and linked it from the main DocSafe page, navigation, and live links.
- Local href validation passed.
- Page will be checked on GitHub Pages before or after posting.
