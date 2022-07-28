import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postControllers.js";
import auth from "../middleware/authMiddleware.js";
const postRouter = express.Router();

postRouter.route("/").get(getPosts).post(auth, createPost);
postRouter.route("/:id").patch(auth, updatePost).delete(auth, deletePost);
postRouter.route("/:id/likePost").patch(auth, likePost);
export default postRouter;
