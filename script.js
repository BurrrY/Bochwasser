// Grundrezept für 100L
const BASE_RECIPE = {
    total: 100,
    eisteeDosen: 8.5,
    korn: 20, //flaschen
    wasser: 86
};

// Berechne Verhältnisse aus dem Grundrezept
// Gesamtmenge = korn + wasser (ohne Eistee)
const RATIOS = {
    eistee: dosenZuLiter(BASE_RECIPE.eisteeDosen) / BASE_RECIPE.total,
    korn: flaschenZuLiter(BASE_RECIPE.korn) / BASE_RECIPE.total,
    wasser: BASE_RECIPE.wasser / BASE_RECIPE.total
};

// DOM-Elemente
const totalInput = document.getElementById('total');
const eisteeInput = document.getElementById('eistee');
const kornInput = document.getElementById('korn');
const wasserInput = document.getElementById('wasser');

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

// Berechne Liter aus Flaschen (0.7L pro Flasche)
function flaschenZuLiter(dosen) {
    return dosen * 0.7;
}

// Berechne Dosen aus Liter
function literZuFlaschen(liter) {
    return liter / 0.7;
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
    //kornInput.value = roundWhole(kornLiter);
    kornInput.value = round(literZuFlaschen(kornLiter));
    wasserInput.value = roundWhole(wasserLiter);

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
    //kornInput.value = roundWhole(newTotal * RATIOS.korn);
    kornInput.value = round(literZuFlaschen(newTotal * RATIOS.korn));
    wasserInput.value = roundWhole(newTotal * RATIOS.wasser);

    isUpdating = false;
}

// Wenn Korn geändert wird: berechne neue Gesamtmenge und passe andere Zutaten an
function onKornChange() {
    if (isUpdating) return;
    isUpdating = true;

    const kornLiter = flaschenZuLiter(parseFloat(kornInput.value) || 0);

    // Berechne neue Gesamtmenge basierend auf dem Korn-Anteil
    const newTotal = kornLiter / RATIOS.korn;

    // Passe alle anderen Werte an
    totalInput.value = round(newTotal);
    eisteeInput.value = round(literZuDosen(newTotal * RATIOS.eistee));
    wasserInput.value = roundWhole(newTotal * RATIOS.wasser);

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
    //kornInput.value = roundWhole(newTotal * RATIOS.korn);
    kornInput.value = round(literZuFlaschen(newTotal * RATIOS.korn));

    isUpdating = false;
}

// Event Listener
totalInput.addEventListener('input', onTotalChange);
eisteeInput.addEventListener('input', onEisteeChange);
kornInput.addEventListener('input', onKornChange);
wasserInput.addEventListener('input', onWasserChange);

// Plus/Minus Button Funktionalität
document.querySelectorAll('.btn-increase, .btn-decrease').forEach(button => {
    button.addEventListener('click', function(e) {
        if (isUpdating) return;

        // Verhindere mehrfaches Triggern
        e.preventDefault();

        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);

        if (!input) return;

        const currentValue = parseFloat(input.value) || 0;
        const step = parseFloat(input.getAttribute('step')) || 1;
        const min = parseFloat(input.getAttribute('min')) || 0;

        let newValue;
        if (this.classList.contains('btn-increase')) {
            newValue = currentValue + step;
        } else {
            newValue = Math.max(min, currentValue - step);
        }

        // Runde auf die gleiche Anzahl Dezimalstellen wie der Step
        const decimals = (step.toString().split('.')[1] || '').length;
        newValue = Math.round(newValue * Math.pow(10, decimals)) / Math.pow(10, decimals);

        // Setze Wert und trigger Event ohne dass die onChange-Funktionen rekursiv aufgerufen werden
        isUpdating = true;
        input.value = newValue;
        isUpdating = false;

        // Trigger input event um die Berechnungen auszulösen
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
});

// Reset Button Funktionalität
const resetButton = document.getElementById('reset-btn');
if (resetButton) {
    resetButton.addEventListener('click', function() {
        isUpdating = true;

        // Setze alle Werte auf die Grundrezeptwerte zurück
        totalInput.value = BASE_RECIPE.total;
        eisteeInput.value = BASE_RECIPE.eisteeDosen;
        kornInput.value = BASE_RECIPE.korn;
        wasserInput.value = BASE_RECIPE.wasser;

        isUpdating = false;
    });
}

