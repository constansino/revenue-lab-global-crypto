const STORAGE_KEY = "revenue-lab-dashboard-v1";

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
const resetButton = document.getElementById("resetDashboard");
const exportButton = document.getElementById("exportDashboard");

const metrics = () => {
  sentCount.textContent = String(state.filter((item) => item.firstDm).length);
  replyCount.textContent = String(state.filter((item) => item.replied).length);
  depositCount.textContent = String(state.filter((item) => item.paymentPage).length);
};

const cellCheckbox = (item, key) => {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = Boolean(item[key]);
  input.addEventListener("change", () => {
    item[key] = input.checked;
    saveState(state);
    metrics();
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

const render = () => {
  pipelineBody.innerHTML = "";

  state.forEach((item) => {
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
      const cell = document.createElement("td");
      cell.appendChild(cellCheckbox(item, key));
      row.appendChild(cell);
    });

    const notes = document.createElement("td");
    notes.appendChild(notesInput(item));
    row.appendChild(notes);

    const actions = document.createElement("td");
    actions.appendChild(actionLinks(item));
    row.appendChild(actions);

    pipelineBody.appendChild(row);
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

render();
