
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
 * GET - Get Menu List
 */
module.exports.get_menu = (req, res) => {
	res.render('menu', { title: "Menu" });
}