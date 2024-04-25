const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

const allPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to get the posts");
  }
});

const uploadPost = asyncHandler(async (req, res) => {
  try {
    const { title, content, name } = req.body;
    console.log(title, content)
    if (!title || !content) {
      return res
        .status(400)
        .json({ error: "Title and content are required fields" });
    }

    var newPost = {
      name,
      title,
      content,
    };

    var post = await Post.create(newPost);
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500);
    throw new Error("Error creating post");
  }
});

const likes = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.likes += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500);
    throw new Error("Error liking post");
  }
});

const comments = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({ text });
    await post.save();

    res.json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500);
    throw new Error("Error adding comment");
  }
});

module.exports = { allPosts, uploadPost, likes, comments };
