import { connectToDatabase } from "./src/repo/connection.js";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import appRouter from "./src/routes/routes.js";
import path from "path";
import url, { fileURLToPath } from "url";

config();

const PORT = process.env.PORT || 5000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated");
});

app.use(express.static(path.join(__dirname, "../client/dist")));


connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server connected to MongoDB, running on port 5000")
    );
  })
  .catch((err) => console.error(err));
