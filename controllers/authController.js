const authSchema = require('../models/authSchema');

/**
 * GET - Function to render the login page 
 */
module.exports.get_login = (req, res) => {
	res.render('admin/login', {
		title: 'Login',
	});
};

/**
 * POST - Function to handle user login
 */
module.exports.post_login = (req, res) => {
	const { email, password } = req.body;
	// Logic to authenticate user
	res.redirect('/dashboard');
};

/** 
 * GET - Function to render the registration page
 */
module.exports.get_register = (req, res) => {
	res.render('admin/signup', {
		title: 'Sign Up',
	});
}