const { MenuItem, DrinkMenu } = require('../models/menuSchema');

/**
 * GET - Get Admin Panel
 */

module.exports.get_dashboard  = async(req, res) => {
	try {
		const items = await MenuItem.find().sort({ category: 1 });
		
		const itemsByCategory = {};
		items.forEach(item => {
			if(!itemsByCategory[item.category]){
				itemsByCategory[item.category] = [];
			}
			itemsByCategory[item.category].push(item);
		});
		res.render('admin/dashBoard', {
			 title: "Admin Panel",
			 itemsByCategory
			});
	} catch (error) {
		console.log(error);
	}
}

/**
 * GET - Get Admin Panel For Drink
 */

module.exports.get_dashboard_drinks = async(req, res) => {
	try {
		const items = await DrinkMenu.find().sort({ category: 1 });
		
		const itemsByCategory = {};
		items.forEach(item => {
			if(!itemsByCategory[item.category]){
				itemsByCategory[item.category] = [];
			}
			itemsByCategory[item.category].push(item);
		});
		res.render('admin/dashBoardDrinks', {
			 title: "Drinks",
			 itemsByCategory
			});
	} catch (error) {
		console.log(error);
	}
}

/**
 * GET - Get All Items For Each Category In The Food Section
 */

module.exports.get_category_items = async(req, res) => {
	try {
		const category = req.params.category;
		console.log('Incoming Request: ', category);

		const items = await MenuItem.find({ category }).sort({category: 1});
		console.log("Items this category: ", items);
		res.status(201).render('details', {
			title: category,
			items
		});
	} catch (error) {
		console.log(error);
	};
}

/**
 * GET - Get All Items For Each Category In The Drinks Section
 */

module.exports.get_category_drinkItems = async(req, res) => {
	try {
		const category = req.params.category;
		console.log('Incoming Request: ', category);

		const items = await DrinkMenu.find({ category }).sort({category: 1});
		console.log("Items this category: ", items);
		res.status(201).render('details', {
			title: category,
			items
		});
	} catch (error) {
		console.log(error);
	};
}