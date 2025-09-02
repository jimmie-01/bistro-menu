const jwt = require('jsonwebtoken');
const User = require('../models/authSchema');
// const asyncHandler = require('express-async-handler');

const protect = async (req, res, next) => {
	try {
		token = req.cookies.token;
		if (!token) {
			return res.status(401).json({
				message: 'No Token, Authoriztion Denied'
			});
		}
		try {
			// Verify Token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from token
			const user  = await User.findById(decoded.id).select('-password');
			req.user = user;
			next();
		} catch (error) {
			return res.status(401).json({
				message: 'Not authorized to access this route'
			});
		}
	} catch (error) {
		next(error);
	}
}

const authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				message: `User role ${req.user.role} is not authorized to access this route`
			});
		}
		next();
	};
}

// Check Current User
const checkUser = (req, res, next) => {
	const token = req.cookies.token;

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		})
	} else {
		res.locals.user = null;
		next();
	}
}

module.exports = { protect, authorize, checkUser };