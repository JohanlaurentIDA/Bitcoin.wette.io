// API-URL für den aktuellen Bitcoin-Preis
const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

// Vergleichspreise
const prices = {
  johan: 123123,
  andreas: 74030,
  frank: 24334,
};

// Elemente im DOM
const bitcoinPriceEl = document.getElementById("bitcoin-price");
const johanDiffEl = document.getElementById("johan-diff");
const johanPercentEl = document.getElementById("johan-percent");
const andreasDiffEl = document.getElementById("andreas-diff");
const andreasPercentEl = document.getElementById("andreas-percent");
const frankDiffEl = document.getElementById("frank-diff");
const frankPercentEl = document.getElementById("frank-percent");

// Funktion, um den aktuellen Bitcoin-Preis zu holen und zu aktualisieren
async function updatePrices() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const bitcoinPrice = data.bitcoin.usd;
    bitcoinPriceEl.textContent = `Aktueller Bitcoin-Preis: $${bitcoinPrice}`;

    // Update der Preisvergleiche
    updateComparison("johan", bitcoinPrice, prices.johan, johanDiffEl, johanPercentEl);
    updateComparison("andreas", bitcoinPrice, prices.andreas, andreasDiffEl, andreasPercentEl);
    updateComparison("frank", bitcoinPrice, prices.frank, frankDiffEl, frankPercentEl);
  } catch (error) {
    bitcoinPriceEl.textContent = "Fehler beim Laden des Bitcoin-Preises.";
  }
}

// Funktion, um die Differenzen zu berechnen und anzuzeigen
function updateComparison(name, currentPrice, comparePrice, diffEl, percentEl) {
  const difference = currentPrice - comparePrice;
  const percentage = ((difference / comparePrice) * 100).toFixed(2);
  diffEl.textContent = `$${difference.toFixed(2)}`;
  percentEl.textContent = `${percentage}%`;
}

// Aktualisierung alle 60 Sekunden
setInterval(updatePrices, 60000);

// Initialer Aufruf
updatePrices();
