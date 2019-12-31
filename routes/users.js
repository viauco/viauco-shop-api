const router = require('express').Router();
const controller = require('../controllers/users');

router.post('/users', controller.register);
router.post('/users/login', controller.login);

module.exports = router;
