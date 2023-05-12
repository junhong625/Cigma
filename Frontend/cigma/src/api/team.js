import createApi from "./api";

// 팀 호출
export const callTeams = async (token) => {
  const api = createApi({ token });
  try {
    const response = await api.get(`/user/team`);
    console.log(JSON.stringify(response));
    return {
      status: response.status,
      teamList: response.data,
    };
  } catch (error) {
    console.error("browse error", error);
    return {
      status: error,
    };
  }
};

//팀 생성
export const createTeams = async (token, teamName) => {
  const api = createApi({ token });
  try {
    const response = await api.post(`/team`, {
      teamName: teamName,
    });
    return {
      status: response.status,
    };
  } catch (error) {
    console.error("team creation error", error);
    return {
      status: error,
    };
  }
};

/**
 * 팀 삭제 API
 * @params teamIdx
 */

export const deleteTeam = async (token, teamIdx) => {
  const api = createApi({ token });
  try {
    const response = await api.delete(`/team/${teamIdx}`);
    return {
      status: response.status,
    };
  } catch (error) {
    console.error("team delete error", error);
    return {
      status: error.response.status,
    };
  }
};
