type="text/javascript">
    // Inicializar Auth0
    const auth0Client = await createAuth0Client({
        domain: "dev-fc6lsp7q0u3rsytf.us.auth0.com",
        client_id: "KIvLs07FOcNftvZbXERC5l5CqAUqd0gY"
    });

    // Función para iniciar sesión
    async function login() {
        await auth0Client.loginWithRedirect({
            redirect_uri: window.location.origin + "/callback"
        });
    }

    // Función para cerrar sesión
    function logout() {
        auth0Client.logout({
            returnTo: window.location.origin
        });
    }

    // Función para manejar el callback después del inicio de sesión
    async function handleRedirectCallback() {
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, "/");
        }
    }

    // Verificar si el usuario está autenticado
    async function checkAuthentication() {
        const isAuthenticated = await auth0Client.isAuthenticated();
        if (isAuthenticated) {
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "block";
        } else {
            document.getElementById("login").style.display = "block";
            document.getElementById("logout").style.display = "none";
        }
    }

    // Manejar el callback si es necesario y verificar autenticación al cargar la página
    window.onload = async () => {
        await handleRedirectCallback();
        await checkAuthentication();
    };












function validateInputs() {
    var faultCurrent = parseFloat(document.getElementById("faultCurrent").value);
    var nominalVoltage = parseFloat(document.getElementById("nominalVoltage").value);
    var electrodeDistance = parseFloat(document.getElementById("electrodeDistance").value);
    var arcDuration = parseFloat(document.getElementById("arcDuration").value);
    var arcDurationmín = parseFloat(document.getElementById("arcDurationmín").value);
    var workingDistance = parseFloat(document.getElementById("workingDistance").value);
    var width = parseFloat(document.getElementById("width").value);
    var height = parseFloat(document.getElementById("height").value);
    var depth = parseFloat(document.getElementById("depth").value);
    var limepp1_calcm2 = parseFloat(document.getElementById("limepp1_calcm2").value);
    var limepp2_calcm2 = parseFloat(document.getElementById("limepp2_calcm2").value);

    let errors = [];

    // Validar si los valores son números y están dentro de los rangos aceptables
    if (isNaN(faultCurrent) || isNaN(electrodeDistance) || isNaN(nominalVoltage) ||
        isNaN(arcDuration) ||
        isNaN(arcDurationmín) || isNaN(workingDistance) || isNaN(width) || isNaN(height) || isNaN(depth) || isNaN(limepp1_calcm2) || isNaN(limepp2_calcm2)) {
        errors.push("Por favor, ingresa valores válidos.");
    }

    // Ejemplo de validación de límites
    if (faultCurrent < 0.2 || faultCurrent > 106) {
        errors.push("- La corriente de falla debe estar entre 0.2 y 106 kA.");
    }
    if (nominalVoltage < 0.208 || nominalVoltage > 15) {
        errors.push("- La tensión nominal debe estar entre 0.208 y 15 kV.");
    }
    if ((nominalVoltage >= 0.208 && nominalVoltage <= 0.600) && (faultCurrent < 0.5 || faultCurrent > 106)) {
        errors.push("- Para una tensión nominal entre 0.208 y 0.6 kV la corriente de falla debe estar entre 0.5 y 106 kA.");
    }
    if ((nominalVoltage > 0.600 && nominalVoltage <= 15) && (faultCurrent < 0.2 || faultCurrent > 65)) {
        errors.push("- Para una tensión nominal entre 0.6 y 15 kV la corriente de falla debe estar entre 0.2 y 65 kA.");
    }
   if (electrodeDistance < 6.35 || electrodeDistance > 254) {
        errors.push("- La distancia entre electrodos debe estar entre 6.35 y 254 mm.");
    }
    if ((nominalVoltage >= 0.208 && nominalVoltage <= 0.600) && (electrodeDistance < 6.35 || electrodeDistance > 76.2)) {
        errors.push("- Para una tensión nominal entre 0.208 y 0.6 kV la distancia entre los electrodos debe estar entre 6.35 y 76.2 mm.");
    }
    if ((nominalVoltage > 0.600 && nominalVoltage <= 15) && (electrodeDistance < 19.05 || electrodeDistance > 254)) {
        errors.push("- Para una tensión nominal entre 0.6 y 15 kV la distancia entre los electrodos debe estar entre 19.05 y 254 mm.");
    }
    if (arcDuration < 0) {
        errors.push("- La duración del arco debe ser mayor a 0 ms.");
    }
    if (arcDurationmín < 0) {
        errors.push("- La duración del arco con corriente de arco mínima debe ser mayor a 0 ms.");
    }
    if (workingDistance < 305 || workingDistance > 2540) {
        errors.push("- La distancia de trabajo debe estar entre 305 y 2540 mm.");
    }
    if (width < 25.4 || width > 1244.6) {
        errors.push("- El ancho del gabinete debe estar entre 1 y 1244.6 mm.");
    }
    if (width < (4 * electrodeDistance)) {
        errors.push("- El ancho del gabinete debe ser mínimo 4 veces la distancia entre los electrodos.");
    }
    if (height < 1 || height > 1244.6) {
        errors.push("- El alto del gabinete debe estar entre 1 y 1244.6 mm.");
    }
    if (depth < 1) {
        errors.push("- La profundidad del gabinete debe ser mayor o igual a 1 mm.");
    }
    if (limepp1_calcm2 < 1) {
        errors.push("- El límite de energía incidente para el EPP de categoría 1 debe ser mayor o igual a 1 cal/cm2.");
    }
    if (limepp2_calcm2 < 1) {
        errors.push("- El límite de energía incidente para el EPP de categoría 2 debe ser mayor o igual a 1 cal/cm2.");
    }

    // Si hay errores, mostrar todos los mensajes juntos con el título
    if (errors.length > 0) {
        let title = "Parámetro(s) Fuera de Rangos del Modelo de la Norma IEEE 1584-2018:";
        alert(title + "\n\n" + errors.join("\n\n"));
        return false; // Detener la ejecución si hay errores
    }

    return true; // Si todo es válido, devuelve true
}

document.addEventListener("DOMContentLoaded", function() {
    // Asignar el evento click al botón de cálculo
    document.getElementById("calculateButton").addEventListener("click", function() {
        if (validateInputs()) {
            calculateBoth();
        }
    });
});


function calculateBoth() {
    // Permitir el desplazamiento del cuerpo
    document.body.style.overflow = 'auto';

    // Limpiar el contenido anterior
    document.getElementById("result").innerHTML = "";

    // Mostrar el contenedor de resultados y el gráfico
    const resultContainer = document.getElementById('result-container');
    const chartContainer = document.querySelector('.chart-container');
    const chartContainer2 = document.querySelector('.chart-container2');
    
    resultContainer.style.display = 'block';
    chartContainer.style.display = 'block';
    chartContainer2.style.display = 'block';

    // Realiza los cálculos
    calculateArcCurrent();
    calculateIncidentEnergy();
    calculateArcFlashBoundary();

    // Desplazar suavemente hacia los resultados con un pequeño espacio en la parte superior
    const offset = -2; // Ajusta este valor para aumentar o disminuir el espacio superior
    const elementPosition = resultContainer.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Constantes actualizadas para cada combinación de equipo y tensión
const tabla1 = {
    "VCB": {
        "600 V": [-0.04287, 1.035, -0.083, 0, 0, -0.000000004783, 0.000001962, -0.000229, 0.003141, 1.092],
        "2700 V": [0.0065, 1.001, -0.024, -0.000000000001557, 0.0000000004556, -0.00000004186, 0.0000008346, 0.00005482, -0.003191, 0.9729],
        "14300 V": [0.005795, 1.015, -0.011, -0.000000000001557, 0.0000000004556, -0.00000004186, 0.0000008346, 0.00005482, -0.003191, 0.9729]
    },
    "VCBB": {
        "600 V": [-0.017432, 0.98, -0.05, 0, 0, -0.000000005767, 0.000002524, -0.00034, 0.01187, 1.013],
        "2700 V": [0.002823, 0.995, -0.0125, 0, -0.00000000009204, 0.00000002901, -0.000003262, 0.0001569, -0.004003, 0.9825],
        "14300 V": [0.014827, 1.01, -0.01, 0, -0.00000000009204, 0.00000002901, -0.000003262, 0.0001569, -0.004003, 0.9825]
    },
    "HCB": {
        "600 V": [0.054922, 0.988, -0.11, 0, 0, -0.000000005382, 0.000002316, -0.000302, 0.0091, 0.9725],
        "2700 V": [0.001011, 1.003, -0.0249, 0, 0, 0.0000000004859, -0.0000001814, -0.000009128, -0.0007, 0.9881],
        "14300 V": [0.008693, 0.999, -0.02, 0, -0.00000000005043, 0.00000002233, -0.000003046, 0.000116, -0.001145, 0.9839]
    },
    "VOA": {
        "600 V": [0.043785, 1.04, -0.18, 0, 0, -0.000000004783, 0.000001962, -0.000229, 0.003141, 1.092],
        "2700 V": [-0.02395, 1.006, -0.0188, -0.000000000001557, 0.0000000004556, -0.00000004186, 0.0000008346, 0.00005482, -0.003191, 0.9729],
        "14300 V": [0.005371, 1.0102, -0.029, -0.000000000001557, 0.0000000004556, -0.00000004186, 0.0000008346, 0.00005482, -0.003191, 0.9729]
    },
    "HOA": {
        "600 V": [0.111147, 1.008, -0.24, 0, 0, -0.000000003895, 0.000001641, -0.000197, 0.002615, 1.1],
        "2700 V": [0.000435, 1.006, -0.038, 0, 0, 0.0000000007859, -0.0000001914, -0.000009128, -0.0007, 0.9981],
        "14300 V": [0.000904, 0.999, -0.02, 0, 0, 0.0000000007859, -0.0000001914, -0.000009128, -0.0007, 0.9981]
    }
};

// Tabla 2: Constantes para ecuaciones basadas en c1, c2, ..., c13
const tabla2 = {
    "VCB": {
        "600 V": [0.753364, 0.566, 1.752636, 0, 0, -4.783e-9, 0.000001962, -0.000229, 0.003141, 1.092, 0, -1.598, 0.957],
        "2700 V": [2.40021, 0.165, 0.354202, -1.557e-12, 4.556e-10, -4.186e-8, 8.346e-7, 0.00005482, -0.003191, 0.9729, 0, -1.569, 0.9778],
        "14300 V": [3.825917, 0.11, -0.999749, -1.557e-12, 4.556e-10, -4.186e-8, 8.346e-7, 0.00005482, -0.003191, 0.9729, 0, -1.568, 0.99]
    },
    "VCBB": {
        "600 V": [3.068459, 0.26, -0.098107, 0, 0, -5.767e-9, 0.000002524, -0.00034, 0.01187, 1.013, -0.06, -1.809, 1.19],
        "2700 V": [3.870592, 0.185, -0.736618, 0, -9.204e-11, 2.901e-8, -0.000003262, 0.0001569, -0.004003, 0.9825, 0, -1.742, 1.09],
        "14300 V": [3.644309, 0.215, -0.585522, 0, -9.204e-11, 2.901e-8, -0.000003262, 0.0001569, -0.004003, 0.9825, 0, -1.677, 1.06]
    },
    "HCB": {
        "600 V": [4.073745, 0.344, -0.370259, 0, 0, -5.382e-9, 0.000002316, -0.000302, 0.0091, 0.9725, 0, -2.03, 1.036],
        "2700 V": [3.486391, 0.177, -0.193101, 0, 0, 4.859e-10, -1.814e-7, -0.000009128, -0.0007, 0.9881, 0.027, -1.723, 1.055],
        "14300 V": [3.044516, 0.125, 0.245106, 0, -5.043e-11, 2.233e-8, -0.000003046, 0.000116, -0.001145, 0.9839, 0, -1.655, 1.084]
    },
    "VOA": {
        "600 V": [0.679294, 0.746, 1.222636, 0, 0, -4.783e-9, 0.000001962, -0.000229, 0.003141, 1.092, 0, -1.598, 0.997],
        "2700 V": [3.880724, 0.105, -1.906033, -1.557e-12, 4.556e-10, -4.186e-8, 8.346e-7, 0.00005482, -0.003191, 0.9729, 0, -1.515, 1.115],
        "14300 V": [3.405454, 0.12, -0.93245, -1.557e-12, 4.556e-10, -4.186e-8, 8.346e-7, 0.00005482, -0.003191, 0.9729, 0, -1.534, 0.979]
    },
    "HOA": {
        "600 V": [3.470417, 0.465, -0.261863, 0, 0, -3.895e-9, 0.000001641, -0.000197, 0.002615, 1.1, 0, -1.99, 1.04],
        "2700 V": [3.616266, 0.149, -0.761561, 0, 0, 7.859e-10, -1.914e-7, -0.000009128, -0.0007, 0.9981, 0, -1.639, 1.078],
        "14300 V": [2.04049, 0.177, 1.005092, 0, 0, 7.859e-10, -1.914e-7, -0.000009128, -0.0007, 0.9981, -0.05, -1.633, 1.151]
    }
};

// Tabla 3: Constantes para ecuaciones basadas en c1, c2, ..., c13
const tabla3 = {
    "VCB": [0, -14.269, 831.37, -19382, 223660, -1264500, 3022600],
    "VCBB": [11.38, -602.87, 12758, -137780, 802170, -2406600, 3352400],
    "HCB": [0, -30.97, 1640.5, -33609, 333080, -1618200, 3462700],
    "VOA": [9.5606, -515.43, 11161, -124200, 751250, -2358400, 3369600],
    "HOA": [0, -31.555, 1682, -34607, 341240, -1599000, 3462900]
};














// Función para calcular la corriente del arco (I_arc)
function calculateArcCurrent() {
    // Obtener el tipo de equipo seleccionado
    var equipmentType = document.getElementById("equipmentType").value;

    // Obtener la corriente de falla (N3) y la distancia entre los electrodos (M3)
    var faultCurrent = parseFloat(document.getElementById("faultCurrent").value);
    var electrodeDistance = parseFloat(document.getElementById("electrodeDistance").value);
    var nominalVoltage = parseFloat(document.getElementById("nominalVoltage").value);

    if (isNaN(faultCurrent) || isNaN(electrodeDistance) || isNaN(nominalVoltage)) {
        document.getElementById("result").innerText = "Por favor, ingresa valores válidos.";
        return;
    }

    // Obtener las constantes para las tres tensiones del equipo seleccionado
    const tabla1_600V = tabla1[equipmentType]["600 V"];
    const tabla1_2700V = tabla1[equipmentType]["2700 V"];
    const tabla1_14300V = tabla1[equipmentType]["14300 V"];



    const tabla3_ET = tabla3[equipmentType];

    const f1 = tabla3_ET[0];
    const f2 = tabla3_ET[1];
    const f3 = tabla3_ET[2];
    const f4 = tabla3_ET[3];
    const f5 = tabla3_ET[4];
    const f6 = tabla3_ET[5];
    const f7 = tabla3_ET[6];



    // Calcular I_arc para cada tensión
    const I_arc_600V = calcularIArc(tabla1_600V, faultCurrent, electrodeDistance);
    const I_arc_2700V = calcularIArc(tabla1_2700V, faultCurrent, electrodeDistance);
    const I_arc_14300V = calcularIArc(tabla1_14300V, faultCurrent, electrodeDistance);

    // Calcular I_arc_1 usando la fórmula proporcionada
    const I_arc_1 = ((I_arc_2700V - I_arc_600V) / 2.1) * (nominalVoltage - 2.7) + I_arc_2700V;

    // Calcular I_arc_2 usando la nueva fórmula proporcionada
    const I_arc_2 = ((I_arc_14300V - I_arc_2700V) / 11.6) * (nominalVoltage - 14.3) + I_arc_14300V;

    // Calcular I_arc_3 usando la nueva fórmula proporcionada
    const I_arc_3 = ((I_arc_1 * (2.7 - nominalVoltage)) / 2.1) + ((I_arc_2 * (nominalVoltage - 0.6)) / 2.1);

    // Calcular I_arc_480V usando la nueva fórmula proporcionada
    const I_arc_480V = 1 / Math.sqrt(((0.6 / nominalVoltage) ** 2) * ((1 / I_arc_600V ** 2) - ((0.6 ** 2 - nominalVoltage ** 2) / (0.6 ** 2 * faultCurrent ** 2))));

    // Calcular la corriente de arco final basada en las condiciones de la tensión nominal (O3)
    let I_arc_final;
    if (nominalVoltage > 2.7) {
        I_arc_final = I_arc_2;
    } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
        I_arc_final = I_arc_3;
    } else {
        I_arc_final = I_arc_480V;
    }



    let I_arc_600V_mín;
    let I_arc_2700V_mín;
    let I_arc_14300V_mín;
    let I_arc_1_mín;
    let I_arc_2_mín;
    let I_arc_3_mín;
    let I_arc_final_mín;

    if (nominalVoltage > 0.6 && nominalVoltage <= 15) {
        I_arc_600V_mín = ((I_arc_600V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
        I_arc_2700V_mín = ((I_arc_2700V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
        I_arc_14300V_mín = ((I_arc_14300V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);

        I_arc_1_mín = (((I_arc_2700V_mín - I_arc_600V_mín) / 2.1) * (nominalVoltage - 2.7) + I_arc_2700V_mín);
        I_arc_2_mín = (((I_arc_14300V_mín - I_arc_2700V_mín) / 11.6) * (nominalVoltage - 14.3) + I_arc_14300V_mín);
        I_arc_3_mín = (((I_arc_1_mín * (2.7 - nominalVoltage)) / 2.1) + ((I_arc_2_mín * (nominalVoltage - 0.6)) / 2.1));

        if (nominalVoltage > 2.7) {
            I_arc_final_mín = I_arc_2_mín;
        } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
            I_arc_final_mín = I_arc_3_mín;
        }
        
    } else if (nominalVoltage >= 0.208 && nominalVoltage <= 0.6) {
        I_arc_final_mín = ((I_arc_final * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
    }

    const I_arc_variation = I_arc_final_mín / I_arc_final;



    // Mostrar los resultados
        // <p>I_arc_600V: ${I_arc_600V.toFixed(2)} kA</p>
        // <p>I_arc_2700V: ${I_arc_2700V.toFixed(2)} kA</p>
        // <p>I_arc_14300V: ${I_arc_14300V.toFixed(2)} kA</p>
        // <p>I_arc_1: ${I_arc_1.toFixed(2)} kA</p>
        // <p>I_arc_2: ${I_arc_2.toFixed(2)} kA</p>
        // <p>I_arc_3: ${I_arc_3.toFixed(2)} kA</p>
        // <p>I_arc_480V: ${I_arc_480V.toFixed(2)} kA</p>
    document.getElementById("result").innerHTML += `
        <p>Corriente de Arco: ${I_arc_final.toFixed(2)} [kA]</p>
        <p>Corriente de Arco Mínima: ${I_arc_final_mín.toFixed(2)} [kA]</p>
    `;

// Mostrar el contenedor de resultados después de los cálculos
document.getElementById("result-container").style.display = 'block';

}

// Función para calcular I_arc basada en las constantes y las entradas N3 (corriente de falla) y M3 (distancia)
function calcularIArc(tabla1, faultCurrent, electrodeDistance) {
    const a1 = tabla1[0];
    const a2 = tabla1[1];
    const a3 = tabla1[2];
    const a4 = tabla1[3];
    const a5 = tabla1[4];
    const a6 = tabla1[5];
    const a7 = tabla1[6];
    const a8 = tabla1[7];
    const a9 = tabla1[8];
    const a10 = tabla1[9];

    // Ecuación dada
    const I_arc = Math.pow(10, (a1 + a2 * Math.log10(faultCurrent) + a3 * Math.log10(electrodeDistance))) *
        ((a4 * Math.pow(faultCurrent, 6)) + (a5 * Math.pow(faultCurrent, 5)) + (a6 * Math.pow(faultCurrent, 4)) +
         (a7 * Math.pow(faultCurrent, 3)) + (a8 * Math.pow(faultCurrent, 2)) + (a9 * faultCurrent) + a10);

    return I_arc;
}















// Función para calcular la energía incidente (E_mín_VOC) basada en las constantes de la tabla 2
function calculateIncidentEnergy() {
    // Obtener los valores ingresados por el usuario
    var equipmentType = document.getElementById("equipmentType").value;
    var faultCurrent = parseFloat(document.getElementById("faultCurrent").value);
    var electrodeDistance = parseFloat(document.getElementById("electrodeDistance").value);
    var nominalVoltage = parseFloat(document.getElementById("nominalVoltage").value);
    var arcDuration = parseFloat(document.getElementById("arcDuration").value); // P3
    var arcDurationmín = parseFloat(document.getElementById("arcDurationmín").value);
    var workingDistance = parseFloat(document.getElementById("workingDistance").value); // Q3
    var width = parseFloat(document.getElementById("width").value);
    var height = parseFloat(document.getElementById("height").value);
    var depth = parseFloat(document.getElementById("depth").value);

    if (isNaN(faultCurrent) || isNaN(electrodeDistance) || isNaN(nominalVoltage) || isNaN(arcDuration) || isNaN(arcDurationmín) || isNaN(workingDistance) || isNaN(width) || isNaN(height) || isNaN(depth)) {
        document.getElementById("result").innerText = "Por favor, ingresa valores válidos.";
        return;
    }











let enclosureType = '';
let width1 = 0;
let height1 = 0;
let A = 0;
let B = 0;
let b1 = 0;
let b2 = 0;
let b3 = 0;
let correctionFactor = 0;
let EES = 0;
let enclosureSize = 0;

if (nominalVoltage < 0.600 && width < 508 && height < 508 && depth <= 203.2) {
    enclosureType = "Shallow";
} else {
    enclosureType = "Typical";
}

if (equipmentType === "VCB") {
    A = 4;
    B = 20;
    if (enclosureType === "Typical") {
        b1 = -0.000302;
        b2 = 0.03441;
        b3 = 0.4325;
    } else if (enclosureType === "Shallow") {
        b1 = 0.002222;
        b2 = -0.02556;
        b3 = 0.6222;
    }
} else if (equipmentType === "VCBB") {
    A = 10;
    B = 24;
    if (enclosureType === "Typical") {
        b1 = -0.0002976;
        b2 = 0.032;
        b3 = 0.479; 
    } else if (enclosureType === "Shallow") {
        b1 = -0.002778;
        b2 = 0.1194;
        b3 = -0.2778;
    } 
} else if (equipmentType === "HCB") {
    A = 10;
    B = 22;
    if (enclosureType === "Typical") {
        b1 = -0.0001923;
        b2 = 0.01935;
        b3 = 0.6899;
    } else if (enclosureType === "Shallow") {
        b1 = -0.0005556;
        b2 = 0.03722;
        b3 = 0.4778; 
    }
}

if (enclosureType === "Typical" && equipmentType === "VCB" && width < 508) {
    width1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "VCB" && height < 508) {
    height1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 660.4 && height <= 1244.6) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 1244.6) {
    height1 = 49;
}

if (enclosureType === "Shallow" && equipmentType === "VCB" && width < 508) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Shallow" && equipmentType === "VCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "VCB" && height < 508) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 660.4 && height <= 1244.6) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 1244.6) {
    height1 = 49;
}

if (enclosureType === "Typical" && equipmentType === "VCBB" && width < 508) {
    width1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "VCBB" && height < 508) {
    height1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "VCBB" && width < 508) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCBB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCBB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Shallow" && equipmentType === "VCBB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "VCBB" && height < 508) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "HCB" && width < 508) {
    width1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "HCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "HCB" && height < 508) {
    height1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "HCB" && width < 508) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "HCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "HCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Shallow" && equipmentType === "HCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "HCB" && height < 508) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (equipmentType === "VCB" || equipmentType === "VCBB" || equipmentType === "HCB") {
    EES = (height1 + width1) / 2;
    if (enclosureType === "Typical") {
        correctionFactor = b1 * (EES**2) + b2 * EES + b3;
    } else if (enclosureType === "Shallow") {
        correctionFactor = 1 / (b1 * (EES**2) + b2 * EES + b3);
    }

} else if (equipmentType === "VOA" || equipmentType === "HOA") {
    correctionFactor = 1;
}

enclosureSize = 1 / correctionFactor;












    // Obtener las constantes de la tabla 1 para las tres tensiones del equipo seleccionado
    const tabla1_600V = tabla1[equipmentType]["600 V"];
    const tabla1_2700V = tabla1[equipmentType]["2700 V"];
    const tabla1_14300V = tabla1[equipmentType]["14300 V"];



    const tabla3_ET = tabla3[equipmentType];

    const f1 = tabla3_ET[0];
    const f2 = tabla3_ET[1];
    const f3 = tabla3_ET[2];
    const f4 = tabla3_ET[3];
    const f5 = tabla3_ET[4];
    const f6 = tabla3_ET[5];
    const f7 = tabla3_ET[6];



    // Calcular I_arc para cada tensión utilizando la función calcularIArc
    const I_arc_600V = calcularIArc(tabla1_600V, faultCurrent, electrodeDistance);
    const I_arc_2700V = calcularIArc(tabla1_2700V, faultCurrent, electrodeDistance);
    const I_arc_14300V = calcularIArc(tabla1_14300V, faultCurrent, electrodeDistance);

    // Calcular I_arc_1 usando la fórmula proporcionada
    const I_arc_1 = ((I_arc_2700V - I_arc_600V) / 2.1) * (nominalVoltage - 2.7) + I_arc_2700V;

    // Calcular I_arc_2 usando la nueva fórmula proporcionada
    const I_arc_2 = ((I_arc_14300V - I_arc_2700V) / 11.6) * (nominalVoltage - 14.3) + I_arc_14300V;

    // Calcular I_arc_3 usando la nueva fórmula proporcionada
    const I_arc_3 = ((I_arc_1 * (2.7 - nominalVoltage)) / 2.1) + ((I_arc_2 * (nominalVoltage - 0.6)) / 2.1);

    // Calcular I_arc_480V usando la nueva fórmula proporcionada
    const I_arc_480V = 1 / Math.sqrt(((0.6 / nominalVoltage) ** 2) * ((1 / I_arc_600V ** 2) - ((0.6 ** 2 - nominalVoltage ** 2) / (0.6 ** 2 * faultCurrent ** 2))));

    // Calcular la corriente de arco final basada en las condiciones de la tensión nominal (O3)
    let I_arc_final;
    if (nominalVoltage > 2.7) {
        I_arc_final = I_arc_2;
    } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
        I_arc_final = I_arc_3;
    } else {
        I_arc_final = I_arc_480V;
    }



    let I_arc_600V_mín;
    let I_arc_2700V_mín;
    let I_arc_14300V_mín;
    let I_arc_1_mín;
    let I_arc_2_mín;
    let I_arc_3_mín;
    let I_arc_final_mín;

    if (nominalVoltage > 0.6 && nominalVoltage <= 15) {
        I_arc_600V_mín = ((I_arc_600V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
        I_arc_2700V_mín = ((I_arc_2700V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
        I_arc_14300V_mín = ((I_arc_14300V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);

        I_arc_1_mín = (((I_arc_2700V_mín - I_arc_600V_mín) / 2.1) * (nominalVoltage - 2.7) + I_arc_2700V_mín);
        I_arc_2_mín = (((I_arc_14300V_mín - I_arc_2700V_mín) / 11.6) * (nominalVoltage - 14.3) + I_arc_14300V_mín);
        I_arc_3_mín = (((I_arc_1_mín * (2.7 - nominalVoltage)) / 2.1) + ((I_arc_2_mín * (nominalVoltage - 0.6)) / 2.1));

        if (nominalVoltage > 2.7) {
            I_arc_final_mín = I_arc_2_mín;
        } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
            I_arc_final_mín = I_arc_3_mín;
        }
        
    } else if (nominalVoltage >= 0.208 && nominalVoltage <= 0.6) {
        I_arc_final_mín = ((I_arc_final * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
    }

    const I_arc_variation = I_arc_final_mín / I_arc_final;



    // Obtener las constantes para las tres tensiones del equipo seleccionado
    const tabla2_600V = tabla2[equipmentType]["600 V"];
    const tabla2_2700V = tabla2[equipmentType]["2700 V"];
    const tabla2_14300V = tabla2[equipmentType]["14300 V"];

    // Calcular E para cada tensión
    const E_600V = calcularE(tabla2_600V, I_arc_600V, arcDuration, workingDistance, correctionFactor, faultCurrent, electrodeDistance);
    const E_2700V = calcularE(tabla2_2700V, I_arc_2700V, arcDuration, workingDistance, correctionFactor, faultCurrent, electrodeDistance);
    const E_14300V = calcularE(tabla2_14300V, I_arc_14300V,arcDuration, workingDistance, correctionFactor, faultCurrent, electrodeDistance);

    // Calcular I_arc_1 usando la fórmula proporcionada
    const E_1 = ((E_2700V - E_600V) / 2.1) * (nominalVoltage - 2.7) + E_2700V;

    // Calcular I_arc_2 usando la nueva fórmula proporcionada
    const E_2 = ((E_14300V - E_2700V) / 11.6) * (nominalVoltage - 14.3) + E_14300V;

    // Calcular I_arc_3 usando la nueva fórmula proporcionada
    const E_3 = ((E_1 * (2.7 - nominalVoltage)) / 2.1) + ((E_2 * (nominalVoltage - 0.6)) / 2.1);

    // Calcular E_480V usando la nueva fórmula proporcionada
    const E_480V = calcularE480V(tabla2_600V, I_arc_600V, arcDuration, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arc_final);

    // Calcular la enería incidente final basada en las condiciones de la tensión nominal (O3)
    let E_final;
    if (nominalVoltage > 2.7) {
        E_final = E_2;
    } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
        E_final = E_3;
    } else {
        E_final = E_480V;
    }
    
    E_calcm2 = E_final / 4.184 ;





    // Calcular E_mín para cada tensión
    const E_600V_mín = (calcularE480V(tabla2_600V, I_arc_600V, arcDurationmín, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arc_600V_mín));
    const E_2700V_mín = (calcularE480V(tabla2_2700V, I_arc_2700V, arcDurationmín, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arc_2700V_mín));
    const E_14300V_mín = (calcularE480V(tabla2_14300V, I_arc_14300V, arcDurationmín, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arc_14300V_mín));

    // Calcular I_arc_1 usando la fórmula proporcionada
    const E_1_mín = (((E_2700V_mín - E_600V_mín) / 2.1) * (nominalVoltage - 2.7) + E_2700V_mín);

    // Calcular I_arc_2 usando la nueva fórmula proporcionada
    const E_2_mín = (((E_14300V_mín - E_2700V_mín) / 11.6) * (nominalVoltage - 14.3) + E_14300V_mín);

    // Calcular I_arc_3 usando la nueva fórmula proporcionada
    const E_3_mín = (((E_1_mín * (2.7 - nominalVoltage)) / 2.1) + ((E_2_mín * (nominalVoltage - 0.6)) / 2.1));

    // Calcular E_480V usando la nueva fórmula proporcionada
    const E_480V_mín = (calcularE480V(tabla2_600V, I_arc_600V, arcDurationmín, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arc_final_mín));

    // Calcular la enería incidente final basada en las condiciones de la tensión nominal (O3)
    let E_final_mín;
    if (nominalVoltage > 2.7) {
        E_final_mín = E_2_mín;
    } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
        E_final_mín = E_3_mín;
    } else if (nominalVoltage <= 0.6 && nominalVoltage >= 0.208) {
        E_final_mín = E_480V_mín;
    }
    
    E_calcm2_mín = E_final_mín / 4.184 ;

    let E_calcm2_final;
    if (E_calcm2 > E_calcm2_mín) {
        E_calcm2_final = E_calcm2;
    } else if (E_calcm2_mín > E_calcm2) {
        E_calcm2_final = E_calcm2_mín;
    }





    // Mostrar los resultados
        // <p>E_mín_600V: ${E_mín_600V.toFixed(2)} kA</p>
        // <p>E_mín_2700V: ${E_mín_2700V.toFixed(2)} kA</p>
        // <p>E_mín_14300V: ${E_mín_14300V.toFixed(2)} kA</p>
        // <p>E_mín_1: ${E_mín_1.toFixed(2)} kA</p>
        // <p>E_mín_2: ${E_mín_2.toFixed(2)} kA</p>
        // <p>E_mín_3: ${E_mín_3.toFixed(2)} kA</p>
        // <p>E_mín_480V: ${E_mín_480V.toFixed(2)} kA</p>
    document.getElementById("result").innerHTML += `
        <p>Energía Incidente: ${E_calcm2.toFixed(2)} [cal/cm²]</p>
        <p>Energía Incidente con Corriente de Arco Mínima: ${E_calcm2_mín.toFixed(2)} [cal/cm²]</p>
    `;

// Mostrar el contenedor de resultados después de los cálculos
document.getElementById("result-container").style.display = 'block';

    // Declarar arrays para almacenar valores de E y distancia de trabajo
    let energyValues = [];
    let distanceValues = [];

    // Recorrer diferentes valores de workingDistance
    for (let distance = 305; distance <= 2540; distance += 1) {
        // Actualizar la distancia de trabajo
        let workingDistanceGraph = distance;

    if (E_calcm2 > E_calcm2_mín) {
        // Calcular la energía incidente (E) con la distancia de trabajo actual
        const Energy_600V = calcularE(tabla2_600V, I_arc_600V, arcDuration, workingDistanceGraph, correctionFactor, faultCurrent, electrodeDistance);
        const Energy_2700V = calcularE(tabla2_2700V, I_arc_2700V, arcDuration, workingDistanceGraph, correctionFactor, faultCurrent, electrodeDistance);
        const Energy_14300V = calcularE(tabla2_14300V, I_arc_14300V, arcDuration, workingDistanceGraph, correctionFactor, faultCurrent, electrodeDistance);

        // Calcular I_arc_1 usando la fórmula proporcionada
        const Energy_1 = ((Energy_2700V - Energy_600V) / 2.1) * (nominalVoltage - 2.7) + Energy_2700V;

        // Calcular I_arc_2 usando la nueva fórmula proporcionada
        const Energy_2 = ((Energy_14300V - Energy_2700V) / 11.6) * (nominalVoltage - 14.3) + Energy_14300V;

        // Calcular I_arc_3 usando la nueva fórmula proporcionada
        const Energy_3 = ((Energy_1 * (2.7 - nominalVoltage)) / 2.1) + ((Energy_2 * (nominalVoltage - 0.6)) / 2.1);

        // Calcular E_480V usando la nueva fórmula proporcionada
        const Energy_480V = calcularE480V(tabla2_600V, I_arc_600V, arcDuration, workingDistanceGraph, correctionFactor, faultCurrent, electrodeDistance, I_arc_final);

        // Calcular la enería incidente final basada en las condiciones de la tensión nominal (O3)
        let Energy_final;
        if (nominalVoltage > 2.7) {
            Energy_final = Energy_2;
        } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
            Energy_final = Energy_3;
        } else {
            Energy_final = Energy_480V;
        }
    
        Energy_calcm2_máx = Energy_final / 4.184 ;

    } else if (E_calcm2_mín > E_calcm2) {

        // Calcular E_mín para cada tensión
        const Energy_600V_mín = (calcularE480V(tabla2_600V, I_arc_600V, arcDurationmín, workingDistanceGraph, correctionFactor, faultCurrent, electrodeDistance, I_arc_600V_mín));
        const Energy_2700V_mín = (calcularE480V(tabla2_2700V, I_arc_2700V, arcDurationmín, workingDistanceGraph, correctionFactor, faultCurrent, electrodeDistance, I_arc_2700V_mín));
        const Energy_14300V_mín = (calcularE480V(tabla2_14300V, I_arc_14300V, arcDurationmín, workingDistanceGraph, correctionFactor, faultCurrent, electrodeDistance, I_arc_14300V_mín));

        // Calcular I_arc_1 usando la fórmula proporcionada
        const Energy_1_mín = (((Energy_2700V_mín - Energy_600V_mín) / 2.1) * (nominalVoltage - 2.7) + Energy_2700V_mín);

        // Calcular I_arc_2 usando la nueva fórmula proporcionada
        const Energy_2_mín = (((Energy_14300V_mín - Energy_2700V_mín) / 11.6) * (nominalVoltage - 14.3) + Energy_14300V_mín);

        // Calcular I_arc_3 usando la nueva fórmula proporcionada
        const Energy_3_mín = (((Energy_1_mín * (2.7 - nominalVoltage)) / 2.1) + ((Energy_2_mín * (nominalVoltage - 0.6)) / 2.1));

        // Calcular E_480V usando la nueva fórmula proporcionada
        const Energy_480V_mín = (calcularE480V(tabla2_600V, I_arc_600V, arcDurationmín, workingDistanceGraph, correctionFactor, faultCurrent, electrodeDistance, I_arc_final_mín));

        // Calcular la enería incidente final basada en las condiciones de la tensión nominal (O3)
        let Energy_final_mín;
        if (nominalVoltage > 2.7) {
            Energy_final_mín = Energy_2_mín;
        } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
            Energy_final_mín = Energy_3_mín;
        } else if (nominalVoltage <= 0.6 && nominalVoltage >= 0.208) {
            Energy_final_mín = Energy_480V_mín;
        }
    
        Energy_calcm2_máx = Energy_final_mín / 4.184 ;
    }
        // Almacenar los resultados en los arrays
        energyValues.push(Energy_calcm2_máx);
        distanceValues.push(workingDistanceGraph);
    }

    // Llamar a la función para graficar
    graficarEcalcm2_D(distanceValues, energyValues);

}

// Función para calcular E basada en las constantes y las entradas N3 (corriente de falla) y M3 (distancia)
function calcularE(tabla2, I_arc, arcDuration, workingDistance, correctionFactor, faultCurrent, electrodeDistance) {
    const c1 = tabla2[0];
    const c2 = tabla2[1];
    const c3 = tabla2[2];
    const c4 = tabla2[3];
    const c5 = tabla2[4];
    const c6 = tabla2[5];
    const c7 = tabla2[6];
    const c8 = tabla2[7];
    const c9 = tabla2[8];
    const c10 = tabla2[9];
    const c11 = tabla2[10];
    const c12 = tabla2[11];
    const c13 = tabla2[12];

    // Función para calcular la energía incidente (E_mín_VOC)
    const E = ((12.552 / 50) * arcDuration) * Math.pow(10, (c1 + c2 * Math.log10(electrodeDistance) + (c3 * I_arc) / ((c4 * Math.pow(faultCurrent, 7)) +
                (c5 * Math.pow(faultCurrent, 6)) + (c6 * Math.pow(faultCurrent, 5)) + (c7 * Math.pow(faultCurrent, 4)) + (c8 * Math.pow(faultCurrent, 3)) +
                (c9 * Math.pow(faultCurrent, 2)) + (c10 * faultCurrent)) + c11 * Math.log10(faultCurrent) + c12 * Math.log10(workingDistance) + c13 * Math.log10(I_arc) + Math.log10(1 / correctionFactor)));

    return E
}

// Función para calcular E_480V basada en las constantes y las entradas N3 (corriente de falla) y M3 (distancia)
function calcularE480V(tabla2, I_arc, arcDuration, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arcFinal) {
    const x1 = tabla2[0];
    const x2 = tabla2[1];
    const x3 = tabla2[2];
    const x4 = tabla2[3];
    const x5 = tabla2[4];
    const x6 = tabla2[5];
    const x7 = tabla2[6];
    const x8 = tabla2[7];
    const x9 = tabla2[8];
    const x10 = tabla2[9];
    const x11 = tabla2[10];
    const x12 = tabla2[11];
    const x13 = tabla2[12];

    // Función para calcular la energía incidente (E_VOC)
    const E_480V = ((12.552 / 50) * arcDuration) * Math.pow(10, (x1 + x2 * Math.log10(electrodeDistance) + ((x3 * I_arc) / ((x4 * Math.pow(faultCurrent, 7)) +
                (x5 * Math.pow(faultCurrent, 6)) + (x6 * Math.pow(faultCurrent, 5)) + (x7 * Math.pow(faultCurrent, 4)) + (x8 * Math.pow(faultCurrent, 3)) +
                (x9 * Math.pow(faultCurrent, 2)) + (x10 * faultCurrent))) + x11 * Math.log10(faultCurrent) + x12 * Math.log10(workingDistance) + x13 * Math.log10(I_arcFinal) + Math.log10(1 / correctionFactor)));

    return E_480V
}

let lineChart = null;

function graficarEcalcm2_D(distances, energies, imageSrc, watermarkImageSrc) {
    var limepp1_calcm2 = parseFloat(document.getElementById("limepp1_calcm2").value);
    var limepp2_calcm2 = parseFloat(document.getElementById("limepp2_calcm2").value);

    if (lineChart !== null) {
        lineChart.destroy();
        lineChart = null;
    }

    const ctx = document.getElementById('lineChart').getContext('2d');
    const watermarkImage = new Image();
    watermarkImage.src = 'waterMark.png';

    const segments = [
        {
            label: 'Categoría 1',
            color: 'rgba(255, 255, 0, 1)',
            data: []
        },
        {
            label: 'Categoría 2',
            color: 'rgba(255, 165, 0, 1)',
            data: []
        },
        {
            label: 'Categoría 3',
            color: 'rgba(255, 0, 0, 1)',
            data: []
        }
    ];

    // Separar los datos en segmentos según el valor de Y
    distances.forEach((x, index) => {
        const y = energies[index];
        if (y <= limepp1_calcm2) {
            segments[0].data.push({ x, y });
        } else if (y > limepp1_calcm2 && y <= limepp2_calcm2) {
            segments[1].data.push({ x, y });
        } else {
            segments[2].data.push({ x, y });
        }
    });

    // Crear los datasets para cada segmento
    const datasets = segments.map(segment => ({
        label: segment.label,
        data: segment.data,
        borderColor: segment.color,
        pointBackgroundColor: segment.color,
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        showLine: true
    }));

    watermarkImage.onload = function() {
        lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Distancia de Trabajo [mm]'
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 6
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Energía Incidente [cal/cm²]'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                const xLabel = context.raw.x.toFixed(2) || '';
                                const yValue = context.raw.y.toFixed(2);
                                return `(${yValue})`;
                            }
                        }
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            boxWidth: 10,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    intersect: false
                },
                animation: {
                    onComplete: function() {
                        if (imageSrc) {
                            const image = new Image();
                            image.src = imageSrc;
                            image.onload = function() {
                                const xPosition = lineChart.scales.x.getPixelForValue(workingDistance / 1000);
                                const yPosition = lineChart.scales.y.getPixelForValue(0);
                                const a = 210;
                                ctx.drawImage(image, xPosition, yPosition - ((1.85 / maxRadius) * a), ((1.85 / maxRadius) * (a / 3)), ((1.85 / maxRadius) * a));
                            };
                        }

                        const watermarkX = (lineChart.width / 2) - (watermarkImage.width / 16);
                        const watermarkY = (lineChart.height / 2) - (watermarkImage.height / 16);
                        const watermarkWidth = watermarkImage.width / 8;
                        const watermarkHeight = watermarkImage.height / 8;

                        ctx.globalAlpha = 0.1;
                        ctx.drawImage(watermarkImage, watermarkX, watermarkY, watermarkWidth, watermarkHeight);
                        ctx.globalAlpha = 1;
                    }
                }
            },
            plugins: [{
                beforeDraw: function(chart) {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            }]
        });
    };

    watermarkImage.onerror = function() {
        console.error("La imagen de la marca de agua no se pudo cargar.");
    };
}












// Función para calcular la frontera de arco eléctrico (AFB_VOC) basada en las constantes de la tabla 2

let chart;

function calculateArcFlashBoundary() {
    // Obtener los valores ingresados por el usuario
    var equipmentType = document.getElementById("equipmentType").value;
    var faultCurrent = parseFloat(document.getElementById("faultCurrent").value);
    var electrodeDistance = parseFloat(document.getElementById("electrodeDistance").value);
    var nominalVoltage = parseFloat(document.getElementById("nominalVoltage").value);
    var arcDuration = parseFloat(document.getElementById("arcDuration").value); // P3
    var arcDurationmín = parseFloat(document.getElementById("arcDurationmín").value);
    var width = parseFloat(document.getElementById("width").value);
    var height = parseFloat(document.getElementById("height").value);
    var depth = parseFloat(document.getElementById("depth").value);

    if (isNaN(faultCurrent) || isNaN(electrodeDistance) || isNaN(nominalVoltage) || isNaN(arcDuration) || isNaN(arcDurationmín) || isNaN(width) || isNaN(height) || isNaN(depth)) {
        document.getElementById("result").innerText = "Por favor, ingresa valores válidos.";
        return;
    }

let enclosureType = '';
let width1 = 0;
let height1 = 0;
let A = 0;
let B = 0;
let b1 = 0;
let b2 = 0;
let b3 = 0;
let correctionFactor = 0;
let EES = 0;
let enclosureSize = 0;

if (nominalVoltage < 0.6 && width < 508 && height < 508 && depth <= 203.2) {
    enclosureType = "Shallow";
} else {
    enclosureType = "Typical";
}

if (equipmentType === "VCB") {
    A = 4;
    B = 20;
    if (enclosureType === "Typical") {
        b1 = -0.000302;
        b2 = 0.03441;
        b3 = 0.4325;
    } else if (enclosureType === "Shallow") {
        b1 = 0.002222;
        b2 = -0.02556;
        b3 = 0.6222;
    }
} else if (equipmentType === "VCBB") {
    A = 10;
    B = 24;
    if (enclosureType === "Typical") {
        b1 = -0.0002976;
        b2 = 0.032;
        b3 = 0.479; 
    } else if (enclosureType === "Shallow") {
        b1 = -0.002778;
        b2 = 0.1194;
        b3 = -0.2778;
    } 
} else if (equipmentType === "HCB") {
    A = 10;
    B = 22;
    if (enclosureType === "Typical") {
        b1 = -0.0001923;
        b2 = 0.01935;
        b3 = 0.6899;
    } else if (enclosureType === "Shallow") {
        b1 = -0.0005556;
        b2 = 0.03722;
        b3 = 0.4778; 
    }
}

if (enclosureType === "Typical" && equipmentType === "VCB" && width < 508) {
    width1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "VCB" && height < 508) {
    height1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 660.4 && height <= 1244.6) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 1244.6) {
    height1 = 49;
}

if (enclosureType === "Shallow" && equipmentType === "VCB" && width < 508) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Shallow" && equipmentType === "VCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "VCB" && height < 508) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 660.4 && height <= 1244.6) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 1244.6) {
    height1 = 49;
}

if (enclosureType === "Typical" && equipmentType === "VCBB" && width < 508) {
    width1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "VCBB" && height < 508) {
    height1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "VCBB" && width < 508) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCBB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCBB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Shallow" && equipmentType === "VCBB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "VCBB" && height < 508) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "HCB" && width < 508) {
    width1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "HCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "HCB" && height < 508) {
    height1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "HCB" && width < 508) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "HCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "HCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Shallow" && equipmentType === "HCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "HCB" && height < 508) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (equipmentType === "VCB" || equipmentType === "VCBB" || equipmentType === "HCB") {
    EES = (height1 + width1) / 2;
    if (enclosureType === "Typical") {
        correctionFactor = b1 * (EES**2) + b2 * EES + b3;
    } else if (enclosureType === "Shallow") {
        correctionFactor = 1 / (b1 * (EES**2) + b2 * EES + b3);
    }

} else if (equipmentType === "VOA" || equipmentType === "HOA") {
    correctionFactor = 1;
}

enclosureSize = 1 / correctionFactor;











    // Obtener las constantes de la tabla 1 para las tres tensiones del equipo seleccionado
    const tabla1_600V = tabla1[equipmentType]["600 V"];
    const tabla1_2700V = tabla1[equipmentType]["2700 V"];
    const tabla1_14300V = tabla1[equipmentType]["14300 V"];



    const tabla3_ET = tabla3[equipmentType];

    const f1 = tabla3_ET[0];
    const f2 = tabla3_ET[1];
    const f3 = tabla3_ET[2];
    const f4 = tabla3_ET[3];
    const f5 = tabla3_ET[4];
    const f6 = tabla3_ET[5];
    const f7 = tabla3_ET[6];



    // Calcular I_arc para cada tensión utilizando la función calcularIArc
    const I_arc_600V = calcularIArc(tabla1_600V, faultCurrent, electrodeDistance);
    const I_arc_2700V = calcularIArc(tabla1_2700V, faultCurrent, electrodeDistance);
    const I_arc_14300V = calcularIArc(tabla1_14300V, faultCurrent, electrodeDistance);

    // Calcular I_arc_1 usando la fórmula proporcionada
    const I_arc_1 = ((I_arc_2700V - I_arc_600V) / 2.1) * (nominalVoltage - 2.7) + I_arc_2700V;

    // Calcular I_arc_2 usando la nueva fórmula proporcionada
    const I_arc_2 = ((I_arc_14300V - I_arc_2700V) / 11.6) * (nominalVoltage - 14.3) + I_arc_14300V;

    // Calcular I_arc_3 usando la nueva fórmula proporcionada
    const I_arc_3 = ((I_arc_1 * (2.7 - nominalVoltage)) / 2.1) + ((I_arc_2 * (nominalVoltage - 0.6)) / 2.1);

    // Calcular I_arc_480V usando la nueva fórmula proporcionada
    const I_arc_480V = 1 / Math.sqrt(((0.6 / nominalVoltage) ** 2) * ((1 / I_arc_600V ** 2) - ((0.6 ** 2 - nominalVoltage ** 2) / (0.6 ** 2 * faultCurrent ** 2))));

    // Calcular la corriente de arco final basada en las condiciones de la tensión nominal (O3)
    let I_arc_final;
    if (nominalVoltage > 2.7) {
        I_arc_final = I_arc_2;
    } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
        I_arc_final = I_arc_3;
    } else {
        I_arc_final = I_arc_480V;
    }



    let I_arc_600V_mín;
    let I_arc_2700V_mín;
    let I_arc_14300V_mín;
    let I_arc_1_mín;
    let I_arc_2_mín;
    let I_arc_3_mín;
    let I_arc_final_mín;

    if (nominalVoltage > 0.6 && nominalVoltage <= 15) {
        I_arc_600V_mín = ((I_arc_600V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
        I_arc_2700V_mín = ((I_arc_2700V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
        I_arc_14300V_mín = ((I_arc_14300V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);

        I_arc_1_mín = ((I_arc_2700V_mín - I_arc_600V_mín) / 2.1) * (nominalVoltage - 2.7) + I_arc_2700V_mín;
        I_arc_2_mín = ((I_arc_14300V_mín - I_arc_2700V_mín) / 11.6) * (nominalVoltage - 14.3) + I_arc_14300V_mín;
        I_arc_3_mín = ((I_arc_1_mín * (2.7 - nominalVoltage)) / 2.1) + ((I_arc_2_mín * (nominalVoltage - 0.6)) / 2.1);

        if (nominalVoltage > 2.7) {
            I_arc_final_mín = I_arc_2_mín;
        } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
            I_arc_final_mín = I_arc_3_mín;
        }
        
    } else if (nominalVoltage >= 0.208 && nominalVoltage <= 0.6) {
        I_arc_final_mín = ((I_arc_final * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
    }

    const I_arc_variation = I_arc_final_mín / I_arc_final;



    // Obtener las constantes para las tres tensiones del equipo seleccionado
    const tabla2_600V = tabla2[equipmentType]["600 V"];
    const tabla2_2700V = tabla2[equipmentType]["2700 V"];
    const tabla2_14300V = tabla2[equipmentType]["14300 V"];

    // Calcular E_mín para cada tensión
    const AFB_600V = calcularAFB(tabla2_600V, I_arc_600V, arcDuration, correctionFactor, faultCurrent, electrodeDistance);
    const AFB_2700V = calcularAFB(tabla2_2700V, I_arc_2700V, arcDuration, correctionFactor, faultCurrent, electrodeDistance);
    const AFB_14300V = calcularAFB(tabla2_14300V, I_arc_14300V,arcDuration, correctionFactor, faultCurrent, electrodeDistance);

    // Calcular I_arc_1 usando la fórmula proporcionada
    const AFB_1 = ((AFB_2700V - AFB_600V) / 2.1) * (nominalVoltage - 2.7) + AFB_2700V;

    // Calcular I_arc_2 usando la nueva fórmula proporcionada
    const AFB_2 = ((AFB_14300V - AFB_2700V) / 11.6) * (nominalVoltage - 14.3) + AFB_14300V;

    // Calcular I_arc_3 usando la nueva fórmula proporcionada
    const AFB_3 = ((AFB_1 * (2.7 - nominalVoltage)) / 2.1) + ((AFB_2 * (nominalVoltage - 0.6)) / 2.1);

    // Calcular E_mín_480V usando la nueva fórmula proporcionada
    const AFB_480V = calcularAFB480V(tabla2_600V, I_arc_600V, arcDuration, correctionFactor, faultCurrent, electrodeDistance, I_arc_final);

    // Calcular la enería incidente final basada en las condiciones de la tensión nominal (O3)
    let AFB_final;
    if (nominalVoltage > 2.7) {
        AFB_final = AFB_2;
    } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
        AFB_final = AFB_3;
    } else {
        AFB_final = AFB_480V;
    }





    // Calcular E_mín para cada tensión
    const AFB_600V_mín = calcularAFB480V(tabla2_600V, I_arc_600V, arcDurationmín, correctionFactor, faultCurrent, electrodeDistance, I_arc_600V_mín);
    const AFB_2700V_mín = calcularAFB480V(tabla2_2700V, I_arc_2700V, arcDurationmín, correctionFactor, faultCurrent, electrodeDistance, I_arc_2700V_mín);
    const AFB_14300V_mín = calcularAFB480V(tabla2_14300V, I_arc_14300V,arcDurationmín, correctionFactor, faultCurrent, electrodeDistance, I_arc_14300V_mín);

    // Calcular I_arc_1 usando la fórmula proporcionada
    const AFB_1_mín = ((AFB_2700V_mín - AFB_600V_mín) / 2.1) * (nominalVoltage - 2.7) + AFB_2700V_mín;

    // Calcular I_arc_2 usando la nueva fórmula proporcionada
    const AFB_2_mín = ((AFB_14300V_mín - AFB_2700V_mín) / 11.6) * (nominalVoltage - 14.3) + AFB_14300V_mín;

    // Calcular I_arc_3 usando la nueva fórmula proporcionada
    const AFB_3_mín = ((AFB_1_mín * (2.7 - nominalVoltage)) / 2.1) + ((AFB_2_mín * (nominalVoltage - 0.6)) / 2.1);

    // Calcular E_mín_480V usando la nueva fórmula proporcionada
    const AFB_480V_mín = calcularAFB480V(tabla2_600V, I_arc_600V, arcDurationmín, correctionFactor, faultCurrent, electrodeDistance, I_arc_final_mín);

    // Calcular la enería incidente final basada en las condiciones de la tensión nominal (O3)
    let AFB_final_mín;
    if (nominalVoltage > 2.7) {
        AFB_final_mín = AFB_2_mín;
    } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
        AFB_final_mín = AFB_3_mín;
    } else {
        AFB_final_mín = AFB_480V_mín;
    }

    let AFB_máx;
    if (AFB_final > AFB_final_mín) {
        AFB_máx = AFB_final;
    } else if (AFB_final_mín > AFB_final) {
        AFB_máx = AFB_final_mín;
    }





    // Mostrar los resultados
        // <p>E_mín_600V: ${E_mín_600V.toFixed(2)} kA</p>
        // <p>E_mín_2700V: ${E_mín_2700V.toFixed(2)} kA</p>
        // <p>E_mín_14300V: ${E_mín_14300V.toFixed(2)} kA</p>
        // <p>E_mín_1: ${E_mín_1.toFixed(2)} kA</p>
        // <p>E_mín_2: ${E_mín_2.toFixed(2)} kA</p>
        // <p>E_mín_3: ${E_mín_3.toFixed(2)} kA</p>
        // <p>E_mín_480V: ${E_mín_480V.toFixed(2)} kA</p>
    document.getElementById("result").innerHTML += `
        <p>Frontera de Arco Eléctrico: ${(AFB_final/1000).toFixed(2)} [m]</p>
        <p>Frontera de Arco Eléctrico con Corriente de Arco Mínima: ${(AFB_final_mín/1000).toFixed(2)} [m]</p>
    `;

// Mostrar el contenedor de resultados después de los cálculos
document.getElementById("result-container").style.display = 'block';

    graficarElipse(AFB_máx / 1000);

}

// Función para calcular E basada en las constantes y las entradas N3 (corriente de falla) y M3 (distancia)
function calcularAFB(tabla2, I_arc, arcDuration, correctionFactor, faultCurrent, electrodeDistance) {
    const y1 = tabla2[0];
    const y2 = tabla2[1];
    const y3 = tabla2[2];
    const y4 = tabla2[3];
    const y5 = tabla2[4];
    const y6 = tabla2[5];
    const y7 = tabla2[6];
    const y8 = tabla2[7];
    const y9 = tabla2[8];
    const y10 = tabla2[9];
    const y11 = tabla2[10];
    const y12 = tabla2[11];
    const y13 = tabla2[12];

    // Función para calcular la energía incidente (E_mín_VOC)
    const AFB = Math.pow(10, ((y1 + y2 * Math.log10(electrodeDistance) + (y3 * I_arc) / ((y4 * Math.pow(faultCurrent, 7)) +
                (y5 * Math.pow(faultCurrent, 6)) + (y6 * Math.pow(faultCurrent, 5)) + (y7 * Math.pow(faultCurrent, 4)) + (y8 * Math.pow(faultCurrent, 3)) +
                (y9 * Math.pow(faultCurrent, 2)) + (y10 * faultCurrent)) + y11 * Math.log10(faultCurrent) + y13 * Math.log10(I_arc) + Math.log10(1 / correctionFactor) -         Math.log10(20 / arcDuration))/ - y12));

    return AFB

}

// Función para calcular E_480V basada en las constantes y las entradas N3 (corriente de falla) y M3 (distancia)
function calcularAFB480V(tabla2, I_arc, arcDuration, correctionFactor, faultCurrent, electrodeDistance, I_arcFinal) {
    const z1 = tabla2[0];
    const z2 = tabla2[1];
    const z3 = tabla2[2];
    const z4 = tabla2[3];
    const z5 = tabla2[4];
    const z6 = tabla2[5];
    const z7 = tabla2[6];
    const z8 = tabla2[7];
    const z9 = tabla2[8];
    const z10 = tabla2[9];
    const z11 = tabla2[10];
    const z12 = tabla2[11];
    const z13 = tabla2[12];

    // Función para calcular la energía incidente (E_VOC)
    const AFB_480V = Math.pow(10, ((z1 + z2 * Math.log10(electrodeDistance) + (z3 * I_arc) / ((z4 * Math.pow(faultCurrent, 7)) +
                (z5 * Math.pow(faultCurrent, 6)) + (z6 * Math.pow(faultCurrent, 5)) + (z7 * Math.pow(faultCurrent, 4)) + (z8 * Math.pow(faultCurrent, 3)) +
                (z9 * Math.pow(faultCurrent, 2)) + (z10 * faultCurrent)) + z11 * Math.log10(faultCurrent) + z13 * Math.log10(I_arcFinal) + Math.log10(1 / correctionFactor) -         Math.log10(20 / arcDuration))/ - z12));

    return AFB_480V
}















// Función para graficar la elipse basada en la frontera de arco eléctrico
function graficarElipse(arcFlashBoundary) {

    const ctx = document.getElementById('elipseChart').getContext('2d');

    // Destruir el gráfico anterior si existe
    if (chart) {
        chart.destroy();
    }

    var nominalVoltage = parseFloat(document.getElementById("nominalVoltage").value);
    var electrodeDistance = parseFloat(document.getElementById("electrodeDistance").value);
    var workingDistance = parseFloat(document.getElementById("workingDistance").value); // Q3
    var limepp1_calcm2 = parseFloat(document.getElementById("limepp1_calcm2").value);
    var limepp2_calcm2 = parseFloat(document.getElementById("limepp2_calcm2").value);

// Función para calcular la energía incidente (E_mín_VOC) basada en las constantes de la tabla 2
function calculateIncidentEnergy() {
    // Obtener los valores ingresados por el usuario
    var equipmentType = document.getElementById("equipmentType").value;
    var faultCurrent = parseFloat(document.getElementById("faultCurrent").value);
    var arcDuration = parseFloat(document.getElementById("arcDuration").value); // P3
    var arcDurationmín = parseFloat(document.getElementById("arcDurationmín").value);
    var width = parseFloat(document.getElementById("width").value);
    var height = parseFloat(document.getElementById("height").value);
    var depth = parseFloat(document.getElementById("depth").value);
    var limepp1_calcm2 = parseFloat(document.getElementById("limepp1_calcm2").value);
    var limepp2_calcm2 = parseFloat(document.getElementById("limepp2_calcm2").value);

    if (isNaN(faultCurrent) || isNaN(electrodeDistance) || isNaN(nominalVoltage) || isNaN(arcDuration) || isNaN(arcDurationmín) || isNaN(workingDistance) || isNaN(width) || isNaN(height) || isNaN(depth) || isNaN(limepp1_calcm2) || isNaN(limepp2_calcm2)) {
        document.getElementById("result").innerText = "Por favor, ingresa valores válidos.";
        return;
    }

let enclosureType = '';
let width1 = 0;
let height1 = 0;
let A = 0;
let B = 0;
let b1 = 0;
let b2 = 0;
let b3 = 0;
let correctionFactor = 0;
let EES = 0;
let enclosureSize = 0;

if (nominalVoltage < 0.6 && width < 508 && height < 508 && depth <= 203.2) {
    enclosureType = "Shallow";
} else {
    enclosureType = "Typical";
}

if (equipmentType === "VCB") {
    A = 4;
    B = 20;
    if (enclosureType === "Typical") {
        b1 = -0.000302;
        b2 = 0.03441;
        b3 = 0.4325;
    } else if (enclosureType === "Shallow") {
        b1 = 0.002222;
        b2 = -0.02556;
        b3 = 0.6222;
    }
} else if (equipmentType === "VCBB") {
    A = 10;
    B = 24;
    if (enclosureType === "Typical") {
        b1 = -0.0002976;
        b2 = 0.032;
        b3 = 0.479; 
    } else if (enclosureType === "Shallow") {
        b1 = -0.002778;
        b2 = 0.1194;
        b3 = -0.2778;
    } 
} else if (equipmentType === "HCB") {
    A = 10;
    B = 22;
    if (enclosureType === "Typical") {
        b1 = -0.0001923;
        b2 = 0.01935;
        b3 = 0.6899;
    } else if (enclosureType === "Shallow") {
        b1 = -0.0005556;
        b2 = 0.03722;
        b3 = 0.4778; 
    }
}

if (enclosureType === "Typical" && equipmentType === "VCB" && width < 508) {
    width1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "VCB" && height < 508) {
    height1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 660.4 && height <= 1244.6) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 1244.6) {
    height1 = 49;
}

if (enclosureType === "Shallow" && equipmentType === "VCB" && width < 508) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Shallow" && equipmentType === "VCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "VCB" && height < 508) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 660.4 && height <= 1244.6) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCB" && height > 1244.6) {
    height1 = 49;
}

if (enclosureType === "Typical" && equipmentType === "VCBB" && width < 508) {
    width1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "VCBB" && height < 508) {
    height1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "VCBB" && width < 508) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCBB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "VCBB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Shallow" && equipmentType === "VCBB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "VCBB" && height < 508) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "VCBB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "HCB" && width < 508) {
    width1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "HCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Typical" && equipmentType === "HCB" && height < 508) {
    height1 = 20;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "HCB" && width < 508) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "HCB" && width >= 508 && width <= 660.4) {
    width1 = 0.03937 * width;
} else if (enclosureType === "Shallow" && equipmentType === "HCB" && width > 660.4 && width <= 1244.6) {
    width1 = (660.4 + ((width - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Shallow" && equipmentType === "HCB" && width > 1244.6) {
    width1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (enclosureType === "Shallow" && equipmentType === "HCB" && height < 508) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height >= 508 && height <= 660.4) {
    height1 = 0.03937 * height;
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 660.4 && height <= 1244.6) {
    height1 = (660.4 + ((height - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
} else if (enclosureType === "Typical" && equipmentType === "HCB" && height > 1244.6) {
    height1 = (660.4 + ((1244.6 - 660.4) * ((nominalVoltage + A) / B))) * (1/25.4);
}

if (equipmentType === "VCB" || equipmentType === "VCBB" || equipmentType === "HCB") {
    EES = (height1 + width1) / 2;
    if (enclosureType === "Typical") {
        correctionFactor = b1 * (EES**2) + b2 * EES + b3;
    } else if (enclosureType === "Shallow") {
        correctionFactor = 1 / (b1 * (EES**2) + b2 * EES + b3);
    }

} else if (equipmentType === "VOA" || equipmentType === "HOA") {
    correctionFactor = 1;
}

enclosureSize = 1 / correctionFactor;

    // Obtener las constantes de la tabla 1 para las tres tensiones del equipo seleccionado
    const tabla1_600V = tabla1[equipmentType]["600 V"];
    const tabla1_2700V = tabla1[equipmentType]["2700 V"];
    const tabla1_14300V = tabla1[equipmentType]["14300 V"];



    const tabla3_ET = tabla3[equipmentType];

    const f1 = tabla3_ET[0];
    const f2 = tabla3_ET[1];
    const f3 = tabla3_ET[2];
    const f4 = tabla3_ET[3];
    const f5 = tabla3_ET[4];
    const f6 = tabla3_ET[5];
    const f7 = tabla3_ET[6];



    // Calcular I_arc para cada tensión utilizando la función calcularIArc
    const I_arc_600V = calcularIArc(tabla1_600V, faultCurrent, electrodeDistance);
    const I_arc_2700V = calcularIArc(tabla1_2700V, faultCurrent, electrodeDistance);
    const I_arc_14300V = calcularIArc(tabla1_14300V, faultCurrent, electrodeDistance);

    // Calcular I_arc_1 usando la fórmula proporcionada
    const I_arc_1 = ((I_arc_2700V - I_arc_600V) / 2.1) * (nominalVoltage - 2.7) + I_arc_2700V;

    // Calcular I_arc_2 usando la nueva fórmula proporcionada
    const I_arc_2 = ((I_arc_14300V - I_arc_2700V) / 11.6) * (nominalVoltage - 14.3) + I_arc_14300V;

    // Calcular I_arc_3 usando la nueva fórmula proporcionada
    const I_arc_3 = ((I_arc_1 * (2.7 - nominalVoltage)) / 2.1) + ((I_arc_2 * (nominalVoltage - 0.6)) / 2.1);

    // Calcular I_arc_480V usando la nueva fórmula proporcionada
    const I_arc_480V = 1 / Math.sqrt(((0.6 / nominalVoltage) ** 2) * ((1 / I_arc_600V ** 2) - ((0.6 ** 2 - nominalVoltage ** 2) / (0.6 ** 2 * faultCurrent ** 2))));

    // Calcular la corriente de arco final basada en las condiciones de la tensión nominal (O3)
    let I_arc_final;
    if (nominalVoltage > 2.7) {
        I_arc_final = I_arc_2;
    } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
        I_arc_final = I_arc_3;
    } else {
        I_arc_final = I_arc_480V;
    }



    let I_arc_600V_mín;
    let I_arc_2700V_mín;
    let I_arc_14300V_mín;
    let I_arc_1_mín;
    let I_arc_2_mín;
    let I_arc_3_mín;
    let I_arc_final_mín;

    if (nominalVoltage > 0.6 && nominalVoltage <= 15) {
        I_arc_600V_mín = ((I_arc_600V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
        I_arc_2700V_mín = ((I_arc_2700V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
        I_arc_14300V_mín = ((I_arc_14300V * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);

        I_arc_1_mín = ((I_arc_2700V_mín - I_arc_600V_mín) / 2.1) * (nominalVoltage - 2.7) + I_arc_2700V_mín;
        I_arc_2_mín = ((I_arc_14300V_mín - I_arc_2700V_mín) / 11.6) * (nominalVoltage - 14.3) + I_arc_14300V_mín;
        I_arc_3_mín = ((I_arc_1_mín * (2.7 - nominalVoltage)) / 2.1) + ((I_arc_2_mín * (nominalVoltage - 0.6)) / 2.1);

        if (nominalVoltage > 2.7) {
            I_arc_final_mín = I_arc_2_mín;
        } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
            I_arc_final_mín = I_arc_3_mín;
        }
        
    } else if (nominalVoltage >= 0.208 && nominalVoltage <= 0.6) {
        I_arc_final_mín = ((I_arc_final * (10000000 - (0.5 * ((f1 * (nominalVoltage**6)) + (f2 * (nominalVoltage**5)) + (f3 * (nominalVoltage**4)) + (f4 * (nominalVoltage**3)) + (f5 * (nominalVoltage**2)) + (f6 * nominalVoltage) + f7))))/10000000);
    }

    const I_arc_variation = I_arc_final_mín / I_arc_final;



    // Obtener las constantes para las tres tensiones del equipo seleccionado
    const tabla2_600V = tabla2[equipmentType]["600 V"];
    const tabla2_2700V = tabla2[equipmentType]["2700 V"];
    const tabla2_14300V = tabla2[equipmentType]["14300 V"];

    // Calcular E_mín para cada tensión
    const E_600V = calcularE(tabla2_600V, I_arc_600V, arcDuration, workingDistance, correctionFactor, faultCurrent, electrodeDistance);
    const E_2700V = calcularE(tabla2_2700V, I_arc_2700V, arcDuration, workingDistance, correctionFactor, faultCurrent, electrodeDistance);
    const E_14300V = calcularE(tabla2_14300V, I_arc_14300V,arcDuration, workingDistance, correctionFactor, faultCurrent, electrodeDistance);

    // Calcular I_arc_1 usando la fórmula proporcionada
    const E_1 = ((E_2700V - E_600V) / 2.1) * (nominalVoltage - 2.7) + E_2700V;

    // Calcular I_arc_2 usando la nueva fórmula proporcionada
    const E_2 = ((E_14300V - E_2700V) / 11.6) * (nominalVoltage - 14.3) + E_14300V;

    // Calcular I_arc_3 usando la nueva fórmula proporcionada
    const E_3 = ((E_1 * (2.7 - nominalVoltage)) / 2.1) + ((E_2 * (nominalVoltage - 0.6)) / 2.1);

    // Calcular E_mín_480V usando la nueva fórmula proporcionada
    const E_480V = calcularE480V(tabla2_600V, I_arc_600V, arcDuration, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arc_final);

    // Calcular la enería incidente final basada en las condiciones de la tensión nominal (O3)
    let E_final;
    if (nominalVoltage > 2.7) {
        E_final = E_2;
    } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
        E_final = E_3;
    } else {
        E_final = E_480V;
    }
    
    E_calcm2 = E_final / 4.184 ;



    // Calcular E_mín para cada tensión
    const E_600V_mín = (calcularE480V(tabla2_600V, I_arc_600V, arcDurationmín, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arc_600V_mín));
    const E_2700V_mín = (calcularE480V(tabla2_2700V, I_arc_2700V, arcDurationmín, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arc_2700V_mín));
    const E_14300V_mín = (calcularE480V(tabla2_14300V, I_arc_14300V, arcDurationmín, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arc_14300V_mín));

    // Calcular I_arc_1 usando la fórmula proporcionada
    const E_1_mín = (((E_2700V_mín - E_600V_mín) / 2.1) * (nominalVoltage - 2.7) + E_2700V_mín);

    // Calcular I_arc_2 usando la nueva fórmula proporcionada
    const E_2_mín = (((E_14300V_mín - E_2700V_mín) / 11.6) * (nominalVoltage - 14.3) + E_14300V_mín);

    // Calcular I_arc_3 usando la nueva fórmula proporcionada
    const E_3_mín = (((E_1_mín * (2.7 - nominalVoltage)) / 2.1) + ((E_2_mín * (nominalVoltage - 0.6)) / 2.1));

    // Calcular E_480V usando la nueva fórmula proporcionada
    const E_480V_mín = (calcularE480V(tabla2_600V, I_arc_600V, arcDurationmín, workingDistance, correctionFactor, faultCurrent, electrodeDistance, I_arc_final_mín));

    // Calcular la enería incidente final basada en las condiciones de la tensión nominal (O3)
    let E_final_mín;
    if (nominalVoltage > 2.7) {
        E_final_mín = E_2_mín;
    } else if (nominalVoltage > 0.6 && nominalVoltage <= 2.7) {
        E_final_mín = E_3_mín;
    } else if (nominalVoltage <= 0.6 && nominalVoltage >= 0.208) {
        E_final_mín = E_480V_mín;
    }
    
    E_calcm2_mín = E_final_mín / 4.184 ;

    let E_calcm2_final;
    if (E_calcm2 > E_calcm2_mín) {
        E_calcm2_final = E_calcm2;
    } else if (E_calcm2_mín > E_calcm2) {
        E_calcm2_final = E_calcm2_mín;
    }

        return E_calcm2_final; // Asegúrate de que E_calcm2 esté correctamente calculado
    }

    // Calcular la energía incidente
    var E_calcm2_final = calculateIncidentEnergy();


    if (isNaN(E_calcm2)) {
        console.error("E_calcm2 no es un número válido.");
        return;
    }

    if (nominalVoltage <= 0.75) {
        LAB = 1;
    } else if (nominalVoltage > 0.75 && nominalVoltage <= 15) {
        LAB = 1.5;
    } else {
        return null;
    }

    if (nominalVoltage <= 0.75) {
        RAB = 0.3;
    } else if (nominalVoltage > 0.75 && nominalVoltage <= 15) {
        RAB = 0.7;
    } else {
        return null;
    }

    const xRadius = arcFlashBoundary;
    const yRadius = 1.5 * arcFlashBoundary;
    const numPoints = 1000;

    // Crear datos para las elipses
    const dataX = [];
    const dataY = [];
    const yOffset = 1;
    for (let i = 0; i <= numPoints; i++) {
        const theta = 2 * Math.PI * i / numPoints;
        const x = xRadius * Math.cos(theta);
        const y = yRadius * Math.sin(theta) + yOffset;
        dataX.push(x);
        dataY.push(y);
    }

    const dataPoints2 = [];
    const xRadius2 = LAB;
    const yRadius2 = 1.5 * xRadius2;
    for (let i = 0; i <= numPoints; i++) {
        const theta = (2 * Math.PI * i) / numPoints;
        const x = xRadius2 * Math.cos(theta);
        const y = yRadius2 * Math.sin(theta) + yOffset;
        dataPoints2.push({ x: x, y: y });
    }

    const dataPoints3 = [];
    const xRadius3 = RAB;
    const yRadius3 = 1.5 * xRadius3;
    for (let i = 0; i <= numPoints; i++) {
        const theta = (2 * Math.PI * i) / numPoints;
        const x = xRadius3 * Math.cos(theta);
        const y = yRadius3 * Math.sin(theta) + yOffset;
        dataPoints3.push({ x: x, y: y });
    }

    const dataPoints4 = [];
    const xRadius4 = electrodeDistance / 1000;
    const yRadius4 = 1.5 * xRadius4;
    for (let i = 0; i <= numPoints; i++) {
        const theta = (2 * Math.PI * i) / numPoints;
        const x = xRadius4 * Math.cos(theta);
        const y = yRadius4 * Math.sin(theta) + yOffset;
        dataPoints4.push({ x: x, y: y });
    }

    // Selección de la imagen según la energía incidente
    let imageSrc = '';
    if (E_calcm2_final <= limepp1_calcm2) {
        imageSrc = 'epp1.png'; // Usa la imagen epp1 si la energía es menor o igual a 7
    } else if (E_calcm2_final > limepp1_calcm2 && E_calcm2_final <= limepp2_calcm2) {
        imageSrc = 'epp2.png'; // Usa la imagen epp2 si la energía está entre 7 y 35
    }

    if (!imageSrc) {
        console.error("No se seleccionó ninguna imagen.");
        // Continúa sin imagen si no hay imagen seleccionada
    }

const maxRadius = Math.max(xRadius, xRadius2, xRadius3, xRadius4, (workingDistance/1000)+0.5);

// Definir la imagen de la marca de agua
const watermarkImage = new Image();
watermarkImage.src = 'waterMark.png'; // Reemplaza con la ruta de tu marca de agua

if (E_calcm2_final <= limepp2_calcm2) {
    const image = new Image();
    image.src = imageSrc;

    image.onload = function() {
        // Dibujar el gráfico con Chart.js
        chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Frontera de Arco Eléctrica',
                    data: dataX.map((x, index) => ({ x: x, y: dataY[index] })),
                    borderColor: 'green',
                    pointBackgroundColor: 'green',
                    showLine: true,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Frontera Limitada',
                    data: dataPoints2,
                    borderColor: 'yellow',
                    fill: false,
                    showLine: true,
                    pointRadius: 1,
                    pointBackgroundColor: 'yellow',
                    borderWidth: 2,
                },
                {
                    label: 'Frontera Restringida',
                    data: dataPoints3,
                    borderColor: 'orange',
                    fill: false,
                    showLine: true,
                    pointRadius: 1,
                    pointBackgroundColor: 'orange',
                    borderWidth: 2,
                },
                {
                    label: 'Plasma',
                    data: dataPoints4,
                    borderColor: 'red',
                    fill: false,
                    showLine: true,
                    pointRadius: 1,
                    pointBackgroundColor: 'red',
                    borderWidth: 2,
                }]
            },
            options: {
                maintainAspectRatio: false,  // Desactiva la relación de aspecto
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Distancia de Trabajo [m]'
                        },
                        min: 0,
                        max: maxRadius * 1.1
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        display: false,
                        min: 0,
                        max: (maxRadius * 1.5 + yOffset) * 1.1
                    },
                },
                plugins: {
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        display: true,
                        position: 'right', // Posiciona la leyenda a la derecha
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            boxWidth: 20,
                        }
                    }
                },

                interaction: {
                    mode: null, // Desactiva la interacción del mouse
                },

                animation: {
                    onComplete: function() {
                        if (imageSrc) {
                            const image = new Image();
                            const a = 210;
                            image.src = imageSrc;
                            image.onload = function() {
                                const xPosition = chart.scales.x.getPixelForValue(workingDistance / 1000); // Posición en el eje X basada en workingDistance
                                const yPosition = chart.scales.y.getPixelForValue(0); // Posición en el eje Y pegada al eje X
                                ctx.drawImage(image, xPosition, yPosition - ((1.85/maxRadius)*(a)), ((1.85/maxRadius)*(a/3)), ((1.85/maxRadius)*a)); // Dibujar la imagen con el borde inferior en el eje X

                                // Agregar listener para mostrar tooltip
                                const tooltip = document.getElementById('custom-tooltip');
                                ctx.canvas.addEventListener('mousemove', function(event) {
                                    const rect = ctx.canvas.getBoundingClientRect();
                                    const mouseX = event.clientX - rect.left;
                                    const mouseY = event.clientY - rect.top;

                                    // Verifica si el mouse está sobre la imagen
                                    if (mouseX >= xPosition && mouseX <= (xPosition + ((1.85/maxRadius)*a/3)) && 
                                        mouseY >= (yPosition - ((1.85/maxRadius)*(a))) && mouseY <= yPosition) {
                                        
                                        if (E_calcm2_final <= limepp2_calcm2 && E_calcm2_final > limepp1_calcm2) {
                                            tooltip.style.display = 'block';
                                            tooltip.style.left = event.pageX + 'px';
                                            tooltip.style.top = event.pageY + 'px';
                                            tooltip.innerHTML = "Camisa/polera de manga + pantalón u overol igual o superior a 35 [cal/cm2] + lentes de protección ocular claros + capucha resistente al arco igual o superior a 35 [cal/cm2], casco aislante clase A (E), zapatos aislantes mínimo de 600 [V], guantes aislantes como mínimo clase 1 y sus respectivos guantes de cuero (cabritilla) protectores. Otros EPP según evaluación de riesgos específica."; // Cambia esto por el texto que desees mostrar
                                        } else if (E_calcm2_final <= limepp1_calcm2) {
                                            tooltip.style.display = 'block';
                                            tooltip.style.left = event.pageX + 'px';
                                            tooltip.style.top = event.pageY + 'px';
                                            tooltip.innerHTML = "Camisa/polera de manga + pantalón u overol igual o superior a 8 [cal/cm2] + lentes de protección claros + protector facial y esclavina resistente al arco igual o superior a 8 [cal/cm2], casco aislante clase A (E), zapatos aislantes mínimo de 600 [V], guantes aislantes y sus respectivos guantes de cuero protectores. Otros EPP según evaluación de riesgos específica."; // Cambia esto por el texto que desees mostrar
                                        }

                                    } else {
                                        tooltip.style.display = 'none';
                                    }
                               });
                            };
                        }

                        // Añadir la marca de agua al gráfico
                        const watermarkX = (chart.width / 2) - (watermarkImage.width / 16);
                        const watermarkY = (chart.height / 2) - (watermarkImage.height / 16);
                        const watermarkWidth = watermarkImage.width / 8;
                        const watermarkHeight = watermarkImage.height / 8;
                        
                        ctx.globalAlpha = 0.1;  // Ajusta la transparencia
                        ctx.drawImage(watermarkImage, watermarkX, watermarkY, watermarkWidth, watermarkHeight);
                        ctx.globalAlpha = 1;  // Restaura la opacidad por defecto

                    }
                }
            },

            // Agregar fondo blanco al gráfico
            plugins: [{
                beforeDraw: function(chart) {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.fillStyle = 'white';  // Color de fondo
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            }]
        });
    };

    image.onerror = function() {
        console.error("La imagen no se pudo cargar.");
    };

} else if (E_calcm2_final > limepp2_calcm2) {
    // Dibujar el gráfico con Chart.js
    chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Frontera de Arco Eléctrica',
                data: dataX.map((x, index) => ({ x: x, y: dataY[index] })),
                borderColor: 'green',
                pointBackgroundColor: 'green',
                showLine: true,
                fill: false,
                pointRadius: 0
            },
            {
                label: 'Frontera Limitada',
                data: dataPoints2,
                borderColor: 'yellow',
                fill: false,
                showLine: true,
                pointRadius: 1,
                pointBackgroundColor: 'yellow',
                borderWidth: 2,
            },
            {
                label: 'Frontera Restringida',
                data: dataPoints3,
                borderColor: 'orange',
                fill: false,
                showLine: true,
                pointRadius: 1,
                pointBackgroundColor: 'orange',
                borderWidth: 2,
            },
            {
                label: 'Plasma',
                data: dataPoints4,
                borderColor: 'red',
                fill: false,
                showLine: true,
                pointRadius: 1,
                pointBackgroundColor: 'red',
                borderWidth: 2,
            }]
        },
        options: {
            maintainAspectRatio: false,  // Desactiva la relación de aspecto
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Distancia [m]'
                    },
                    min: 0,
                    max: maxRadius * 1.1
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    display: false,
                    min: 0,
                    max: (maxRadius * 1.5 + yOffset) * 1.1
                },
            },
            plugins: {
                tooltip: {
                    enabled: false
                },
                legend: {
                    display: true,
                    position: 'right', // Posiciona la leyenda a la derecha
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 20,
                    }
                }
            },

            interaction: {
                mode: null, // Desactiva la interacción del mouse
            },

                animation: {
                    onComplete: function() {
                        // Añadir la marca de agua al gráfico
                        const watermarkX = (chart.width / 2) - (watermarkImage.width / 16);
                        const watermarkY = (chart.height / 2) - (watermarkImage.height / 16);
                        const watermarkWidth = watermarkImage.width / 8;
                        const watermarkHeight = watermarkImage.height / 8;
                        
                        ctx.globalAlpha = 0.1;  // Ajusta la transparencia
                        ctx.drawImage(watermarkImage, watermarkX, watermarkY, watermarkWidth, watermarkHeight);
                        ctx.globalAlpha = 1;  // Restaura la opacidad por defecto

                    }
                }

        },

        // Agregar fondo blanco al gráfico
        plugins: [{
            beforeDraw: function(chart) {
                const ctx = chart.ctx;
                ctx.save();
                ctx.fillStyle = 'white';  // Color de fondo
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        }]
    });
  }
}
