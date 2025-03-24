const canvas = document.getElementById("simulationBox");
const ctx = canvas.getContext("2d");
canvas.width = 1800;
canvas.height = 1000;
const Xp = 900; // Particella in centro a destra
const Yp = 100; // Particella sopra il centro
let Xn = Xp;
let Yn = Yp;
let V = 50;
let theta = Math.PI/3;
let Vx = V * Math.cos(theta);
let Vy = V * Math.sin(theta);
let distance = Math.sqrt(Math.pow((Xn-900),2)+Math.pow(Yn-500),2);

particlesMove(Xn, Yn);
let i = 0;

function updateParticlePosition() {
    let t = i++ / 100;
    updateVelocity(t);
    
    Xn = Xp + (Vx * t);
    Yn = Yp + (Vy * t);
    
    particlesMove(Xn,Yn);
    
}

function updateVelocity(T){
    Vx += G * M / (distance * distance)*T;
    Vy += G * M / (distance * distance)*T;
}

function particlesMove(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2); // Punto visibile
    ctx.arc(900, 500, 10, 0, Math.PI * 2);
    ctx.fill();
}

setInterval(updateParticlePosition,10);