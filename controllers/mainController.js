const { MenuItem, DrinkMenu } = require('../models/menuSchema');

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
	}
}

/**
 * GET - Create Menu Page
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
		res.status(201).redirect('/menu');
		console.log('data added to db');
	} catch (error) {
		console.log(error);
	};
}