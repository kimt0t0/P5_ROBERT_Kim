"use strict";

/* *** VARIABLES *** */
var cart = localStorage;
var split, productId, productColor, productQuantity, productPrice, productImgUrl, total;
/* *** FONCTIONS *** */

/* GÉNÉRAL */

/* Récupération id et couleur du produit */

function splitCartProduct(cartProduct) {
  return regeneratorRuntime.async(function splitCartProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          split = cartProduct.split(" ");
          console.log(split);
          return _context.abrupt("return", split);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}
/* Accès aux infos produit sur serveur */


function getProduct(id) {
  return regeneratorRuntime.async(function getProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", fetch("http://localhost:3000/api/products").then(function (httpBodyResponse) {
            return httpBodyResponse.json();
          }).then(function (products) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                product = _step.value;

                if (product._id == id) {
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
/* LIGNE PANIER */


function addLineToCart(product) {
  var cartItem, cartItemImg, productImg, cartItemContent, cartItemContentDescr, cartItemContentTitle, cartItemContentColor, cartItemContentPrice, cartItemSettings, settingsQuantity, settingsQuantityText, settingsQuantityInput, deleteContainer, deleteText;
  return regeneratorRuntime.async(function addLineToCart$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          /* Création balises */
          cartItem = document.createElement("article");
          cartItemImg = document.createElement("div");
          productImg = document.createElement("img");
          cartItemContent = document.createElement("div");
          cartItemContentDescr = document.createElement("div");
          cartItemContentTitle = document.createElement("h2");
          cartItemContentColor = document.createElement("p");
          cartItemContentPrice = document.createElement("p");
          cartItemSettings = document.createElement("div");
          settingsQuantity = document.createElement("div");
          settingsQuantityText = document.createElement("p");
          settingsQuantityInput = document.createElement("input");
          deleteContainer = document.createElement("div");
          deleteText = document.createElement("p");
          /* Attributs et contenu des balises */

          cartItem.setAttribute("class", "cart__item");
          cartItem.setAttribute("data-id", productId);
          cartItem.setAttribute("data-color", productColor);
          cartItemImg.setAttribute("class", "cart__item__img");
          productImg.setAttribute("src", product.imageUrl);
          productImg.setAttribute("alt", product.altTxt);
          cartItemContent.setAttribute("class", "cart__item__content");
          cartItemContentDescr.setAttribute("class", "cart__item__content__description");
          cartItemContentTitle.textContent = product.name;
          cartItemContentColor.textContent = productColor;
          cartItemContentPrice.textContent = product.price + " €";
          cartItemSettings.setAttribute("class", "cart__item__content__settings");
          settingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
          settingsQuantityText.textContent = "Qté : " + productQuantity;
          settingsQuantityInput.setAttribute("type", "number");
          settingsQuantityInput.setAttribute("class", "itemQuantity");
          settingsQuantityInput.setAttribute("name", "itemQuantity");
          settingsQuantityInput.setAttribute("min", "1");
          settingsQuantityInput.setAttribute("max", "100");
          settingsQuantityInput.setAttribute("value", productQuantity);
          deleteContainer.setAttribute("class", "cart__item__content__settings__delete");
          deleteText.setAttribute("class", "deleteItem");
          deleteText.textContent = "Supprimer";
          /* Position des balises */

          document.getElementById("cart__items").appendChild(cartItem);
          cartItem.appendChild(cartItemImg);
          cartItemImg.appendChild(productImg);
          document.getElementById("cart__items").appendChild(cartItemContent);
          cartItemContent.appendChild(cartItemContentDescr);
          cartItemContentDescr.appendChild(cartItemContentTitle);
          cartItemContentDescr.appendChild(cartItemContentColor);
          cartItemContentDescr.appendChild(cartItemContentPrice);
          document.getElementById("cart__items").appendChild(cartItemSettings);
          cartItemSettings.appendChild(settingsQuantity);
          settingsQuantity.appendChild(settingsQuantityText);
          settingsQuantity.appendChild(settingsQuantityInput);
          cartItemSettings.appendChild(deleteContainer);
          deleteContainer.appendChild(deleteText);

        case 51:
        case "end":
          return _context3.stop();
      }
    }
  });
}
/* MODIFICATIONS PANIER */


function changeQuantity() {}

function deleteProduct() {}
/* *** ACTIONS *** */


(function _callee() {
  var i, cartKey, splitKey, product, newLine;
  return regeneratorRuntime.async(function _callee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < cart.length)) {
            _context4.next = 16;
            break;
          }

          /* Obtention infos localStorage */
          cartKey = localStorage.key(i);
          splitKey = cartKey.split(" ");
          productId = splitKey[0];
          productColor = splitKey[1];
          productQuantity = Number(cart.getItem(cartKey));
          /* Obtention infos serveur */

          _context4.next = 9;
          return regeneratorRuntime.awrap(getProduct(productId));

        case 9:
          product = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(addLineToCart(product));

        case 12:
          newLine = _context4.sent;

        case 13:
          i++;
          _context4.next = 1;
          break;

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
})();
//# sourceMappingURL=cart.dev.js.map
