(async function() {
    const productId = await getProductId();
    const product = await getProduct();
    hydrateProduct(product);
})()

function getProductId () {
    return new URL(location.href).searchParams.get("id");
}

function getProduct() {
    return fetch("http://localhost:3000/api/products")
      .then(function(httpBodyResponse) {
        return httpBodyResponse.json();
      })
      .then(function(products) {
          return products;
      })
      .then(function(products, productId) {
          for (product of products) {
              if (product.id == productId) {return product;}
              else {
                  return alert( 'Aucun produit ne corresponed à la recherche ou le produit recherché n\'existe plus.');}
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