async function updateMsg() {
    const reponse = await fetch("/flashmsg");
    const message = await reponse.json();
    const msg = document.getElementById("msg-texte");
    msg.innerHTML = "Tout va bien :)";
    console.log(message[0].long);
    if(message[0].long) {
        msg.innerHTML = message[0].long;
    }
}

updateMsg();