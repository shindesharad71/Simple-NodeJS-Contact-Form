var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index', {title: 'Sharad Shinde'});
});

app.get('/about', function(req, res){
	res.render('about', {title: 'About'});
});

app.get('/contact', function(req, res){
	res.render('contact', {title: 'Contact'});
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail', // Email Service
		auth: {
			user: 'shindesharad71@gmail.com', // Your Email 
			pass: '<Password>' // Email Password for Authentication
		}
	});

	var mailOptions = {
		from: 'Sharad Shinde <shindesharad71@gmail.com>',
		to: 'shindesharad71@gmail.com',
		subject: 'NodeMailer Testing',
		html: '<p>This is message from NodeMailer Testing contains</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.msg+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent! '+info.response);
			res.redirect('/');
		}
	});
});

app.listen(3000);
console.log('server is running on port 3000');