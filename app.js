const wallet = "0xB3e9568A9cbB624403743340358c85CCce130893";

const copyWallet = async () => {
  try {
    await navigator.clipboard.writeText(wallet);
    const buttons = [document.getElementById("copyWalletTop"), document.getElementById("copyWalletMain")];
    buttons.forEach((button) => {
      if (!button) return;
      const original = button.textContent;
      button.textContent = "已复制";
      window.setTimeout(() => {
        button.textContent = original;
      }, 1200);
    });
  } catch (_error) {
    window.alert(wallet);
  }
};

document.getElementById("copyWalletTop")?.addEventListener("click", copyWallet);
document.getElementById("copyWalletMain")?.addEventListener("click", copyWallet);

const hours = document.getElementById("hours");
const rate = document.getElementById("rate");
const price = document.getElementById("price");
const monthlySaving = document.getElementById("monthlySaving");
const payback = document.getElementById("payback");

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

[hours, rate, price].forEach((input) => input?.addEventListener("input", renderCalculator));
renderCalculator();
