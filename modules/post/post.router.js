import { Router } from "express";
import * as controler from "./post.controller.js"
import cloudinaryUpload from "../middlewares/cloudinaryMulter.js";
import multerErrorHandeler from "../middlewares/multerErrorHandeler.js";
import validate from "../middlewares/inputValidator.js";
import * as shema from "./shema.js" 
const router = Router();

router.post("/create-post"  , cloudinaryUpload.array("image" , 4) , multerErrorHandeler, validate(shema.createPost),   controler.createPost) ; 
router.get("/get-user-posts" , controler.getUserPosts);
router.delete("/delete-post/:id" , controler.deletePost);
router.patch("/updatePost/:id" , validate(shema.createPost) ,controler.updatePost) ;

export default router;
