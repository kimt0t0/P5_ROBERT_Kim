"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* *** VARIABLES *** */
var cart = localStorage;
var cartCounter = 0;
var totalPrice = 0;
var productId, productColor, productQuantity, productImgUrl;
/* *** CLASSES *** */

var Contact =
/*#__PURE__*/
function () {
  function Contact(firstName, lastName, address, city, email) {
    _classCallCheck(this, Contact);

    this.firstName = firstName.value;
    this.lastName = lastName.value;
    this.address = address.value;
    this.city = city.value;
    this.email = email.value;
  }

  _createClass(Contact, [{
    key: "getFirstName",
    value: function getFirstName() {
      return this.firstName;
    }
  }, {
    key: "getLastName",
    value: function getLastName() {
      return this.lastName;
    }
  }, {
    key: "getAddress",
    value: function getAddress() {
      return this.address;
    }
  }, {
    key: "getCity",
    value: function getCity() {
      return this.city;
    }
  }, {
    key: "getEmail",
    value: function getEmail() {
      return this.email;
    }
  }]);

  return Contact;
}();
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
/* FORMULAIRE */

/* Création tableau commande */


function createorderGrid(cart) {
  var orderGrid, i, cartKey, splitKey;
  return regeneratorRuntime.async(function createorderGrid$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          orderGrid = [];

          for (i = 0; i < cart.length; i++) {
            cartKey = localStorage.key(i);
            splitKey = cartKey.split(" ");
            productId = splitKey[0];

            if (orderGrid.includes(productId)) {} else {
              orderGrid[i] = productId;
            }
          }

          return _context3.abrupt("return", orderGrid);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}
/* Vérification et création objet contact + tableau produits */


function checkForm(e) {
  var firstName, lastName, address, city, email, regNames, regAddress, regEmail, inputsToTest, regexToTest, error, i, orderGrid, data, order;
  return regeneratorRuntime.async(function checkForm$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // Éléments d'input à check:
          firstName = document.getElementById("firstName");
          lastName = document.getElementById("lastName");
          address = document.getElementById("address");
          city = document.getElementById("city");
          email = document.getElementById("email"); // Regexs pour check:

          regNames = /^[a-zA-Z\s'-]+$/;
          regAddress = /^[a-zA-Z0-9\s,'-]*$/; //problème: valide les entrées contenant uniquement des chiffres...

          regEmail = /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+([A-Za-z0-9]{2,4})$/;
          inputsToTest = [firstName, lastName, address, city, email];
          regexToTest = [regNames, regNames, regAddress, regNames, regEmail]; //Indicateur mauvais remplissage:        

          error = false; // Pour chaque élément de la liste d'input...:

          for (i = 0; i < inputsToTest.length; i++) {
            // Test:
            test = regexToTest[i].test(inputsToTest[i].value); // Si test faux ne pas envoyer et message d'erreur:

            if (test == false) {
              errMessage = document.getElementById(inputsToTest[i].name + "ErrorMsg");
              errMessage.textContent = "Ce champ est vide ou n'a pas été complété correctement.";
              error = true;
            }
          }

          if (!(error == true)) {
            _context4.next = 17;
            break;
          }

          e.preventDefault();
          return _context4.abrupt("return", alert("Votre commande n'a pas pu être finalisée.\nVeuillez vérifier que vous avez complété correctement le formulaire.\n\nEn cas de problème, n'hésitez pas à contacter notre support"));

        case 17:
          e.preventDefault();
          console.log("Envoi du formulaire...");
          Contact = new Contact(firstName, lastName, address, city, email);
          _context4.next = 22;
          return regeneratorRuntime.awrap(createorderGrid(cart));

        case 22:
          orderGrid = _context4.sent;
          data = [Contact, orderGrid];
          _context4.next = 26;
          return regeneratorRuntime.awrap(postOrder(data));

        case 26:
          order = _context4.sent;
          console.log(order);

        case 28:
        case "end":
          return _context4.stop();
      }
    }
  });
}
/* Envoi commande */


function postOrder(data) {
  return regeneratorRuntime.async(function postOrder$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(data)
          }).then(function (response) {
            return response.json();
          }).then(function (json) {
            return console.log("Succès: ", json);
          })["catch"](function (err) {
            return console.log("Erreur: ", err);
          });

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}
/* *** DOM DYNAMIQUE ***  */


function hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey) {
  var cartItem, cartItemImg, productImg, cartItemContent, cartItemContentDescr, cartItemContentTitle, cartItemContentColor, cartItemContentPrice, cartItemSettings, settingsQuantity, settingsQuantityText, settingsQuantityInput, deleteContainer, deleteText;
  return regeneratorRuntime.async(function hydrateDom$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          /* ÉLÉMENTS A GÉNÉRER ET PLACER POUR AFFICHAGE */

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

            cart[cartKey] = productQuantity;
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

        case 55:
        case "end":
          return _context6.stop();
      }
    }
  });
}
/* *** ACTIONS *** */


(function _callee() {
  var i, cartKey, splitKey, product, pageContent, userForm;
  return regeneratorRuntime.async(function _callee$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < cart.length)) {
            _context7.next = 18;
            break;
          }

          /* Infos en local storage: */
          cartKey = localStorage.key(i);
          splitKey = cartKey.split(" ");
          productId = splitKey[0];
          productColor = splitKey[1];
          /* Quantité (input): */

          productQuantity = cart.getItem(cartKey);
          /* Màj compteur d'items */

          cartCounter += Number(productQuantity);
          /* Infos serveur: */

          _context7.next = 10;
          return regeneratorRuntime.awrap(getProduct(productId));

        case 10:
          product = _context7.sent;
          totalPrice += Number(productQuantity) * Number(product.price);
          /* Génération contenu page au loading: */

          _context7.next = 14;
          return regeneratorRuntime.awrap(hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey));

        case 14:
          pageContent = _context7.sent;

        case 15:
          i++;
          _context7.next = 1;
          break;

        case 18:
          /* REMPLISSAGE ET VÉRFICATIONS FORMULAIRE */

          /* Accès au formulaire */
          userForm = document.getElementById("cart__order__form");
          userForm.addEventListener("submit", function (e) {
            checkForm(e);
          });

        case 20:
        case "end":
          return _context7.stop();
      }
    }
  });
})();
//# sourceMappingURL=cart.dev.js.map
