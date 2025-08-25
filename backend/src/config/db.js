import mongoose from "mongoose";
import { MONGODB_URI } from "./serverConfig.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
