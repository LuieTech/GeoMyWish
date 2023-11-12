const ListGroup = require('../models/list-group.model');
const List = require('../models/list.model');
const createError = require('http-errors');


module.exports.isAuthenticated = (req, res, next) => {

  if (req.user) {
    next();

  } else {
   
    next(createError(401, "Unauthorized"));
  }
}

module.exports.isGroupOwner = (req, res, next) => {
  // console.log(req.params.groupId)
  ListGroup.findById(req.params.groupId)
    .then(group => {
      if (!group) {
        return next(createError(404, "Group not found"));
      }
      if (group.user.toString() === req.user.id) {
        next();
      } else {
        next(createError(403, "Forbidden"));
      }
    })
    .catch(next);

}

module.exports.isListOwner = (req, res, next) => {
  const listId = req.params.listId;
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

