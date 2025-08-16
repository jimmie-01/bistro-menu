const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
  name: {
	type: String,
	required: [true, 'Name is required'],
  },
  email: {
	type: String,
	required: [true, 'Email is required'],
	unique: true,
	lowercase: true,
  },
  password: {
	type: String,
	required: [true, 'Password is required'],
	minLength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
	type: String,
	enum: ['user', 'admin'],
	default: 'user',
  }
}, { timestamps: true });

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;
// --- IGNORE ---

// This schema defines the structure of the authentication data in the database.
// It includes fields for name, email, password, and role, with appropriate validations and defaults.
// The 'Auth' model can be used to interact with the authentication collection in MongoDB.
//