import api from "./api";

// 로그인
export const login = async (userEmail, userPass) => {
  try {
    const response = await api.post(`/user/login`, {
      userEmail,
      userPass,
    });
    return {
      status: response.status,
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
