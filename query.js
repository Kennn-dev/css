var express = require('express')
var bodyParser = require('body-parser')
var port = 3000;

var userRoute = require('./routes/user.route');

var app = express()
app.set('view engine', 'pug');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//Static file
app.use(express.static('public'))
//routes
app.get('/', function(req,res){
	res.render('index.pug',{
		name:'Ken'
	});
});

app.use('/users', userRoute);

app.listen(port, function(){
	console.log('Sever listening on port :'+ port);
})
















