const User = require("../models/user.model");
const isAuthenticated = require("../middlewares/auth");

// GET /api/user/profile
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
// POST /api/user/follow/:id
module.exports.follow = [
    isAuthenticated,
    async (req, res) => {
        let current = await User.findById(req.user.id);
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "Invalid id" });
        }
        if (user.followers.includes(current._id.toString())) {
            return res
                .status(400)
                .json({ message: "you already follow this user" });
        }
        user.followers.push(current._id);
        current.following.push(user._id);
        await user.save();
        await current.save();
        return res.status(201).send({ message: "user followed successfully" });
    },
];
// POST /api/user/unfollow/:id
module.exports.unfollow = [
    isAuthenticated,
    async (req, res) => {
        let current = await User.findById(req.user.id);
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "Invalid id" });
        }
        if (!user.followers.includes(current._id.toString())) {
            return res
                .status(400)
                .json({ message: "you already unfollow this user" });
        }
        user.followers.pull(current._id);
        current.following.pull(user._id);
        await user.save();
        await current.save();
        return res
            .status(200)
            .send({ message: "user unfollowed successfully" });
    },
];
