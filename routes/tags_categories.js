const express = require('express');
const router = express.Router();
const tagCategoriesController = require('../controllers/tags_categories');
const upload = require('../utils/upload').upload;
const AuthMiddleware = require('../middlewares/auth');
const setUploadPath = require('../middlewares/upload').setUploadPath;
const parsePaginationParams = require('../middlewares/paging').parsePaginationParams;

router.get('/categories', parsePaginationParams, tagCategoriesController.getCategories);
router.get('/tags', parsePaginationParams, tagCategoriesController.getTags);
router.post('/categories', AuthMiddleware.mustBeAuthenticated, AuthMiddleware.isAdmin, setUploadPath('./public/images/categories'), upload.array('images', 6), tagCategoriesController.createCategory);
router.post('/tags', AuthMiddleware.mustBeAuthenticated, AuthMiddleware.isAdmin, setUploadPath('./public/images/tags'), upload.array('images', 6), tagCategoriesController.createTag);
module.exports = router;