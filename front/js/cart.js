/* *** VARIABLES *** */
var cart = localStorage;
var cartCounter = 0;
var totalPrice = 0;
var split, productId, productColor, productQuantity, productPrice, productImgUrl, total;
var settingsQuantityInput, deleteText;


/* *** FONCTIONS *** */

/* GÉNÉRAL */
/* Récupération id et couleur du produit */
async function splitCartProduct(cartProduct) {
    split = cartProduct.split(" ");
    console.log(split);
    return split;
}

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

/* DOM DYNAMIQUE */
async function hydrateDom(product) {
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
    cartItemContentPrice.textContent = product.price + " €";

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

    /* Modification quantité produit */
    settingsQuantityInput.addEventListener("input", function(e) {
        /* suppression de la quantité originale du produit dans compteur panier et prix total: */
        cartCounter -= productQuantity;
        totalPrice -= productQuantity * product.price;
        /* màj nouvelle quantité du produit: */
        productQuantity = e.target.value;
        settingsQuantityText.textContent = "Qté : " + productQuantity;
        /* màj compteur panier et prix total: */
        cartCounter += Number(productQuantity);
        totalPrice += productQuantity * product.price;
        document.getElementById("totalQuantity").textContent = cartCounter;
        document.getElementById("totalPrice").textContent = totalPrice;
    });
    /* penser à modifier le cartCounter et le totalPrice */
    

    /* Suppression d'un produit du panier */
    deleteText.addEventListener("click", function(e) {
        totalPrice -= productQuantity * product.price;
        cartCounter -= productQuantity;
        
    })


}


/* *** ACTIONS *** */
(async function() {
    /* Pour chaque élément du panier... */
    for(let i = 0; i < cart.length; i++){
        /* Obtention infos localStorage */
        var cartKey = localStorage.key(i);
        var splitKey = cartKey.split(" ");
        productId = splitKey[0];
        productColor = splitKey[1];
        productQuantity = Number(cart.getItem(cartKey));
        cartCounter += productQuantity;

        /* Obtention infos serveur */
        var product = await getProduct(productId);
        totalPrice += productQuantity * product.price;

        /* Génération contenu page */
        var pageContent = await hydrateDom(product);
    }
    /* Écoute des événements et update ligne */
    settingsQuantityInput.addEventListener("input", function(e) {
        cart[cartKey] = productQuantity;
        console.log(cart);
    })

    deleteText.addEventListener("click", function(e){
        cart.removeItem(cartKey);
        document.getElementById(productId).remove();
    })
})()