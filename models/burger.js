
// import ORM to interact with database

var orm = require("../config/orm.js");

// Create a burger object 

var burger = {

    // select all the burgers in burgers table
    all: function(callback) {
        orm.selectAll("burgers", function(res) {
            callback(res);
        });
    },

    // select a specific burger
    one: function(value, callback) {
        orm.selectBurger("burgers", "id", value, function(res) {
            callback(res);
        });
    },

    // add a new burger to the database
    add: function(cols, values, callback) {
        orm.addBurger("burgers", cols, values, function(res) {
            callback(res);
        });
    },

    // delete a burger from the menu
    delete: function(col, value, callback) {
        orm.deleteBurger("burgers", col, value, function(res) {
            callback(res);
        });
    },

    // update a burger on the database
    update: function(change, condition, callback) {
        orm.updateBurger("burgers", change, condition, function(res) {
            callback(res);
        });
    },

    // return all burgers to the menu
    reset: function(callback) {
        orm.resetAll("burgers", function(res) {
            callback(res);
        });
    }

}; // end of burger object


// export burger object fo ruse in the controller file
module.exports = burger;