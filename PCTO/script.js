// script.js
// Esempio base: aggiunta dinamica di argomenti

document.addEventListener("DOMContentLoaded", () => {
  const argomentiList = document.getElementById("argomenti-list");

  const nuovoArgomento = document.createElement("li");
  nuovoArgomento.textContent = "• (es. Astrofisica computazionale)";

  // Aggiunge l'argomento alla lista dopo 1 secondo come esempio dinamico
  setTimeout(() => {
    argomentiList.appendChild(nuovoArgomento);
  }, 1000);
});
