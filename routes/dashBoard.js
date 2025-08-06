const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/dashBoardController');

router.get('/dashboard', Controllers.get_dashboard);

module.exports = router;