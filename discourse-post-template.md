# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-invite-delivery-planner.html

What this update is:
- Added an interactive GitHub-backed invite delivery planner for DocSafe.
- This new page is a DocSafe invite delivery planner:
  buyers choose invite surface, sender identity, transport mode, observer policy, response owner, and delivery evidence, then get a mail map, a starter delivery preview, a copyable implementation brief, and the right DocSafe starting offer.
- It turns public self-hosted SMTP, sender identity, CC observer, reply-to, and delivery-visibility pain into a buyer-facing planning tool instead of another generic workflow page.

Decision:
- Keep the same document workflow wedge, but move one level deeper into outbound invite trust instead of only focusing on flow, recovery, packaging, or identity.
- The next bottleneck is not just whether the document can be signed. It is whether the invite comes from the right sender, reaches the right inboxes, carries the right observers, routes replies correctly, and leaves enough delivery evidence for ops to trust it.

Why this wedge:
- Public repo issues now point at the outbound mail layer: self-hosted teams want reproducible SMTP config, visible From addresses that do not silently fall back to the SMTP username, tenant-safe reply ownership, request-time CC observers, secure SMTP transport, and some form of delivery status after the app hands mail to the provider.
- Docuseal issue 545 asks for more SMTP settings through environment variables because mail transport should be reproducible outside the UI.
- Docuseal issue 547 asks for CCing someone on the signature request itself, which shows request-time observers are a real buyer need rather than a fringe feature.
- Docuseal issue 598 shows the Send from Email setting can be ignored in favor of the SMTP username, which breaks sender trust and branded mailbox ownership.
- Docuseal issue 597 shows cloned tenant templates can keep reply-to attached to the original author instead of the tenant.
- Docuseal issue 579 asks where self-hosted teams can see sent-mail delivery status after SMTP submission.
- Docuseal issue 460 shows SMTP delivery can still fail on common password patterns, making provider testing part of implementation.
- Docuseal issue 455 shows common self-hosted setups can hit SMTP timeout errors.
- Docuseal issue 394 shows the same SMTP setup can work in the UI while failing through environment variables.
- Docuseal issue 372 shows implicit TLS and auto-StartTLS can conflict on real mail servers.
- Docuseal issue 371 shows SMTP verification mode is part of the trust boundary because disabling certificate verification invites man-in-the-middle risk.

What the page now sells:
- one interactive invite delivery architecture
- one starter mail-lane preview
- one sender, observer, and reply-ownership rule pack
- one copyable implementation brief
- one more buyer-facing utility page that helps lock real self-hosted delivery trust before payment

Target buyers:
- legal or contract ops team that needs request-time CC observers and clear reply ownership
- white-label or tenant workspace owner that needs sender identity and reply-to to stay attached to the correct tenant
- self-hosted ops team that needs reproducible SMTP config and delivery evidence before increasing send volume
- anyone whose signing flow looks fine in the UI but breaks trust once invites actually leave the system

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

GitHub issues used in this tool:
- https://github.com/docusealco/docuseal/issues/545
- https://github.com/docusealco/docuseal/issues/547
- https://github.com/docusealco/docuseal/issues/598
- https://github.com/docusealco/docuseal/issues/597
- https://github.com/docusealco/docuseal/issues/579
- https://github.com/docusealco/docuseal/issues/460
- https://github.com/docusealco/docuseal/issues/455
- https://github.com/docusealco/docuseal/issues/394
- https://github.com/docusealco/docuseal/issues/372
- https://github.com/docusealco/docuseal/issues/371
- https://github.com/docusealco/docuseal

Verification:
- Added the new invite delivery planner and linked it from the main DocSafe flow, delivery matrix, reminder ladder, and identity gate planner.
- The planner will be checked locally in Chrome with both the default branded shared-inbox sender state and a high-complexity regulated linked-CC plus bounce-observability scenario.
- Page will be checked on GitHub Pages before or after posting.
