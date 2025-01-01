import axios from "axios";

const API = axios.create({ baseURL: "https://seatbooking-backend-tsp2.onrender.com/api" });

export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);
