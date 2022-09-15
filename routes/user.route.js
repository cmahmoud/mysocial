const router = require("express").Router();
const Controller = require("../controllers/user.controller");

router.get("/profile", Controller.profile);
router.post("/follow/:id", Controller.follow);
router.post("/unfollow/:id", Controller.unfollow);

module.exports = router;
