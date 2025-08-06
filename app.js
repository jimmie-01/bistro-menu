require('dotenv').config();

const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoute');
const dashBoard = require('./routes/dashBoard');
const { default: mongoose } = require('mongoose');

const PORT = process.env.PORT || 3000;

//Connect to DataBase
dbURI = process.env.dbURI;
mongoose.connect(dbURI)
	.then(result => app.listen(PORT, () => {
		console.log(`Connect to DataBase on port ${PORT}`);
	}))
	.catch(err => {
		console.log(err);
	});
//View Engines
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', mainRoutes);
app.use('', dashBoard);