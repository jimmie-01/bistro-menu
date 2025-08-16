const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/authController');

router.get('/dashboard/login', Controllers.get_login);
router.post('dashboard/login', Controllers.post_login);
router.get('dashboard/register', Controllers.get_register);
router.post('dashboard/register', Controllers.post_register);
router.get('dashboard/logout', Controllers.logout);

module.exports = router;
// app.use('', require('./routes/authRoute'));
// app.use('', require('./routes/authRoute'));
// app.use('', require('./routes/authRoute'));
// app.use('', require('./routes/authRoute'));