"use strict";

/* Gestion du contenu de la partie produit */
(function _callee() {
  var product;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getProduct());

        case 2:
          product = _context.sent;
          hydrateProduct(product);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
})();

function getProduct() {
  return fetch("http://localhost:3000/api/products").then(function (httpBodyResponse) {
    return httpBodyResponse.json();
  })
  /* récupération de l'ensemble des produits: */
  .then(function (products) {
    /* récupération id dans l'url: */
    var productId = new URL(location.href).searchParams.get("id");
    /* recherche du produit correspondant: */

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        product = _step.value;

        if (product._id == productId) {
          return product;
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
/* Gestion du panier */


var panier = localStorage;
console.log(panier);
document.getElementById("addToCart").setEventListener("click", function (e) {
  var quantity = document.getElementById("quantity");
  var color = document.getElementById("colors").setEventListener("select", function (e) {
    return;
  });
  panier.setItem(product._id, [quantity, color]);
  /*problème: ne prend pas en compte le choix de couleur */
});
//# sourceMappingURL=product.dev.js.map
