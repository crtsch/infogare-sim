const msgTexte = document.getElementById("msg-texte");

msgTexte.addEventListener("click", () => {
    newText = prompt("Message (<br> pour sauter des lignes)", msgTexte.innerHTML);
    msgTexte.innerHTML = (newText == "" || newText == null) ? msgTexte.innerHTML : newText;
})