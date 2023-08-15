import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.js";
import Post from "./post.js";

const Reaction = sequelize.define("reaction", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  reaction: {
    type: DataTypes.ENUM(["LOVE", "CARE", "WOW", "SAD", "LIKE"]),
    allowNull: false,
  },
});

User.hasMany(Reaction, { foreignKey: "userId" });
Post.hasMany(Reaction, { foreignKey: "postId" });
Reaction.belongsTo(User) ;
Reaction.belongsTo(Post) ;

export default Reaction;
