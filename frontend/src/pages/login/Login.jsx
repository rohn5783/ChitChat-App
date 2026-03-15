import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import "../login/login.scss";

const Login = () => {
  const {
    formData,
    otp,
    setOtp,
    isOtpSent,
    isVerified,
    errorMsg,
    handleChange,
    handleAuthAction,
    handleVerifyOtp,
    showPassword,
    showOtp,
    togglePassword,
    toggleOtp
  } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    handleAuthAction("login");
  };

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

        {errorMsg && <div className="error-badge">{errorMsg}</div>}

        <form className="auth-fields">
          <div className="field-group">
            <div className="auth-label-row">
              <label className="auth-label">Email</label>
              <span className="auth-helper">Work or personal</span>
            </div>
            <input
              className="auth-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
              disabled={isOtpSent}
            />
          </div>

          <div className="field-group">
            <div className="auth-label-row">
              <label className="auth-label">Password</label>
              <span className="auth-helper">Min. 8 characters</span>
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="auth-input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                disabled={isOtpSent}
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={togglePassword}
                disabled={isOtpSent}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isOtpSent && !isVerified && (
            <div className="field-group fade-in">
              <div className="auth-label-row">
                <label className="auth-label">Verification Code</label>
                <span className="auth-helper">Check your email</span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="auth-input"
                  type={showOtp ? "text" : "password"}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
                <button
                  type="button"
                  className="eye-toggle-btn"
                  onClick={toggleOtp}
                >
                  {showOtp ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {!isOtpSent ? (
            <button className="auth-login-button" onClick={handleLogin}>Sign in</button>
          ) : !isVerified ? (
            <button className="auth-login-button" onClick={handleVerifyOtp}>Verify OTP</button>
          ) : (
            <button className="auth-login-button" disabled>Verified Successfully</button>
          )}
        </form>

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