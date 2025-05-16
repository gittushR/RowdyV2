import axios from "axios";

// export const sendChatReq = async (message,id) => {
//   console.log(message);

// };

export const createNewChat = async (message) => {
  const res = await axios.post("chat/newChat", { message });

  if (res.status !== 200) {
    throw new Error("Unable to create new chat message");
  }
  const data = await res.data;
  return data;
};

export const getChatHistory = async () => {
  const res = await axios.get("chat/userChats");

  if (res.status !== 200) {
    throw new Error("Unable to create new chat message");
  }

  const data = await res.data;
  return data;
};

export const getChat = async (id) => {
  const res = await axios.get(`chat/${id}`);

  if (res.status !== 200) {
    throw new Error("Unable to create new chat message");
  }
  console.log(res);
  const data = await res.data;
  return data;
};

export const sendChat = async (id, message) => {
  console.log(message);
  const res = await axios.put(`chat/new/${id}`, { message });

  if (res.status !== 200) {
    throw new Error("Unable to send chat message, Login again");
  }
  const data = await res.data;
  return data;
};
