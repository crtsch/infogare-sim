let heures;
let points;
let minutes;
let secondes;

document.addEventListener("DOMContentLoaded", () => {
    const horloge = document.createElement("div");
    horloge.id = "horloge";

    horloge.innerHTML = `<p><span id="heures">14</span><span id="points">:</span><span id="minutes">28</span><span id="secondes">39</span></p>`;

    document.body.appendChild(horloge);

    heures = document.getElementById("heures");
    points = document.getElementById("points");
    minutes = document.getElementById("minutes");
    secondes = document.getElementById("secondes");

    updateHeure();

    setInterval(updateHeure, 1000);
});


function zero(n) {
    n = n.toString();
    if(n.length == 1) {
        return "0" + n;
    }
    return n;
}

function updateHeure () {
    const currentDate = new Date();
    const currentHeures = zero(currentDate.getHours());
    const currentMinutes = zero(currentDate.getMinutes());
    const currentSecondes = zero(currentDate.getSeconds());
    heures.innerText = currentHeures;
    points.style.opacity = (currentSecondes % 2 == 0) ? 1 : 0;
    minutes.innerText = currentMinutes;
    secondes.innerText = currentSecondes;
}