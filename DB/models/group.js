import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.js";

const Group = sequelize.define("Group", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.STRING, allowNull: true },
});

User.hasMany(Group , {foreignKey : "adminId"}) ;
Group.belongsTo(User) ;
export default Group;
