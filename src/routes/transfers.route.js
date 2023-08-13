const express = require('express');

// controllers

const transfersController = require('../controllers/transfers.controller');

const router = express.Router();

router.route('/').post(transfersController.transferAmount);

module.exports = router;
