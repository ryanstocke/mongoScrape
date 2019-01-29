var db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Note
            .find()
            .then(function(notes){
                res.json(notes);
            });
    },
    findOne: function(req, res) {
        db.Note
            .findbyId(req.params._id)
            .then(function(note){
                res.json(note);
            });
    },
    create: function(req, res) {
        db.Note
            .create({ text: req.body.text })
            .then(function(note){
                return db.Article.findOneAndUpdate({ _id: req.body.articleId }, { $set: { note: note._id}}, { new: true});
                
            })
            .then(function(article){
                res.json(article)
            })

    },
    update: function(req, res) {
        console.log("req.body", req.body);
        db.Note
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(function(note){
                res.json(note);
            });
    },
    delete: function(req, res) {
        console.log("Note deleted: ", req.body);
        db.Note
        .delete({
            _id: req.params.id
        }).then(function(note){
            console.log(note);
            res.json(note);
        });
    }

};