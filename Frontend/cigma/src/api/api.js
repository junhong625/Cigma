import axios from "axios";

const api = axios.create({
  baseURL: "http://k8a601.p.ssafy.io:9090/api",
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer ' + token
  },
});

export default api;
