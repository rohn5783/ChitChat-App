import { useState } from "react";
import { login, register, verifyOtp } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const navigate = useNavigate();

  /* ---------- TOGGLE PASSWORD ---------- */

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const toggleOtp = () => {
    setShowOtp(prev => !prev);
  };

  /* ---------- INPUT CHANGE ---------- */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  /* ---------- LOGIN / REGISTER ---------- */

  const handleAuthAction = async (actionType) => {

    setErrorMsg("");

    try {

      if (actionType === "login") {

        await login({
          email: formData.email,
          password: formData.password
        });

      }

      if (actionType === "register") {

        await register(formData);

      }

      // OTP SENT
      setIsOtpSent(true);

    } catch (error) {

      setErrorMsg(
        error?.message ||
        `${actionType === "login" ? "Login" : "Registration"} failed`
      );

    }

  };

  /* ---------- VERIFY OTP ---------- */

  const handleVerifyOtp = async (e) => {

    e.preventDefault();

    setErrorMsg("");

    try {

      const data = await verifyOtp({
        email: formData.email,
        otp
      });

      setIsVerified(true);

      // LOGIN STATE
      localStorage.setItem("isLoggedIn", "true");

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // SAVE profileCompleted FLAG SEPARATELY
      localStorage.setItem(
        "profileCompleted",
        data?.user?.profileCompleted ? "true" : "false"
      );

      // REDIRECT
      if (data?.user?.profileCompleted) {

        navigate("/chat", { replace: true });

      } else {

        navigate("/profile", { replace: true });

      }

    } catch (error) {

      setErrorMsg(
        error?.message || "Invalid OTP"
      );

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
