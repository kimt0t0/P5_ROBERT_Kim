"use strict";

/* *** VARIABLES *** */
var cart = localStorage;
var cartCounter = 0;
var totalPrice = 0;
var productId, productColor, productQuantity, productImgUrl;
/* *** FONCTIONS *** */

/* GÉNÉRAL */

/* Accès aux infos produit sur serveur */

function getProduct(id) {
  return regeneratorRuntime.async(function getProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", fetch("http://localhost:3000/api/products").then(function (httpBodyResponse) {
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
          return _context.stop();
      }
    }
  });
}
/* Attributs du formulaire */


function setFormAttributes(inputName, regexModel, min, max, title) {
  return regeneratorRuntime.async(function setFormAttributes$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          inputName.setAttribute("pattern", regexModel);
          inputName.setAttribute("min-length", min);
          inputName.setAttribute("max-length", max);
          inputName.setAttribute("title", title);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/* *** DOM DYNAMIQUE ***  */


function hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey) {
  var cartItem, cartItemImg, productImg, cartItemContent, cartItemContentDescr, cartItemContentTitle, cartItemContentColor, cartItemContentPrice, cartItemSettings, settingsQuantity, settingsQuantityText, settingsQuantityInput, deleteContainer, deleteText, userForm;
  return regeneratorRuntime.async(function hydrateDom$(_context3) {
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
          /* Attributs et contenu des balises créées */

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
          cartItemContentPrice.textContent = Number(product.price) + " €";
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
          /* Position des balises créées */

          document.getElementById("cart__items").appendChild(cartItem);
          cartItem.appendChild(cartItemImg);
          cartItemImg.appendChild(productImg);
          cartItem.appendChild(cartItemContent);
          cartItemContent.appendChild(cartItemContentDescr);
          cartItemContentDescr.appendChild(cartItemContentTitle);
          cartItemContentDescr.appendChild(cartItemContentColor);
          cartItemContentDescr.appendChild(cartItemContentPrice);
          cartItemContent.appendChild(cartItemSettings);
          cartItemSettings.appendChild(settingsQuantity);
          settingsQuantity.appendChild(settingsQuantityText);
          settingsQuantity.appendChild(settingsQuantityInput);
          cartItemSettings.appendChild(deleteContainer);
          deleteContainer.appendChild(deleteText);
          /* Attributs et contenus de balises existantes */

          document.getElementById("totalQuantity").textContent = cartCounter;
          document.getElementById("totalPrice").textContent = totalPrice;
          /* MODIFICATIONS DU PANIER */

          /* /* Modification quantité: */

          settingsQuantityInput.addEventListener("change", function (e) {
            /* (suppression de la quantité originale du produit dans compteur panier et prix total: ) */
            cartCounter -= Number(productQuantity);
            totalPrice -= Number(productQuantity) * Number(product.price);
            /* (màj nouvelle quantité du produit: ) */

            productQuantity = e.target.value;
            settingsQuantityText.textContent = "Qté : " + productQuantity;
            /* (màj compteur panier et prix total: ) */

            cartCounter += Number(productQuantity);
            totalPrice += Number(productQuantity) * Number(product.price);
            document.getElementById("totalQuantity").textContent = cartCounter;
            document.getElementById("totalPrice").textContent = totalPrice;
            /* (màj local storage: ) */

            console.log("ancienne quantité: " + cart[cartKey]);
            cart[cartKey] = productQuantity;
            console.log("nouvelle quantité: " + cart[cartKey]);
          });
          /* Suppression d'un produit du panier: */

          deleteText.addEventListener("click", function (e) {
            cartCounter -= Number(productQuantity);
            totalPrice -= Number(productQuantity) * Number(product.price);
            var cartKey = productId + " " + productColor;
            cart.removeItem(cartKey);
            e.target.closest("article").remove();
          });
          /* Suivi vérification formulaire */

          userForm = document.getElementById("cart__order__form");
          userForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var firstName = document.getElementById("firstName");
            var regWords = /^[a-zA-Z-\s\']+$/;

            if (firstName.value.trim() == "") {
              // (trim retire espaces au début et fin de l'input)
              var errorFName = document.getElementById("firstNameErrorMsg");
              errorFName.textContent = "Veuillez compléter ce champ.";
              errorFName.style.color = "red";
              e.preventDefault();
            } else if (regWords.test(firstName.value) == false) {
              var _errorFName = document.getElementById("firstNameErrorMsg");

              _errorFName.textContent = "Le nom doit comporter des lettres, tirets et apostrophes uniquement.";
              _errorFName.style.color = "red";
              e.preventDefault();
            } else {
              console.log("commande ok");
            }
          });

        case 57:
        case "end":
          return _context3.stop();
      }
    }
  });
}
/* *** ACTIONS *** */


(function _callee() {
  var i, cartKey, splitKey, product, pageContent;
  return regeneratorRuntime.async(function _callee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < cart.length)) {
            _context4.next = 18;
            break;
          }

          /* Infos en local storage: */
          cartKey = localStorage.key(i);
          splitKey = cartKey.split(" ");
          productId = splitKey[0];
          productColor = splitKey[1];
          /* Quantité (inpupt): */

          productQuantity = cart.getItem(cartKey);
          /* Màj compteur d'items */

          cartCounter += Number(productQuantity);
          /* Infos serveur: */

          _context4.next = 10;
          return regeneratorRuntime.awrap(getProduct(productId));

        case 10:
          product = _context4.sent;
          totalPrice += Number(productQuantity) * Number(product.price);
          /* Génération contenu page au loading: */

          _context4.next = 14;
          return regeneratorRuntime.awrap(hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey));

        case 14:
          pageContent = _context4.sent;

        case 15:
          i++;
          _context4.next = 1;
          break;

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  });
})();
//# sourceMappingURL=cart.dev.js.map
