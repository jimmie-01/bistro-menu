
/**
 * GET - Get Home Page
 */
module.exports.get_home = (req, res) => {
	res.render('index', { title: "Home Page"})
}