// Grundrezept für 100L
const BASE_RECIPE = {
    total: 100,
    eisteeDosen: 8,
    korn: 12,
    wasser: 84
};

// Berechne Verhältnisse aus dem Grundrezept
const RATIOS = {
    eistee: dosenZuLiter(BASE_RECIPE.eisteeDosen) / BASE_RECIPE.total,  // 4L / 100L = 0.04
    korn: BASE_RECIPE.korn / BASE_RECIPE.total,                         // 12L / 100L = 0.12
    wasser: BASE_RECIPE.wasser / BASE_RECIPE.total                      // 84L / 100L = 0.84
};

// DOM-Elemente
const totalInput = document.getElementById('total');
const eisteeInput = document.getElementById('eistee');
const kornInput = document.getElementById('korn');
const wasserInput = document.getElementById('wasser');
const eisteeLiterDisplay = document.getElementById('eistee-liter');

// Flag um Endlosschleifen zu verhindern
let isUpdating = false;

// Hilfsfunktion: Rundet auf 1 Dezimalstelle
function round(value) {
    return Math.round(value * 10) / 10;
}

// Hilfsfunktion: Rundet auf ganze Zahlen
function roundWhole(value) {
    return Math.round(value);
}

// Berechne Liter aus Dosen (0.5L pro Dose)
function dosenZuLiter(dosen) {
    return dosen * 0.5;
}

// Berechne Dosen aus Liter
function literZuDosen(liter) {
    return liter / 0.5;
}

// Aktualisiere die Liter-Anzeige für Eistee
function updateEisteeLiterDisplay() {
    const liter = dosenZuLiter(parseFloat(eisteeInput.value) || 0);
    eisteeLiterDisplay.textContent = `${liter.toFixed(1)} L`;
}

// Wenn Gesamtmenge geändert wird: alle Zutaten proportional anpassen
function onTotalChange() {
    if (isUpdating) return;
    isUpdating = true;

    const newTotal = parseFloat(totalInput.value) || 0;

    // Berechne alle Zutaten basierend auf den Verhältnissen
    const eisteeLiter = newTotal * RATIOS.eistee;
    const kornLiter = newTotal * RATIOS.korn;
    const wasserLiter = newTotal * RATIOS.wasser;

    eisteeInput.value = round(literZuDosen(eisteeLiter));
    kornInput.value = roundWhole(kornLiter);
    wasserInput.value = roundWhole(wasserLiter);

    updateEisteeLiterDisplay();
    isUpdating = false;
}

// Wenn Eistee geändert wird: berechne neue Gesamtmenge und passe andere Zutaten an
function onEisteeChange() {
    if (isUpdating) return;
    isUpdating = true;

    const eisteeLiter = dosenZuLiter(parseFloat(eisteeInput.value) || 0);

    // Berechne neue Gesamtmenge basierend auf dem Eistee-Anteil
    const newTotal = eisteeLiter / RATIOS.eistee;

    // Passe alle anderen Werte an
    totalInput.value = round(newTotal);
    kornInput.value = roundWhole(newTotal * RATIOS.korn);
    wasserInput.value = roundWhole(newTotal * RATIOS.wasser);

    updateEisteeLiterDisplay();
    isUpdating = false;
}

// Wenn Korn geändert wird: berechne neue Gesamtmenge und passe andere Zutaten an
function onKornChange() {
    if (isUpdating) return;
    isUpdating = true;

    const kornLiter = parseFloat(kornInput.value) || 0;

    // Berechne neue Gesamtmenge basierend auf dem Korn-Anteil
    const newTotal = kornLiter / RATIOS.korn;

    // Passe alle anderen Werte an
    totalInput.value = round(newTotal);
    eisteeInput.value = round(literZuDosen(newTotal * RATIOS.eistee));
    wasserInput.value = roundWhole(newTotal * RATIOS.wasser);

    updateEisteeLiterDisplay();
    isUpdating = false;
}

// Wenn Wasser geändert wird: berechne neue Gesamtmenge und passe andere Zutaten an
function onWasserChange() {
    if (isUpdating) return;
    isUpdating = true;

    const wasserLiter = parseFloat(wasserInput.value) || 0;

    // Berechne neue Gesamtmenge basierend auf dem Wasser-Anteil
    const newTotal = wasserLiter / RATIOS.wasser;

    // Passe alle anderen Werte an
    totalInput.value = round(newTotal);
    eisteeInput.value = round(literZuDosen(newTotal * RATIOS.eistee));
    kornInput.value = roundWhole(newTotal * RATIOS.korn);

    updateEisteeLiterDisplay();
    isUpdating = false;
}

// Event Listener
totalInput.addEventListener('input', onTotalChange);
eisteeInput.addEventListener('input', onEisteeChange);
kornInput.addEventListener('input', onKornChange);
wasserInput.addEventListener('input', onWasserChange);

// Initiale Anzeige aktualisieren
updateEisteeLiterDisplay();
