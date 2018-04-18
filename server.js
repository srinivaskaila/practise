const express = require('express');
const hbs = require('hbs');
const isSiteUnderMaintenance = false;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

if(isSiteUnderMaintenance){
	app.use((req, res, next) => {
		res.render('maintenance.hbs', {
			pageTitle: 'Site under maintenance',
			header: 'Site under maintenance',
			description: 'This website currently under maintenance. Please come back later.'
		});
	});
}

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home page',
		header: 'Welcome to my home',
		description: 'Lot of things are yet to come...'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page',
		header: 'About Srini',
		description: 'There is a lot...'
	});
});

app.get('/bad', (req, res) => {
	res.send('<h2><red>Error on server side</red></h2>');
});

app.listen(3000);