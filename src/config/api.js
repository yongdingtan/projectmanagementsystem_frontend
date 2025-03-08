import axios from "axios";

// Update this to your Render backend URL
export const API_BASE_URL = "https://projectmanagementsystem-frontend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Set default headers
api.defaults.headers.post["Content-Type"] = "application/json";

// Function to update the Authorization header dynamically
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Initialize the Authorization header with the token from localStorage (if it exists)
const jwt = localStorage.getItem("jwt");
setAuthToken(jwt);

export default api;