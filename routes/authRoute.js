const express = require('express');
const router = express.Router();
const Controller = require('../controllers/authController');
const {protect, authorize} = require('../utils/authMiddleware');

router.get('/login', Controller.get_login);
router.post('/login', Controller.post_login);
router.get('/register', Controller.get_register);
router.post('/register', Controller.post_register);
router.get('/logout', Controller.logout);

module.exports = router;