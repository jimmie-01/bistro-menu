const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoute');

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.static('public'));

app.use('', mainRoutes);

app.listen(PORT, () => {
	console.log("Express app Connected");
})