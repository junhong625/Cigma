import createApi from "./api";

// 프로젝트 리스트
export const callProjects = async (token, id) => {
  const api = createApi({ token });
  try {
    const response = await api.get(`/team/projects/${id}`);
    return {
      status: response.status,
      projectList: response.body.data,
    };
  } catch (error) {
    console.error("browse error", error);
    return {
      status: error.response.status,
    };
  }
};

// 프로젝트 생성

// 프로젝트 삭제

// 프로젝트 수정
