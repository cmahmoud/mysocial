const router = require("express").Router();
const Controller = require("../controllers/user.controller");

router.get("/profile", Controller.profile);

module.exports = router;
