import axios from "axios";

const api = axios.create({
  baseURL: "/api/auth",
  withCredentials: true
});

/* ---------------- LOGIN ---------------- */

export async function login({ email, password }) {
  try {

    const response = await api.post("/login", {
      email,
      password
    });

    return response.data;

  } catch (error) {

    throw error.response?.data || { message: "Login failed" };

  }
}

/* ---------------- REGISTER ---------------- */

export async function register({ name, email, password }) {
  try {

    const response = await api.post("/register", {
      name,
      email,
      password
    });

    return response.data;

  } catch (error) {

    throw error.response?.data || { message: "Register failed" };

  }
}

/* ---------------- VERIFY OTP ---------------- */

export async function verifyOtp({ email, otp }) {
  try {

    const response = await api.post("/verify-otp", {
      email,
      otp: otp.toString() // ⭐ important fix
    });

    return response.data;

  } catch (error) {

    console.error("OTP Error:", error.response?.data);

    throw error.response?.data || { message: "OTP verification failed" };

  }
}

/* ---------------- LOGOUT ---------------- */

export async function logout() {
  try {

    const response = await api.post("/logout");

    return response.data;

  } catch (error) {

    throw error.response?.data || { message: "Logout failed" };

  }
}

/* ---------------- CURRENT USER ---------------- */

export const getCurrentUser = async () => {

  try {

    const res = await api.get("/me");

    return res.data.user;

  } catch (error) {

    throw error.response?.data || { message: "User fetch failed" };

  }

};