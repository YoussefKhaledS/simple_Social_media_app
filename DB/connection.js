import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config() ;
export const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD + '#', {
  host: "localhost",
  dialect: "mysql",
});

export async function connectDB() {
  try {
    const result = await sequelize.sync({ alter: true });
  } catch (error) {
    console.log(`Failed to connect database `, error);
  }
}
