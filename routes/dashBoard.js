const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/dashBoardController');
const { protect, authorize } = require('../utils/authMiddleware');

router.use(protect);

router.get('/dashboard', Controllers.get_dashboard);
router.get('/dashboard/drinks', Controllers.get_dashboard_drinks);
router.get('/dashboard/:category', Controllers.get_category_items);
router.get('/dashboard/drinks/:category', Controllers.get_category_drinkItems);
router.get('/menu/add-item', authorize('owner', 'general manager'), Controllers.get_create_menu);
router.post('/menu/add-item', authorize('owner', 'general manager'), Controllers.post_create_menu);
router.get('/edit/:name', authorize('owner', 'general manager'), Controllers.get_edit_item);
router.post('/edit/:id', authorize('owner', 'general manager'), Controllers.post_edit_item);
router.post('/dashboard/item/:name',authorize('owner', 'general manager'), Controllers.delete_item);

module.exports = router;