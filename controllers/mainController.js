const { MenuItem, DrinkMenu } = require('../models/menuSchema');
const isValidEnumValue = require('../utils/utils');

/**
 * GET - Get Home Page
 */
module.exports.get_home = (req, res) => {
	res.render('index', { title: "Home Page"});
}

/**
 * GET - Get About Page
 */
module.exports.get_about = (req, res) => {
	res.render('about', { title: "About Page" });
}

/**
 * GET - Get Food Menu List
 */
module.exports.get_menu_food = async(req, res) => {
	try {
		//Fetch items from DB and sort by category
		const items = await MenuItem.find().sort({ category: 1 });

		//Group items by category
		const itemsByCategory = {};
		items.forEach(item => {
			if (!itemsByCategory[item.category]) {
				itemsByCategory[item.category] = [];
			}
			itemsByCategory[item.category].push(item);
		});
		res.status(201).render('menu', { 
			title: "Menu", 
			itemsByCategory });
	} catch (error) {
		console.log(error);
	}
}


/**
 * GET - Create Menu Page(Food)
 */
module.exports.get_create_menu = (req, res) => {
	res.render('create', { title: "Add item" });
}

/**
 * POST - Post Create Menu
 */
module.exports.post_create_menu = async (req, res) => {
	try {
		const { category, name, description, price } = req.body;

		// Check Items are been entered into the correct category
		if(!isValidEnumValue(DrinkMenu.schema, 'category', category)) {
			return res.status(409).json({ message: "The Category You Entered Is Not Valid For Food!"});
		}
		const nameExist = await MenuItem.findOne({ name });

		if (nameExist) {
			return res.status(409).json({ message: "Item with name already exists"});
		}
		const menu_items = await MenuItem.create({
			category,
			name,
			description,
			price
		});
		res.status(201).redirect('/menu/food');
		console.log('data added to db');
	} catch (error) {
		console.log(error);
	};
}


/**
 * GET - Get Drinks Menu List
 */
module.exports.get_menu_drinks = async(req, res) => {

	try {
		const items = await DrinkMenu.find().sort({ category: 1 });

	//Group items by category
		const itemsByCategory = {};
		items.forEach(item => {
			if(!itemsByCategory[item.category]) {
				itemsByCategory[item.category] = [];
		}
		itemsByCategory[item.category].push(item);
	});
	res.status(201).render('drinks', {
		title: 'drinks',
		itemsByCategory
	});
	} catch (error) {
		console.log(error);
	};
}

/**
 * GET - Get Drinks Data Form
 */
module.exports.get_create_drinks = (req, res) => {
	res.render('create_drink', { title: 'Drinks Form' });
}

/**
 * POST - Post drinks data to db
 */

module.exports.post_create_drinks = async(req, res) => {
	try {
		const { category, name, description, price } = req.body;

		console.log("Incoming Request: ", req.body);

		//Check if category is in the right group
		// const checkCategory = await MenuItem.findOne({ category })
		// 	if (!checkCategory){
		// 		return res.status(409).json({ message: " The Category you entered does not belong in the drinks group"});
		// 	}
		if (!isValidEnumValue(DrinkMenu.schema, 'category', category)) {
			return res.status(409).json({ message: "The Category You Entered Is Not Valid For Drinks!"})
		}

		// Checks if item with the same name already exist on DB
		const ifItemExists = await DrinkMenu.findOne({ name });

		if (ifItemExists) {
			return res.status(409).json({ message: "Item Already Exists"});
		};
		const item = await DrinkMenu.create({
			category,
			name,
			description,
			price
		});
		res.status(201).redirect('/menu/drinks');	
		} catch (error) {
			console.log(error);
		}
}