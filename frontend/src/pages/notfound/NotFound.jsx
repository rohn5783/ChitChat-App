import React from "react";
import { motion } from "framer-motion";
import "./notfound.scss";

const NotFound = () => {
  return (
    <div className="notfound-page">
      <motion.div
        className="notfound-card"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="notfound-glow" />
        <p className="notfound-kicker">Oops, nothing here</p>
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">
          The page you are looking for doesn&apos;t exist or was moved.
        </p>

        <div className="notfound-actions">
          <a href="/" className="notfound-primary">
            Go back to login
          </a>
          <a href="/chat" className="notfound-secondary">
            Open chat
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

