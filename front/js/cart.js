/* ***** VARIABLES ***** */
var cart = localStorage;

var cartCounter = 0;
var totalPrice = 0;

var productId, productColor, productQuantity;


/* ***** CLASSES ***** */

class Contact {
    constructor (firstName, lastName, address, city, email) {
        this.firstName = firstName.value;
        this.lastName = lastName.value;
        this.address = address.value;
        this.city = city.value;
        this.email = email.value;
    }
}



/* ***** FONCTIONS ***** */

/* *** GÉNÉRAL *** */

/* RÉCUPÉRATION DES PRODUITS DANS LE LOCAL STORAGE */
async function getProducts(cart) {}

/* RÉCUPÉRATION DE CHAQUE PRODUIT SUR SERVEUR */
async function getProduct(id) {
    return fetch("http://localhost:3000/api/products")
      .then(function(httpBodyResponse) {
        return httpBodyResponse.json();
      })
      .then(function(products) {
          for (product of products) { 
              if (product._id == id) {  
                return product;}
          }
      })
      .catch(function(error) {
          return alert("Désolé, il y a eu une erreur: ", error);
      });
}

/* UPDATE COMPTEUR D'ARTICLES */
function updateCartCounter(cart) {
    cartCounter = 0;
    for (let i = 0; i < cart.length; i++) {
        let key = localStorage.key(i);
        cartCounter += Number(cart[key]);
    }
    return cartCounter
}

/* VÉRIFICATION FORMULAIRE */
function checkForm() {
    /* Variables utiles */
    // Éléments d'input à check:
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");

    // Regexs pour check:
    let regNames = /^[a-zA-Z\s'-]+$/;
    let regAddress = /\d+\,{0,1}\s+\w+\s+\w+/;
    let regEmail = /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+([A-Za-z0-9]{2,4})$/;

    let inputsToTest = [firstName, lastName, address, city, email];
    let regexsToTest = [regNames, regNames, regAddress, regNames, regEmail];

    // Variable à renvoyer en fin de fonction (true si aucune erreur, false si au moins une erreur):

    // Boucle de test:
    for (i=0; i < inputsToTest.length; i++) {
        let inp = inputsToTest[i];
        let reg = regexsToTest[i];
        // Valeur du test pour l'input en cours:
        let test = reg.test(inp.value);
        var tests = [];
        
        // Si false sur ce test, message d'erreur sous le champ correspondant:
        if (test == false) {
            var globalTest = false;
            switch(inp.name) {
                case "firstName": 
                    document.getElementById(inp.name + "ErrorMsg").textContent = "Ce champ peut contenir des lettres majuscules et minuscules, apostrophes et tirets.";
                    break;
                case "lastName": 
                    document.getElementById(inp.name + "ErrorMsg").textContent = "Ce champ peut contenir des lettres majuscules et minuscules, apostrophes et tirets.";
                    break;
                case "address": 
                    document.getElementById(inp.name + "ErrorMsg").textContent = "Ce champ doit commencer par un ou plusieurs chiffres éventuellement suivis d'une virgule, puis obligatoirement des lettres.";
                    break;
                case "city":
                    document.getElementById(inp.name + "ErrorMsg").textContent = "Ce champ doit contenir des lettres, et éventuellement une apostrophe et/ou un tiret.";
                    break;
                case "email":
                    document.getElementById(inp.name + "ErrorMsg").textContent = "Ce champ doit contenir une adresse mail valide, par exemple: Kim.robert@kanap.com";
                    break;
            }
        }
    } 
    return globalTest;
}

/* GÉNÉRATION TABLEAU PRODUITS */
async function createTable(cart) {
    let productsTable = [];
    for(let i = 0; i < cart.length; i++) {
        let cartKey = localStorage.key(i);
        let splitKey = cartKey.split(" ");
        productId = splitKey[0];
        if (productsTable.includes(productId)) {
            continue;
        }
        else {
            productsTable[i] = productId;
        }
    }
    return productsTable;
}

/* GÉNÉRATION DONNÉES ENVOI */
async function createData() {
    contact = new Contact(firstName, lastName, address, city, email);
    const products = await createTable(cart);
    console.log("produits: ", products);
    var orderData = {
        contact,
        products
    };
    console.log("Données à envoyer: ", orderData);
    return orderData
}


/* ENVOI COMMANDE */
async function postOrder(data) {
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        redirect: "manual",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data),
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        cart.clear();
        console.log("Id de commande: ", json.orderId);
        return window.location = "confirmation.html?orderId=" + json.orderId;
    })
    .catch(function(err) {
        return console.log("Erreur: ", err);
    })
}

/* *** DOM DYNAMIQUE ***  */
async function hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey) {
    /* AFFICHAGE PRODUITS */
    /* Création balises */
    let cartItem = document.createElement("article");
    let cartItemImg = document.createElement("div");
    let productImg = document.createElement("img");

    let cartItemContent = document.createElement("div");
    let cartItemContentDescr = document.createElement("div");
    let cartItemContentTitle = document.createElement("h2");
    let cartItemContentColor = document.createElement("p");
    let cartItemContentPrice = document.createElement("p");


    let cartItemSettings = document.createElement("div");

    let settingsQuantity = document.createElement("div");
    let settingsQuantityText = document.createElement("p");
    let settingsQuantityInput = document.createElement("input");

    let deleteContainer = document.createElement("div");
    let deleteText = document.createElement("p");


    /* Position balises */
    document.getElementById("cart__items").appendChild(cartItem);
    cartItem.appendChild(cartItemImg);
    cartItemImg.appendChild(productImg);

    cartItem.appendChild(cartItemContent);
    cartItemContent.appendChild(cartItemContentDescr);
    cartItemContentDescr.appendChild(cartItemContentTitle);
    cartItemContentDescr.appendChild(cartItemContentColor);
    cartItemContentDescr.appendChild(cartItemContentPrice);

    cartItemContent.appendChild(cartItemSettings);

    cartItemSettings.appendChild(settingsQuantity);
    settingsQuantity.appendChild(settingsQuantityText);
    settingsQuantity.appendChild(settingsQuantityInput);

    cartItemSettings.appendChild(deleteContainer);
    deleteContainer.appendChild(deleteText);


    /* Attributs et contenu (balises créées avec js) */
    cartItem.setAttribute("class", "cart__item");
    cartItem.setAttribute("data-id", productId);
    cartItem.setAttribute("data-color", productColor);

    cartItemImg.setAttribute("class", "cart__item__img")

    productImg.setAttribute("src", product.imageUrl);
    productImg.setAttribute("alt", product.altTxt);


    cartItemContent.setAttribute("class", "cart__item__content");
    cartItemContentDescr.setAttribute("class", "cart__item__content__description")
    cartItemContentTitle.textContent = product.name;
    cartItemContentColor.textContent = productColor;
    cartItemContentPrice.textContent = Number(product.price) + " €";

    cartItemSettings.setAttribute("class", "cart__item__content__settings");
    
    settingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
    settingsQuantityText.textContent = "Qté : " + productQuantity;
    settingsQuantityInput.setAttribute("type", "number");
    settingsQuantityInput.setAttribute("class", "itemQuantity");
    settingsQuantityInput.setAttribute("name", "itemQuantity");
    settingsQuantityInput.setAttribute("min", "1");
    settingsQuantityInput.setAttribute("max", "100");
    settingsQuantityInput.setAttribute("value", productQuantity);

    deleteContainer.setAttribute("class", "cart__item__content__settings__delete");
    deleteText.setAttribute("class", "deleteItem");
    deleteText.textContent = "Supprimer";

    /* Attributs et contenus (balises existantes dans le html) */
    document.getElementById("totalQuantity").textContent = cartCounter;
    document.getElementById("totalPrice").textContent = totalPrice;

    /* MODIFICATIONS DYNAMIQUES PANIER */

    /* Modification quantité: */
    settingsQuantityInput.addEventListener("change", function(e) {
        //Comptage items depuis localStorage
        cartCounter = updateCartCounter(cart);
        //Récupération informations objet visé
        productId = e.target.closest(".cart__item").getAttribute("data-id");
        productColor = e.target.closest(".cart__item").getAttribute("data-color");
        cartKey = productId + " " + productColor;
        //Quantité objet avant modification de l'input
        let initialQuantity =  Number(cart[cartKey]);
        //Màj prix et quantité
        totalPrice -= initialQuantity * Number(product.price);
        //Vérification valeur input quantité produit:
        if (Number.isInteger(parseInt(e.target.value)) && e.target.value > 0) {
            productQuantity = e.target.value;
            window.location.reload();
        }
        else {
            alert("Veuillez entrer une quantité valide (entier positif) pour chaque article ou le supprimer via le bouton adéquat.");
            let orderButton = document.getElementById("order");
            orderButton.setAttribute("disabled", "true");
        }
        totalPrice += productQuantity * Number(product.price);
        //Màj quantité dans le localStorage
        cart[cartKey] = productQuantity;
        //Màj compteur via comptage localStorage
        cartCounter = updateCartCounter(cart);
        //Màj affichage
        document.getElementById("totalQuantity").textContent = cartCounter;
        document.getElementById("totalPrice").textContent = totalPrice;

    });
    
    /* Suppression d'un produit: */
    deleteText.addEventListener("click", function(e) {
        cartCounter -= Number(productQuantity);
        totalPrice -= Number(productQuantity) * Number(product.price);
        cart.removeItem(cartKey);
        window.location.reload();
        document.getElementById("totalQuantity").textContent = cartCounter;
        document.getElementById("totalPrice").textContent = totalPrice;
        localStorage.removeItem(cartKey);
    });
}



/* ***** ACTIONS ***** */
(async function() {
    /* SI PANIER VIDE */ 
    if (cart.length == 0) {
        // Désactivation du bouton de commande: 
        alert("Attention: votre panier est vide, vous ne pouvez pas commander");
        document.getElementById("order").setAttribute("diabled", "true");
    }
    /* SINON */
    else {
        // Affichage dynamique produit par produit:
        for(let i = 0; i < cart.length; i++){
            // (Récupération infos produits en local storage:)
            var cartKey = localStorage.key(i);
            var splitKey = cartKey.split(" ");
            productId = splitKey[0];
            productColor = splitKey[1];
            productQuantity = cart.getItem(cartKey);

            // (Màj compteur d'items:)
            cartCounter += Number(productQuantity);
    
            // (Infos serveur:)
            var product = await getProduct(productId);
            totalPrice += Number(productQuantity) * Number(product.price);
    
            // (Contenu dynamique page:)
            const pageContent = await hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey);
        }
        
        // Si panier vide:
        if (cart.length == 0) {
            alert("Impossible de passer commande, votre panier est vide! \nVous allez être redirigé-e vers l'index");
            return window.location = "index.html";
            let orderButton = document.getElementById("order");
            orderButton.setAttribute("disabled", "true");
        }

        // Si panier non vide:
        /* Vérification formulaire: */
        const userForm = document.getElementById("cart__order__form");
        userForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            // Si panier plein:
            let check = checkForm(e);
            if (check == false) {
                return false;
            }
            let data = await createData();
            let order = await postOrder(data);
        });
    }
    return console.log("fin input");
})()


        


