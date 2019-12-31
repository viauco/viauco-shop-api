const productsController = require('../controllers/products');
const router = require('express').Router();
const upload = require('../utils/upload').upload;
const setUploadPath = require('../middlewares/upload').setUploadPath;

const AuthMiddleware = require('../middlewares/auth');
const parsePaginationParams = require('../middlewares/paging').parsePaginationParams;

require('./loaders/products').init(router);
require('./loaders/tags').init(router);

router.get('/products', parsePaginationParams, productsController.getAll);

router.get('/products/:product_slug', productsController.getByIdOrSlug);
router.get('/products/by_id/:productId', productsController.getByIdOrSlug);

router.get('/products/by_tag/:tag_slug',parsePaginationParams, productsController.getByTag);
router.get('/products/by_tag_id/:tag_id',parsePaginationParams, productsController.getByTag);

router.get('/products/by_category/:category_slug',parsePaginationParams, productsController.getByCategory);
router.get('/products/by_category_id/:categoryId',parsePaginationParams, productsController.getByCategory);

router.post('/products', AuthMiddleware.mustBeAuthenticated, AuthMiddleware.isAdmin, setUploadPath('./public/images/products'), upload.array('images', 6), productsController.createProduct);
router.put('/products/:product', AuthMiddleware.mustBeAuthenticated, AuthMiddleware.isAdmin, setUploadPath('./public/images/products'), upload.array('images', 6), productsController.updateProduct);

router.delete('/products/:product_load_ids', AuthMiddleware.mustBeAuthenticated, AuthMiddleware.isAdmin, productsController.deleteProduct);
router.delete('/products/by_id/:product_load_ids', AuthMiddleware.mustBeAuthenticated, AuthMiddleware.isAdmin, productsController.deleteProduct);

module.exports = router;
