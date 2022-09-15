const mongoose = require("mongoose");

const Post = mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [commentSchema],
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Post", Post);