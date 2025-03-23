const canvas = document.getElementById("simulationBox");
const ctx = canvas.getContext("2d");
canvas.width = 1800;
canvas.height = 1000;
const Xp = 900; // Particella in centro a destra
const Yp = 100; // Particella sopra il centro
let Xn = Xp;
let Yn = Yp;
let V = 100;
const G = 6.6e-11;
const M = 1e10;
const centerX = 900;
const centerY = 500;
let distance = Math.sqrt(Math.pow(centerX - Xp, 2) + Math.pow(centerY - Yp, 2));
let theta = Math.PI/3;
let alfa = theta + Math.PI/2;
let Vx = V * Math.cos(theta);
let Vy = V * Math.sin(theta);

particlesMove(Xp, Yp);
let i = 0;

function updateParticlePosition() {
    const t = i++ / 100;
    updateVelocity(t);
    
    Xn = Xp + (Vx * t);
    Yn = Yp + (Vy * t);
    
    particlesMove(Xn,Yn);
    
}

function updateVelocity(T){
    if((Vx * T - Vx * (T - 0.01)>0 && Xn < 900) || (Vx * T - Vx * (T - 0.01)<0 && Xn > 900))
        Vx = Vx + (G*M/Math.pow(distance,2))*T;
    else
        Vx = Vx - (G*M/Math.pow(distance,2))*T;
    if((Vy * T - Vy * (T - 0.01)>0 && Yn < 500) || (Vy * T - Vy * (T - 0.01)<0 && Yn > 500))
        Vy = Vy + (G*M/Math.pow(distance,2))*T;
    else
        Vy = Vy - (G*M/Math.pow(distance,2))*T;
}

function particlesMove(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2); // Punto visibile
    ctx.fill();
}

setInterval(updateParticlePosition,10)