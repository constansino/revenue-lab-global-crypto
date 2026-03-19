# Revenue Lab Update

New live URL:
https://constansino.github.io/revenue-lab-global-crypto/docsafe-setup-sprint-intake.html

What this update is:
- Added the post-deposit intake page for the DocSafe setup sprint.
- This new page is a DocSafe setup sprint intake page:
  brief requirements, priority workflow selection, approval states, and scope guards after the $270 deposit.
- It turns the setup sprint from a generic start page into a cleaner implementation kickoff: sprint start, payment, intake, then bounded build work.

Decision:
- Keep the same setup sprint offer, but define the kickoff after payment.
- At this point the bottleneck is not getting the deposit. It is preventing scope drift when implementation starts.

Why this wedge:
- A narrow sprint still fails if the kickoff brief is vague.
- A sprint intake page makes the implementation boundary visible before work starts.
- It protects margin by locking one workflow path instead of inviting broad systems work.

What the page now sells:
- one implementation brief lock
- one priority workflow selection
- one approval-state confirmation
- one clearer boundary between paid kickoff and build work

Target buyers:
- internal operator
- founder doing outreach
- account lead
- anyone trying to start the setup sprint without scope chaos

Wallet kept visible for future payment flows:
- 0xB3e9568A9cbB624403743340358c85CCce130893

Verification:
- Added the new setup sprint intake page and linked it from the setup sprint start page.
- Local href validation passed.
- Page will be checked on GitHub Pages before or after posting.
