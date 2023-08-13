const express = require('express');

//controllers

const userController = require('../controllers/user.controller');

const router = express.Router();

router.route('/').get(userController.findAllUser);

router.route('/signup').post(userController.signup);

router.route('/login').post(userController.login);

module.exports = router;
