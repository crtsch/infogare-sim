var gare = "Strasbourg"

/* Points jaunes dans les listes d'arrets*/

function updateArrets() {
  const arrets = document.getElementsByClassName("arrets");
  
  for (const arr of arrets) {
      arr.innerHTML = arr.innerHTML.replaceAll(" . ", `<svg class="sep" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="var(--jaune)"/>
  </svg>`);
  };
}


/* display */

function formatHeure(h) {
  return h[0] + h[1] + "h" + h[3] + h[4];
}

function formatRetard(r) {
  if (r < 60) {
    return r + " min";
  }
  return Math.floor(r/60) + "h" + (r % 60 == 0 ? "" : (r % 60 < 10 ? "0" + r % 60 : r % 60));
}

async function ajouterTrain(id, operateur, etat, heure, destination, voie, arrets, retard, i) {
  const table = document.getElementById("liste-trains");
  const v = voie ? `<img src="assets/voie/${voie}.png">` : "";
  var e = `<td class="etat">à&nbsp;l'heure</td>`;
  if(etat == "retard") {
    e = `<td class="etat" style="color: var(--jaune)">retard ${formatRetard(retard)}</td>`;
  }
  if(etat == "supprimé") {
    e = `<td class="etat" style="color: var(--jaune)">supprimé</td>`;
  }
  const train = document.createElement("tr");
  train.dataset.trainid = id;
  train.dataset.etat = "h";
  if (etat == "supprimé") {
    train.dataset.etat = "s";
  }
  if (etat == "retard") {
    train.dataset.etat = `r-${retard}`;
  }

  train.classList.add("train");
  train.innerHTML = `<td class="operateur">
  <img src="assets/logo/${operateur.toLowerCase()}.png">
  </td>
  ${e}
  <td class="heure">${formatHeure(heure)}</td>
  <td class="destination">${destination}</td>
  <td class="voie">
  ${v}
  </td>`;
  if (i % 2 == 0) {
    train.classList.add("clair");
  }
  table.appendChild(train);
  if (i < 2 && arrets != "") {
    const arr = document.createElement("tr");
    arr.classList.add("train-arrets");
    arr.innerHTML = `<td></td>
                        <td class="arrets" colspan="4">${arrets}</td>`;
    if (i % 2 == 0) {
      arr.classList.add("clair");
    }
    table.appendChild(arr);
  }
  updateArrets();
}


/*lien base de données */

export async function displayTrains(ecran) {
  const reponse = await fetch("/trains");
  const trains = await reponse.json();
  const listeTrains = document.getElementById("liste-trains");
  listeTrains.innerHTML ="";
  var i = 0;
  if(ecran == "departs") {
    for (const train of trains) {
      if(train.destination != gare) {
        ajouterTrain(train.idTrain, train.operateur, train.etat, train.horaire, train.destination, train.quai, train.arrets.split(` . ${gare} . `).length > 1 ? train.arrets.split(` . ${gare} . `)[1] : train.arrets, train.retard, i);
        i++;
      }
    }
  }
  if(ecran == "arrivees") {
    for (const train of trains) {
      if(train.provenance != gare) {
        ajouterTrain(train.idTrain, train.operateur, train.etat, train.horaire, train.destination, train.quai, train.arrets.split(` . ${gare} . `).length > 1 ? train.arrets.split(` . ${gare} . `)[0] : train.arrets, train.retard, i);
        i++;
      }
    }
  }
}

export async function updateFlash() {
    const reponse = await fetch("/flashmsg");
    const message = await reponse.json();
    const msg = document.getElementById("flash-bas");
    const msgTexte = document.getElementById("flash-texte");
    msg.style.display = "none";
    msgTexte.style.visibility = "hidden";
    if(message[0].court) {
      msg.style.display = "block";
      msgTexte.innerText = message[0].court;
      requestAnimationFrame(() => {
        const distance = window.innerWidth + msgTexte.getBoundingClientRect().width + 15;
        msgTexte.style.setProperty("--flash-duration", `${(distance) / 120}s`);
        msgTexte.style.visibility = "visible";
      });
    }
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let switchEtatTimer = null;

function afficherEtatTrains(mode) {
  const trains = document.getElementsByClassName("train");

  for (const train of trains) {
    const etatDisp = train.querySelector(".etat");

    if (mode === 0) {
      if (train.dataset.etat == "h") {
        etatDisp.style.color = "white";
        etatDisp.innerHTML = "à&nbsp;l'heure";
      }
      if (train.dataset.etat[0] == "r") {
        const retard = train.dataset.etat.split("-")[1];
        etatDisp.style.color = "var(--jaune)";
        etatDisp.innerText = `retard ${formatRetard(retard)}`;
      }
      if (train.dataset.etat == "s") {
        etatDisp.style.color = "var(--jaune)";
        etatDisp.innerText = "supprimé";
      }
    } else {
      const trainId = train.dataset.trainid.split(" ");
      etatDisp.style.color = "white";
      etatDisp.innerHTML = `<span style="font-family: 'Achemine'">${trainId[0]}</span><br><span style="font-family: 'AchemineBold'">${trainId[1]}</span>`;
    }
  }
}

export function switchEtat() {
  if (switchEtatTimer !== null) {
    return;
  }

  let mode = 0;
  afficherEtatTrains(mode);

  switchEtatTimer = setInterval(() => {
    mode = mode === 0 ? 1 : 0;
    afficherEtatTrains(mode);
  }, 3000);
}