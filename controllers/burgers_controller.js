var express = require("express");
var router = express.Router();

// require the models from index.js and  burger.js to use for database interaction

var db = require("../models");

// create routes with logic as required

router.get("/", function (req, res) {
    console.log("get api call made");
    db.Burger.findAll({ order: [['burger_name', 'ASC']] }).then(function (dbBurger) {
        var hbsObj = {
            burgers: dbBurger
        };

        console.log(hbsObj);
        res.render("index", hbsObj);
    });

});


router.post("/api/add", function (req, res) {
    db.Burger.create({
        burger_name: req.body.name,
        devoured: req.body.devoured
    }).then(function (dbBurger) {
        // return id of new burger in dbBurger object
        res.json(dbBurger);
    });
});



router.delete("/api/delete", function (req, res) {
    db.Burger.destroy({
        where: {
            burger_name: req.body.name
        }
    }).then(function (dbBurger) {
        res.json(dbBurger);

        // what about catching failure as we did with the ORM calls
        /*
            if (result.affectedRows === 0) {
                // delete failed
                return res.status(404).end();
            }
            res.status(200).end();
        */
    });

});

router.put("/api/eat/:id", function (req, res) {
    db.Burger.update({
        devoured: 1
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (dbBurger) {

        res.json(dbBurger);

        // what about catching failure as we did with the ORM calls
        /*
            if (result.changedRows === 0) {
                // no changes made
                return res.status(404).end();  // may need to edit to retrun something more sensible
            }
            res.status(200).end(); // may need to edit to retrun something more sensible
        */
    });
});

router.put("/api/clear", function (req, res) {
    db.Burger.update({
        devoured: 0
    }, {
        where: {}
    }).then(function (dbBurger) {

        res.json(dbBurger);

        // what about catching failure as we did with the ORM calls
        /*
            if (result.changedRows === 0) {
                // no changes made
                return res.status(404).end(); // may need to edit to retrun something more sensible
            }
            res.status(200).end(); // may need to edit to retrun something more sensible
        */
    });

});



// export routes for use in server.js

module.exports = router;