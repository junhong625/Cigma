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
      data: response.data,
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

// 팀 이름 변경
export const changeTeamName = async (token, teamName, teamIdx) => {
  const api = createApi({ token });
  try {
    const response = await api.patch(`/team/${teamIdx}`, {
      teamName: teamName,
    });
    return {
      status: response.status,
      team: response.data,
    };
  } catch (error) {
    console.log("teamname change error", error);
    return {
      status: error.response.status,
    };
  }
};

// 팀원 추가
export const addMember = async (token, teamIdx, userEmail) => {
  const api = createApi({ token });
  try {
    const response = await api.patch(`/team/${teamIdx}/add`, {
      userEmail: userEmail,
    });
    return {
      status: response.status,
      team: response.data,
    };
  } catch (error) {
    console.log("add member error", error);
    return {
      status: error.response.status,
    };
  }
};

// 팀원 제거
export const deleteMember = async (token, teamIdx, userEmail) => {
  const api = createApi({ token });
  try {
    const response = await api.patch(`/team/${teamIdx}/pop`, {
      userEmail: userEmail,
    });
    return {
      status: response.status,
      team: response.data,
    };
  } catch (error) {
    console.log("member delete  error", error);
    return {
      status: error.response.status,
    };
  }
};

// 팀 정보 조회
export const getAllTeamInfo = async (token, teamIdx) => {
  const api = createApi({ token });
  try {
    const response = await api.get(`/team/${teamIdx}`);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("select error", error);
    return {
      status: error.response.status,
    };
  }
};
