const SET_PROJECT_INDEX = 'project/SET_PROJECT_INDEX';
const SET_PROJECT_NAME = 'project/SET_PROJECT_NAME';

// 액션 생성자 생성.
// projectIndex와 projectName 업데이트
export const setProjectIndex = (index) => ({
  type: SET_PROJECT_INDEX,
  payload: index,
});

export const setProjectName = (name) => ({
  type: SET_PROJECT_NAME,
  payload: name,
});

const initialState = {
  projectIndex: 0,
  projectName: '',
};

export default function projectInfo(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT_INDEX:
      return {
        ...state,
        projectIndex: action.payload,
      };
    case SET_PROJECT_NAME:
      return {
        ...state,
        projectName: action.payload,
      };
    default:
      return state;
  }
}

// selector 추가
export const selectProjectIndex = (state) => state.project.projectIndex;
export const selectProjectName = (state) => state.project.projectName;
