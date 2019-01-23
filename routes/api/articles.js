const router = require("express").Router();
const articleController = require("../../controllers/article");

// /api/articles/clear
router.get("/clear", articleController.clear);
// /api/articles/scrape
router.get("/scrape", articleController.scrape);
// /api/articles/all
router.get("/all", articleController.findAll);
// /api/articles/
router.get("/:id", articleController.findOne);
router.put("/:id", articleController.update);
router.delete("/:id", articleController.deleteOne);

module.exports = router;