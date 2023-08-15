import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.js";

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  content: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Post , {foreignKey: "userId"}) ;
Post.belongsTo(User) ;

export default Post