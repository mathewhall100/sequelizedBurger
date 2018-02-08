
// dependencies

var express = require("express");
var bodyParser = require("body-parser");
var methovr = require("method-override");

var PORT = process.env.PORT || 3000;

var app = express();

// serve static content
app.use(express.static("public"));

// parse api URLs and json with bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// import routes
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function() {
    console.log("Listening at localhost: " + PORT);
});
