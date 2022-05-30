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
        const productArticle = document.createElement("article");
        document.getElementById("items").append(productArticle);

        const productName = document.createElement("h3");
        productName.setAttribute("id", "productName");
        productName.textContent = product.name;
        document.getElementById("items").getElementsByTagName("article").append(productName);

        const productDescription = document.createElement("p");
        productDescription.setAttribute("id","productDescription");
        productDescription.textContent = product.description;
        document.getElementById("items").getElementsByTagName("article").append(productDescription);
    }
}