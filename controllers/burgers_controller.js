var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");


router.get("/", function(req, res) {
    burger.selectAll(function(data){
        console.log(data)    
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res){
    burger.insertOne(["burger_name", " devoured"], 
        [req.body.burger_name, req.body.devoured], function (result) {
    
    res.json(result);
    })
});

router.put("/api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id;
    console.log("burger", condition);

    burger.updateOne({devoured: req.body.devoured}, condition, function(result){
        console.log(result);
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

module.exports = router;