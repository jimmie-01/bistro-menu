const User = require('../models/authSchema');

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
};

/**
 * POST - Function to handle user registration
 */
module.exports.post_register = async (req, res) => {
	const { name, email, password, role } = req.body;
	const lowerCaseRole = role.toLowerCase();
	// Logic to register user
	try{
		const user = await User.create({
			name,
			email,
			password,
			lowerCaseRole,
		});
		res.status(201).redirect('admin/login');

	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).send('Internal Server Error');
		return;
	}
}