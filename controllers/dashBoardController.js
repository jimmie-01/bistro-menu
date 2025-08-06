const { MenuItem, DrinkMenu } = require('../models/menuSchema');

/**
 * GET - Get Dashboard Panel
 */

module.exports.get_dashboard  = (req, res) => {
	res.send('Our Dashboard is Ready !');
}