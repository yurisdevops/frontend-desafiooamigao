import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-desafiooamigao.onrender.com/",
});

export default api;
