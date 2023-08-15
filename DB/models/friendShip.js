import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.js";

const FriendShip = sequelize.define("FriendShip", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  friendShipStatus: { type: DataTypes.ENUM(["PENDING", "FRIENDS"]), allowNull: false, defaultValue: "PENDING" },
});

User.hasMany(FriendShip, { foreignKey: "userId" });
User.hasMany(FriendShip, { foreignKey: "reseiverId" });
FriendShip.belongsTo(User); 

export default FriendShip;
