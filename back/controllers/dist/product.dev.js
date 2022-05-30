"use strict";

var uuid = require('uuid/v1');

var Product = require('../models/Product');

exports.getAllProducts = function (req, res, next) {
  Product.find().then(function (products) {
    var mappedProducts = products.map(function (product) {
      product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
      return product;
    });
    res.status(200).json(mappedProducts);
  })["catch"](function () {
    res.status(500).send(new Error('Database error!'));
  });
};

exports.getOneProduct = function (req, res, next) {
  Product.findById(req.params.id).then(function (product) {
    if (!product) {
      return res.status(404).send(new Error('Product not found!'));
    }

    product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
    res.status(200).json(product);
  })["catch"](function () {
    res.status(500).send(new Error('Database error!'));
  });
};
/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */


exports.orderProducts = function (req, res, next) {
  if (!req.body.contact || !req.body.contact.firstName || !req.body.contact.lastName || !req.body.contact.address || !req.body.contact.city || !req.body.contact.email || !req.body.products) {
    return res.status(400).send(new Error('Bad request!'));
  }

  var queries = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var productId = _step.value;
      var queryPromise = new Promise(function (resolve, reject) {
        Product.findById(productId).then(function (product) {
          if (!product) {
            reject('Product not found: ' + productId);
          }

          product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
          resolve(product);
        })["catch"](function () {
          reject('Database error!');
        });
      });
      queries.push(queryPromise);
    };

    for (var _iterator = req.body.products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
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

  Promise.all(queries).then(function (products) {
    var orderId = uuid();
    return res.status(201).json({
      contact: req.body.contact,
      products: products,
      orderId: orderId
    });
  })["catch"](function (error) {
    return res.status(500).json(new Error(error));
  });
};
//# sourceMappingURL=product.dev.js.map
