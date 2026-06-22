import axios from "axios";

const API = axios.create({
  baseURL: "https://e-com-backend-eufc.onrender.com",
});
delete API.defaults.headers.common["Authorization"];
export default API;
