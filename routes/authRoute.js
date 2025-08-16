const express = require('express');
const router = express.Router();
const Controller = require('../controllers/authController');

router.get('/login', Controller.get_login);
// router.post('dashboard/login', Controllers.post_login);
// router.get('dashboard/register', Controllers.get_register);
// router.post('dashboard/register', Controllers.post_register);
// router.get('dashboard/logout', Controllers.logout);

module.exports = router;