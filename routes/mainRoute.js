const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/mainController');

router.get('/', Controllers.get_home);

module.exports = router;