# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-brand-locale-planner.html

What this update is:
- Added an interactive GitHub-backed brand and locale planner for DocSafe.
- This new page is a DocSafe brand and locale planner:
  buyers choose brand surface, domain mode, locale coverage, email rendering, organization sync, and trust proof, then get a brand system map, a starter preview JSON, a copyable implementation brief, and the right DocSafe starting offer.
- It turns public signing-page branding, invite presentation, org-level sender settings, HTML email template, and multilingual rollout pain into a buyer-facing planning tool instead of another generic workflow page.

Decision:
- Keep the same document workflow wedge, but move one level deeper into brand trust and localization instead of only focusing on sending, recovery, packaging, or identity.
- The next bottleneck is not just whether mail gets delivered or a signer can finish. It is whether the whole lane looks owned by the buyer across domain, email, signing page, tenant settings, and language coverage.

Why this wedge:
- Public repo signals now point at the brand and locale layer: teams want logos on signing pages, better invite email presentation, organization email settings that update correctly, HTML-capable email templates, regional language support, and white-label lanes with owned domains.
- Documenso pull request 2031 adds branding logo on the signing page, which shows signer trust is shaped inside the signing UI, not only in the inbox.
- Documenso pull request 2030 improves invite email, which signals that mail chrome and readability are active buyer-facing concerns.
- Documenso pull request 2048 fixes updating personal organization email settings, which shows brand ownership can drift when organization-level mail settings are not handled correctly.
- Docuseal issue 545 asks for more SMTP configuration through environment variables, showing that sender ownership and deployment need reproducible controls.
- Docuseal discussion 183 asks for HTML in email templates, showing that default plain emails are too limiting for white-label or brand-sensitive workflows.
- Docuseal issue 535 asks for Simplified Chinese support, which makes locale routing and signer-language coverage a practical buyer need.
- The Docuseal README already calls out company logo, white-label, custom HTTPS domain, seven UI languages, and signing in fourteen languages, which confirms the category fit is already there.

What the page now sells:
- one interactive brand and locale rollout architecture
- one starter brand preview JSON
- one domain, mail chrome, and multilingual rule pack
- one copyable implementation brief
- one more buyer-facing utility page that helps lock real white-label and localization operations before payment

Target buyers:
- white-label SaaS team that needs the signing page, invite email, and sender settings to look owned by the product
- cross-border legal or compliance team that needs signer trust across languages and regional domains
- multilingual onboarding operator that needs mail, signing UI, and completion copy aligned to the recipient's language
- anyone whose document workflow works functionally but still feels generic or inconsistent to recipients

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

GitHub issues used in this tool:
- https://github.com/documenso/documenso/pull/2031
- https://github.com/documenso/documenso/pull/2030
- https://github.com/documenso/documenso/pull/2048
- https://github.com/docusealco/docuseal/issues/545
- https://github.com/docusealco/docuseal/discussions/183
- https://github.com/docusealco/docuseal/issues/535
- https://github.com/docusealco/docuseal

Verification:
- Added the new brand locale planner and linked it from the main DocSafe flow, invite delivery planner, and signer experience planner.
- The planner will be checked locally in Chrome with both the default brand-safe multilingual state and a high-complexity full white-label regional scenario.
- Page will be checked on GitHub Pages before or after posting.
