/* *** VARIABLES *** */
var cart = localStorage;

var cartCounter = 0;
var totalPrice = 0;

var productId, productColor, productQuantity, productImgUrl;


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


/* *** DOM DYNAMIQUE ***  */
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
    let settingsQuantityInput = document.createElement("input");

    let deleteContainer = document.createElement("div");
    let deleteText = document.createElement("p");


    /* Position des balises créées */
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
        document.getElementById("totalQuantity").textContent = cartCounter;
        document.getElementById("totalPrice").textContent = totalPrice;
        e.target.closest("article").remove();
    });

    /* Suivi vérification formulaire */
    let userForm = document.getElementById("cart__order__form");
    userForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let firstName = document.getElementById("firstName");
        let regWords = /^[a-zA-Z-\s\']+$/;
        if (firstName.value.trim() == "") { // (trim retire espaces au début et fin de l'input)
            let errorFName = document.getElementById("firstNameErrorMsg");
            errorFName.textContent = "Veuillez compléter ce champ.";
            errorFName.style.color = "red";
            e.preventDefault();
        } else if (regWords.test(firstName.value) == false) {
            let errorFName = document.getElementById("firstNameErrorMsg");
            errorFName.textContent = "Le nom doit comporter des lettres, tirets et apostrophes uniquement.";
            errorFName.style.color = "red";
            e.preventDefault();
        }
        else {
            console.log("commande ok");
        }
    });

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

})()

        
