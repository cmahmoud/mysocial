const router = require("express").Router();
const Controller = require("../controllers/post.controller");

router.post("/create", Controller.createNewPost);
router.post("/like/:id", Controller.like);
router.post("/unlike/:id", Controller.unlike);

module.exports = router;
