import axios from "axios";

const token = JSON.parse(localStorage.getItem("jwt"))?.token;

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 2500,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const sendGoogleCredentialsThenFetchToken = (googleCredentials) =>
  API.post("/auth/google", googleCredentials);

export const sendFacebookCredentialsThenFetchToken = (facebookCredentials) =>
  API.post("/auth/facebook", facebookCredentials);

export const signIn = (formData) => API.post("/login", formData);
export const signUp = (formData) => API.post("/register", formData);
