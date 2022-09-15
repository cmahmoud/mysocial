const router = require("express").Router();
const Controller = require("../controllers/user.controller");

router.get("/profile", Controller.profile);
router.get("/follow/:id", Controller.follow);
router.get("/unfollow/:id", Controller.unfollow);

module.exports = router;
