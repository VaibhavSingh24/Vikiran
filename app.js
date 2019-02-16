var express= require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect('mongodb://localhost:27017/vikiran', {useNewUrlParser: true});

//adding Static File Folder//

var VikiranSchema = new mongoose.Schema({
	name: String, 
	phone: Number, 
	course: String,
	semester: Number,
	email: String
});

var clothPainting = mongoose.model("clothPainting", VikiranSchema);

app.use(express.static('public'));

app.set("view engine", "ejs");


// routing part starts here. // 

app.get("/", function(req, res){
	res.render("index");
});

app.get("/about", function(req, res){
	res.render("about");
});

app.get("/register", function(req, res){
	res.render("register");
});

app.get("/clothDesign", function(req, res){
	res.render("clothDesign");
});

app.get("/soloDance", function(req, res){
	res.render("soloDance");
});

app.get("/event/duetDance", function(req, res){
	res.render("duetDance");
});

app.get("/clothDesign", function(req, res){
	res.render("clothDesign");
});

app.post("/register",urlencodedParser, function(req, res){
	//get data from form and add to glitch array.
	var name = req.body.name;
	var phone = req.body.phone;
	var course = req.body.course;
	var semester = req.body.semester;
	var email = req.body.email;
	var data = {name: name, phone: phone, course: course, semester: semester, email: email};
	//Create a new entry and save it to DB
	clothPainting.create(data, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			// redirect to campground page
			res.redirect("/"); 
		}
	});		 
});

app.get("/event", function(req, res){
	res.render("event");
});


 app.listen(3000, "0.0.0.0", function(){
	console.log("Server is live at port 3000");
 });
