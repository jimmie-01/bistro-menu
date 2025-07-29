const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/mainController');

router.get('/', Controllers.get_home);
router.get('/about', Controllers.get_about);
router.get('/menu/food', Controllers.get_menu_food);
router.get('/menu/drinks', Controllers.get_menu_drinks);
router.get('/menu/create', Controllers.get_create_menu);
router.post('/menu/create', Controllers.post_create_menu);

module.exports = router;