import createApi from "./api";

// 팀 호출
export const callTeams = async (token) => {
  const api = createApi({ token });
  try {
    const response = await api.get(`/user/team`);
    return {
      status: response.status,
      teamList: response.body.data,
    };
  } catch (error) {
    console.error("browse error", error);
    return {
      status: error.response.status,
    };
  }
};

//팀 생성

//팀 삭제
