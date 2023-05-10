import axios from "axios";
const { VITE_WS_BACK } = import.meta.env;

const createApi = (props) => {
  // 인자값으로 토큰을 받았을 떄
  console.log(props.token);
  if (props != undefined) {
    const apiInstance = axios.create({
      baseURL: `${VITE_WS_BACK}/api`,
      headers: {
        "Content-Type": "application/json",
        Authorization: " Bearer " + props.token,
      },
    });
    return apiInstance;
  } else {
    // 인자값을 받지 않았을 때
    const apiInstance = axios.create({
      baseURL: `${VITE_WS_BACK}/api`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return apiInstance;
  }
};

export default createApi;
