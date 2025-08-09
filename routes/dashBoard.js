const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/dashBoardController');

router.get('/dashboard', Controllers.get_dashboard);
router.get('/dashboard/drinks', Controllers.get_dashboard_drinks);

module.exports = router;