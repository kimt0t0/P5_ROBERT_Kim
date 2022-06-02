/* CONTENU PARTIE PRODUIT */
(async function() {
    var product = await getProduct();
    hydrateProduct(product);
})()

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

/* GESTION PANIER */

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

let cart = Cart();

class cartProduct {
    constructor(_id, color, quantity) {
        this._id = _id ; /* ou utiliser le nom ? */
        this.color = color;
        this.quantity = quantity;
    }
}

/* Déclenchement de la fonction d'ajout */
document.getElementById("addToCart").addEventListener("click", function(e) {
    /* CRÉER DES FONCTIONS DISTINCTES POUR CE QUI SUIT? : */
    /* récupérer l'id du produit et stocker dans var _id*/

    /* récupérer la couleur et stocker dans var color */

    /* récupérer la quantité et stocker dans var quantity */

    /* créer un objet newProduct */

    /* ajouter le produit / la quantité au panier */
});

