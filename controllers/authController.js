const authSchema = require('../models/authSchema');

// Function to render the login page
module.exports.get_login = (req, res) => {
	res.render('admin/login', {
		title: 'Login',
	});
};

// Function to handle login form submission
module.exports.post_login = (req, res) => {
	const { email, password } = req.body;
	// Logic to authenticate user
	res.redirect('/dashboard');
};