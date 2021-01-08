import axios from "axios";

const instance = axios.create({
  // baseURL: 'https://discord-backend-definite.herokuapp.com/'
  baseURL: "http://localhost:8000/api/",
});

export default instance;
