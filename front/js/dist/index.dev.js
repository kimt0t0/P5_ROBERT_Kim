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
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, productLink, productArticle, productImg, productName, productDescription;

  return regeneratorRuntime.async(function displayProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 3;

          for (_iterator = products[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            product = _step.value;
            productLink = document.createElement("a");
            productLink.href = './product.html?id=' + product._id;
            productArticle = document.createElement("article");
            productImg = document.createElement("img");
            productImg.setAttribute("src", product.imageUrl);
            productImg.setAttribute("alt", product.altTxt);
            productName = document.createElement("h3");
            productName.setAttribute("id", "productName");
            productName.textContent = product.name;
            productDescription = document.createElement("p");
            productDescription.setAttribute("id", "productDescription");
            productDescription.textContent = product.description;
            document.getElementById("items").appendChild(productLink).appendChild(productArticle);
            productArticle.appendChild(productImg);
            productArticle.appendChild(productName);
            productArticle.appendChild(productDescription);
          }

          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](3);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 11:
          _context2.prev = 11;
          _context2.prev = 12;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 14:
          _context2.prev = 14;

          if (!_didIteratorError) {
            _context2.next = 17;
            break;
          }

          throw _iteratorError;

        case 17:
          return _context2.finish(14);

        case 18:
          return _context2.finish(11);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 7, 11, 19], [12,, 14, 18]]);
}
//# sourceMappingURL=index.dev.js.map
