const User = require('../models/authSchema');

// Handle Errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { email: '', password: ''};

	//Email Error
	if (err.message === 'Incorrect Email') {
		errors.email = 'That email is not registered';
	};
	//Password Error
	if (err.message === 'Incorrect Password') {
		errors.password = 'That password is incorrect';
	}
	//Duplicate Error Code
	if (err.code === 11000) {
		errors.email = 'That email is already registered';
		return errors;
	}
	//Validation Errors
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
}
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
module.exports.post_login = async(req, res) => {
	const { email, password } = req.body;
	// Logic to authenticate user
	try {
		const user = await User.login(email, password);
		// Create token
		const token = user.getSignedJwtToken();
		res.status(200).json({
			token, 
			user
		});
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
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
	console.log('Registering user:', { name, email, password, role: lowerCaseRole });
	// Logic to register user
	try{
		const user = await User.create({
			name,
			email,
			password,
			role: lowerCaseRole,
		});
		// Create token
		const token = user.getSignedJwtToken();

		res.status(201).json({ 
			token,
			user: user._id
		});

	} catch (err) {
		const errors = handleErrors(err);
		console.log(errors);
		res.status(500).json({ errors });
		return;
	}
}

// If you're storing tokens in cookies, consider setting these options on the response when setting the cookie:
// res.cookie('token', jwtToken, {
// 	httpOnly: true,       // Prevents JS access
// 	secure: true,         // Ensures it's only sent over HTTPS
// 	sameSite: 'Strict',   // Prevents CSRF
// 	maxAge: 24 * 60 * 60 * 1000 // 1 day
// });
