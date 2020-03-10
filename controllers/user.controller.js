var db = require("../db");
var shortid = require('shortid');

module.exports.index = function(req,res){
	res.render("users/index",{
		users: db.get("users").value()
	});
};

module.exports.search = function(req,res){
	var q = req.query.q;
	var users = db.get("users").value();
	var matchUsers = db.get("users").value().filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ;
	});

	res.render("./index",{
		users: matchUsers
	});
}

module.exports.create = function(req,res){
	res.render('users/create'); 
}

module.exports.get = function(req,res){
	var id = req.params.id;

	var user = db.get('users').find({ id: id }).value();
	res.render('users/view',{
		user: user
	});
}

module.exports.postCreate = function(req,res){
	req.body.id = shortid.generate();
	var errors = [];

	if (!req.body.name) {
		errors.push("User Name is required");
	}

	if (!req.body.phone) {
		errors.push("User Phone is required");
	}
	if (errors.length > 0) {
		res.render('users/create',{
			errors: errors,
			values: req.body
		}); 
		return;
	}
	db.get('users').push(req.body)
	.write();
	res.redirect('/users');
}