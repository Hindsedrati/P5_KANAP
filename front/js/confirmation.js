//Affichage id commande via local storage

function afficherNoCommande (){
    let CommandNumber = document.querySelector("#orderId");
    let commandeID = JSON.parse(localStorage.getItem("idCommande"));
    CommandNumber.innerHTML = `${commandeID}`;
}
afficherNoCommande();

//affichage via id dans url

//recup de l'id depuis l'url
let params = new URL(document.location).searchParams;
let orderId = paramss.get("orderId");

//ou
// const orderId = new URL(location.href).searchParams.get("orderId");

//Affichage du numéro de commande
document.getElementById("orderId").textContent = orderId;