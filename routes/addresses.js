const router = require('express').Router();
const AddressesController = require('../controllers/addresses');
const AuthMiddleware = require('../middlewares/auth');
const parsePaginationParams = require('../middlewares/paging').parsePaginationParams;


router.get('/users/addresses', parsePaginationParams, AuthMiddleware.mustBeAuthenticated, AddressesController.getAddresses);
router.post('/users/addresses', AuthMiddleware.mustBeAuthenticated, AddressesController.createAddress);

module.exports = router;