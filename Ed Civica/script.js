// Prendiamo gli elementi dal DOM
const slider = document.getElementById("distanceSlider");
const planet = document.getElementById("planet");
const zoneText = document.getElementById("zoneText");
const starSystem = document.getElementById("star-system");
const Slider = document.getElementById("PositionSlider");
const Planet = document.getElementById("Planet");
const Star = document.getElementById("Star");
const canvas = document.getElementById("lightCurveCanvas");
const ctx = canvas.getContext("2d");
let intervalID = null; // Variabile per gestire il setInterval


// Funzione per calcolare la posizione in base alle dimensioni dello schermo
function updateplanetPosition(distance) {
    let starSystemWidth = starSystem.clientWidth; // Larghezza dinamica
    let minDistance = starSystemWidth * 0.4;
    let maxDistance = starSystemWidth * 0.8;

    let planetPosition = minDistance + (distance / 200) * (maxDistance - minDistance);
    planet.style.left = `${planetPosition}px`;

    // Cambia il testo e il colore in base alla zona di abitabilità
    if (distance < 70) {
        zoneText.textContent = "Troppo vicino - Troppo caldo!";
        planet.style.backgroundColor = "red";
    } else if (distance >= 70 && distance <= 130) {
        zoneText.textContent = "Zona abitabile!";
        planet.style.backgroundColor = "green";
    } else {
        zoneText.textContent = "Troppo lontano - Troppo freddo!";
        planet.style.backgroundColor = "blue";
    }
}

canvas.width = 700;
canvas.height = 250;


let brightnessHistory = Array(600).fill(1);

function updatePlanetPosition(value) {
    Planet.style.left = `${value}px`;
    updateBrightness(value);
}

function updateBrightness(x) {
    const StarCenter = 200;
    const StarRadius = 40;
    const PlanetRadius = 15;
    const PlanetCenter = x;
    const distance = Math.abs(PlanetCenter - StarCenter);
    
    if(distance > PlanetRadius + StarRadius)
    brightness = 1;

    // Calcola la distanza tra il centro del pianeta e il centro della stella
   

    // Se il pianeta inizia a coprire la stella
    else if (distance <= StarRadius + PlanetRadius) {
        if (distance + PlanetRadius <= StarRadius) {
            // Se il pianeta è completamente all'interno della stella, luminosità costante
            brightness = 0.3;
        } else {
            // Transizione morbida con una funzione sigmoidale
            let overlapFactor = (StarRadius + PlanetRadius - distance) / (2 * PlanetRadius);
            brightness = 1 - 0.7 * (1 / (1 + Math.exp(-10 * (overlapFactor - 0.5))));
        }
    }

    brightnessHistory.push(brightness);
    if (brightnessHistory.length > 600) brightnessHistory.shift();

    drawGraph();
}

function startGraphUpdate() {
    if (intervalID) clearInterval(intervalID); // Evita duplicazioni fermando l'intervallo precedente

    intervalID = setInterval(() => {
        updateBrightness(parseInt(Slider.value));
    }, 20);
}

// Avvia il grafico una sola volta
startGraphUpdate();



function drawGraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna assi con frecce
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    
    // Asse X
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(650, 200);
    ctx.moveTo(645, 195);
    ctx.lineTo(650, 200);
    ctx.moveTo(645, 205);
    ctx.lineTo(650, 200);
    ctx.stroke();

    // Asse Y
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(50, 50);
    ctx.lineTo(45, 55);
    ctx.moveTo(50, 50);
    ctx.lineTo(55, 55);
    ctx.stroke();
    // Etichette assi
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Time", 350, 220); // Asse X, centrato

    ctx.save();
    ctx.translate(20, 125);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Star Brightness", 0, 20);
    ctx.restore();

    // Disegna curva continua
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    for (i = 0; i < brightnessHistory.length; i++) {
        const graphX = 50 + (i / 600) * 600;
        const graphY = 200 - brightnessHistory[i] * 100;
        if (i === 0) {
            ctx.moveTo(graphX, graphY);
        } else {
            ctx.lineTo(graphX, graphY);
        }
    }
    ctx.stroke();
}

// Evento per aggiornare la posizione del pianeta quando si sposta lo slider
slider.addEventListener("input", () => {
    updateplanetPosition(slider.value);
});

updateplanetPosition(parseInt(slider.value));

Slider.addEventListener("input", () => {
    updatePlanetPosition(parseInt(Slider.value));
    startGraphUpdate(); // Riavvia l'aggiornamento una sola volta
});


updatePlanetPosition(parseInt(Slider.value));


// Ricalcola le posizioni quando la finestra cambia dimensione
window.addEventListener('resize', () => updateplanetPosition(slider.value));
updateplanetPosition(slider.value);

window.addEventListener('resize', () => updatePlanetPosition(Slider.value));
updatePlanetPosition(Slider.value);






