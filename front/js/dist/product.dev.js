"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* CONTENU PARTIE PRODUIT */
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
  return regeneratorRuntime.async(function getProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", fetch("http://localhost:3000/api/products").then(function (httpBodyResponse) {
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
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function hydrateProduct(product) {
  var productImgContainer, productImg, scrollColors, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, newColor;

  return regeneratorRuntime.async(function hydrateProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          /* Affichage image */
          productImgContainer = document.getElementById("item__img");
          productImg = document.createElement("img");
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

          scrollColors = document.getElementById("colors");
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 12;

          for (_iterator2 = product.colors[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            color = _step2.value;
            newColor = document.createElement("option");
            newColor.setAttribute("value", color);
            newColor.textContent = color;
            scrollColors.append(newColor);
          }

          _context3.next = 20;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](12);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t0;

        case 20:
          _context3.prev = 20;
          _context3.prev = 21;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 23:
          _context3.prev = 23;

          if (!_didIteratorError2) {
            _context3.next = 26;
            break;
          }

          throw _iteratorError2;

        case 26:
          return _context3.finish(23);

        case 27:
          return _context3.finish(20);

        case 28:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[12, 16, 20, 28], [21,, 23, 27]]);
}
/* GESTION PANIER */

/* Classe pour l'objet panier */


var Cart = function Cart() {
  _classCallCheck(this, Cart);

  this.inventory = localStorage;
  this.itemsCounter = 0;
  this.itemsList = {};
  this.totalPrice = 0;
}
/* fonction pour vérifier si un objet est déjà présent dans le panier */

/* fonction pour créer un nouvel objet dans le panier */

/* fonction pour ajouter une quantité à un objet existant dans le panier */
;

var cart = Cart();

var cartProduct = function cartProduct(_id, color, quantity) {
  _classCallCheck(this, cartProduct);

  this._id = _id;
  /* ou utiliser le nom ? */

  this.color = color;
  this.quantity = quantity;
};
/* Déclenchement de la fonction d'ajout */


document.getElementById("addToCart").addEventListener("click", function (e) {
  /* CRÉER DES FONCTIONS DISTINCTES POUR CE QUI SUIT? : */

  /* récupérer l'id du produit et stocker dans var _id*/

  /* récupérer la couleur et stocker dans var color */

  /* récupérer la quantité et stocker dans var quantity */

  /* créer un objet newProduct */

  /* ajouter le produit / la quantité au panier */
});
//# sourceMappingURL=product.dev.js.map
