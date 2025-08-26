import express from "express";
import { NODE_ENV, PORT } from "./config/serverConfig.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/ping", (req, res) => {
  return res.json({ message: "Pong" });
});

const startServer = async () => {
  try {
    await connectDB();
    if (NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); //Exit the process with a failure code
  }
};

startServer();

export default app;
