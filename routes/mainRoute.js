const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/mainController');

router.get('/', Controllers.get_home);
router.get('/about', Controllers.get_about);
router.get('/menu', Controllers.get_menu);

module.exports = router;