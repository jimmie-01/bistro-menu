const authSchema = require('../models/authSchema');

// Function to render the login page
module.exports.get_login = (req, res) => {
	res.render('admin/login', {
		title: 'Login',
	});
};