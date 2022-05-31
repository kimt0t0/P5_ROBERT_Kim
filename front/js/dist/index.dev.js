"use strict";

(function _callee() {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getProducts());

        case 2:
          products = _context.sent;
          displayProducts(products);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
})();

function getProducts() {
  return fetch("http://localhost:3000/api/products").then(function (httpBodyResponse) {
    return httpBodyResponse.json();
  }).then(function (products) {
    return products;
  })["catch"](function (error) {
    alert(error);
  });
}

function displayProducts(products) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      product = _step.value;
      var productLink = document.createElement("a");
      productLink.setAttribute("href", "#");
      var productArticle = document.createElement("article");
      var productImg = document.createElement("img");
      productImg.setAttribute("src", product.imageUrl);
      productImg.setAttribute("alt", product.altTxt);
      var productName = document.createElement("h3");
      productName.setAttribute("id", "productName");
      productName.textContent = product.name;
      var productDescription = document.createElement("p");
      productDescription.setAttribute("id", "productDescription");
      productDescription.textContent = product.description;
      document.getElementById("items").appendChild(productLink).appendChild(productArticle);
      productArticle.appendChild(productImg);
      productArticle.appendChild(productName);
      productArticle.appendChild(productDescription);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
//# sourceMappingURL=index.dev.js.map
