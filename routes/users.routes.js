const router = require('express').Router();
const controller = require('./../controllers/users.controller');

router.post('/users', controller.register);
router.post('/users/login', controller.login);

module.exports = router;
