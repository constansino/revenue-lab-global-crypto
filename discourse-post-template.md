# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-signature-evidence-planner.html

What this update is:
- Added an interactive GitHub-backed signature evidence planner for DocSafe.
- This new page is a DocSafe signature evidence planner:
  buyers choose visible proof mode, timestamp source, signer metadata, signature standard, verification output, and archive evidence, then get an evidence map, a starter preview JSON, a copyable implementation brief, and the right DocSafe starting offer.
- It turns public visible-signature, timestamp, PAdES, eIDAS, and verification-output pain into a buyer-facing planning tool instead of another generic workflow page.

Decision:
- Keep the same document workflow wedge, but move one level deeper into what the final signed artifact actually proves instead of only focusing on sending, completion, packaging, or branding.
- The next bottleneck is not just whether a PDF gets delivered. It is whether the buyer can defend what that PDF proves when legal, finance, compliance, or archive review asks for visible signature evidence, timestamps, metadata, and validation posture.

Why this wedge:
- Public repo signals now point at the signature-proof layer: teams want visible signatures that actually render on the final PDF, richer signature metadata like date and IP, stronger validation posture such as LTV or PAdES, and a verification-friendly proof pack that still makes sense after archive retrieval.
- Documenso issue 1912 shows completed PDFs can still come out with no visible signatures even when the background signing job reports success.
- Documenso discussion 143 asks for signature field auto-date, signer IP, eIDAS level, and explicit electronic-signature markers in the proof layer.
- Documenso discussion 114 asks for LTV-enabled PDF signing, which turns long-term validation into a buyer-facing archive requirement.
- The @documenso/pdf-sign package exposes signing time and timestamp server options, showing that timestamp posture is part of the product surface rather than a hidden implementation detail.
- Documenso discussion 1 shows buyers explicitly asking what signature level the product is targeting when regulatory acceptance matters.
- Docuseal discussion 89 asks for PAdES electronic signature support, confirming that proof level can become a real buying criterion.
- Docuseal issue 575 shows a mismatch between signature timestamp date and submission completed timestamp, making evidence reconciliation commercially relevant.
- The Docuseal README already calls out PDF signature verification, which confirms that buyers expect the signed artifact to be checked, not just downloaded.

What the page now sells:
- one interactive signature-proof architecture
- one starter evidence preview JSON
- one visible-signature, timestamp, and verification rule pack
- one copyable implementation brief
- one more buyer-facing utility page that helps lock real legal-grade proof operations before payment

Target buyers:
- legal and contract ops team that needs the final PDF to visibly prove the signature event
- compliance or audit team that needs timestamps, signer metadata, and archive evidence to stay coherent
- finance or regulated onboarding team that needs stronger proof posture than a generic completed PDF
- anyone whose signing workflow works operationally but still produces weak or confusing proof artifacts

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

GitHub issues used in this tool:
- https://github.com/documenso/documenso/issues/1912
- https://github.com/documenso/documenso/discussions/143
- https://github.com/documenso/documenso/discussions/114
- https://github.com/documenso/pdf-sign
- https://github.com/documenso/documenso/discussions/1
- https://github.com/docusealco/docuseal/discussions/89
- https://github.com/docusealco/docuseal/issues/575
- https://github.com/docusealco/docuseal

Verification:
- Added the new signature evidence planner and linked it from the main DocSafe flow, completion package planner, and signer experience planner.
- The planner will be checked locally in Chrome with both the default proof-pack state and a high-complexity regulated evidence scenario.
- Page will be checked on GitHub Pages before or after posting.
