const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const docsInput = document.getElementById("docsPerMonth");
const minutesInput = document.getElementById("minutesLost");
const hourlyInput = document.getElementById("hourlyCost");
const reworkInput = document.getElementById("reworkRate");

const monthlyWaste = document.getElementById("monthlyWaste");
const annualWaste = document.getElementById("annualWaste");
const payback = document.getElementById("paybackEstimate");
const suggestion = document.getElementById("suggestedOffer");
const suggestionNote = document.getElementById("suggestedOfferNote");
const suggestionLink = document.getElementById("suggestedOfferLink");

const getRecommendation = (waste, docs) => {
  if (waste < 900 || docs < 120) {
    return {
      label: "DocSafe Audit",
      price: 300,
      link: "./docsafe-audit-start.html",
      note: "Best when the buyer first needs visibility into intake gaps, risks, and state confusion.",
    };
  }

  if (waste < 2500 || docs < 280) {
    return {
      label: "DocSafe Setup Sprint",
      price: 900,
      link: "./docsafe-setup-sprint-start.html",
      note: "Best when one document path is already costing enough each month to justify implementation now.",
    };
  }

  return {
    label: "DocSafe Workspace",
    price: 2000,
    link: "./docsafe-workspace-start.html",
    note: "Best when recurring volume and multiple owners justify a broader branded operating environment.",
  };
};

const renderRoi = () => {
  const docs = Number(docsInput?.value || 0);
  const minutesLost = Number(minutesInput?.value || 0);
  const hourly = Number(hourlyInput?.value || 0);
  const reworkRate = Number(reworkInput?.value || 0) / 100;

  const lostHours = (docs * minutesLost) / 60;
  const reworkHours = (docs * reworkRate * 10) / 60;
  const totalMonthlyWaste = (lostHours + reworkHours) * hourly;
  const totalAnnualWaste = totalMonthlyWaste * 12;

  const recommendation = getRecommendation(totalMonthlyWaste, docs);
  const paybackMonths = recommendation.price / Math.max(totalMonthlyWaste, 1);

  monthlyWaste.textContent = formatCurrency(totalMonthlyWaste);
  annualWaste.textContent = formatCurrency(totalAnnualWaste);
  payback.textContent = `${paybackMonths.toFixed(1)} months`;
  suggestion.textContent = recommendation.label;
  suggestionNote.textContent = recommendation.note;
  suggestionLink.href = recommendation.link;
  suggestionLink.textContent = `Open ${recommendation.label}`;
};

[docsInput, minutesInput, hourlyInput, reworkInput].forEach((input) =>
  input?.addEventListener("input", renderRoi)
);

renderRoi();
