import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.js";
import Post from "./post.js";

const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  comment: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Comment, { foreignKey: "userId" });
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(User) ;
Comment.belongsTo(Post) ;

export default Comment;
