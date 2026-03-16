import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true
});

export async function login({ email, password }) {
    const response = await api.post("/login", { email, password })
    return response.data
}

export async function register({ name, email, password }) {
    const response = await api.post("/register", { name, email, password })
    return response.data
}

export async function verifyOtp({ email, otp }) {
    const response = await api.post("/verify-otp", { email, otp })
    return response.data
}

export async function logout() {
    const response = await api.post("/logout")
    return response.data
}


export const getCurrentUser = async () => {
  const res = await api.get("/check");
  return res.data.user;
};