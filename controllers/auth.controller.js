const User = require("../models/user.model");
const Schema = require("../lib/schema");
const validator = require("../middlewares/validator");

module.exports.register = [
    validator(Schema.register),
    async (req, res) => {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "user already exist" });
        }
        user = new User({ ...req.body });
        await user.save();
        return res.status(200).json({ message: "user created succcessfully" });
    },
];
