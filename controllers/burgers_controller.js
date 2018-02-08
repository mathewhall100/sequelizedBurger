

var express = require("express");
var router = express.Router();

// import the model burger.js to use for database interaction

var burger = require("../models/burger.js");

// create routes with logic as required

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObj = {
            burgers: data
        };

        console.log(hbsObj);
        res.render("index", hbsObj);
    });

});

router.post("/api/add", function(req, res) {

    burger.add(["burger_name", "devoured"], [req.body.name, req.body.devoured], function(result) {
        // return id of new burger
        res.json({id: result.insertId});  // assume insertId is a proprty of returned result
    });
});

router.delete("/api/delete", function(req, res) {

    burger.delete("burger_name", req.body.name, function(result) {
        if (result.affectedRows === 0) {
            // delete failed
            return res.status(404).end();
        }
        res.status(200).end();
    });

});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    var change = "devoured = 1";

    burger.update(change, condition, function(result) {
        if (result.changedRows === 0) {
            // no changes made
            return res.status(404).end();  // may need to edit to retrun something more sensible
        }
        res.status(200).end(); // may need to edit to retrun something more sensible
    });
});

router.put("/api/reset", function(req,res) {
    burger.reset(function(result) {
        if (result.changedRows === 0) {
        // no changes made
        return res.status(404).end();  // may need to edit to retrun something more sensible
    }
    res.status(200).end(); // may need to edit to retrun something more sensible

    });

});




// export routes for use in server.js
module.exports = router;
