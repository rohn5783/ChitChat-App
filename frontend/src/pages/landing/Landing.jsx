import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./landing.scss";

const Landing = () => {
  const dynamicWords = ["Realtime", "Minimal", "Modern"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 2200);

    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="landing-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="landing-orbit landing-orbit--one" />
      <div className="landing-orbit landing-orbit--two" />
      <div className="landing-orbit landing-orbit--three" />

      <header className="landing-header">
        <div className="landing-logo">
          <span className="landing-logo-mark">✦</span>
          <span className="landing-logo-text">ChitChat</span>
        </div>

        <nav className="landing-nav">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <a href="/chat">Open Chat</a>
        </nav>
      </header>

      <main className="landing-main">
        <motion.section
          className="landing-hero"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <motion.div
            className="landing-hero-text"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="landing-pill">
              <span className="landing-pill-label">Built for</span>
              <span
                key={dynamicWords[wordIndex]}
                className="landing-pill-dynamic"
              >
                {dynamicWords[wordIndex]}
              </span>
            </p>
            <h1>
              Talk with{" "}
              <span className="landing-highlight">style &amp; speed</span>.
            </h1>
            <p className="landing-subtitle">
              ChitChat is your calm, beautifully crafted space to connect with
              friends, share ideas, and keep every conversation in one sleek
              timeline.
            </p>

            <div className="landing-actions">
              <a href="/register" className="landing-cta landing-cta--primary">
                Start chatting
                <span className="landing-cta-pulse" />
              </a>
              <a href="/login" className="landing-cta landing-cta--ghost">
                I already have an account
              </a>
            </div>

            <div className="landing-metas">
              <span>Secure by design</span>
              <span>Fast on any device</span>
              <span>Built for day &amp; night</span>
            </div>
          </motion.div>

          <motion.div
            className="landing-hero-preview"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="preview-card preview-card--left">
              <div className="preview-avatar-row">
                <span className="preview-dot preview-dot--green" />
                <span className="preview-name">web3.rohit</span>
              </div>
              <p className="preview-message">“Jump into the room, let’s ship!”</p>
            </div>

            <div className="preview-card preview-card--right">
              <div className="preview-bubbles">
                <span className="preview-bubble" />
                <span className="preview-bubble preview-bubble--two" />
                <span className="preview-bubble preview-bubble--three" />
              </div>
              <p className="preview-message-small">
                Clean UI. Fluid motion. Zero noise.
              </p>
            </div>
          </motion.div>
        </motion.section>

        <footer className="landing-footer">
          <div className="landing-footer-text">
            <span className="landing-love">
              Built with <span className="landing-heart">♥</span> by
              <span className="landing-author"> web3.rohit</span>
            </span>
          </div>

          <div className="landing-links">
            <a
              href="https://github.com/rohn5783"
              target="_blank"
              rel="noreferrer"
              className="social-chip social-chip--github"
            >
              <span className="social-glow" />
              <span className="social-label" aria-label="GitHub" role="img">
                <svg
                  className="social-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.69.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.09 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.18 9.18 0 0 1 12 6.09c.85 0 1.7.12 2.49.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.96-2.34 4.82-4.57 5.08.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.82 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                </svg>
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/rohit-pandey-bb9468355"
              target="_blank"
              rel="noreferrer"
              className="social-chip social-chip--linkedin"
            >
              <span className="social-glow" />
              <span className="social-label" aria-label="LinkedIn" role="img">
                <svg
                  className="social-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.93 6 2.5 6S0 4.88 0 3.5 1.05 1 2.48 1 4.98 2.12 4.98 3.5zM.24 8.25h4.52V23H.24zM8.34 8.25h4.33v2.01h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.02 5.42 6.96V23h-4.52v-7.1c0-1.69-.03-3.86-2.35-3.86-2.35 0-2.71 1.83-2.71 3.73V23H8.34z" />
                </svg>
              </span>
            </a>
            <a
              href="mailto:web3developer.rohit@gmail.com"
              className="social-chip social-chip--mail"
            >
              <span className="social-glow" />
              <span className="social-label" aria-label="Email" role="img">
                <svg
                  className="social-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 3.25-7.2 4.5c-.48.3-1.12.3-1.6 0L4 7.25V6l8 5 8-5z" />
                </svg>
              </span>
            </a>
          </div>
        </footer>
      </main>
    </motion.div>
  );
};

export default Landing;

