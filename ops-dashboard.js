const STORAGE_KEY = "revenue-lab-dashboard-v1";

const defaultTargets = [
  { priority: 1, name: "Supercharged Studio", batch: "Batch 1" },
  { priority: 2, name: "Digital Growth Studio", batch: "Batch 1" },
  { priority: 3, name: "Upgrow", batch: "Batch 1" },
  { priority: 4, name: "Privy", batch: "Batch 2" },
  { priority: 5, name: "Dynamic", batch: "Batch 2" },
  { priority: 6, name: "OnchainInvoice", batch: "Batch 2" },
  { priority: 7, name: "Sitekick", batch: "Batch 3" },
  { priority: 8, name: "Newsletter Compass", batch: "Batch 3" },
  { priority: 9, name: "Creatomate", batch: "Batch 3" },
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

    ["firstDm", "replied", "followUp", "offerPage", "paymentPage"].forEach((key) => {
      const cell = document.createElement("td");
      cell.appendChild(cellCheckbox(item, key));
      row.appendChild(cell);
    });

    pipelineBody.appendChild(row);
  });

  metrics();
};

resetButton?.addEventListener("click", () => {
  window.localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
});

render();
