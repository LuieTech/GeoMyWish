const List = require('../models/list.model');
const Product = require('../models/product.model');
const createError = require('http-errors');


module.exports.list = (req, res, next) => {

  const listId = req.params.listId;
  List.findById(listId)
    .then(list => {
      if(!list){
        return next(createError(404, 'List not found'));
      }
      if(list.user.toString() !== req.user.id){
        return next(createError(403, 'Forbidden'));
      }
      const criteria = { list: listId };

      if(req.query.name){
        criteria.name = new RegExp(req.query.title, 'i')
      }
      return Product.find(criteria);
    
    })
    .then(products => { 
      if(products.length === 0){
        return next(createError(404, 'No products found'));
      } else {
        res.status(200).json(products);
      }
    })
    .catch(error => next(error));

};

module.exports.details = (req, res, next) => {
  Product.findOne({ _id: req.params.id, user: req.user.id })
    .then(product => {
      if (!product) {
        return next(createError(404, 'Product not found'));
      }
      res.status(200).json(product);
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {

  const listId = req.params.listId || req.body.list;

  const newProduct = {
    ...req.body,
    user: req.user.id, 
    list: listId
  };

  Product.create(newProduct)
    .then(product => res.status(201).json(product))
    .catch(error => next(error));
};


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

// module.exports.delete = (req, res, next) => {
//   Product.findByIdAndDelete(req.params.id)
//     .then(product => {
//       if (product) {
//         res.status(204).send();
//       } else {
//         next(createError(404, 'Product not found'));
//       }
//     })
//     .catch(next);
// }

module.exports.delete = (req, res, next) => {
  console.log(`Attempting to delete product with ID: ${req.params.id}`);

  Product.findByIdAndDelete(req.params.id)
    .then(product => {
      if (product) {
        console.log(`Deleted product with ID: ${req.params.id}`);
        res.status(204).send();
      } else {
        console.log(`Product not found with ID: ${req.params.id}`);
        next(createError(404, 'Product not found'));
      }
    })
    .catch(error => {
      console.error(`Error deleting product with ID: ${req.params.id}`, error);
      next(error);
    });
}
