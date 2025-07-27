const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
	category: {
		type: String,
		required: true,
		enum: ['BREAKFAST', 'FISH', 'POULTRY', 'MEAT', 'COMFORT', 'SALAD', 'SANDWICH', 'DESSERT', 'SIDES'],
		uppercase: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true,
		maxlength: 100
	},
	description: {
		type: String,
		required: false,
		trim: true,
		maxlength: 500
	},
	price: {
		type: Number,
		required: true,
	}
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuSchema);

module.exports = MenuItem;