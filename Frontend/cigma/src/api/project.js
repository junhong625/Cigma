import createApi from './api';

// 프로젝트 리스트
export const callProjects = async (token, id) => {
  const api = createApi({ token });
  try {
    const response = await api.get(`/team/${id}/project`);
    return {
      status: response.status,
      projectList: response.data,
    };
  } catch (error) {
    console.error('browse error', error);
    return {
      status: error.response.status,
    };
  }
};

/**
 * 프로젝트 생성 API
 * @param {*} token 
 * @description 
 * post::baseurl/api/project
 * body: projectName, teamIdx
 * @return
 * {
    "projectIdx": 7,
    "teamIdx": 7,
    "projectUrl": "asdasd",
    "projectName": "yoonjinchiippo",
    "projectImageUrl": "https://cigma-ajh.s3.ap-northeast-2.amazonaws.com/Projects/Image/default.png",
    "inTrashCan": false
}
 */
export const createProject = async (token, projectName, teamIdx) => {
  const api = createApi({ token });
  try {
    const response = await api.post(`/project`, {
      projectName: projectName,
      teamIdx: teamIdx,
    });
    return {
      status: response.status,
      projectInfo: response.data,
    };
  } catch (error) {
    console.error('project create error', error);
    return {
      status: error.response.status,
    };
  }
};
/**
 * 프로젝트 삭제 API
 * @params token, projectIdx
 * @returns status code 200 / null
 */
export const deleteProject = async (token, projectIdx) => {
  const api = createApi({ token });
  try {
    const response = await api.delete(`/project/${projectIdx}`);
    return {
      status: response.status,
    };
  } catch (error) {
    console.error('project delete error', error);
    return {
      status: error.response.status,
    };
  }
};
// 프로젝트 수정

// 포트번호 받아오기
// api/canvas/{id}
export const getPortNumber = async (token, projectIdx) => {
  const api = createApi({ token });
  try {
    const response = await api.post(`/canvas/${projectIdx}`);
    return {
      status: response.status,
      portNum: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: error,
    };
  }
};
