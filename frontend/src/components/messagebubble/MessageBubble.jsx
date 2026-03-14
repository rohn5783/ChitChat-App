import React from "react";
import "../messagebubble/messagebubble.scss";

const MessageBubble = ({ text, own }) => {
  return (
    <div className={own ? "bubble own" : "bubble"}>
      {text}
    </div>
  );
};

export default MessageBubble;