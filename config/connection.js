// Set up the mysql connection to burger_db
var mysql = require("mysql");

var connection;

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({

		host: "localhost",
		user: "root",
		password: "",
		database: "burgers_db"

	});
}


	// make the connection
	connection.connect(function (err) {
		if (err) {
			console.error("An error occurred connecting to the database: " + err.stack);
			return;
		}
		console.log("Connected as id " + connection.threadId);
	});


	// export the connection
	module.exports = connection;