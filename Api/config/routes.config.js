const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const groups = require('../controllers/list-groups.controller');
const lists = require('../controllers/lists.controller');
const product = require('../controllers/products.controller');

const { isAuthenticated, isGroupOwner, isListOwner, isProductOwner } = 
require('../middlewares/auth.middleware');

//users controller
router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);

//list-groups controller
router.post('/list-groups', isAuthenticated, groups.create);
router.get('/list-groups', isAuthenticated, groups.list);
router.get('/list-groups/:id', isAuthenticated, isGroupOwner, groups.details);
router.patch('/list-groups/:id', isAuthenticated, isGroupOwner, groups.update);
router.delete('/list-groups/:id', isAuthenticated, isGroupOwner, groups.delete);

//list controller
router.get('/:groupId/lists', isAuthenticated, lists.list);
router.post('/:groupId/lists', isAuthenticated, isGroupOwner, lists.create);
router.patch('/lists/:id', isAuthenticated, isListOwner, lists.update);
router.delete('/lists/:id', isAuthenticated, isListOwner, lists.delete);
router.get('/lists/:id', isAuthenticated, isListOwner, lists.details);

//product controller
router.get('/:listId/products', isAuthenticated, product.list);
router.get('/products/:id', isAuthenticated, isProductOwner, product.details);
router.post('/:listId/products', isAuthenticated, isListOwner, product.create);
router.patch('/products/:id', isAuthenticated, isProductOwner, product.update);
router.delete('/products/:id', isAuthenticated, isProductOwner, product.delete);

module.exports = router;