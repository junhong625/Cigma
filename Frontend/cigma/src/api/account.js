import createApi from "./api";

// 로그인
export const login = async (userEmail, userPass) => {
  const api = createApi();
  try {
    const response = await api.post(`/user/login`, {
      userEmail: userEmail,
      userPass: userPass,
    });
    return {
      status: response.status,
      token: response.data.accessToken,
      R_token: response.data.refreshToken,
    };
  } catch (error) {
    console.error("login error", error);
    return {
      status: error.response.status,
    };
  }
};

// 회원가입
export const signup = async (userEmail, userPass, userName) => {
  const api = createApi();

  try {
    const response = await api.post(`/user`, {
      userEmail,
      userPass,
      userName,
    });
    return {
      status: response.status,
    };
  } catch (error) {
    console.error("signup error:", error);
  }
};

// 회원탈퇴
export const signout = async () => {
  const api = createApi();

  try {
    const response = await api.delete(`/user`);
    return {
      status: response.status,
    };
  } catch (error) {
    console.error("signout error:", error);
    return {
      status: error.response.status,
    };
  }
};
