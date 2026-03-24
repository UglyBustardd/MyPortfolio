function getTargetValues() {
    return {
        clay: parseFloat(document.getElementById('clay').value),
        crushability: parseFloat(document.getElementById('crushability').value),
        density: parseFloat(document.getElementById('density').value)
    }
}

function calculateRandomParametre(targetValue, min, max) {
    const targetMin = targetValue - min;
    const targetMax = targetValue + max;
    let value = Math.random() * (targetMax - targetMin) + targetMin;
    return value
}

function randomParametres() {
    const parameters = {
        clay: null,
        crushability: null,
        density: null,
        dust: null
    };
    parameters.clay = calculateRandomParametre(getTargetValues().clay, 0.3, 0.3);
    parameters.clay = Math.round(parameters.clay * 20) / 20;
    parameters.crushability = getTargetValues.crushability;
    parameters.density = calculateRandomParametre(getTargetValues().density, 0.3, 0.3);
    // parameters.dust = ; // Воткнуть значение из последней ячейки рассева
}