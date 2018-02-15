var express = require("express");
var router = express.Router();

// require the models from index.js, burger.js & customer.js to use for database interaction

var db = require("../models");

// ====================================
// create routes with logic as required
// ===================================

router.get("/", function (req, res) {

    db.Burger.findAll({
        order: [
            ['burger_name', 'ASC']
        ]
    }).then(function (burgersList) {

        db.Customer.findAll({}).then(function (customerList) {

            db.Burger.findAll({
                include: {
                    model: db.Customer
                }
            }).then(function (eatenList) {


                var hbsObj = {
                    burgers: burgersList,
                    customers: customerList,
                    eatens: eatenList
                };

                console.log(hbsObj);
                res.render("index", hbsObj);

            });

        });

    });


});


router.post("/api/add", function (req, res) {
    db.Burger.create({
        burger_name: req.body.name,
        devoured: req.body.devoured
    }).then(function (burger) {
        // return id of new burger in dbBurger object
        res.json(burger);
    });
});


router.post("/api/new", function (req, res) {
    db.Customer.create({
        customer_name: req.body.name
    }).then(function (customer) {
        // return id of new customer in customer object
        res.json(customer);
    });
});



router.delete("/api/delete", function (req, res) {
    db.Burger.destroy({
        where: {
            burger_name: req.body.name
        }
    }).then(function (burger) {

        res.json(burger);
    })
    
    .catch(function (err) {
        console.log("error deleting burger: " + err);
        res.status(400);
    });

});

router.put("/api/eat/:id", function (req, res) {
    db.Burger.update({
            CustomerId: req.body.customerId,
            devoured: 1
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (burger) {

            res.json(burger);

        })

        .catch(function (err) {
            console.log("error eating burger: " + err);
            res.status(400);
        });


});

router.put("/api/clear", function (req, res) {
    db.Burger.update({
        devoured: 0
    }, {
        where: {}
    }).then(function (burger) {

        res.json(burger);

    })
    
    .catch(function (err) {
        console.log("error clearing plates burger: " + err);
        res.status(400);
    });

});



// export routes for use in server.js

module.exports = router;