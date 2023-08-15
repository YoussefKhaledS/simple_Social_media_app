import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { Sequelize } from "sequelize";

const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING , allowNull: false  , unique: true},
  phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  image: { type: DataTypes.STRING, allowNull: true },
  accountStatus: {
    type: DataTypes.ENUM(["ACTIVE", "PENDING"]),
    defaultValue: "PENDING",
  },
  forgetPasswordCode: { type: DataTypes.STRING, allowNull: true },
  forgetPasswordCodeVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
});



export default User;
