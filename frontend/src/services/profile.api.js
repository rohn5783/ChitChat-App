import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true
});

export const updateProfile = async (data) => {

  const res = await api.patch(
    "/update-profile",
    data
  );

  return res.data;
};