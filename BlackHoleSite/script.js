const canvas = document.getElementById("simulationBox");
const ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;

const G = 6.6e-7;
const M = 3.5e10;
const numParticles = 5000;
let particles = [];

// Inizializza le particelle con posizioni e velocità casuali
for (let i = 0; i < numParticles; i++) {
    let angle = Math.random() * 2 * Math.PI;
    let speed = 0.5 + Math.random() * 15;
    let distance = 200 + Math.random() * 300;
    
    particles.push({
        x: canvas.width / 2 + distance * Math.cos(angle),
        y: canvas.height / 2 + distance * Math.sin(angle),
        vx: speed * Math.sin(angle),
        vy: -speed * Math.cos(angle)
    });
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    // Disegna il punto centrale (massa centrale)
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    particles.forEach(p => {
        let dx = p.x - canvas.width / 2;
        let dy = p.y - canvas.height / 2;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return;

        // Calcolo dell'accelerazione gravitazionale
        let Ax = (-G * M * dx) / (distance * distance * distance);
        let Ay = (-G * M * dy) / (distance * distance * distance);

        // Aggiornamento della velocità
        p.vx += Ax;
        p.vy += Ay;

        // Aggiornamento della posizione
        p.x += p.vx;
        p.y += p.vy;

        // Disegna la particella
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    });
}

setInterval(updateParticles, 1);
