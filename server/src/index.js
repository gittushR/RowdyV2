import { connectToDatabase } from "./repo/connection.js";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import appRouter from "./routes/routes.js";
import path from "path";

config();

const PORT = process.env.PORT || 5000;
const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.use(clerkMiddleware());

app.use("/api", appRouter);

if (process.env.NODE_ENV === "prod") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server connected to MongoDB, running on port ${PORT}`)
    );
  })
  .catch((err) => console.error(err));
