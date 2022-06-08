"use strict";

/* ***** AFFICHAGE PRODUIT ***** */

/* *** VARIABLES *** */
var cart = localStorage;
var productId, productColor;
var product;
var productId;
/* *** FONCTIONS *** */

/* RÉCUPÉRATION PRODUIT */

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
            productId = new URL(location.href).searchParams.get("id");
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
/* GÉNÉRATION CONTENU PAGE */


function hydrateProduct(product) {
  var productImgContainer, productImg, scrollColors, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, newColor;

  return regeneratorRuntime.async(function hydrateProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          /* Image */
          productImgContainer = document.getElementById("item__img");
          productImg = document.createElement("img");
          productImgContainer.appendChild(productImg);
          productImg.setAttribute("src", product.imageUrl);
          productImg.setAttribute("alt", product.altTxt);
          /* Titre */

          document.getElementById("title").textContent = product.name;
          /* Prix */

          document.getElementById("price").textContent = product.price;
          /* Description */

          document.getElementById("description").textContent = product.description;
          /*Couleurs */

          scrollColors = document.getElementById("colors");
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 12;

          for (_iterator2 = product.colors[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            color = _step2.value;
            newColor = document.createElement("option");
            newColor.setAttribute("value", color);
            newColor.textContent = color;
            scrollColors.append(newColor);
          }

          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](12);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t0;

        case 20:
          _context2.prev = 20;
          _context2.prev = 21;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 23:
          _context2.prev = 23;

          if (!_didIteratorError2) {
            _context2.next = 26;
            break;
          }

          throw _iteratorError2;

        case 26:
          return _context2.finish(23);

        case 27:
          return _context2.finish(20);

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[12, 16, 20, 28], [21,, 23, 27]]);
}
/* GESTION PANIER */


function getProductId(product) {
  return regeneratorRuntime.async(function getProductId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", product._id);

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getProductColor() {
  var select, index;
  return regeneratorRuntime.async(function getProductColor$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          select = document.getElementById("colors"), index = select.selectedIndex;
          return _context4.abrupt("return", select.options[index].value);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function getProductQuantity() {
  return regeneratorRuntime.async(function getProductQuantity$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", Number(document.getElementById("quantity").value));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function generateCartKey(id, color) {
  return regeneratorRuntime.async(function generateCartKey$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", id + " " + color);

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function addToCart(cartKey, quantity) {
  return regeneratorRuntime.async(function addToCart$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (cart[cartKey]) {
            cart[cartKey] += Number(quantity);
          } else {
            cart[cartKey] = Number(quantity);
          }

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
}
/* *** ACTIONS *** */

/* AFFICHAGE */


(function _callee() {
  var display;
  return regeneratorRuntime.async(function _callee$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(getProduct());

        case 2:
          product = _context8.sent;
          _context8.next = 5;
          return regeneratorRuntime.awrap(hydrateProduct(product));

        case 5:
          display = _context8.sent;

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
})();
/* PANIER */


document.getElementById("addToCart").addEventListener("click", function _callee2(e) {
  var productId, productColor, productQuantity;
  return regeneratorRuntime.async(function _callee2$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(getProductId(product));

        case 2:
          productId = _context9.sent;
          _context9.next = 5;
          return regeneratorRuntime.awrap(getProductColor());

        case 5:
          productColor = _context9.sent;
          _context9.next = 8;
          return regeneratorRuntime.awrap(getProductQuantity());

        case 8:
          productQuantity = _context9.sent;
          _context9.next = 11;
          return regeneratorRuntime.awrap(generateCartKey(productId, productColor));

        case 11:
          cartKey = _context9.sent;

          /* ajout au panier */
          if (product.colors.includes(productColor) && productQuantity > 0) {
            addToCart(cartKey, productQuantity);
          } else {
            alert("Toutes nos excuses, le kanap n'a pas pu être ajouté au panier! \nVous avez probablement oublié de préciser une couleur ou une quantité :-)\n\nN'hésitez pas à contacter notre équipe en cas de problème.");
          }

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  });
});
//# sourceMappingURL=product.dev.js.map
