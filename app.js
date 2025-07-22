require('dotenv').config();

const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoute');

const PORT = process.env.PORT || 3000;

//View Engines
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));

app.use('', mainRoutes);

app.listen(PORT, () => {
	console.log("Express app Connected");
})