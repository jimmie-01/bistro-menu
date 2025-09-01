const { request } = require('express');
const { MenuItem, DrinkMenu } = require('../models/menuSchema');
const isValidEnumValue = require('../utils/utils');

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
		res.render('dashboard/dashBoard', {
			 title: "Admin Panel",
			 itemsByCategory
			});
	} catch (error) {
		res.status(501).send("Internal Sever Error", error);
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
		res.render('dashboard/dashBoardDrinks', {
			 title: "Drinks",
			 itemsByCategory
			});
	} catch (error) {
		res.status(501).send("Internal Sever Error", error);
	}
}


/**
 * GET - Get All Category In The Food Section
 */

module.exports.get_category_items = async(req, res) => {
	try {
		const category = req.params.category;

		const items = await MenuItem.find({ category }).sort({category: 1});
		res.status(201).render('dashboard/details', {
			title: category,
			category,
			items
		});
	} catch (error) {
		res.status(501).send("Internal Sever Error", error);
	};
}

/**
 * GET - Get All Category In The Drinks Section
 */

module.exports.get_category_drinkItems = async(req, res) => {
	try {
		const category = req.params.category;

		const items = await DrinkMenu.find({ category }).sort({category: 1});
		res.status(201).render('dashboard/details', {
			title: category,
			category,
			items
		});
	} catch (error) {
		res.status(501).send("Internal Sever Error", error);
	};
}

/**
 * GET - Create Menu Page(Food)
 */
module.exports.get_create_menu = (req, res) => {
	res.render('dashboard/create', { title: "Add item" });
}

/**
 * POST - Add Items to Menu
 */
module.exports.post_create_menu = async (req, res) => {
	try {
		const { category, name, description, price } = req.body;

		const upperCategory = category.toUpperCase();
		// Check if category is a valid enum type
		if(isValidEnumValue(MenuItem.schema, 'category', upperCategory)) {
			const foodItemExists = await MenuItem.findOne({ name });
			
			if(foodItemExists) {
				return res.status(409).json({ message: "Item with name already exists"});
			}
			const menu_items = await MenuItem.create({
				category,
				name,
				description,
				price
			});
			// Redirect to the category page after adding the item
			// This assumes that the category is a valid route in your application
			// const lowerCategory = menu_items.category.toLowerCase();
			res.status(201).redirect(`/dashboard/${category.toLowerCase()}`);
			console.log('data added to db');
		} else if(isValidEnumValue(DrinkMenu.schema, 'category', upperCategory)) {
			const drinkItemExists = await DrinkMenu.findOne({ name });

			if(drinkItemExists) {
				return res.status(409).json({ message: "Item with name already exists"});
			}
			const drink_items = await DrinkMenu.create({
				category,
				name,
				description,
				price
			});
			res.status(201).redirect('/dashboard/drinks/' + drink_items.category.toLowerCase());
			console.log('Drink item added to Db');
		} else {
			return res.status(409).json({ message: "The Category You Entered Does Not Belong In The Menu!"})
		}
	} catch (error) {
		res.status(500).send('Internal Server Error ', error);
	};
}


/**
 * GET - Get The Page To Edit Menu Item
 */
module.exports.get_edit_item = async(req, res) => {
	try {
		const name = req.params.name;

		const item = await MenuItem.findOne({ name });
		if (!item) {
			const item = await DrinkMenu.findOne({ name });
			res.status(201).render('dashboard/edit-items', {
				title: "Update Item",
				item
			});
		}
		res.status(201).render('dashboard/edit-items', {
				title: "Update Item",
				item
			});
	} catch (error) {
		res.status(501).send("Internal Sever Error", error);
	};
}

/**
 * POST - Update Items
 */
module.exports.post_edit_item = async(req, res) => {
	try {
		const id = req.params.id;

		const item = await MenuItem.findByIdAndUpdate({ 
			_id: id}, 
			req.body);
		if (!item) {
			const item = await DrinkMenu.findByIdAndUpdate({ _id: id},
				req.body
			);
			res.status(201).redirect(`/dashboard/drinks/${item.category}`);
		}
		res.status(201).redirect(`/dashboard/${item.category}`);
	} catch (error) {
		res.status(501).send("Internal Sever Error", error);
	};
}
/**
 * DELETE - Delete an item from dashboard
 */
module.exports.delete_item = async(req, res) => {
	try {
		const category = req.params.category;
		console.log(category);
		const name = req.params.name;
		const item = await MenuItem.deleteOne({ name });
		if(!item) {
			const item = await DrinkMenu.deleteOne({ name });
			res.status(201).redirect('/dashboard/drinks');
		}
		res.status(201).redirect('/dashboard');
	} catch (error) {
		res.status(501).send("Internal Sever Error", error);
		console.log(error);
	}
};