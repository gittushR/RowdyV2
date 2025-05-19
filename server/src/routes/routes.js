import { Router } from "express";
import { uploadFiles } from "../controllers/fileController.js";
import {
  createNewChat,
  fetchChat,
  fetchUserChats,
  saveChats,
} from "../controllers/chatControllers.js";
import { requireAuth } from "@clerk/express";
import path from "path";

const appRouter = Router();

// appRouter.get("/test", requireAuth(), (req, res) => {
//   const userId = req.auth.userId;
//   console.log(userId);
//   res.send("it works");
// });

// Upload files to Imagekit Server
appRouter.get("/upload", requireAuth(), uploadFiles);

//save conversations
appRouter.put("/chat/new/:id", requireAuth(), saveChats);

//Create a new UserChat
appRouter.post("/chat/newChat", requireAuth(), createNewChat);

//Fetch user chats
appRouter.get("/chat/userChats", requireAuth(), fetchUserChats);

//Fetch chats of that particular id
appRouter.get("/chat/:id", requireAuth(), fetchChat);

appRouter.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

export default appRouter;
