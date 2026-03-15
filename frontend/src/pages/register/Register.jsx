import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import "../register/register.scss";

const Register = () => {
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

  const handleRegister = (e) => {
    e.preventDefault();
    handleAuthAction("register");
  };

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

        {errorMsg && <div className="error-badge">{errorMsg}</div>}

        <form className="register-fields">
          <div className="field-group">
            <div className="register-label-row">
              <label className="register-label">Full name</label>
            </div>
            <input
              className="register-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              disabled={isOtpSent}
            />
          </div>

          <div className="field-group">
            <div className="register-label-row">
              <label className="register-label">Email</label>
            </div>
            <input
              className="register-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={isOtpSent}
            />
          </div>

          <div className="field-group">
            <div className="register-label-row">
              <label className="register-label">Password</label>
              <span className="register-helper">At least 8 characters</span>
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="register-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
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
              <div className="register-label-row">
                <label className="register-label">Verification Code</label>
                <span className="register-helper">Sent to your email</span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="register-input"
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
             <button className="register-button" onClick={handleRegister}>Create account</button>
          ) : !isVerified ? (
             <button className="register-button" onClick={handleVerifyOtp}>Verify OTP</button>
          ) : (
             <button className="register-button" disabled>Verified Successfully</button>
          )}

        </form>

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