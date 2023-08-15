import  jwt from "jsonwebtoken";
import User from "../../DB/models/user.js";
import FriendShip from "../../DB/models/friendShip.js";
import { Op } from "sequelize";
import dotenv from "dotenv";
dotenv.config() ;

export async function addFriend(req, res) {
  try {
    //security for input 
    jwt.verify(req.headers.token, process.env.SECRET_KEY_TOKEN);
    const userId = jwt.decode(req.headers.token).id , reseiverId = req.params.id  ;
    
    let done = await FriendShip.findOrCreate({ where: { userId, reseiverId }, defaults: {userId , reseiverId} }) ;

    if(done[1]){
      res.json("request sent successfuly");
    }else {
      res.json("request already sent") ;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error_message: error.message, error });
  }
}

export async function acceptFriend(req, res) {
  try {
    // security on input
    jwt.verify(req.headers.token, process.env.SECRET_KEY_TOKEN);
    const reseiverId = jwt.decode(req.headers.token).id , userId = req.params.id ;

    let done = await FriendShip.update({ "friendShipStatus": "FRIENDS" }, { where: { reseiverId, userId, "friendShipStatus":"PENDING"}}) ;

    if(done[0]){
      res.json("you are now frinds");
    }else {
      res.json("problem has occured") ;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error_message: error.message });
  }
}

export async function getFriendRequests(req, res) {
  try {
    jwt.verify(req.headers.token, process.env.SECRET_KEY_TOKEN) ;
    const userId = jwt.decode(req.headers.token).id ;
    
    let requests = await FriendShip.findAll(
      {include:[{model:User , attributes:["username" , "image"]}]},
      { where: { "reseiverId": userId, "friendShipStatus":"PENDING"}}
    ) ;
    res.json(requests) ;
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error_message: error.message });
  }
}

export async function removeFriendRequest(req, res) {
  try {
    // security for input 
    jwt.verify(req.headers.token, process.env.SECRET_KEY_TOKEN);
    const reseiverId = jwt.decode(req.headers.token).id, userId = req.params.id;

    let done = await FriendShip.destroy({ where: { reseiverId, userId, "friendShipStatus":"PENDING" }} );

    if(done){
      res.json("request removed");
    }else {
      res.json("there is no request from him") ;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error_message: error.message });
  }
}

export async function removeFriend(req, res) {
  try {
    jwt.verify(req.headers.token, process.env.SECRET_KEY_TOKEN);
    const {friendId} = req.params  , userId = jwt.decode(req.headers.token).id ;

    let done = await FriendShip.destroy({ where: {
      [Op.or]: [{ userId, reseiverId: friendId }, { reseiverId: userId, userId: friendId },], "friendShipStatus":"FRIENDS"
    }}) ;
    
    if(done){
      res.json("frend removed");
    }else res.json("there is a problem");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error_message: error.message });
  }
}
