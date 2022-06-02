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

/* Variables */
var cart = localStorage;

/* FONCTIONS */
function getProductId(product) {
    return product._id;
}

function getProductColor() {
    var select = document.getElementById("colors"),
        index = select.selectedIndex;
    var productColor = select.options[ index ].value;
    return productColor;
}

function getProductQuantity() {
    var productQuantity = document.getElementById("quantity").value;
    return productQuantity;
}

function cartKey (id, color) {
    return id + " " + color;
}

function addToCart (cartKey, quantity) {
    if (cart[cartKey]) {
        cart[cartKey] += quantity;
        console.log(cart);
    } 
    else {
        cart[cartKey] = quantity;
        console.log(cart);
    }}

/* Vérif: function checkCart (cart) {
    console.log(cart);
} */

/* ACTIONS */
/* Déclenchement action */
document.getElementById("addToCart").addEventListener("click", async function(e) {
    /* récupérer l'id du produit et stocker dans var _id*/
    let productId = getProductId(product);

    /* récupérer la couleur et stocker dans var color */
    let productColor = getProductColor();

    /* récupérer la quantité et stocker dans var quantity */
    let productQuantity = getProductQuantity()

    /* création des clés */
    cartKey = cartKey(productId, productColor);
    
    /* ajout au panier */
    addToCart(cartKey, productQuantity);

    /* Vérif: checkCart(); */
    
});

