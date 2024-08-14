document.getElementById('arcCalculator').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener datos del formulario
    const voltage = parseFloat(document.getElementById('voltage').value); 
    const current = parseFloat(document.getElementById('current').value); 
    const clearingTime = parseFloat(document.getElementById('clearingTime').value) / 1000; 
    const t_min = parseFloat(document.getElementById('t_min').value) / 1000; 
    const phases = document.getElementById('phases').value; 
    const faultType = document.getElementById('faultType').value; 
    const equipmentType = document.getElementById('equipmentType').value; 
    const distance = parseFloat(document.getElementById('distance').value); 
    const cabinetHeight = parseFloat(document.getElementById('cabinetHeight').value); 
    const cabinetWidth = parseFloat(document.getElementById('cabinetWidth').value); 
    const cabinetDepth = parseFloat(document.getElementById('cabinetDepth').value); 
    const electrodeConfig = document.getElementById('electrodeConfig').value; 
    const gap = parseFloat(document.getElementById('gap').value); 

    // Coeficientes específicos según IEEE 1584-2018
    let K1, K2, K3, K4, K5;
    switch (electrodeConfig) {
        case 'VCB':
            K1 = -0.153;
            K2 = 0.792;
            K3 = 0.140;
            K4 = 0.069;
            K5 = -0.030;
            break;
        case 'VCBB':
            K1 = -0.155;
            K2 = 0.803;
            K3 = 0.142;
            K4 = 0.071;
            K5 = -0.032;
            break;
        case 'HCB':
            K1 = -0.154;
            K2 = 0.798;
            K3 = 0.141;
            K4 = 0.070;
            K5 = -0.031;
            break;
        case 'VOA':
            K1 = -0.156;
            K2 = 0.808;
            K3 = 0.143;
            K4 = 0.072;
            K5 = -0.033;
            break;
        case 'HOA':
            K1 = -0.157;
            K2 = 0.813;
            K3 = 0.144;
            K4 = 0.073;
            K5 = -0.034;
            break;
    }

    function calculateArcParameters(Ibf, clearingTime, Cf) {
        const log10Ibf = Math.log10(Ibf);
        const log10G = Math.log10(gap);
        const log10Ia = K1 + K2 * log10Ibf + K3 * log10G + Math.sqrt(K4 + K5 * log10Ibf);
        const Ia = Math.pow(10, log10Ia);

        // Cálculo de la energía incidente
        const x = 1.5;
        const Ei = Cf * (Math.pow(Ia, 2) * clearingTime) / Math.pow(distance, x);

        // Calcular la frontera de arco eléctrico (AFB)
        const AFB = Math.sqrt(Ei * clearingTime * 4.184 / 1.2);

        return { Ia, Ei, AFB };
    }

    // Factor de corrección basado en el tamaño del gabinete
    const cabinetCorrectionFactor = (cabinetHeight + cabinetWidth + cabinetDepth) / 3 / 660; 

    // Calcular parámetros para la corriente de arco máxima
    const maxParameters = calculateArcParameters(current, clearingTime, cabinetCorrectionFactor);
    // Calcular parámetros para la corriente de arco mínima
    const minParameters = calculateArcParameters(current * 0.85, t_min, cabinetCorrectionFactor);

    // Mostrar resultados
    document.getElementById('arcCurrentMax').textContent = `Corriente de Arco Máxima: ${maxParameters.Ia.toFixed(2)} kA`;
    document.getElementById('incidentEnergyMax').textContent = `Energía Incidente Máxima: ${maxParameters.Ei.toFixed(2)} cal/cm²`;
    document.getElementById('arcFlashBoundaryMax').textContent = `Frontera de Arco Eléctrico Máxima: ${maxParameters.AFB.toFixed(2)} mm`;
    document.getElementById('arcCurrentMin').textContent = `Corriente de Arco Mínima: ${minParameters.Ia.toFixed(2)} kA`;
    document.getElementById('incidentEnergyMin').textContent = `Energía Incidente Mínima: ${minParameters.Ei.toFixed(2)} cal/cm²`;
    document.getElementById('arcFlashBoundaryMin').textContent = `Frontera de Arco Eléctrico Mínima: ${minParameters.AFB.toFixed(2)} mm`;

    // Mostrar secciones de resultados y recomendaciones de EPP
    document.getElementById('results').style.display = 'block';
    document.getElementById('eppSection').style.display = 'block';
});

// Botón para borrar datos de entrada
document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('arcCalculator').reset();
    document.getElementById('results').style.display = 'none';
    document.getElementById('eppSection').style.display = 'none';
});