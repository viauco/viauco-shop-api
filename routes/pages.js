const router = require('express').Router();
const PagesController = require('../controllers/pages');

router.get('',  PagesController.index);
router.get('/home',  PagesController.index);

module.exports = router;
