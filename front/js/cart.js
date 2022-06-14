/* *** VARIABLES *** */
const cart = localStorage;

var cartCounter = 0;
var totalPrice = 0;

var productId, productColor, productQuantity, productImgUrl;



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

    createorderGrid(cart) {
        var orderGrid = [];
        for(let i = 0; i < cart.length; i++) {
            let cartKey = localStorage.key(i);
            let splitKey = cartKey.split(" ");
            productId = splitKey[0];
            productColor = splitKey[1];
            productQuantity = cart.getItem(cartKey);
            var cartProduct = [productId, productColor, productQuantity];
            orderGrid[i] = cartProduct;
        }
        return orderGrid;
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

/* FORMULAIRE */

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
        console.log("Envoi du formulaire...")
        Contact = new Contact(firstName, lastName, address, city, email);
        orderGrid = Contact.createorderGrid(cart); 
        console.log(orderGrid);
        let totalPriceOrder = await getFinalTotal(orderGrid);
        console.log(totalPriceOrder);
        let finalOrder = {
            "products": orderGrid, 
            "total": totalPriceOrder
        };
        console.log(finalOrder);
        // postOrder(finalOrder);
    }

}

/* Calcul du total final pour envoi */
async function getFinalTotal (orderGrid) {
    let totalPriceOrder = 0;
    for (let i = 0; i < orderGrid.length; i++) {
        productId = orderGrid[i][0];
        let product = await getProduct(productId);
        totalPriceOrder += Number(orderGrid[i][2]) * Number(product.price);
    }
    return totalPriceOrder;
}

/* Envoi commande */
async function postOrder(data) {
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
    })
    .catch(err => console.log(err));
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
        cart[cartKey] = productQuantity;
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

        


