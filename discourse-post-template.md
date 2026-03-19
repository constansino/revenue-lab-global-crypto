# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-field-validation-planner.html

What this update is:
- Added an interactive GitHub-backed field validation planner for DocSafe.
- This new page is a DocSafe field validation planner:
  buyers choose validation scope, rule style, feedback timing, exception handling, recipient assist, and review gate, then get a validation map, a starter preview JSON, a copyable implementation brief, and the right DocSafe starting offer.
- It turns public regex, date-bound, real-time-feedback, and stale-error pain into a buyer-facing planning tool instead of another generic workflow page.

Decision:
- Keep the same document workflow wedge, but move one level deeper into input quality and error recovery instead of only focusing on sending, completion, proof, or branding.
- The next bottleneck is not just whether the form exists. It is whether bad data gets blocked correctly, corrected quickly, and routed sanely when the default rule set is not enough.

Why this wedge:
- Public repo signals now point at the validation layer: teams want regex rules that really work, date fields constrained by business ranges, invalid-email states that disappear after assisted selection, and live validation that updates immediately instead of waiting for a blur or a failed submit.
- Docuseal issue 546 shows regexp validation does not work as expected, turning field-format rules into a real buyer-facing reliability problem.
- Docuseal issue 506 asks for min and max date validation because loose date input is not enough when approvals or contracts depend on valid ranges.
- Documenso pull request 2198 fixes an invalid-email display bug after selecting recipient suggestions autocomplete, showing that assistive entry can still break trust if validation state lags behind the chosen value.
- Documenso pull request 2204 switches validation from blur-time to on-change feedback so corrected inputs clear errors immediately instead of lingering incorrectly.
- The Docuseal README already advertises many field types such as date, file, checkbox, and signature, which means buyers expect richer validation behavior than required-text checks alone.
- Recent Documenso pull requests show validation UX remains an active product concern rather than a solved layer.

What the page now sells:
- one interactive validation architecture
- one starter validation preview JSON
- one regex, range, and error-recovery rule pack
- one copyable implementation brief
- one more buyer-facing utility page that helps lock real input-quality operations before payment

Target buyers:
- HR and onboarding team that needs clean identity, email, and date intake without confusing users
- KYC or regulated intake team that needs stricter rules, exception review, and rejection visibility
- vendor or client ops team that needs suggestions and prefill without false invalid warnings
- anyone whose forms technically work but still let bad data or stale errors through

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

GitHub issues used in this tool:
- https://github.com/docusealco/docuseal/issues/546
- https://github.com/docusealco/docuseal/issues/506
- https://github.com/documenso/documenso/pull/2198
- https://github.com/documenso/documenso/pull/2204
- https://github.com/docusealco/docuseal
- https://github.com/documenso/documenso/pulls
- https://github.com/docusealco/docuseal

Verification:
- Added the new field validation planner and linked it from the main DocSafe flow, field schema builder, and signer experience planner.
- The planner will be checked locally in Chrome with both the default realtime-validation state and a high-complexity regulated composite-validation scenario.
- Page will be checked on GitHub Pages before or after posting.
