const User = require("../models/user.model");
const Post = require("../models/post.model");
const Schema = require("../lib/schema");
const validator = require("../middlewares/validator");
const isAuthenticated = require("../middlewares/auth");

// Get /api/post/:id
module.exports.getSinglePost = [
    isAuthenticated,
    async (req, res) => {
        const post = await Post.findById(req.params.id).populate({
            path: "comments",
            populate: { path: "user", select: "fname lname email username" },
        });
        return res
            .status(200)
            .json({ post, message: "post created successfully" });
    },
];
// Get /api/post/me
module.exports.getMyPosts = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.user.id);
        const posts = await Post.find({ user: user._id })
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "fname lname email username",
                },
            })
            .populate("user", "fname lname email username")
            .sort("-createdAt");
        return res.status(200).json(posts);
    },
];
// Get /api/post/all
module.exports.getAllPosts = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.user.id);
        const posts = await Post.find({
            user: { $in: [...user.followers, user._id] },
        })
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "fname lname email username",
                },
            })
            .populate("user", "fname lname email username")
            .sort("-createdAt");
        return res.status(200).json(posts);
    },
];

// POST /api/post/create
module.exports.createNewPost = [
    isAuthenticated,
    validator(Schema.PostOrComment),
    async (req, res) => {
        const post = new Post({ ...req.body, user: req.user.id });
        await post.save();
        return res
            .status(200)
            .json({ post, message: "post created successfully" });
    },
];

// POST /api/post/like/:postId
module.exports.like = [
    isAuthenticated,
    async (req, res) => {
        let post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(400).json({ message: "Invalid post id" });
        }
        if (post.likes.includes(req.user.id)) {
            return res
                .status(400)
                .json({ message: "you already like this post" });
        }
        post.likes.addToSet(req.user.id);
        await post.save();
        return res
            .status(201)
            .json({ post, message: "post is liked successfully" });
    },
];
// POST /api/post/unlike/:postId
module.exports.unlike = [
    isAuthenticated,
    async (req, res) => {
        let post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(400).json({ message: "Invalid post id" });
        }
        if (!post.likes.includes(req.user.id)) {
            return res.status(400).json({ message: "you not like this post" });
        }
        post.likes.pull(req.user.id);
        await post.save();
        return res
            .status(201)
            .json({ post, message: "post is liked successfully" });
    },
];
