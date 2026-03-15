import React from "react";
import { motion } from "framer-motion";
import "../messagebubble/messagebubble.scss";

const MessageBubble = ({ text, own }) => {
  return (
    <motion.div
      className={own ? "bubble own" : "bubble"}
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {text}
    </motion.div>
  );
};

export default MessageBubble;