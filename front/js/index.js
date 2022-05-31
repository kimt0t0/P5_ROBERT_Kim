(async function() {
    const products = await getProducts();
    displayProducts(products);
})()

function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then(function(httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function(products) {
        return products;
    })
    .catch(function(error) {
        alert(error);
    });
}

function displayProducts(products) {
    for (product of products) {
        const productLink = document.createElement("a");
        productLink.setAttribute("href", "#");

        const productArticle = document.createElement("article");
        
        const productImg = document.createElement("img");
        productImg.setAttribute("src", product.imageUrl);
        productImg.setAttribute("alt", product.altTxt);
        
        const productName = document.createElement("h3");
        productName.setAttribute("id", "productName");
        productName.textContent = product.name;
        
        const productDescription = document.createElement("p");
        productDescription.setAttribute("id","productDescription");
        productDescription.textContent = product.description;

        document.getElementById("items").appendChild(productLink).appendChild(productArticle);
        productArticle.appendChild(productImg);
        productArticle.appendChild(productName);
        productArticle.appendChild(productDescription);
        
    }
}