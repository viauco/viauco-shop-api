const router = require('express').Router();
require('./param_loaders/orders.loader').init(router);

const ordersController = require('../controllers/orders');
const AuthMiddleware = require('../middlewares/auth');
const parsePaginationParams = require('../middlewares/paging').parsePaginationParams;


router.get('/orders', parsePaginationParams, AuthMiddleware.mustBeAuthenticated, ordersController.getOrders);
router.get('/orders/:order_load_ids', AuthMiddleware.mustBeAuthenticated, AuthMiddleware.userOwnsItOrIsAdmin, ordersController.getOrderDetails);
router.post('/orders', ordersController.createOrder);

module.exports = router;