import { useState } from "react";
import { login, register, verifyOtp } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleOtp = () => setShowOtp(!showOtp);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAuthAction = async (actionType) => {
    setErrorMsg("");
    try {
      if (actionType === "login") {
        await login({ email: formData.email, password: formData.password });
      } else if (actionType === "register") {
        await register(formData);
      }
      setIsOtpSent(true);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || `${actionType === "login" ? "Login" : "Registration"} failed`);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await verifyOtp({ email: formData.email, otp });
      setIsVerified(true);
      setTimeout(() => navigate("/profile"), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Invalid OTP");
    }
  };

  return {
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
  };
};
