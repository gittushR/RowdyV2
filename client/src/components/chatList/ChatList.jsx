import React from "react";
import "./chatList.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "../../helpers/api-communicators.js";
import Loader from "../Loader/Loader.jsx";

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => await getChatHistory(),
  });

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">About Rowdy AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="scrollbox">
        <div className="scrollbox-inner">
          <div className="list">
            {isPending ? (
              <Loader />
            ) : error ? (
              "Something went wrong!"
            ) : data.length ? (
              data.map((chat) => (
                <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                  {chat.title}
                </Link>
              ))
            ) : (
              <div>
                <img className="nothinghere" src="/notFound.png"></img>
                <p
                  style={{
                    display: "flex",
                    fontWeight: 600,
                    fontSize: "10px",
                    marginBottom: "5px",
                    justifyContent: "center",
                  }}
                >
                  Nothing here, talk more to see your Chats here...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default ChatList;
