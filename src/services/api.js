import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-backend-es7r.onrender.com/api",
});

export default API;
