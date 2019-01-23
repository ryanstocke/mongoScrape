var router = require("express").Router();
var noteRoutes= require("./notes");
var articleRoutes = require("./articles");

// /api/articles/ ???
router.use("/articles", articleRoutes);

// /api/notes/ ???
router.use("/notes", noteRoutes);

module.exports = router;