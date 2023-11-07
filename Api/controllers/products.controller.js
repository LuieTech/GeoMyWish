const List = require('../models/list.model');
const Product = require('../models/product.model');
const createError = require('http-errors');


module.exports.list = (req, res, next) => {
  Product.find()
    // .populate('list')
    .then(products => res.status(200).json(products))
    .catch(next);
};

module.exports.details = (req, res, next) => {
  Product.findById(req.params.id)
    .populate('list')
    .then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        next(createError(404, 'Product not found'));
      }
    })
    .catch((error) => next(error));
}

module.exports.create = (req, res, next) => {
  List.findById(req.body.list)
    .then(list => {
      if (!list) {
        next(createError(404, 'List not found'));
      } else {
        return Product.create(req.body);
      }
    })
    .then(product => {
      if (product) {
        res.status(201).json(product);
      }
    })
    .catch(next);
}

module.exports.update = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then(product => {
      if (product) {
        res.status(200).json(product);
      } else{
        next(createError(404, 'Product not found'));
      }
    })
    .catch(next);
}

module.exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then(product => {
      if (product) {
        res.status(204).send();
      } else {
        next(createError(404, 'Product not found'));
      }
    })
    .catch(next);
}

