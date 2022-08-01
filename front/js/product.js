/* ***** AFFICHAGE PRODUIT ***** */

/* *** VARIABLES *** */
var cart = localStorage;
var productId, productColor;
var product;
var productId;



/* *** FONCTIONS *** */

/* RÉCUPÉRATION PRODUIT */
async function getProduct() {
    productId =  new URL(location.href).searchParams.get("id");
    return fetch("http://localhost:3000/api/products/" + productId)
      .then(function(httpBodyResponse) {
        return httpBodyResponse.json();
      })
      /* récupération de l'ensemble des produits: */
      .then(function(product) {
        return product;
      })
      .catch(function(error) {
          alert(error);
      });
}

/* GÉNÉRATION CONTENU PAGE */
async function hydrateProduct(product) {
    /* Image */
    let productImgContainer = document.getElementById("item__img");
    let productImg = document.createElement("img");

    productImgContainer.appendChild(productImg);

    productImg.setAttribute("src", product.imageUrl);
    productImg.setAttribute("alt", product.altTxt);

    /* Titre */
    document.getElementById("title").textContent = product.name;
    /* Prix */
    document.getElementById("price").textContent = product.price;
    /* Description */
    document.getElementById("description").textContent = product.description;

    /*Couleurs */
    var scrollColors = document.getElementById("colors");
    for (color of product.colors) {
        var newColor = document.createElement("option");
        newColor.setAttribute("value", color);
        newColor.textContent = color;
        scrollColors.append(newColor);
    }
}

/* GESTION PANIER */
async function getProductId(product) {
    return product._id;
}

async function getProductColor() {
    let select = document.getElementById("colors"),
        index = select.selectedIndex;
    return select.options[ index ].value;
}

async function getProductQuantity() {
    return  Number(document.getElementById("quantity").value);
}

async function generateCartKey (id, color) {
    return id + " " + color;
}

async function addToCart (cartKey, quantity) {
    if (cart[cartKey]) {
        cart[cartKey] = Number(cart[cartKey]) + Number(quantity);
    } 
    else {
        cart[cartKey] = Number(quantity);
    }
}

/* *** ACTIONS *** */
/* AFFICHAGE */
(async function() {
    product = await getProduct();
    const display = await hydrateProduct(product);
})()


/* PANIER */
document.getElementById("addToCart").addEventListener("click", async function(e) {
    /* récupérer l'id du produit et stocker dans var _id*/
    let productId = await getProductId(product);

    /* récupérer la couleur et stocker dans var color */
    let productColor = await getProductColor();

    /* récupérer la quantité et stocker dans var quantity */
    let productQuantity = await getProductQuantity()

    /* création des clés */
    cartKey = await generateCartKey(productId, productColor);
    
    /* ajout au panier */
    if (product.colors.includes(productColor) && Number(productQuantity) > 0) {
        addToCart(cartKey, productQuantity);
        alert("Votre produit a bien été ajouté au panier :-D")
    } 
    else {
        if (productQuantity <= 0) {
            alert("Le kanap n'a pas pu être ajouté au panier: \nla quantité entrée n'est pas valide.");
        }
        else if (!product.colors.includes(productColor)) {
            alert("Toutes nos excuses, le kanap n'a pas pu être ajouté au panier: \nvous avez oublié de choisir une couleur.");
        }
        else {
            alert("Toutes nos excuses, une erreur s'est produite. Si le problème persiste, n'hésitez pas à contacter notre équipe :-)");
        }
    }
});

