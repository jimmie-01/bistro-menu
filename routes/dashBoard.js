const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/dashBoardController');

router.get('/dashboard', Controllers.get_dashboard);
router.get('/dashboard/drinks', Controllers.get_dashboard_drinks);
router.get('/dashboard/:category', Controllers.get_category_items);
router.get('/dashboard/drinks/:category', Controllers.get_category_drinkItems);
router.get('/edit/:name', Controllers.get_edit_item);

module.exports = router;