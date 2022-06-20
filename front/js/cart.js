/* *** VARIABLES *** */
const cart = localStorage;

var cartCounter = 0;
var totalPrice = 0;

var productId, productColor, productQuantity;




/* *** CLASSES *** */

class Contact {
    constructor (firstName, lastName, address, city, email) {
        this.firstName = firstName.value;
        this.lastName = lastName.value;
        this.address = address.value;
        this.city = city.value;
        this.email = email.value;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getAddress() {
        return this.address;
    }

    getCity() {
        return this.city;
    }

    getEmail() {
        return this.email;
    }
}



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

/* Màj compteur d'articles */
function updateCartCounter(cart) {
    cartCounter = 0;
    for (let i = 0; i < cart.length; i++) {
        let key = localStorage.key(i);
        cartCounter += Number(cart[key]);
    }
    return cartCounter
}

/* FORMULAIRE */

/* Création tableau commande */
async function createProducts(cart) {
    let products = [];
    for(let i = 0; i < cart.length; i++) {
        let cartKey = localStorage.key(i);
        let splitKey = cartKey.split(" ");
        productId = splitKey[0];
        if (products.includes(productId)) {
        }
        else {
            products[i] = productId;
        }
    }
    return products;
}

/* Vérification et création objet contact + tableau produits */
async function checkForm(e) {

    // Éléments d'input à check:
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");

    // Regexs pour check:
    const regNames = /^[a-zA-Z\s'-]+$/;
    const regAddress = /^[a-zA-Z0-9\s,'-]*$/; //problème: valide les entrées contenant uniquement des chiffres...
    const regEmail = /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+([A-Za-z0-9]{2,4})$/;

    let inputsToTest = [firstName, lastName, address, city, email];
    let regexToTest = [regNames, regNames, regAddress, regNames, regEmail];

    //Indicateur mauvais remplissage:        
    let error = false;
    
    // Pour chaque élément de la liste d'input...:
    for (let i = 0; i < inputsToTest.length; i++) {
        // Test:
        test = regexToTest[i].test(inputsToTest[i].value);
        // Si test faux ne pas envoyer et message d'erreur:
        if (test == false) {
            errMessage = document.getElementById(inputsToTest[i].name + "ErrorMsg");
            errMessage.textContent = "Ce champ est vide ou n'a pas été complété correctement.";
            error = true;
        }
    }
    
    if (error == true) {
        e.preventDefault();
        return alert("Votre commande n'a pas pu être finalisée.\nVeuillez vérifier que vous avez complété correctement le formulaire.\n\nEn cas de problème, n'hésitez pas à contacter notre support");
    }
    else {
        e.preventDefault();
        contact = new Contact(firstName, lastName, address, city, email);
        const products = await createProducts(cart);
        orderData = {
            contact,
            products
        };
        let order = await postOrder(orderData);
        console.log(order);
    }

}

/* Envoi commande */
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
        return window.location = "confirmation.html?orderId=" + json.orderId;
    })
    .catch(function(err) {
        return console.log("Erreur: ", err);
    })
}


/* *** DOM DYNAMIQUE ***  */
async function hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey) {
    /* ÉLÉMENTS A GÉNÉRER ET PLACER POUR AFFICHAGE */
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
        productQuantity = Number(e.target.value);
        totalPrice += productQuantity * Number(product.price);
        //Màj quantité dans le localStorage
        cart[cartKey] = productQuantity;
        //Màj compteur via comptage localStorage
        cartCounter = updateCartCounter(cart);
        //Màj affichage
        document.getElementById("totalQuantity").textContent = cartCounter;
        document.getElementById("totalPrice").textContent = totalPrice;

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
        /* Quantité (input): */
        productQuantity = cart.getItem(cartKey);
        /* Màj compteur d'items */
        cartCounter += Number(productQuantity);

        /* Infos serveur: */
        var product = await getProduct(productId);
        totalPrice += Number(productQuantity) * Number(product.price);

        /* Génération contenu page au loading: */
        var pageContent = await hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey);
    }
    
    /* REMPLISSAGE ET VÉRFICATIONS FORMULAIRE */
    /* Accès au formulaire */
    var userForm = document.getElementById("cart__order__form");
    userForm.addEventListener("submit", function (e) {
        checkForm(e);
    });

})()

        


