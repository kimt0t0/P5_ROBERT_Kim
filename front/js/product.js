/* *** GÉNÉRAL *** */

/* Récupération données produit */
async function getProduct() {
    return fetch("http://localhost:3000/api/products")
      .then(function(httpBodyResponse) {
        return httpBodyResponse.json();
      })
      /* récupération de l'ensemble des produits: */
      .then(function(products) {
        /* récupération id dans l'url: */
        var productId =  new URL(location.href).searchParams.get("id");
          /* recherche du produit correspondant: */
          for (product of products) { 
              if (product._id == productId) {  
                return product;}
          }
      })
      .catch(function(error) {
          alert(error);
      });
}

/* *** AFFICHAGE PARTIE PRODUIT *** */
/* Déclencheur */
(async function() {
    var product = await getProduct();
    hydrateProduct(product);
})()

/* Récupération contenu */
async function hydrateProduct(product) {
    /* Affichage image */
    var productImgContainer = document.getElementById("item__img");
    var productImg = document.createElement("img");
    productImgContainer.appendChild(productImg);
    productImg.setAttribute("src", product.imageUrl);
    productImg.setAttribute("alt", product.altTxt);

    /* Affichage titre */
    document.getElementById("title").textContent = product.name;
    /* Affichage prix */
    document.getElementById("price").textContent = product.price;
    /* Affichage description */
    document.getElementById("description").textContent = product.description;

    /*Menu couleurs */
    var scrollColors = document.getElementById("colors");
    for (color of product.colors) {
        var newColor = document.createElement("option");
        newColor.setAttribute("value", color);
        newColor.textContent = color;
        scrollColors.append(newColor);
    }
}




/* *** GESTION PANIER *** */

/* CLASSES */
/* Classe pour l'objet panier */
class Cart {
    constructor () {
        this.inventory = localStorage;
        this.itemsCounter = 0;
        this.itemsList = {};
        this.totalPrice = 0;
    }

    /* fonction pour vérifier si un objet est déjà présent dans le panier */

    /* fonction pour créer un nouvel objet dans le panier */

    /* fonction pour ajouter une quantité à un objet existant dans le panier */
}

var cart = new Cart();

/* Classe pour l'objet à ajouter */
class cartProduct {
    constructor(_id, color, quantity) {
        this._id = _id;
        this.color = color;
        this.quantity = quantity;
    }
}

/* FONCTIONS */
function getProductId(product) {
    console.log(product._id);
    return product._id;
}

function getProductColor() {
    var select = document.getElementById("colors"),
        index = select.selectedIndex;
    var productColor = select.options[ index ].value;
    console.log(productColor);
    return productColor;
}

function getProductQuantity() {
    var productQuantity = document.getElementById("quantity").value;
    console.log(productQuantity);
    return productQuantity;
}


/* ACTIONS */
/* Déclenchement action */
document.getElementById("addToCart").addEventListener("click", async function(e) {
    console.log("clic enregistré");
    /* récupérer l'id du produit et stocker dans var _id*/
    let productId = getProductId(product);
    console.log(productId);

    /* récupérer la couleur et stocker dans var color */
    let productColor = getProductColor();
    console.log(productColor);

    /* récupérer la quantité et stocker dans var quantity */
    let productQuantity = getProductQuantity()
    console.log(productQuantity);

    /* créer un objet newProduct */
    var newCartProduct = cartProduct(productId, productColor, productQuantity);
    console.log(newCartProduct);
});

