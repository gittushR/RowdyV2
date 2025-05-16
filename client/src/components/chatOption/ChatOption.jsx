import React from "react";
import './chatOption.css';

const ChatOption = ({imgSrc , content}) => {
  return (
    <div className="option">
      <img src={imgSrc} />
      <span>{content}</span>
    </div>
  );
};

export default ChatOption;
