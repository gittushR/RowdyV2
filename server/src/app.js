import express from "express";
import appRouter from "./routes/routes.js";
import cors from "cors";
import { config } from "dotenv";
import { clerkMiddleware } from "@clerk/express";
config();

const app = express();

app.use(cors({ origin:process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use(clerkMiddleware());

app.use("/api", appRouter);

export default app;
