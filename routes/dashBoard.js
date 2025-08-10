const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/dashBoardController');

router.get('/dashboard', Controllers.get_dashboard);
router.get('/dashboard/drinks', Controllers.get_dashboard_drinks);
router.get('/dashboard/:category', Controllers.get_category_items);

module.exports = router;