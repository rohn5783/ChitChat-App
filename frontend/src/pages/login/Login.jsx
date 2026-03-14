import React from "react";
import "../login/login.scss";

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-box fade-in">
        <div className="auth-header">
          <span className="glass-card__badge">Welcome back</span>
          <h2 className="auth-title">Sign in to ChitChat</h2>
          <p className="auth-subtitle">
            Continue the conversation on any device, anytime.
          </p>
        </div>

        <div className="auth-fields">
          <div className="field-group">
            <div className="auth-label-row">
              <label className="auth-label">Email</label>
              <span className="auth-helper">Work or personal</span>
            </div>
            <input
              className="auth-input"
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div className="field-group">
            <div className="auth-label-row">
              <label className="auth-label">Password</label>
              <span className="auth-helper">Min. 8 characters</span>
            </div>
            <input
              className="auth-input"
              placeholder="••••••••"
              type="password"
            />
          </div>
        </div>

        <button className="auth-login-button">Sign in</button>

        <div className="auth-footer">
          <div className="auth-meta">
            <span className="auth-small-text">New to ChitChat?</span>
            <a href="/register">Create account</a>
          </div>
          <p className="auth-small-text">Forgot password? It’s coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;