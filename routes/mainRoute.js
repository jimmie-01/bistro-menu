const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/mainController');

router.get('/', Controllers.get_home);
router.get('/about', Controllers.get_about);
router.get('/menu/food', Controllers.get_menu_food);
router.get('/menu/drinks', Controllers.get_menu_drinks);
router.get('/menu/create/food', Controllers.get_create_menu);
router.post('/menu/create/food', Controllers.post_create_menu);
router.get('/menu/create/drinks', Controllers.get_create_drinks);
router.post('/menu/create/drinks', Controllers.get_create_drinks);

module.exports = router;