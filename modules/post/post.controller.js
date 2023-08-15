import jwt from "jsonwebtoken";
import dotenv from "dotenv" ;
import cloudinary from "../../serveses/cloudinary.js";
import Post from "../../DB/models/post.js";
import Image from "../../DB/models/image.js";
dotenv.config() ;

export async function createPost(req, res) {
  try {
    jwt.verify(req.headers.token, process.env.SECRET_KEY_TOKEN);
    const userId = jwt.decode(req.headers.token).id  , {content} = req.body;
    let files = req.files , images = [];
    if(files){
      for(let i = 0 ; i< files.length ; i++){
        let path  = await cloudinary.uploader.upload(files[i].path , {folder: "uploads"}) ;
        images.push(path.secure_url);
      }
    }
    let postId = (await Post.create({content , userId} , {returning: true})).id ;
    let imagesrows = [ ] ;
    images.forEach(element => {
      let row = { "imagePath": element, postId } ;
      imagesrows.push(row) ;
    });

    Image.bulkCreate(imagesrows) ;

    res.json("post created") ;
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error_message: error.message });
  }
}

export async function getUserPosts(req, res) {
  try {
    jwt.verify(req.headers.token, process.env.SECRET_KEY_TOKEN);
    const userId = jwt.decode(req.headers.token).id ;
    res.json(await Post.findAll({include: Image},{where:{userId}}));
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error_message: error.message });
  }
}

export async function deletePost(req, res) {
  try {
    jwt.verify(req.headers.token, process.env.SECRET_KEY_TOKEN);
    const userId = jwt.decode(req.headers.token).id , {id} = req.params;
    let deleted = await Post.destroy({where:{userId , id}}) ;
    if(deleted){
      await Image.destroy({where: {postId: null}}) ;
    }
    res.json("post deleted") ;
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error_message: error.message });
  }
}

export async function updatePost(req, res) {
  try {
    
    jwt.verify(req.headers.token , process.env.SECRET_KEY_TOKEN) ;
    const userId = jwt.decode(req.headers.token).id , {content} = req.body , {id} = req.params;
    let done = await Post.update({content} , {where: {userId, id}}) ;
    if(done[0])res.json("post updated") ;
    else res.json("this is not your post") ;

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error_message: error.message });
  }
}
