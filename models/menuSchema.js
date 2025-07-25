const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
	category: {
		type: String,
		required: true,
		enum: ['Breakfast', 'Fish', 'Poultry', 'Meat', 'Comfort', 'Salad', 'Sandwich', 'Dessert', 'Sides'],
		lowercase: true,
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
		min: 0
	}
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuSchema);

module.exports = Items;