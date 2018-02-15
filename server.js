// dependencies

var express = require("express");
var bodyParser = require("body-parser");
var methovr = require("method-override");

// Set uo express

var PORT = process.env.PORT || 3060;
var app = express();

// require sequelize models for syncing
var db = require("./models");

// serve static content
app.use(express.static("public"));

// parse api URLs and json with bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes
app.use( require("./controllers/burgers_controller.js"));

// sync sequelize model then start express

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("Listening at localhost: " + PORT);
    });
});