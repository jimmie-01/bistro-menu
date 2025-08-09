const { MenuItem, DrinkMenu } = require('../models/menuSchema');

/**
 * GET - Get Dashboard Panel
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