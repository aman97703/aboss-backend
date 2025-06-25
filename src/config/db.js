/** @format */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGO_URL;

export async function initDB() {
  await mongoose
    .connect(URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}
