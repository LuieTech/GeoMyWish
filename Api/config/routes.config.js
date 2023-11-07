const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const list = require('../controllers/lists.controller');
const product = require('../controllers/products.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');

//users controller
router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);

//list controller
router.get('/lists', isAuthenticated, list.list);
router.post('/lists', isAuthenticated, list.create);
router.patch('/lists/:id', isAuthenticated, list.update);
router.delete('/lists/:id', isAuthenticated, list.delete);
router.get('/lists/:id', isAuthenticated, list.details);


//product controller
router.get('/products', isAuthenticated, product.list);
router.get('/products/:id', isAuthenticated, product.details);
router.post('/products', isAuthenticated, product.create);
router.patch('/products/:id', isAuthenticated, product.update);
router.delete('/products/:id', isAuthenticated, product.delete);



module.exports = router;