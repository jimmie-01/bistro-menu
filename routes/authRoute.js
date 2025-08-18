const express = require('express');
const router = express.Router();
const Controller = require('../controllers/authController');

router.get('/login', Controller.get_login);
router.post('/login', Controllers.post_login);
router.get('/register', Controllers.get_register);
router.post('/register', Controllers.post_register);
router.get('/logout', Controllers.logout);

module.exports = router;