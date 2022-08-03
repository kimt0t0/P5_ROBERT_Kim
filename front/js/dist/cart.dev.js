"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ***** VARIABLES ***** */
var cart = localStorage;
var cartCounter = 0;
var totalPrice = 0;
var productId, productColor, productQuantity;
/* ***** CLASSES ***** */

var Contact = function Contact(firstName, lastName, address, city, email) {
  _classCallCheck(this, Contact);

  this.firstName = firstName.value;
  this.lastName = lastName.value;
  this.address = address.value;
  this.city = city.value;
  this.email = email.value;
};
/* ***** FONCTIONS ***** */

/* *** GÉNÉRAL *** */

/* RÉCUPÉRATION DE CHAQUE PRODUIT SUR SERVEUR */


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
            return alert("Désolé, il y a eu une erreur: ", error);
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}
/* UPDATE COMPTEUR D'ARTICLES */


function updateCartCounter(cart) {
  cartCounter = 0;

  for (var _i = 0; _i < cart.length; _i++) {
    var key = localStorage.key(_i);
    cartCounter += Number(cart[key]);
  }

  return cartCounter;
}
/* VÉRIFICATION FORMULAIRE */


function checkForm() {
  /* Variables utiles */
  // Éléments d'input à check:
  var firstName = document.getElementById("firstName");
  var lastName = document.getElementById("lastName");
  var address = document.getElementById("address");
  var city = document.getElementById("city");
  var email = document.getElementById("email"); // Regexs pour check:

  var regNames = /^[a-zA-Z\s'-]+$/;
  var regAddress = /\d+\,{0,1}\s+\w+\s+\w+/;
  var regEmail = /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+([A-Za-z0-9]{2,4})$/;
  var inputsToTest = [firstName, lastName, address, city, email];
  var regexsToTest = [regNames, regNames, regAddress, regNames, regEmail]; // Boucle de test:

  for (i = 0; i < inputsToTest.length; i++) {
    var inp = inputsToTest[i];
    var reg = regexsToTest[i]; // Valeur du test pour l'input en cours:

    var test = reg.test(inp.value); // Si false sur ce test, message d'erreur sous le champ correspondant:

    if (test == false) {
      var globalTest = false;

      switch (inp.name) {
        case "firstName":
          document.getElementById(inp.name + "ErrorMsg").textContent = "Ce champ peut contenir des lettres majuscules et minuscules, apostrophes et tirets.";
          break;

        case "lastName":
          document.getElementById(inp.name + "ErrorMsg").textContent = "Ce champ peut contenir des lettres majuscules et minuscules, apostrophes et tirets.";
          break;

        case "address":
          document.getElementById(inp.name + "ErrorMsg").textContent = "Ce champ doit commencer par un ou plusieurs chiffres éventuellement suivis d'une virgule, puis obligatoirement des lettres.";
          break;

        case "city":
          document.getElementById(inp.name + "ErrorMsg").textContent = "Ce champ doit contenir des lettres, et éventuellement une apostrophe et/ou un tiret.";
          break;

        case "email":
          document.getElementById(inp.name + "ErrorMsg").textContent = "Ce champ doit contenir une adresse mail valide, par exemple: Kim.robert@kanap.com";
          break;
      }
    }
  }

  return globalTest;
}
/* GÉNÉRATION TABLEAU PRODUITS */


function createTable(cart) {
  var productsTable, _i2, cartKey, splitKey;

  return regeneratorRuntime.async(function createTable$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          productsTable = [];
          _i2 = 0;

        case 2:
          if (!(_i2 < cart.length)) {
            _context2.next = 14;
            break;
          }

          cartKey = localStorage.key(_i2);
          splitKey = cartKey.split(" ");
          productId = splitKey[0];

          if (!productsTable.includes(productId)) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("continue", 11);

        case 10:
          productsTable[_i2] = productId;

        case 11:
          _i2++;
          _context2.next = 2;
          break;

        case 14:
          return _context2.abrupt("return", productsTable);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/* GÉNÉRATION DONNÉES ENVOI */


function createData() {
  var products, orderData;
  return regeneratorRuntime.async(function createData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          contact = new Contact(firstName, lastName, address, city, email);
          _context3.next = 3;
          return regeneratorRuntime.awrap(createTable(cart));

        case 3:
          products = _context3.sent;
          orderData = {
            contact: contact,
            products: products
          };
          return _context3.abrupt("return", orderData);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}
/* ENVOI COMMANDE */


function postOrder(data) {
  return regeneratorRuntime.async(function postOrder$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            redirect: "manual",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(data)
          }).then(function (response) {
            return response.json();
          }).then(function (json) {
            cart.clear();
            return window.location = "confirmation.html?orderId=" + json.orderId;
          })["catch"](function (err) {
            return alert("Oooops! Il y a eu une erreur: ", err);
          });

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}
/* *** DOM DYNAMIQUE ***  */


function hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey) {
  var cartItem, cartItemImg, productImg, cartItemContent, cartItemContentDescr, cartItemContentTitle, cartItemContentColor, cartItemContentPrice, cartItemSettings, settingsQuantity, settingsQuantityText, settingsQuantityInput, deleteContainer, deleteText;
  return regeneratorRuntime.async(function hydrateDom$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          /* AFFICHAGE PRODUITS */

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
          /* Position balises */

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
          /* Attributs et contenu (balises créées avec js) */

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
          /* Attributs et contenus (balises existantes dans le html) */

          document.getElementById("totalQuantity").textContent = cartCounter;
          document.getElementById("totalPrice").textContent = totalPrice;
          /* MODIFICATIONS DYNAMIQUES PANIER */

          /* Modification quantité: */

          settingsQuantityInput.addEventListener("change", function (e) {
            //Comptage items depuis localStorage
            cartCounter = updateCartCounter(cart); //Récupération informations objet visé

            productId = e.target.closest(".cart__item").getAttribute("data-id");
            productColor = e.target.closest(".cart__item").getAttribute("data-color");
            cartKey = productId + " " + productColor; //Quantité objet avant modification de l'input

            var initialQuantity = Number(cart[cartKey]); //Màj prix et quantité

            totalPrice -= initialQuantity * Number(product.price); //Vérification valeur input quantité produit:

            if (Number.isInteger(parseInt(e.target.value)) && e.target.value > 0) {
              productQuantity = e.target.value;
              window.location.reload();
            } else {
              alert("Veuillez entrer une quantité valide (entier positif) pour chaque article ou le supprimer via le bouton adéquat.");
              var orderButton = document.getElementById("order");
              orderButton.setAttribute("disabled", "true");
            }

            totalPrice += productQuantity * Number(product.price); //Màj quantité dans le localStorage

            cart[cartKey] = productQuantity; //Màj compteur via comptage localStorage

            cartCounter = updateCartCounter(cart); //Màj affichage

            document.getElementById("totalQuantity").textContent = cartCounter;
            document.getElementById("totalPrice").textContent = totalPrice;
          });
          /* Suppression d'un produit: */

          deleteText.addEventListener("click", function (e) {
            cartCounter -= Number(productQuantity);
            totalPrice -= Number(productQuantity) * Number(product.price);
            cart.removeItem(cartKey);
            window.location.reload();
          });

        case 55:
        case "end":
          return _context5.stop();
      }
    }
  });
}
/* ***** ACTIONS ***** */


(function _callee2() {
  var _i3, cartKey, splitKey, product, pageContent, userForm;

  return regeneratorRuntime.async(function _callee2$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (!(cart.length == 0)) {
            _context7.next = 3;
            break;
          }

          alert("Impossible de passer commande, votre panier est vide! \nVous allez être redirigé-e vers l'index");
          return _context7.abrupt("return", window.location = "../html/index.html");

        case 3:
          _i3 = 0;

        case 4:
          if (!(_i3 < cart.length)) {
            _context7.next = 21;
            break;
          }

          // (Récupération infos produits en local storage:)
          cartKey = localStorage.key(_i3);
          splitKey = cartKey.split(" ");
          productId = splitKey[0];
          productColor = splitKey[1];
          productQuantity = cart.getItem(cartKey); // (Màj compteur d'items:)

          cartCounter += Number(productQuantity); // (Infos serveur:)

          _context7.next = 13;
          return regeneratorRuntime.awrap(getProduct(productId));

        case 13:
          product = _context7.sent;
          totalPrice += Number(productQuantity) * Number(product.price); // (Contenu dynamique page:)

          _context7.next = 17;
          return regeneratorRuntime.awrap(hydrateDom(product, cartCounter, totalPrice, productQuantity, cartKey));

        case 17:
          pageContent = _context7.sent;

        case 18:
          _i3++;
          _context7.next = 4;
          break;

        case 21:
          /* Vérification formulaire: */
          userForm = document.getElementById("cart__order__form");
          userForm.addEventListener("submit", function _callee(e) {
            var check, data, order;
            return regeneratorRuntime.async(function _callee$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    e.preventDefault();
                    check = checkForm(e);

                    if (!(check == false)) {
                      _context6.next = 4;
                      break;
                    }

                    return _context6.abrupt("return", false);

                  case 4:
                    _context6.next = 6;
                    return regeneratorRuntime.awrap(createData());

                  case 6:
                    data = _context6.sent;
                    _context6.next = 9;
                    return regeneratorRuntime.awrap(postOrder(data));

                  case 9:
                    order = _context6.sent;
                    return _context6.abrupt("return", true);

                  case 11:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          });

        case 23:
        case "end":
          return _context7.stop();
      }
    }
  });
})();
//# sourceMappingURL=cart.dev.js.map
