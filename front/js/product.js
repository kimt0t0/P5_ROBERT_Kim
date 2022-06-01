(async function() {
    const product = await getProduct();
    hydrateProduct(product);
})()

function getProduct() {
    return fetch("http://localhost:3000/api/products")
      .then(function(httpBodyResponse) {
        return httpBodyResponse.json();
      })
      /* récupération de l'ensemble des produits: */
      .then(function(products) {
          return products;
      })
      .then(function(products) {
        /* récupération id dans l'url: */
        const productId =  new URL(location.href).searchParams.get("id");
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

function hydrateProduct(product) {
    /* Affichage image */
    const productImgContainer = document.getElementById("item__img");
    const productImg = document.createElement("img");
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
    const scrollColors = document.getElementById("colors");
    for (color of product.colors) {
        const newColor = document.createElement("option");
        newColor.setAttribute("value", color);
        newColor.textContent = color;
        scrollColors.append(newColor);
    }
}