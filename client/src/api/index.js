import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getComments = (type, postId) => API.get(`/${type}s/${postId}/comment`);

export const createComment = (type, postId, body) => API.post(`/${type}s/${postId}/comment`, body);

export const likeAndUnlikePost = (type, postId) => API.get(`/${type}s/${postId}/like`);

export const getSharedPosts = () => API.get("/timeline");

export const getProfilePosts = (meOrUserId = "me") => API.get(`/users/${meOrUserId}`);

export const getMyPost = (type, postId) => API.get(`/${type}s/my/${postId}`);

export const getPost = (type, postId) => API.get(`/${type}s/${postId}`);

export const createPost = (type, body) => API.post(`/${type}s`, body);

export const updatePost = (type, postId, body) => API.put(`/${type}s/${postId}`, body);

export const deletePost = (type, postId) => API.delete(`/${type}s/${postId}`);

export const authControl = () => API.get("/auth");

export const sendGoogleCredentialsThenFetchToken = (googleCredentials) =>
  API.post("/auth/google", googleCredentials);

export const sendFacebookCredentialsThenFetchToken = (facebookCredentials) =>
  API.post("/auth/facebook", facebookCredentials);

export const signIn = (formData) => API.post("/login", formData);
export const signUp = (formData) => API.post("/register", formData);
