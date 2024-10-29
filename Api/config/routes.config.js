const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const router = express.Router();
const user = require('../controllers/users.controller');
const groups = require('../controllers/list-groups.controller');
const lists = require('../controllers/lists.controller');
const product = require('../controllers/products.controller');
const storeController = require('../controllers/stores.controller');

const { isAuthenticated, isGroupOwner, isListOwner, isProductOwner } = 
require('../middlewares/auth.middleware');

//users controller
router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);

//list-groups controller
router.post('/groups', isAuthenticated, groups.create);
router.get('/groups', isAuthenticated, groups.list);
router.get('/groups/:groupId', isAuthenticated, isGroupOwner, groups.details);
router.patch('/groups/:groupId', isAuthenticated, isGroupOwner, groups.update);
router.delete('/groups/:groupId', isAuthenticated, isGroupOwner, groups.delete);

//list controller
router.get('/group/:groupId/lists', isAuthenticated, isGroupOwner, lists.list);
//  return service.get(`/group/${groupId}/lists`)
router.post('/group/:groupId/lists', isAuthenticated, isGroupOwner, lists.create);
router.patch('/list/:listId', isAuthenticated, isListOwner, lists.update);
router.delete('/delete-list/:listId', isAuthenticated, isListOwner, lists.delete);
//console.log("Este es el listId de la lista desde el router: ", lists.listId)
router.get('/list/:listId', isAuthenticated, isListOwner, lists.details);

//product controller
router.get('/list/:listId/products', isAuthenticated, product.list);
router.get('/products/:id', isAuthenticated, isProductOwner, product.details);
router.post('/list/:listId/products', isAuthenticated, isListOwner, product.create);
router.patch('/products/:id', isAuthenticated, isProductOwner, product.update);
router.delete('/delete-product/:id', isAuthenticated, isProductOwner, product.delete);
// return service.delete(`/delete-product/${productId}`);

// rutas para el controlador de Store
router.get('/list/:listId/stores', isAuthenticated, storeController.list);
router.post('/list/:listId/stores', isAuthenticated, storeController.create);
router.delete('/stores/:storeId', isAuthenticated, storeController.delete);
router.get('/near', storeController.findNearbyStores);

router.use((req, res, next) => next(createError(404, 'Route not found')));

router.use((error, req, res, next) => {

  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({
      message: 'Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at ' + req.path,
      
      origin: req.get('Origin'),
      errors: { cors: 'Not allowed by CORS' },
    });
  }
  if(error instanceof mongoose.Error.CastError && error.message.includes('_id')){
    error = createError(404, 'Resource not found');
  } else if(error instanceof mongoose.Error.ValidationError){
      error = createError(400, error);
  } else if(!error.status) {
    error = createError(500, error)
  }
    // console.log(error);
    let errors;
    if(error.errors){
      errors = Object.keys(error.errors)
        .reduce((errors, errorKey) => {
          errors[errorKey] = error.errors[errorKey].message || error.errors[errorKey];
          return errors;
      }, {}) 
    }
  
  const data = {
    message: error.message,
    errors: errors
  }

  res.status(error.status).json(data);

})

module.exports = router;