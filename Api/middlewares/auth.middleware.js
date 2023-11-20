const ListGroup = require('../models/list-group.model');
const List = require('../models/list.model');
const createError = require('http-errors');
const Product = require('../models/product.model');


module.exports.isAuthenticated = (req, res, next) => {

  if (req.user) {
    next();

  } else {
   
    next(createError(401, "Unauthorized"));
  }
}

module.exports.isGroupOwner = (req, res, next) => {
  const groupId = req.params.groupId;
  console.log("Este es el groupId", groupId)
  ListGroup.findById(groupId)
    .then(group => {
      if (!group) {
        return next(createError(404, "Group is not found"));
      }
      if (group.user.toString() !== req.user.id) {
        
        next(createError(403, "Forbidden"));
      } else {
        next();
      }
    })
    .catch(next);

}

module.exports.isListOwner = (req, res, next) => {
  const listId = req.params.listId;
  console.log("Este es el listId", listId)
  List.findById(listId)
    .then(list => {
      if (!list) {
        return next(createError(404, "List not found"));
      }
      if (list.user.toString() !== req.user.id) {
        return next(createError(403, "Forbidden"));
      }
      req.list = list;
      next();
    })
    .catch(error => next(error));
};


module.exports.isProductOwner = (req, res, next) => {

  console.log("Este es el productId", req.params.id)
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return next(createError(404, "Product not found"));
      }
      if (product.user.toString() !== req.user.id) {
        return next(createError(403, "Forbidden"));
      }
      req.product = product;
      next();
    })
    .catch(next);
};

