const MODIFY_USERTOKEN = "userToken/MODIFY_USERTOKEN";
const INIT_USERTOKEN = "userToken/INIT_USERTOKEN";

// 액션 생성함수를 만든다.
export const modifyUserToken = (data) => ({
  data: data,
  type: MODIFY_USERTOKEN,
});
export const initUserToken = () => ({ type: INIT_USERTOKEN });

// 초기값 제작
const initialState = "";

/* 리듀서 선언 */
export default function userToken(state = initialState, action) {
  switch (action.type) {
    case MODIFY_USERTOKEN:
      return action.data;
    case INIT_USERTOKEN:
      return initialState;
    default:
      return state;
  }
}
