import "../instrument.mjs";
import express from "express";
import { FRONTEND_URL, NODE_ENV, PORT } from "./config/serverConfig.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import * as Sentry from "@sentry/node";
import cors from "cors";

const app = express();

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

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
