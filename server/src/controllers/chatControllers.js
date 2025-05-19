import Chat from "../models/chat.js";
import UserChats from "../models/userChats.js";
import { getAuth } from "@clerk/express";

export const createNewChat = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    const text = req.body.message;

    //creating the first chat element
    const newChat = new Chat({
      userId: userId,
      history: [
        {
          role: "user",
          parts: [{ text }],
        },
      ],
    });
    const savedChat = await newChat.save();

    //check if the userchats exist
    const userChats = await UserChats.find({ userId: userId });
    //if userChat doesn't exist create a new one and add the chat in the chats array for the user
    if (!userChats.length) {
      const newUserChat = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });
      await newUserChat.save();
    } else {
      //if userChat exist, just push the newly created chat to the chats array for the user
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
    }
    return res.status(200).json(newChat._id);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while creating a new chat" });
  }
};

export const fetchUserChats = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    const userChats = await UserChats.find({ userId });

    if (userChats.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(userChats[0].chats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Something went wrong while fetching existing chats for the user",
    });
  }
};

export const fetchChat = async (req, res, next) => {
  try {
    const { userId, sessionId } = getAuth(req);
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    return res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching chat history",
    });
  }
};

export const saveChats = async (req, res, next) => {
  const { question, answer, img } = req.body.message;

  try {
    const { userId } = getAuth(req);
    const newItems = [
      ...(question
        ? [
            {
              role: "user",
              parts: [{ text: question }],
              ...(img && { img }),
            },
          ]
        : []),
      { role: "model", parts: [{ text: answer }] },
    ];
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    return res.status(200).json(updatedChat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding conversation" });
  }
};
