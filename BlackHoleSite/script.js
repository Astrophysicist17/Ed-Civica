const canvas = document.getElementById("simulationBox");
const ctx = canvas.getContext("2d");
canvas.width = 1800;
canvas.height = 1000;
const Xp = 700; // Particella in centro a destra
const Yp = 100; // Particella sopra il centro
const theta = Math.PI/3;
const alfa = theta - Math.PI/2; 
let i = 0;

function updateParticlePosition() {
    const t = i++ / 10;
    if(t === 0){
        const Xn = Xp, Yn = Yp;
        
        particlesMove(Xn,Yn);
    }
    else{
        const V = 50;
        const theta = theta + Math.asin((Math.abs(500-Yn))/distance);
        const alfa = theta - Math.PI/2;
        const Vx = V * Math.cos(alfa);
        const Vy = V * Math.sin(alfa);
        const Xn = Xp + (Vx * t);
        const Yn = Yp + (Vy * t);
        const distance = Math.sqrt(Math.pow((Xn-900),2)+Math.pow(Yn-500),2);




        particlesMove(Xn,Yn);
    }
    
    
    
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