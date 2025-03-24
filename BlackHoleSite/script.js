const canvas = document.getElementById("simulationBox");
const ctx = canvas.getContext("2d");
canvas.width = 1800;
canvas.height = 1000;
const Xp = 900;
const Yp = 400;
const V = 10;
const G = 6.6e-6;
const M = 1e8;
const theta = Math.PI / 6;

let particlePosition = [Xp, Yp];
let i = 0;

function updateParticlePosition() {
    let t = i++/40;
    if (t === 0) {
        particlePosition[0] = Xp;
        particlePosition[1] = Yp;
    } else {
        let dx = Math.abs(particlePosition[0] - 900);
        let dy = Math.abs(particlePosition[1] - 500);
        let distance = 50 * Math.sqrt(dx * dx + dy * dy);
        
        if(distance === 0) return;

        Ax =  (G * M) / (distance);
        Ay =  (G * M) / (distance);
        
        Vx = V * Math.cos(theta) + signAccX(particlePosition[0]) * Ax * t;
        Vy = V * Math.sin(theta) + signAccY(particlePosition[1]) * Ay * t;

        particlePosition[0] = Xp + Vx * t;
        particlePosition[1] = Yp + Vy * t;
    }
    particlesMove(particlePosition[0], particlePosition[1]);
}

function signAccX(X){
    if(X < 900) return 1;
    else if (X > 900) return -1;
        else if(X === 900) return 0;
}

function signAccY(Y){
    if(Y < 500) return 1;
    else if (Y > 500) return -1;
        else if(Y === 500) return 0;
}

function particlesMove(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2); // Punto mobile
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(900, 500, 10, 0, Math.PI * 2); // Punto centrale
    ctx.closePath();
    ctx.fill();
}

setInterval(updateParticlePosition, 10);
