# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-identity-gate-planner.html

What this update is:
- Added an interactive GitHub-backed identity gate planner for DocSafe.
- This new page is a DocSafe identity gate planner:
  buyers choose deployment surface, workforce login, signer verification, invite channel, session policy, and recovery lane, then get a trust map, a starter policy preview, a copyable implementation brief, and the right DocSafe starting offer.
- It turns public self-hosted auth, signer verification, session security, and 2FA recovery pain into a buyer-facing planning tool instead of another generic workflow page.

Decision:
- Keep the same document workflow wedge, but move one level deeper into identity and trust instead of only focusing on flow, recovery, packaging, or visibility.
- The next bottleneck is not just whether the workflow works. It is whether operators can log in cleanly, signers can be verified credibly, sessions are secure, and 2FA recovery is survivable when infrastructure changes.

Why this wedge:
- Public repo issues now point at the identity layer: self-hosted teams want SSO or SAML, OAuth or modern auth, email OTP or stronger signer verification, controlled SMS verification wording, secure cookies on authenticated traffic, and a real 2FA recovery path.
- Docuseal issue 436 asks for self-hosted SSO or SAML so teams can use one auth provider instead of another isolated local login surface.
- Docuseal issue 351 shows Entra ID SSO can fail on user mapping even after successful IdP login, which means identity mapping is part of the buyer delivery scope.
- Docuseal issue 497 requests OAuth login because Microsoft 365 clients want modern authentication instead of legacy login handling.
- Docuseal issue 279 asks for email OTP or a temporary mail link because a raw document link does not prove the intended signer actually opened it.
- Docuseal issue 251 shows SMS verification can repeat in one signing flow, which means placement and retry behavior affect completion and trust.
- Docuseal issue 253 asks to customize SMS text, which shows sender identity and message wording are part of the security posture.
- Docuseal issue 591 asks for secure cookies on authenticated traffic, making session policy part of the trust boundary.
- Docuseal issues 204, 442, and 586 show 2FA reset, migration recovery, and TOTP backup handling are real operational needs rather than edge cases.

What the page now sells:
- one interactive identity trust architecture
- one starter identity preview
- one login, signer verification, and recovery rule pack
- one copyable implementation brief
- one more buyer-facing utility page that helps lock real self-hosted trust before payment

Target buyers:
- self-hosted team that needs SSO, OAuth, or a break-glass recovery model before rolling out to more operators
- client-facing portal owner that needs branded invites and a stronger signer gate than bare access links
- embedded product team that needs workforce auth and signer verification to fit one product flow
- regulated operator that needs secure sessions and 2FA recovery to survive migration or device loss

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

GitHub issues used in this tool:
- https://github.com/docusealco/docuseal/issues/436
- https://github.com/docusealco/docuseal/issues/351
- https://github.com/docusealco/docuseal/issues/497
- https://github.com/docusealco/docuseal/issues/279
- https://github.com/docusealco/docuseal/issues/251
- https://github.com/docusealco/docuseal/issues/253
- https://github.com/docusealco/docuseal/issues/591
- https://github.com/docusealco/docuseal/issues/204
- https://github.com/docusealco/docuseal/issues/442
- https://github.com/docusealco/docuseal/issues/586
- https://github.com/docusealco/docuseal

Verification:
- Added the new identity gate planner and linked it from the main DocSafe flow, access governance, embed launchpad, and submission recovery planner.
- The planner will be checked locally in Chrome with both the default SSO plus email OTP state and a high-complexity embedded OAuth plus step-up verification scenario.
- Page will be checked on GitHub Pages before or after posting.
