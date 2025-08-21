const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

// Define the user schema for authentication
// This schema includes fields for name, email, password, and role with appropriate validations.
// The 'role' field is an enum that restricts the values to specific roles.

const userSchema = new Schema({
  name: {
	type: String,
	required: [true, 'Name is required'],
  },
  email: {
	type: String,
	required: [true, 'Email is required'],
	unique: true,
	validate: [isEmail, 'Please enter a valid email address'],
	trim: true,
	lowercase: true,
  },
  password: {
	type: String,
	required: [true, 'Password is required'],
	minLength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
	type: String,
	enum: ['floor manager', 'general manager','owner', 'cashier'],
	default: 'floor manager',
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
// --- IGNORE ---

// This schema defines the structure of the authentication data in the database.
// It includes fields for name, email, password, and role, with appropriate validations and defaults.
// The 'Auth' model can be used to interact with the authentication collection in MongoDB.
//

//Fire a function before saving doc to db
userSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);

	next();
});