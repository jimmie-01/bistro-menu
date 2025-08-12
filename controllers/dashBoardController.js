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

		const items = await MenuItem.find({ category }).sort({category: 1});
		res.status(201).render('admin/details', {
			title: category,
			category,
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

		const items = await DrinkMenu.find({ category }).sort({category: 1});
		res.status(201).render('admin/details', {
			title: category,
			category,
			items
		});
	} catch (error) {
		console.log(error);
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
			res.status(201).render('admin/edit-items', {
				title: "Update Item",
				item
			});
		}
		res.status(201).render('admin/edit-items', {
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