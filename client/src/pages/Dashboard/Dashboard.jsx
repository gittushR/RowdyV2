import React from "react";
import "./dashboard.css";
import ChatOption from "../../components/chatOption/ChatOption";
import { createNewChat } from "../../helpers/api-communicators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  // Mutations
  const mutation = useMutation({
    mutationFn: async (message) => await createNewChat(message),
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      nav(`/dashboard/chats/${id}`);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (!message) return;
    mutation.mutate(message);
  };
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="logo.png" alt="" />
          <h1>Rowdy AI </h1>
        </div>
        <div className="options">
          <ChatOption imgSrc={"chat.png"} content={"Create a new Chat"} />
          <ChatOption imgSrc={"image.png"} content={"Analyze Images"} />
          <ChatOption imgSrc={"code.png"} content={"Help me with my code"} />
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="message" placeholder="Ask me anything...." />
          <button>
            <img src="arrow.png" alt="submitButton" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
