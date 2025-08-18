const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/mainController');

router.get('/', Controllers.get_home);
router.get('/about', Controllers.get_about);
router.get('/menu/food', Controllers.get_menu_food);
router.get('/menu/drinks', Controllers.get_menu_drinks);
// router.get('/contact', Controllers.get_contact);
// router.get('/gallery', Controllers.get_gallery);
// router.get('/reservation', Controllers.get_reservation);
// router.post('/reservation', Controllers.post_reservation);
// router.get('/blog', Controllers.get_blog);
// router.get('/blog/:id', Controllers.get_blog_post);
module.exports = router;