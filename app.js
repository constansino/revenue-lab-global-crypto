const wallet = "0xB3e9568A9cbB624403743340358c85CCce130893";

const flashCopiedState = (button) => {
  if (!button) return;
  const original = button.dataset.originalLabel || button.textContent;
  const copiedLabel =
    button.dataset.copiedLabel || (original.includes("复制") ? "已复制" : "Copied");

  button.dataset.originalLabel = original;
  button.textContent = copiedLabel;

  window.clearTimeout(button._copyResetTimer);
  button._copyResetTimer = window.setTimeout(() => {
    button.textContent = original;
  }, 1200);
};

const copyText = async (text, buttons = []) => {
  try {
    await navigator.clipboard.writeText(text);
    buttons.forEach((button) => flashCopiedState(button));
  } catch (_error) {
    window.alert(text);
  }
};

const copyWallet = async () => {
  const buttons = [document.getElementById("copyWalletTop"), document.getElementById("copyWalletMain")];
  await copyText(wallet, buttons);
};

document.getElementById("copyWalletTop")?.addEventListener("click", copyWallet);
document.getElementById("copyWalletMain")?.addEventListener("click", copyWallet);

document.querySelectorAll(".copy-snippet").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    if (!text) return;
    await copyText(text.replaceAll("%0A", "\n"), [button]);
  });
});

const hours = document.getElementById("hours");
const rate = document.getElementById("rate");
const price = document.getElementById("price");
const monthlySaving = document.getElementById("monthlySaving");
const payback = document.getElementById("payback");

if (hours && rate && price && monthlySaving && payback) {
  const renderCalculator = () => {
    const saved = Number(hours.value) * Number(rate.value);
    const paybackMonths = Number(price.value) / Math.max(saved, 1);

    monthlySaving.textContent = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(saved);

    payback.textContent = `${paybackMonths.toFixed(1)} months`;
  };

  [hours, rate, price].forEach((input) => input.addEventListener("input", renderCalculator));
  renderCalculator();
}
