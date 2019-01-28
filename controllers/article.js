const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
    clear: function (req, res) {
        db.Article
            .deleteMany({})
            .then(function (articles) {
                return db.Note.deleteMany({});
            })
            .then(function () {
                res.send("All articles and notes have been deleted.")
            })
    },
    scrape: function (req, res) {
        axios.get("https://old.reddit.com/r/pathofexile/").then(function (response) {
            const $ = cheerio.load(response.data);
            
            $("p.title").each(function (i, element) {
                const article = {};
                article.saved = false;
                article.title = $(element).children("a").text();
                article.link = $(element).children("a").attr("href");

                db.Article.create(article);
                console.log(article);
            })
        });
        res.send("Scrape completed");
    },
    findAll: function (req, res) {
        db.Article
            .find()
            .then(function (articles) {
                res.json(articles);
            });
    },
    findOne: function (req, res) {
        db.Article
            .findById(req.params._id)
            .populate("note")
            .then(function (article) {
                res.json(article);
            });

    },
    update: function (req, res) {
        console.log("req.body save article id: ", req.body);
        db.Article
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(function (article) {
                res.json(article);
            });
    },
    deleteOne: function (req, res) {
        console.log("req.body delete article test: ", req.params.id);
        db.Article
            .deleteOne({
                _id: req.params.id
            }).then(function (article) {
                res.json(article);
            });
    }




};