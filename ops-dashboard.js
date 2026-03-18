const STORAGE_KEY = "revenue-lab-dashboard-v1";

const messageBank = {
  "Supercharged Studio": {
    dm: `I checked the Supercharged Studio website design page and the service itself is clear, but the handoff from interest to the next concrete action still feels lighter than it could be.

For service pages like this, that usually means some high-intent visitors understand the offer but still are not getting pushed into the strongest next step fast enough.

I work on that kind of issue as a short sprint around service-page handoff, follow-up, and next-step clarity.

If useful, I can send the exact point I would tighten first.`,
    followup: `Quick follow-up.

This looked less like a positioning issue and more like a handoff issue after the service already makes sense.

If useful, I can send the one section I would tighten first.`,
    closer: `That makes sense.

From the outside, this looks less like a positioning issue and more like a handoff issue once the service already makes sense to the right visitor.

If useful, I can package that into a short fixed-scope sprint and send the clean version of the scope.`,
    teardown: `- The service offer is understandable already.
- The weaker part is how a warm visitor gets pushed into the next concrete action.
- I would tighten the service-page handoff before changing broader messaging.`,
  },
  "Digital Growth Studio": {
    dm: `I checked Digital Growth Studio and one thing stood out: the category and offer are understandable, but the response layer still feels lighter than it could be for a high-intent visitor.

For growth agencies, that usually means some serious leads are left to cool off because the next step is not strong enough or immediate enough.

I package fixes like that as a short sprint around lead capture, next-step clarity, and a tighter response path.

If useful, I can send the exact point I would tighten first.`,
    followup: `Following up because this looked more like a warm-lead handoff issue than a positioning issue.

The offer already makes sense. The more likely win is tightening how intent gets captured and routed after that.

If useful, I can send the one section I would start with.`,
    closer: `Understood.

My read is that the bigger opportunity is probably not more explanation, but tightening how warm leads get routed once interest is already there.

If you want, I can turn that into a compact sprint and send the scoped version with pricing.`,
    teardown: `- The offer is understandable.
- The softer part is the movement from interest to response.
- I would tighten lead capture and response structure before broad messaging changes.`,
  },
  Upgrow: {
    dm: `I checked the Upgrow pricing page and it feels informative, but the next-step layer still looks lighter than it could be for a warm visitor already comparing options.

That is usually where pricing pages do enough explanation work but not enough conversion work.

I work on this as a short sprint around pricing-page handoff, faster response paths, and stronger next-step clarity.

If useful, I can send the exact point I would tighten first.`,
    followup: `Quick follow-up.

This looked like a pricing-page handoff issue more than a broader offer problem.

If useful, I can send the one point I would tighten first.`,
    closer: `That tracks.

The pricing page already explains enough, so I would probably focus first on the movement from comparison into the strongest next action.

If useful, I can package that as a short sprint and send over the tightest version of the fix.`,
    teardown: `- The pricing page explains clearly enough.
- The weaker part is how a serious visitor gets moved into the next action.
- I would tighten the pricing-page handoff before touching larger site structure.`,
  },
  Privy: {
    dm: `I checked Privy and the product is easy to understand fast, but the path for a high-intent visitor still feels more informational than directional.

For wallet onboarding infra, that usually means some serious interest does not get pushed into the clearest next step fast enough.

I work on this as a short sprint around next-step clarity, handoff, and follow-up structure.

If useful, I can send the exact point I would tighten first.`,
    followup: `Quick follow-up.

The reason I reached out is that Privy already explains the product well, so the next likely win looks more like handoff and next-step clarity than more top-level explanation.

If useful, I can send the one exact point I would start with.`,
    closer: `Makes sense.

From the outside, this looks less like a top-level messaging issue and more like a handoff issue once the right visitor already understands the product.

If useful, I can package that into a small fixed-scope sprint and send the clean package version.`,
    teardown: `- The product positioning is clear, which is good.
- The weaker part is how interest gets routed into the clearest next action once the visitor understands the value.
- I would tighten the handoff layer first before expanding more explanation.`,
  },
  Dynamic: {
    dm: `I checked Dynamic and the wallet / identity use case is easy enough to follow, but the next-step path still feels lighter than the traffic quality probably deserves.

That is usually not a positioning problem. It is more of a handoff problem between interest and action.

I package that kind of fix as a short sprint around capture, CTA structure, and follow-up logic.

If useful, I can send the exact gap I would tighten first.`,
    followup: `Following up because this looked less like a positioning issue and more like a next-step issue.

The product already makes sense. The bigger win may be tightening how intent gets captured and routed after that.

Happy to send the exact spot I mean if useful.`,
    closer: `That tracks.

My read is that the bigger win is probably not more explanation, but making the strongest next action easier to reach once interest is already there.

If useful, I can package that as a short sprint and send over the tightest version of the scope.`,
    teardown: `- The category and use case are understandable.
- The likely leak is between product understanding and the strongest next step for a serious visitor.
- I would tighten CTA hierarchy and handoff before touching broader messaging.`,
  },
  OnchainInvoice: {
    dm: `I checked OnchainInvoice and the niche is clear quickly, which is good.

What felt softer is the path from “this is relevant to me” into the next concrete action, especially for a visitor already comfortable with onchain payment workflows.

I work on that kind of issue as a short sprint around capture, handoff, and faster next-step structure.

If useful, I can send the exact point I would tighten first.`,
    followup: `Quick follow-up here.

The product niche is already specific enough that I do not think the first issue is explanation.

The bigger opportunity looks like tightening the path from interest to the next concrete action.

If useful, I can send the exact spot I would start with.`,
    closer: `Understood.

The niche is already clear enough that I would probably focus first on the path from relevance to action, not on expanding the story.

If you want, I can send the short sprint version of that fix with pricing.`,
    teardown: `- The niche is clear enough already.
- The softer part is how a relevant visitor gets moved into the next concrete step after that.
- I would focus first on capture and next-step structure, not a broad rewrite.`,
  },
  Sitekick: {
    dm: `I checked Sitekick and the offer category is clear fast, but the path from “this is useful” to the next concrete action still feels lighter than it could be.

For a landing-page-focused product, that usually means some warm traffic understands the value but is not being pushed into the strongest next step hard enough.

I work on that kind of issue as a short sprint around capture, handoff, and next-step clarity.

If useful, I can send the exact point I would tighten first.`,
    followup: `Quick follow-up.

This looked less like a top-level positioning issue and more like a warm-traffic handoff issue after the visitor already understands the offer.

If useful, I can send the one section I would tighten first.`,
    closer: `That makes sense.

My read is that the page already makes the category understandable, so the bigger win is probably in how warm visitors get pushed into the clearest next action after that.

If useful, I can package that into a short fixed-scope sprint and send the clean version of the scope.`,
    teardown: `- The category and promise are understandable.
- The softer part is how a warm visitor gets moved into the strongest next action after that.
- I would tighten capture and next-step structure before touching broader messaging.`,
  },
  "Newsletter Compass": {
    dm: `I checked Newsletter Compass and the product niche is clear enough, but the path from interest to next action still feels lighter than the traffic probably deserves.

For newsletter growth tools, that usually means warm visitors understand the category but still do not get pushed forward hard enough.

I package fixes like that as a short sprint around capture, CTA clarity, and follow-up path.

If useful, I can send the exact point I would tighten first.`,
    followup: `Following up because this looked more like a next-step issue than a positioning issue.

The category is already understandable. The more likely win is tightening how warm traffic gets captured and routed after that.

If useful, I can send the one point I would start with.`,
    closer: `Understood.

From the outside, this looks less like a niche problem and more like a handoff problem once the right visitor already recognizes the offer.

If you want, I can turn that into a compact sprint and send the scoped version with pricing.`,
    teardown: `- The niche is clear enough already.
- The softer part is how relevant visitors get moved into a stronger next action.
- I would focus first on capture and handoff, not on rewriting the whole page.`,
  },
  Creatomate: {
    dm: `I checked Creatomate and the product category comes across clearly, but the next-step layer still feels lighter than it could be for a high-intent visitor.

For creator automation tools, that usually means the page is doing enough explanation work but not enough conversion work.

I work on that kind of issue as a short sprint around capture, handoff, and stronger next-step structure.

If useful, I can send the exact point I would tighten first.`,
    followup: `Quick follow-up.

This looked more like a handoff problem than a story problem.

The category is already clear. The bigger opportunity is likely in how warm traffic gets moved into the next action after that.

If useful, I can send the exact spot I would start with.`,
    closer: `That tracks.

The category is already clear enough, so I would probably focus first on the movement from interest into the strongest next action.

If useful, I can package that as a short sprint and send over the tightest version of the fix.`,
    teardown: `- The product category is understandable.
- The softer part is how a serious visitor gets pushed into the strongest next step.
- I would tighten handoff and CTA structure before broad messaging changes.`,
  },
};

const defaultTargets = [
  { priority: 1, name: "Supercharged Studio", batch: "Batch 1", source: "batch1", website: "https://www.supercharged.studio/website-design" },
  { priority: 2, name: "Digital Growth Studio", batch: "Batch 1", source: "batch1", website: "https://www.digitalgrowthstudio.com/" },
  { priority: 3, name: "Upgrow", batch: "Batch 1", source: "batch1", website: "https://www.upgrow.io/pricing" },
  { priority: 4, name: "Privy", batch: "Batch 2", source: "batch2", website: "https://www.privy.io/" },
  { priority: 5, name: "Dynamic", batch: "Batch 2", source: "batch2", website: "https://www.dynamic.xyz/" },
  { priority: 6, name: "OnchainInvoice", batch: "Batch 2", source: "batch2", website: "https://www.onchaininvoice.com/" },
  { priority: 7, name: "Sitekick", batch: "Batch 3", source: "batch3", website: "https://www.sitekick.ai/" },
  { priority: 8, name: "Newsletter Compass", batch: "Batch 3", source: "batch3", website: "https://www.newslettercompass.com/" },
  { priority: 9, name: "Creatomate", batch: "Batch 3", source: "batch3", website: "https://creatomate.com/" },
];

const loadState = () => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultTargets.map((target) => ({
      ...target,
      firstDm: false,
      replied: false,
      followUp: false,
      offerPage: false,
      paymentPage: false,
      lastTouch: "",
      notes: "",
    }));
  }

  try {
    return JSON.parse(raw);
  } catch (_error) {
    return defaultTargets.map((target) => ({
      ...target,
      firstDm: false,
      replied: false,
      followUp: false,
      offerPage: false,
      paymentPage: false,
      lastTouch: "",
      notes: "",
    }));
  }
};

const saveState = (state) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const state = loadState();

const pipelineBody = document.getElementById("pipelineBody");
const sentCount = document.getElementById("sentCount");
const replyCount = document.getElementById("replyCount");
const depositCount = document.getElementById("depositCount");
const followupDueCount = document.getElementById("followupDueCount");
const replyRate = document.getElementById("replyRate");
const offerRate = document.getElementById("offerRate");
const paymentRate = document.getElementById("paymentRate");
const resetButton = document.getElementById("resetDashboard");
const exportButton = document.getElementById("exportDashboard");
const exportCsvButton = document.getElementById("exportCsv");
const copyDmQueueButton = document.getElementById("copyDmQueue");
const copyRepliedQueueButton = document.getElementById("copyRepliedQueue");
const copyDueListButton = document.getElementById("copyDueList");
const importButton = document.getElementById("importDashboard");
const importFile = document.getElementById("importFile");
const dueList = document.getElementById("dueList");
const kanbanNeedsDm = document.getElementById("kanbanNeedsDm");
const kanbanDue = document.getElementById("kanbanDue");
const kanbanReplied = document.getElementById("kanbanReplied");
const kanbanDeposit = document.getElementById("kanbanDeposit");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const searchInput = document.getElementById("searchInput");
let activeFilter = "all";
let searchTerm = "";

const metrics = () => {
  const sent = state.filter((item) => item.firstDm).length;
  const replied = state.filter((item) => item.replied).length;
  const offer = state.filter((item) => item.offerPage).length;
  const payment = state.filter((item) => item.paymentPage).length;

  sentCount.textContent = String(sent);
  replyCount.textContent = String(replied);
  depositCount.textContent = String(payment);
  followupDueCount.textContent = String(
    state.filter((item) => {
      const meta = dueMeta(item);
      return meta && (meta.overdue || meta.dueToday);
    }).length
  );

  const ratio = (num, den) => {
    if (den === 0) return "0%";
    return `${Math.round((num / den) * 100)}%`;
  };

  replyRate.textContent = ratio(replied, sent);
  offerRate.textContent = ratio(offer, replied);
  paymentRate.textContent = ratio(payment, offer);
};

const cellCheckbox = (item, key) => {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = Boolean(item[key]);
  input.addEventListener("change", () => {
    item[key] = input.checked;
    if (input.checked && !item.lastTouch) {
      item.lastTouch = new Date().toISOString().slice(0, 10);
    }
    saveState(state);
    render();
  });
  return input;
};

const notesInput = (item) => {
  const input = document.createElement("input");
  input.type = "text";
  input.value = item.notes || "";
  input.placeholder = "reply summary / next step";
  input.className = "notes-input";
  input.addEventListener("change", () => {
    item.notes = input.value.trim();
    saveState(state);
  });
  return input;
};

const touchInput = (item) => {
  const input = document.createElement("input");
  input.type = "date";
  input.value = item.lastTouch || "";
  input.className = "notes-input";
  input.addEventListener("change", () => {
    item.lastTouch = input.value;
    saveState(state);
    render();
  });
  return input;
};

const dueLabel = (item) => {
  const span = document.createElement("span");
  span.className = "due-badge";

  if (!item.firstDm || item.replied || item.followUp || !item.lastTouch) {
    span.textContent = "-";
    return span;
  }

  const last = new Date(`${item.lastTouch}T00:00:00`);
  const due = new Date(last);
  due.setDate(due.getDate() + 2);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const text = due.toISOString().slice(0, 10);
  const overdue = due < today;
  const dueToday = due.getTime() === today.getTime();

  span.textContent = text;
  if (overdue) span.dataset.state = "overdue";
  else if (dueToday) span.dataset.state = "today";
  else span.dataset.state = "future";

  return span;
};

const dueMeta = (item) => {
  if (!item.firstDm || item.replied || item.followUp || !item.lastTouch) {
    return null;
  }

  const last = new Date(`${item.lastTouch}T00:00:00`);
  const due = new Date(last);
  due.setDate(due.getDate() + 2);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return {
    date: due.toISOString().slice(0, 10),
    overdue: due < today,
    dueToday: due.getTime() === today.getTime(),
  };
};

const sortRank = (item) => {
  const next = nextActionMeta(item);
  if (next.label === "Advance to deposit") return 0;
  if (next.label === "Send teardown + opener") return 1;
  if (next.label === "Send follow-up" && next.state === "overdue") return 2;
  if (next.label === "Send follow-up" && next.state === "today") return 3;
  if (next.label === "Send first DM") return 4;
  if (next.label === "Waiting on deposit") return 5;
  return 6;
};

const nextActionMeta = (item) => {
  const due = dueMeta(item);

  if (!item.firstDm) {
    return { label: "Send first DM", state: "future" };
  }

  if (item.replied && !item.offerPage) {
    return { label: "Send teardown + opener", state: "today" };
  }

  if (item.replied && item.offerPage && !item.paymentPage) {
    return { label: "Advance to deposit", state: "today" };
  }

  if (!item.replied && !item.followUp && due && (due.overdue || due.dueToday)) {
    return { label: "Send follow-up", state: due.overdue ? "overdue" : "today" };
  }

  if (item.paymentPage) {
    return { label: "Waiting on deposit", state: "future" };
  }

  return { label: "No action now", state: "future" };
};

const markSentTodayButton = (item) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "table-link";
  button.textContent = "Set Today";
  button.addEventListener("click", () => {
    item.firstDm = true;
    item.lastTouch = new Date().toISOString().slice(0, 10);
    saveState(state);
    render();
  });
  return button;
};

const actionLinks = (item) => {
  const wrap = document.createElement("div");
  wrap.className = "actions-cell";

  const links = [
    { label: "Site", href: item.website },
    { label: "DM Pack", href: `./${item.source}-dm-pack.md` },
    { label: "Follow-Up", href: `./${item.source}-followup-pack.md` },
    { label: "Closers", href: `./${item.source}-closers.md` },
  ];

  links.forEach((entry) => {
    const link = document.createElement("a");
    link.href = entry.href;
    link.textContent = entry.label;
    link.className = "table-link";
    wrap.appendChild(link);
  });

  return wrap;
};

const quickCopyButtons = (item) => {
  const wrap = document.createElement("div");
  wrap.className = "actions-cell";

  const entries = [
    { label: "Offer", value: "https://constansino.github.io/revenue-lab-global-crypto/crypto-native.html" },
    { label: "Pay", value: "https://constansino.github.io/revenue-lab-global-crypto/pay.html" },
    { label: "Site", value: item.website },
  ];

  entries.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "table-link table-button";
    button.textContent = entry.label;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(entry.value);
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = entry.label;
        }, 900);
      } catch (_error) {
        window.alert(entry.value);
      }
    });
    wrap.appendChild(button);
  });

  const summaryButton = document.createElement("button");
  summaryButton.type = "button";
  summaryButton.className = "table-link table-button";
  summaryButton.textContent = "Summary";
  summaryButton.addEventListener("click", async () => {
    const summary = [
      `Target: ${item.name}`,
      `Batch: ${item.batch}`,
      `Website: ${item.website}`,
      `First DM: ${item.firstDm ? "yes" : "no"}`,
      `Replied: ${item.replied ? "yes" : "no"}`,
      `Follow-Up: ${item.followUp ? "yes" : "no"}`,
      `Offer Page: ${item.offerPage ? "yes" : "no"}`,
      `Payment Page: ${item.paymentPage ? "yes" : "no"}`,
      `Last Touch: ${item.lastTouch || "-"}`,
      `Next Action: ${nextActionMeta(item).label}`,
      `Notes: ${item.notes || "-"}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      summaryButton.textContent = "Copied";
      window.setTimeout(() => {
        summaryButton.textContent = "Summary";
      }, 900);
    } catch (_error) {
      window.alert(summary);
    }
  });
  wrap.appendChild(summaryButton);

  return wrap;
};

const quickMessageButtons = (item) => {
  const wrap = document.createElement("div");
  wrap.className = "actions-cell";
  const bank = messageBank[item.name];
  if (!bank) return wrap;

  [
    { label: "DM", value: bank.dm },
    { label: "FU", value: bank.followup },
    { label: "Close", value: bank.closer },
    { label: "TD", value: bank.teardown },
  ].forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "table-link table-button";
    button.textContent = entry.label;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(entry.value);
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = entry.label;
        }, 900);
      } catch (_error) {
        window.alert(entry.value);
      }
    });
    wrap.appendChild(button);
  });

  return wrap;
};

const nextActionBadge = (item) => {
  const meta = nextActionMeta(item);
  const span = document.createElement("span");
  span.className = "due-badge";
  span.dataset.state = meta.state;
  span.textContent = meta.label;
  return span;
};

const kanbanCard = (item, label) => {
  const card = document.createElement("div");
  card.className = "kanban-card";

  const title = document.createElement("strong");
  title.textContent = item.name;
  card.appendChild(title);

  const meta = document.createElement("span");
  meta.textContent = label;
  card.appendChild(meta);

  return card;
};

const render = () => {
  pipelineBody.innerHTML = "";

  const filtered = state.filter((item) => {
    const matchesSearch =
      searchTerm.length === 0 ||
      item.name.toLowerCase().includes(searchTerm) ||
      item.batch.toLowerCase().includes(searchTerm);
    if (!matchesSearch) return false;
    if (activeFilter === "all") return true;
    if (activeFilter === "due") return Boolean(dueMeta(item));
    if (activeFilter === "needs-dm") return !item.firstDm;
    if (activeFilter === "replied") return item.replied && !item.paymentPage;
    if (activeFilter === "waiting-deposit") return item.paymentPage;
    return item.batch === activeFilter;
  }).sort((a, b) => {
    const rankDiff = sortRank(a) - sortRank(b);
    if (rankDiff !== 0) return rankDiff;
    return a.priority - b.priority;
  });

  filtered.forEach((item) => {
    const row = document.createElement("tr");

    const priority = document.createElement("td");
    priority.textContent = String(item.priority);
    row.appendChild(priority);

    const name = document.createElement("td");
    name.textContent = item.name;
    row.appendChild(name);

    const batch = document.createElement("td");
    batch.textContent = item.batch;
    row.appendChild(batch);

    const source = document.createElement("td");
    source.textContent = item.source;
    row.appendChild(source);

    ["firstDm", "replied", "followUp", "offerPage", "paymentPage"].forEach((key) => {
      if (key === "replied") {
        const sentToday = document.createElement("td");
        sentToday.appendChild(markSentTodayButton(item));
        row.appendChild(sentToday);
      }
      const cell = document.createElement("td");
      cell.appendChild(cellCheckbox(item, key));
      row.appendChild(cell);
    });

    const lastTouch = document.createElement("td");
    lastTouch.appendChild(touchInput(item));
    row.appendChild(lastTouch);

    const due = document.createElement("td");
    due.appendChild(dueLabel(item));
    row.appendChild(due);

    const nextAction = document.createElement("td");
    nextAction.appendChild(nextActionBadge(item));
    row.appendChild(nextAction);

    const notes = document.createElement("td");
    notes.appendChild(notesInput(item));
    row.appendChild(notes);

    const actions = document.createElement("td");
    actions.appendChild(actionLinks(item));
    row.appendChild(actions);

    const quickCopy = document.createElement("td");
    quickCopy.appendChild(quickCopyButtons(item));
    row.appendChild(quickCopy);

    const quickMessage = document.createElement("td");
    quickMessage.appendChild(quickMessageButtons(item));
    row.appendChild(quickMessage);

    pipelineBody.appendChild(row);
  });

  dueList.innerHTML = "";
  kanbanNeedsDm.innerHTML = "";
  kanbanDue.innerHTML = "";
  kanbanReplied.innerHTML = "";
  kanbanDeposit.innerHTML = "";
  const dueItems = state.filter((item) => {
    const meta = dueMeta(item);
    return meta && (meta.overdue || meta.dueToday);
  });

  if (dueItems.length === 0) {
    const empty = document.createElement("p");
    empty.className = "due-empty";
    empty.textContent = "No overdue or due-today follow-ups.";
    dueList.appendChild(empty);
  } else {
    dueItems.forEach((item) => {
      const meta = dueMeta(item);
      const chip = document.createElement("div");
      chip.className = "due-chip";
      chip.textContent = `${item.name} · ${meta.date}`;
      dueList.appendChild(chip);
    });
  }

  state.forEach((item) => {
    const next = nextActionMeta(item);
    if (next.label === "Send first DM") {
      kanbanNeedsDm.appendChild(kanbanCard(item, item.batch));
      return;
    }
    if (next.label === "Send follow-up") {
      kanbanDue.appendChild(kanbanCard(item, item.lastTouch || "follow-up due"));
      return;
    }
    if (next.label === "Send teardown + opener") {
      kanbanReplied.appendChild(kanbanCard(item, "reply received"));
      return;
    }
    if (next.label === "Advance to deposit" || next.label === "Waiting on deposit") {
      kanbanDeposit.appendChild(kanbanCard(item, next.label));
    }
  });

  metrics();
};

resetButton?.addEventListener("click", () => {
  window.localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
});

exportButton?.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "revenue-ops-dashboard.json";
  link.click();
  window.URL.revokeObjectURL(url);
});

exportCsvButton?.addEventListener("click", () => {
  const headers = [
    "priority",
    "name",
    "batch",
    "website",
    "firstDm",
    "replied",
    "followUp",
    "offerPage",
    "paymentPage",
    "lastTouch",
    "nextAction",
    "notes",
  ];

  const escape = (value) => {
    const text = String(value ?? "");
    if (text.includes(",") || text.includes('"') || text.includes("\n")) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  const rows = state.map((item) => [
    item.priority,
    item.name,
    item.batch,
    item.website,
    item.firstDm,
    item.replied,
    item.followUp,
    item.offerPage,
    item.paymentPage,
    item.lastTouch || "",
    nextActionMeta(item).label,
    item.notes || "",
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map(escape).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "revenue-ops-dashboard.csv";
  link.click();
  window.URL.revokeObjectURL(url);
});

copyDueListButton?.addEventListener("click", async () => {
  const dueItems = state
    .filter((item) => {
      const meta = dueMeta(item);
      return meta && (meta.overdue || meta.dueToday);
    })
    .map((item) => {
      const meta = dueMeta(item);
      return `${item.priority}. ${item.name} (${item.batch}) - due ${meta?.date || "-"}`;
    });

  const text =
    dueItems.length === 0
      ? "No overdue or due-today follow-ups."
      : `Follow-Up Due List\n\n${dueItems.join("\n")}`;

  try {
    await navigator.clipboard.writeText(text);
    copyDueListButton.textContent = "Copied";
    window.setTimeout(() => {
      copyDueListButton.textContent = "Copy Due List";
    }, 900);
  } catch (_error) {
    window.alert(text);
  }
});

copyDmQueueButton?.addEventListener("click", async () => {
  const items = state
    .filter((item) => !item.firstDm)
    .sort((a, b) => a.priority - b.priority)
    .map((item) => `${item.priority}. ${item.name} (${item.batch})`);

  const text = items.length === 0 ? "No targets currently need a first DM." : `DM Queue\n\n${items.join("\n")}`;

  try {
    await navigator.clipboard.writeText(text);
    copyDmQueueButton.textContent = "Copied";
    window.setTimeout(() => {
      copyDmQueueButton.textContent = "Copy DM Queue";
    }, 900);
  } catch (_error) {
    window.alert(text);
  }
});

copyRepliedQueueButton?.addEventListener("click", async () => {
  const items = state
    .filter((item) => item.replied && !item.paymentPage)
    .sort((a, b) => a.priority - b.priority)
    .map((item) => `${item.priority}. ${item.name} (${item.batch}) - ${nextActionMeta(item).label}`);

  const text =
    items.length === 0 ? "No active replied targets right now." : `Replied Queue\n\n${items.join("\n")}`;

  try {
    await navigator.clipboard.writeText(text);
    copyRepliedQueueButton.textContent = "Copied";
    window.setTimeout(() => {
      copyRepliedQueueButton.textContent = "Copy Replied Queue";
    }, 900);
  } catch (_error) {
    window.alert(text);
  }
});

importButton?.addEventListener("click", () => {
  importFile?.click();
});

importFile?.addEventListener("change", async () => {
  const file = importFile.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      throw new Error("Invalid dashboard data");
    }

    state.splice(0, state.length, ...parsed);
    saveState(state);
    render();
  } catch (_error) {
    window.alert("Import failed");
  } finally {
    importFile.value = "";
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";
    filterButtons.forEach((entry) => entry.classList.remove("active-filter"));
    button.classList.add("active-filter");
    render();
  });
});

searchInput?.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  render();
});

render();
