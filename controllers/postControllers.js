import mongoose from "mongoose";
import Post from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
export const createPost = async (req, res) => {
  const newUserPost = req.body;
  const newPost = new Post(newUserPost);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID");
  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
  res.status(200).json(updatedPost);
};
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID");
  await Post.findByIdAndDelete(_id);
  res.status(200).json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!req.userId) return res.status(404).json({ message: "Unauthorized" });
  console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that ID");
  const post = await Post.findById(_id);
  const index = post.likes.findIndex((_id) => _id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((_id) => {
      id !== String(req.userId);
    });
  }
  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
  res.status(200).json(updatedPost);
};
