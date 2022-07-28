import express from "express";
import { signin, signup } from "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.route("/signin").post(signin);
userRouter.route("/signup").post(signup);
export default userRouter;
