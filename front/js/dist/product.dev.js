"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* *** GÉNÉRAL *** */

/* Récupération données produit */
function getProduct() {
  return regeneratorRuntime.async(function getProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", fetch("http://localhost:3000/api/products").then(function (httpBodyResponse) {
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
          return _context.stop();
      }
    }
  });
}
/* *** AFFICHAGE PARTIE PRODUIT *** */

/* Déclencheur */


(function _callee() {
  var product;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getProduct());

        case 2:
          product = _context2.sent;
          hydrateProduct(product);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
})();
/* Récupération contenu */


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
/* *** GESTION PANIER *** */

/* CLASSES */

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

var cart = new Cart();
/* Classe pour l'objet à ajouter */

var cartProduct = function cartProduct(_id, color, quantity) {
  _classCallCheck(this, cartProduct);

  this._id = _id;
  this.color = color;
  this.quantity = quantity;
};
/* FONCTIONS */


function getProductId(product) {
  console.log(product._id);
  return product._id;
}

function getProductColor() {
  var select = document.getElementById("colors"),
      index = select.selectedIndex;
  var productColor = select.options[index].value;
  console.log(productColor);
  return productColor;
}

function getProductQuantity() {
  var productQuantity = document.getElementById("quantity").value;
  console.log(productQuantity);
  return productQuantity;
}
/* ACTIONS */

/* Déclenchement action */


document.getElementById("addToCart").addEventListener("click", function _callee2(e) {
  var productId, productColor, productQuantity, newCartProduct;
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log("clic enregistré");
          /* récupérer l'id du produit et stocker dans var _id*/

          productId = getProductId(product);
          console.log(productId);
          /* récupérer la couleur et stocker dans var color */

          productColor = getProductColor();
          console.log(productColor);
          /* récupérer la quantité et stocker dans var quantity */

          productQuantity = getProductQuantity();
          console.log(productQuantity);
          /* créer un objet newProduct */

          newCartProduct = cartProduct(productId, productColor, productQuantity);
          console.log(newCartProduct);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
});
//# sourceMappingURL=product.dev.js.map
