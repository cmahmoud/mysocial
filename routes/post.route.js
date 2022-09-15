const router = require("express").Router();
const Controller = require("../controllers/post.controller");

router.post("/create", Controller.createNewPost);
router.post("/like/:id", Controller.like);
router.post("/unlike/:id", Controller.unlike);
router.get("/all", Controller.getAllPosts);
router.get("/me", Controller.getMyPosts);
router.get("/:id", Controller.getSinglePost);

module.exports = router;
