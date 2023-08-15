import { Router } from "express";
import * as authController from "./auth.controller.js";
import upload from "../middlewares/multer.js";
import cloudinaryUpload from "../middlewares/cloudinaryMulter.js";
import validate from "../middlewares/inputValidator.js"
import * as shema from "./shema.js"
const router = Router();

router.post("/register" , cloudinaryUpload.single('image') , validate(shema.register)  , authController.registerUser);

router.post("/login",validate(shema.login) ,  authController.loginUser);

router.get("/confirm-email/:token" , authController.confirmEmail);

router.post("/forget-password",validate(shema.forgetPassword),  authController.forgetPassword);

router.post("/verify-forget-password",validate(shema.verficationCode) , authController.verifyForgetPasswordCode);

router.post("/change-password",validate(shema.changePassword) ,  authController.changePassword);

export default router;
