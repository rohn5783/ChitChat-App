import { createContext, useState, useEffect } from "react";
import { login, register, verifyOtp, logout } from "../services/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await login({ email: "rp512@gmail.com", password: "123456" });
        setUser(response);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error logging in:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  const loginUser = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await login({ email, password });
      setUser(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      setIsLoading(true);
      const response = await register({ name, email, password });
      setUser(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error registering:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtpUser = async (email, otp) => {
    try {
      setIsLoading(true);
      const response = await verifyOtp({ email, otp });
      setUser(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setIsLoading(true);
      const response = await logout();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        loginUser,
        registerUser,
        verifyOtpUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
 
  
 