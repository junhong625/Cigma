import axios from "axios";

const createApi = ({ path }) => {
  if (window.location.hostname === path) {
    const apiInstance = axios.create({
      baseURL: `http://${path}:5000/api`,
    });
    return apiInstance;
  } else {
    const apiInstance = axios.create({
      baseURL: `http://${path}/api`,
    });
    return apiInstance;
  }
};
export default createApi;
