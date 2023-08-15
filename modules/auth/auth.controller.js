import User from "../../DB/models/user.js";
import cloudinary from "../../serveses/cloudinary.js";
import sendEmail from "../../serveses/sendEmail.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import crypto from "crypto"
dotenv.config() ;

export async function registerUser(req, res) {
  try {
    
    const { username, email, password, phoneNumber } = req.body;
    
    let path = req.file ;
    let imag ={"secure_url":null};
    if(path){
      imag = await cloudinary.uploader.upload(req.file.path , {folder:"uploads"});
    }
    
    const hashedpass = await bcrypt.hash(password,parseInt(process.env.SALT_ROUNDS)) ;
    await User.create({username , email ,password: hashedpass , phoneNumber , image:imag.secure_url}) ;
    const token = jwt.sign({ email }, process.env.SECRET_KEY_TOKEN , {expiresIn: "1h"}) ;
    let url = `http://localhost:3000/auth/confirm-email/${token}` ;
    let html = `<a href="${url}"><h1>Click here to verify your account</h1></a>`;
    sendEmail(email , html) ;

    res.json("Email sent"); 
  } catch (error) {
    res.json({ message: `Internal Server Error ${error.message}`, error });
  }
}

export async function loginUser(req, res) {
  try {
    
    const {username , password} = req.body ;

    let user = await User.findOne({ where: { username, accountStatus:"ACTIVE"}}) , confirmpass = false;
    if(user)
      confirmpass = await bcrypt.compare(password , user.password);

    if(confirmpass){
      const token = jwt.sign({"id":user.id} , process.env.SECRET_KEY_TOKEN , {expiresIn:"1h"}) ;
      res.json(`login successfully , your token : ${token}`) ;
    }else {
      res.json("wrong cridentials") ;
    }
  } catch (error) {
    res.json({ message: `Internal Server Error ${error.message}`, error });
  }
}

export async function confirmEmail(req, res) {
  try {
    
    jwt.verify(req.params.token , process.env.SECRET_KEY_TOKEN);
    const {email} =jwt.decode(req.params.token)  ;
    
    let done = await User.update({ "accountStatus": "ACTIVE" } , {where:{email}}) ;
    
    res.redirect("/auth/login") ;
  } catch (error) {
    res.json({ message: `Internal Server Error ${error.message}`, error });
  }
}

export async function forgetPassword(req, res) {
  try {
    
    const {email} = req.body ;

    let code = parseInt(crypto.randomBytes(6).toString('hex') , '16')%1000000 ;
    let html = `<h1>Your 6 digit code</h1> <h2>${code}</h2>` ;

    let success = await User.update({"forgetPasswordCode":code},{where : {email}}) ;
    sendEmail(email ,html);
    res.json("check your email for verifcation code") ;

  } catch (error) {
    res.json({ message: `Internal Server Error ${error.message}`, error });
  }
}

export async function verifyForgetPasswordCode(req, res) {
  try {
    //security for input needed 
    const {code}  = req.body ;
    
    jwt.verify(req.headers.token , process.env.SECRET_KEY_TOKEN ) ;
    const {id} = jwt.decode(req.headers.token) ;

    let found = await User.update({"forgetPasswordCodeVerified":true},{ where: { "forgetPasswordCode": code  , id }});
    
    if(found[0]){
      res.json("verfied") ;
    }else {
      res.json("wrong code") ;
    }

  } catch (error) {
    res.json({ message: `Internal Server Error ${error.message}`, error });
  }
}

export async function changePassword(req, res) {
  try {
    
    const {newPass , confirmPass} = req.body ;
    jwt.verify(req.headers.token , process.env.SECRET_KEY_TOKEN) ;
    const {id} = jwt.decode(req.headers.token) ;
    
    const hashedpass = await bcrypt.hash(newPass , parseInt(process.env.SALT_ROUNDS)) ;

    let found = await User.update({ "password": hashedpass, "forgetPasswordCodeVerified": false, "forgetPasswordCode": null }, { where: {"forgetPasswordCodeVerified":true , id }});
    
    if(found[0]){
      res.json("password updated successfully");
    }else {
      res.json("password not updated") ;
    }
    
  } catch (error) {
    res.json({ message: `Internal Server Error ${error.message}`, error });
  }
}

