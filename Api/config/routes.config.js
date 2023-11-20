const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const groups = require('../controllers/list-groups.controller');
const lists = require('../controllers/lists.controller');
const product = require('../controllers/products.controller');
const stores = require('../controllers/stores.controller');

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
router.get('/group/:groupId/lists', isAuthenticated, lists.list);
router.post('/group/:groupId/lists', isAuthenticated, isGroupOwner, lists.create);
router.patch('/lists/:listId', isAuthenticated, isListOwner, lists.update);
router.delete('/lists/:listId', isAuthenticated, isListOwner, lists.delete);
router.get('/list/:listId', isAuthenticated, isListOwner, lists.details);

//product controller
router.get('/list/:listId/products', isAuthenticated, product.list);
router.get('/products/:id', isAuthenticated, isProductOwner, product.details);
router.post('/list/:listId/products', isAuthenticated, isListOwner, product.create);
router.patch('/products/:id', isAuthenticated, isProductOwner, product.update);
router.delete('/delete-product/:id', isAuthenticated, isProductOwner, product.delete);
// return service.delete(`/delete-product/${productId}`);

//rutas para el controlador de Store
router.get('/list/:listId/stores', isAuthenticated, stores.list);
router.post('/list/:listId/stores', isAuthenticated, stores.create);
router.delete('/stores/:storeId', isAuthenticated, stores.delete);

module.exports = router;