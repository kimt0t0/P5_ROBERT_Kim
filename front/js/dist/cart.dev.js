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
  var cartItem, cartItemImg, productImg, cartItemContent, cartItemContentDescr, cartItemContentTitle, cartItemContentColor, cartItemContentPrice, cartItemSettings, settingsQuantity, settingsQuantityText, settingsQuantityInput, deleteContainer, deleteText, userForm, testFormInput;
  return regeneratorRuntime.async(function hydrateDom$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          testFormInput = function _ref(reg, formInput) {
            return regeneratorRuntime.async(function testFormInput$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", reg.test(formInput));

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          };

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
            document.getElementById("totalQuantity").textContent = cartCounter;
            document.getElementById("totalPrice").textContent = totalPrice;
            e.target.closest("article").remove();
          });
          /* Suivi vérification formulaire */

          userForm = document.getElementById("cart__order__form");
          userForm.addEventListener("submit", function (e) {
            var firstName = document.getElementById("firstName");
            var lastName = document.getElementById("lastName");
            var address = document.getElementById("address");
            var city = document.getElementById("city");
            var email = document.getElementById("email");
            var regNames = /^[a-zA-Z-\s\']+$/;
            var regAddress = /^[0-9]{1, 4}[,\s]{0, 1}^[a-zA-Z-\s\']+$/;
            var regEmail = /^[\w]+$[@]+^[\w]+$[.]+^[a-z]{2, 4}/;
            var userInputs = new Array(firstName, lastName, address, city, email);

            for (var _i = 0, _userInputs = userInputs; _i < _userInputs.length; _i++) {
              userInput = _userInputs[_i];
              console.log("entrée utilisateur visée: " + userInput);
              var errorInput = document.getElementById(userInput.id + "ErrorMsg");
              var test = void 0;

              if (userInput.value.trim() == "") {
                // (trim retire les espaces au début et fin de l'input)
                errorInput.textContent = "Veuillez compléter ce champ.";
                errorInput.style.color = "red";
                e.preventDefault();
              } else {
                switch (userInput) {
                  case firstName || lastName || city:
                    test = regNames.test(userInput);

                    if (test == false) {
                      e.preventDefault();
                      errorInput.textContent = "Veuillez compléter ce champ avec des lettres, espaces, tirets et apostrophes.";
                      break;
                    } else {
                      /*envoi formulaire */
                    }

                  case address:
                    test = regAddress.test(userInput);

                    if (test == false) {
                      e.preventDefault();
                      errorInput.textContent = "Veuillez compléter ce champ avec éventuellement un numéro suivi d'une virgule et d'un espace, puis des lettres, espaces, tirets et apostrophes.";
                      break;
                    } else {
                      /*envoi formulaire */
                    }

                  case email:
                    test = regEmail.test(userInput);

                    if (test == false) {
                      e.preventDefault();
                      errorInput.textContent = "Veuillez compléter ce champ avec une adresse email à un format valide (ex: adresse@nomdedomaine.org).";
                      break;
                    } else {
                      /*envoi formulaire */
                    }

                  default:
                    e.preventDefault();
                    errorInput.textContent = "Une erreur s'est produite. Veuillez réessayer plus tard.\nSi le problème persiste, n'hésitez pas à contacter notre support.";

                  /* ajouter une partie qui envoie le formulaire si aucun champ n'est erroné ou se fait dans la partie default justement? */
                }
              }
            }
          });

        case 58:
        case "end":
          return _context4.stop();
      }
    }
  });
}
/* *** ACTIONS *** */


(function _callee() {
  var i, cartKey, splitKey, product, pageContent;
  return regeneratorRuntime.async(function _callee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < cart.length)) {
            _context5.next = 18;
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

          _context5.next = 10;
          return regeneratorRuntime.awrap(getProduct(productId));

        case 10:
          product = _context5.sent;
          totalPrice += Number(productQuantity) * Number(product.price);
          /* Génération contenu page au loading: */

          _context5.next = 14;
          return regeneratorRuntime.awrap(hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey));

        case 14:
          pageContent = _context5.sent;

        case 15:
          i++;
          _context5.next = 1;
          break;

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  });
})();
//# sourceMappingURL=cart.dev.js.map
