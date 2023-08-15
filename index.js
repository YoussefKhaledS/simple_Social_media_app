import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import friendshipRouter from "./modules/friendship/friendship.router.js";
import postRouter from "./modules/post/post.router.js";
import User from "./DB/models/user.js";
import Post from "./DB/models/post.js";
import Comment from "./DB/models/comment.js";
import FriendShip from "./DB/models/friendShip.js";
import Reaction from "./DB/models/reaction.js";
import Group from "./DB/models/group.js";
import image from "./DB/models/image.js";
dotenv.config();

const app = express();

app.use(express.json());


app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/friendship", friendshipRouter);
app.use("/post", postRouter);

// connectDB();
const PORT = parseInt(process.env.PORT);

app.listen(PORT, () => console.log(`App Running on Port ${PORT}`));
