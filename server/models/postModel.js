const mongoose = require("mongoose");

const postModel = mongoose.Schema(
  {
    name: String,
    title: String,
    content: String,
    likes: { type: Number, default: 0 },
    comments: [{ text: String }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postModel);

module.exports = Post;
