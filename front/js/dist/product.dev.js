"use strict";

(function _callee() {
  var productId, product;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getProductId());

        case 2:
          productId = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(getProduct());

        case 5:
          product = _context.sent;
          hydrateProduct(product);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
})();

function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

function getProduct() {
  return fetch("http://localhost:3000/api/products").then(function (httpBodyResponse) {
    return httpBodyResponse.json();
  }).then(function (products) {
    return products;
  }).then(function (products, productId) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        product = _step.value;

        if (product.id == productId) {
          return product;
        } else {
          return alert('Aucun produit ne corresponed à la recherche ou le produit recherché n\'existe plus.');
        }
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
  })["catch"](function (error) {
    alert(error);
  });
}

function hydrateProduct(product) {
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
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = product.colors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      color = _step2.value;
      var newColor = document.createElement("option");
      newColor.setAttribute("value", color);
      newColor.textContent = color;
      scrollColors.append(newColor);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}
//# sourceMappingURL=product.dev.js.map
