const User = require("../models/user.model");
const isAuthenticated = require("../middlewares/auth");

module.exports.profile = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "Invalid id" });
        }
        return res.status(200).send(user);
    },
];
