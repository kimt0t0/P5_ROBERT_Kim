/* *** VARIABLES *** */
var cart = localStorage;

var cartCounter = 0;
var totalPrice = 0;

var productId, productColor, productQuantity, productImgUrl;
var settingsQuantityInput, deleteText;


/* *** FONCTIONS *** */

/* GÉNÉRAL */
/* Accès aux infos produit sur serveur */
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
          alert(error);
      });
}

/* Attributs du formulaire */
async function setFormAttributes(inputName, regexModel, min, max, title) {
    inputName.setAttribute("pattern", regexModel);
    inputName.setAttribute("min-length", min);
    inputName.setAttribute("max-length", max);
    inputName.setAttribute("title", title);
}


/* DOM DYNAMIQUE */
async function hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey) {
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
    settingsQuantityInput = document.createElement("input");

    let deleteContainer = document.createElement("div");
    deleteText = document.createElement("p");

    /* Attributs et contenu des balises créées */
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


    /* Position des balises créées */
    document.getElementById("cart__items").appendChild(cartItem);
    cartItem.appendChild(cartItemImg);
    cartItemImg.appendChild(productImg);

    document.getElementById("cart__items").appendChild(cartItemContent);
    cartItemContent.appendChild(cartItemContentDescr);
    cartItemContentDescr.appendChild(cartItemContentTitle);
    cartItemContentDescr.appendChild(cartItemContentColor);
    cartItemContentDescr.appendChild(cartItemContentPrice);


    document.getElementById("cart__items").appendChild(cartItemSettings);

    cartItemSettings.appendChild(settingsQuantity);
    settingsQuantity.appendChild(settingsQuantityText);
    settingsQuantity.appendChild(settingsQuantityInput);

    cartItemSettings.appendChild(deleteContainer);
    deleteContainer.appendChild(deleteText);

    /* Attributs et contenus de balises existantes */
    document.getElementById("totalQuantity").textContent = cartCounter;
    document.getElementById("totalPrice").textContent = totalPrice;

        /* MODIFICATIONS DU PANIER */

    /* /* Modification quantité: */
    settingsQuantityInput.addEventListener("change", function(e) {
        /* (suppression de la quantité originale du produit dans compteur panier et prix total: ) */
        cartCounter -= Number(productQuantity);
        totalPrice -= Number(productQuantity) * Number(product.price);
        /* (màj nouvelle quantité du produit: ) */
        productQuantity = e.target.value;
        settingsQuantityText.textContent = "Qté : " + productQuantity;
        /* (màj compteur panier et prix total: ) */
        cartCounter += Number(productQuantity);
        totalPrice += Number(productQuantity) * Number(product.price);
        document.getElementById("totalQuantity").textContent = cartCounter;
        document.getElementById("totalPrice").textContent = totalPrice;
        /* (màj local storage: ) */
        console.log("ancienne quantité: " + cart[cartKey]);
        cart[cartKey] = productQuantity;
        console.log("nouvelle quantité: " + cart[cartKey]);
    });
    
    /* Suppression d'un produit du panier: */
    deleteText.addEventListener("click", function(e) {
        cartCounter -= Number(productQuantity);
        totalPrice -= Number(productQuantity) * Number(product.price);
        let cartKey = productId + " " + productColor;
        cart.removeItem(cartKey);
        document.getElementById(productId).remove(); /* ne fonctionne pas directement au clic... testé aussi avec Element.closest("article") */
    });

    /* SUIVI VÉRIFICATIONS DU FORMULAIRE */
    let userForm = document.getElementById("cart__order__form");
    userForm.addEventListener("submit", function(e) {
        var userOrder = [];

        let userInputs = userForm.getElementsByTagName("input");
        let firstName = userInputs.getElementById("firstName");
        let lastName = userInputs.getElementById("lastName");
        let address = userInputs.getElementById("address");
        let city = userInputs.getElementById("city");
        let email = userInputs.getElementById("email");

        let userInputsList = [firstName, lastName, address, city, email];
        let testRegexp = []
        if ( firstName.value != /[\w\D- ']{2, 35}/
        ) {
            for (let i = 0; userInputsList.length; i++) {
                let test = testRegexp[i].test(userInputsList[i]);
                if (test == true) {
                    /* pass */
                }
                else {
                    alert("Veuillez compléter tous les champs au bon format pour finaliser votre commande :-)");
                }
            }
        }
    });

    /* let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');

    setFormAttributes(firstName, "[\\w\\D]{2, 35}", 2, 35, "Entrez uniquement des lettres et '-'.");
    setFormAttributes(lastName, "[\\w\\D]{2, 35}", 2, 35, "Entrez uniquement des lettres et '-'.");
    setFormAttributes(address, "[\\d]{0, 4}[, ]{0, 1}\[\\w\\D]{4, 35}", 5, 35, "Entrez une adresse.\nExemple: 14, rue des Sufragettes");
    setFormAttributes(city, "[\\w\\D]{2, 50}", 2, 50, "Entrez uniquement des lettres, '-' et ' '");
    setFormAttributes(email, "[\\w]{2, 50}[@]{1}{\\w]{2, 20}[.]{1}[com|fr|net|org]{1}", 2, 50, "Entrez une adresse email valide."); */
}

/* *** ACTIONS *** */
(async function() {
    /* POUR CHAQUE PRODUIT DU PANIER... */
    for(let i = 0; i < cart.length; i++){
        /* Infos en local storage: */
        var cartKey = localStorage.key(i);
        var splitKey = cartKey.split(" ");
        productId = splitKey[0];
        productColor = splitKey[1];
        /* Quantité (inpupt): */
        productQuantity = cart.getItem(cartKey);
        /* Màj compteur d'items */
        cartCounter += Number(productQuantity);

        /* Infos serveur: */
        var product = await getProduct(productId);
        totalPrice += Number(productQuantity) * Number(product.price);

        /* Génération contenu page au loading: */
        var pageContent = await hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey);
    }
    console.log(userForm);

})()

        
