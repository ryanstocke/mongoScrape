var router = require("express").Router();
var db = requires("../../models");

router.get("/", function(req, res){
    db.Article
        .find({ saved: false })
        .then(function(articles){
            res.render("articles", { articles });
        });
    });

    router.get("/saved", function(req, res){
        db.Article
            .find({ saved: true })
            .populate("note")
            .then(function(articles){
                res.render("saved", { articles });
            });
        });

module.exports = router;