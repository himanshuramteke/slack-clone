import express from "express";
import { PORT } from "./config/serverConfig.js";
import { connectDB } from "./config/db.js";

const app = express();

app.get("/ping", (req, res) => {
  return res.json({ message: "Pong" });
});

app.listen(PORT, () => {
  console.log("Server is running on PORT: 5001");
  connectDB();
});
