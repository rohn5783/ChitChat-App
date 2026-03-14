import React from "react";
import "../register/register.scss";

const Register = () => {
  return (
    <div className="register-page">
      <div className="register-box fade-in">
        <div className="register-header">
          <div className="register-badge">Get started</div>
          <h2 className="register-title">Create your space</h2>
          <p className="register-subtitle">
            A modern chat experience with a sleek dark UI.
          </p>
        </div>

        <div className="register-fields">
          <div className="field-group">
            <div className="register-label-row">
              <label className="register-label">Full name</label>
            </div>
            <input
              className="register-input"
              type="text"
              placeholder="John Doe"
            />
          </div>

          <div className="field-group">
            <div className="register-label-row">
              <label className="register-label">Email</label>
            </div>
            <input
              className="register-input"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="field-group">
            <div className="register-label-row">
              <label className="register-label">Password</label>
              <span className="register-helper">At least 8 characters</span>
            </div>
            <input
              className="register-input"
              type="password"
              placeholder="Create a strong password"
            />
          </div>
        </div>

        <button className="register-button">Create account</button>

        <div className="register-footer">
          <p className="login-link">
            Already have an account?{" "}
            <a className="link" href="/">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;