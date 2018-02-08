// import database connection

var connection = require("../config/connection.js");

// Object for SQL query statement functions

var orm = {
    // method to select all burgers in database
    selectAll: function(table, callback) {
        var qStr = "SELECT * FROM " + table + ";";
        connection.query(qStr, function(err, result)  {
            if (err) { throw err; }
            
            callback(result);

        });
    },

    // method to select one burger based on id
    // selectBurger: function(table, col, burger_id, callback) {
    //     var qStr = "SELECT * FROM " + table + " WHERE " + col + " = " + burger_id + ";";
    //     console.log(qStr);
    //     connection.query(qStr, function(err, result) {
    //         if (err) { throw err; }

    //         callback(result);
        
    //     });
    //  },

     // method to insert a new burger into database
     addBurger: function(table, cols, vals, callback) {

         var qStr = "INSERT INTO " + table;
         qStr += " (" + cols.toString() + ") ";
         qStr += "VALUES (?, ?) ";
        
        connection.query(qStr, vals, function(err, result) {
            if (err)  {throw err; }

            callback(result);
        });
     }, 

     // method to delete a burger from the database
     deleteBurger: function(table, col, val, callback) {
         var qStr = "DELETE FROM " + table;
         qStr += " WHERE " + col.toString() + " = '" + val.toString() + "' LIMIT 1; ";

         console.log(qStr);

         connection.query(qStr, function(err, result) {
             if (err) {throw err; }

             callback(result);
        });

     },

     // method to update a burgers devoured parameter
     updateBurger: function(table, change, condition, callback) {

         var qStr = "UPDATE " + table;
         qStr += " SET " + change + " WHERE " + condition;

         connection.query(qStr, function(err, result) {
             if (err) { throw err; }

             callback(result);
         });
     }, 

     // method to return all burgers to menu by resetting 'devoured' to 0
     resetAll: function(table, callback) {

        var qStr = "UPDATE " + table;
        qStr += " SET devoured = 0 WHERE devoured = 1;";

        connection.query(qStr, function(err, result) {
            if (err) { throw err; }

            callback(result);
        });

     }

}; // end of orm object

module.exports = orm;
