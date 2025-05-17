import { connectToDatabase } from "./src/repo/connection.js";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import appRouter from "./src/routes/routes.js";

config();

const PORT = process.env.PORT || 5000;

const app = express();

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

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server connected to MongoDB, running on port 5000")
    );
  })
  .catch((err) => console.error(err));
