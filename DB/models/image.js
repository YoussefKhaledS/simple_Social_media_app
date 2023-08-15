import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../connection.js";
import Post from "./post.js";

const Image = sequelize.define("post_image", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  imagePath: { type: DataTypes.STRING, allowNull: false },
});
Post.hasMany(Image , {foreignKey: "postId"}) ;
Image.belongsTo(Post) ;

export default Image;
