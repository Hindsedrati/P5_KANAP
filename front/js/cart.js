let panier = JSON.parse(localStorage.getItem("produit"));

function afficherPanier(){
    //Si le panier vide 
    if (panier === null || panier.length == 0){
        document.querySelector("#cartAndFormContainer > h1").textContent += "est vide";
    }
    
    //Si l'element est dans le panier
    else{
        for (i = 0; i < panier.length; i++){
            document.querySelector("#cart__items").innerHTML += 
            <article class="cart_item" data-id="${panier[i][0].idProduct}">
            <div class="cart_item_img">
            <img src="${panier[i][0].image}" alt="${panier[i][0].imageAlt}" />
            </div>
            <div class="cart_item_content">
            <div class="cart_item_content_titlePrice">
            <h2>${panier[i][0].name}</h2>
            <p>${panier[i][0].price}</p>
            <p>Couleur: ${panier[i][0].choixOpt}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input index="${[i]}" onchange="getNewQty(this)" id="cartQty" type="number" class="itemQuantity"></input>
                </div>
            <div class="cart__item__content__settings__delete">
                <p index="${[i]}" onclick="supprimerArticle(this)" class="deleteItem">Supprimer</p>
            </div>
            </div>
            </div>
            </article>        
        }
    }
}
afficherPanier();

// supression de la ligne de commande au clic du bouton supprimer

function supprimerArticle(e){
    let index = e.getAttribute("index");
    paniersplice(index, 1);
    localStorage.setItem("produit", JSON.stringify(panier));
    location.reload();
}

// Mise à jour des quantités et total prix si modification des valeurs dans l'input

function getNewQty(e){
    let index = e.getAttribute("index");
    let newQty = e.value;
    panier[index][0].qty = newQty;

    if (newQty == 0) {
        panier.splice(index, 1);
        localStorage.setItem("produit", JSON.stringify(panier));
        location.reload();
    } else{
        document.querySelector("#totalQuantity").innerHTML = totalQty();
        document.querySelector("#totalPrice").innerHTML = totalPrice();
        localStorage.setItem("produit", JSON.stringify(panier));
    }
}

//calcul total prix

function totalPrice(){
    let totalprix = 0;
    for (let i = 0; i < panier.length; i++){
        let quantity = parseInt(panier[i][0].qty);
        let prix = parseInt(panier[i][0].qty);
        totalprix += prix * quantity;
    }
    return totalprix;
}

//affichage du total prix
document.querySelector("#totalPrice").innerHTML = totalPrice();

// Calcul du total quantité
function totalQty(){
        let totalqty = 0;
        for (let i = 0; i < panier.length; i++){
            let quantity = parseInt(panier[i][0].qty)
            totalqty += quantity;
        }
        return totalqty;
    }

// affichage du total quantités
document.querySelector("#totalQuantity").innerHTML = totalQty();

// selection de la div contenant tout le formulaire
let formulaire = document.querySelector(".cart__order__form");

//Selection des éléments du formulaire
let firstName = formulaire.firstName;
let lastName = formulaire.LastName;
let address = formulaire.address;
let city = formulaire.city;
let email = formulaire.email;
let boutonCommander = formulaire.submit;

//Declaration des RegExp



//Verif Prenom
firstName.addEventListener("input", function(){
    verificationFirstName(firstName);
});

function verificationFirstName(){
    let testFirstName = nameRegExp.test(firstName.value);
    if (testFirstName == false){
        firstName.nextElementSibling.innerHTML = 'ne peut pas contenir de chiffres ou caractères spéciaux';
        return false;
    } else{
        firstName.nextElementSibling.innerHTML = "";
        return true;
    }
}

//verif de la ville 

city.addEventListener("input", function(){
    verificationCity(city);
});

//Verif adresse 
addresse.addEventListener("change", function(){
    verificationAddress(address);
});

function verificationAddress(){
    let testAddress = addressRegExp.test(address.value);
    if (testAddress == false){
        address.nextElementSibling.innerHTML = "";
        return true;
    }
}

//verif Email
email.addEventListener("change", function(){
    verificationEmail(email);
});

function verificationEmail(){
    let testEmail = emailRegExp.test(email.value);
    if (testEmail == false && email.value != ""){
        email.nextElementSibling.innerHTML = "Veuillez saisir une adresse email valide";
        return false;
    } else{
        email.nextElementSibling.innerHTML = "";
        return true;
    }
}

//enovie du formulaire au clique du bouton commander

boutonCommander.addEventListener("click", function (event){
    event.preventDefault();
    //si le formulaire est OK
    if (verificationFirstName(firstName) && verificationLastName(lastName) && verificationCity(city) && verificationAddress(address) && verificationEmail (email)){
        //on recupère ID des produits du panier (evoyée au serveur)
        function recupIdProduct(){
            let idProduct = [];
            for (let i = 0; i < panier.length; i++) {
                id = panier[i][0].productID;
                idProduct.push(id);
            }
            return idProduct;
        }
    //décla d'une var contient ID
    let productID = recupIdProduct();

    //création de l'objet commande (contenant les infos du client + id des produits commandé)
    let commande = {
        contact : {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: productID,
    };

    //création de l'entete de la requete
    let options = {
        method: "POST",
        body: JSON.stringify(commande),
        Headers: {"Content-Type": "application/json" },
    };
    fetch("http://localhost:3000/api/products/order", options)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            localStorage.clear();
            let orderId = data.orderId;
            // localStorage.setItem("idCommande", JSON.stringify(orderId));
            // document.location.href = `confirmation.html`;
            window.location.assign(`confirmation.html?orderId=${orderId}`)
        })

    }
});

