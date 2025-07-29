const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodMenuSchema = new Schema({
	category: {
		type: String,
		required: true,
		enum: ['BREAKFAST', 'FISH', 'POULTRY', 'MEAT', 'PASTA', 'COMFORT', 'SALAD', 'SANDWICH', 'DESSERT', 'SIDES'],
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

const drinkMenuSchema = new Schema({
	category: {
		type: String,
		required: true,
		enum: ['SODAS', 'JUICES', 'SMOOTHIES', 'MILKSHAKE', 'HOT BEVERAGE', 'COCKTAILS', 'SIGNATURE DRINKS'],
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


const MenuItem = mongoose.model('MenuItem', foodMenuSchema);
const DrinkMenu = mongoose.model('DrinkMenu', drinkMenuSchema);

module.exports = { MenuItem, DrinkMenu };