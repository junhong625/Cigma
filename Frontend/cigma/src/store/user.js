// 로그인 성공 시 async로 회원정보 조회해서 redux store에 저장시켜버리자
// userId (userEmail)
// userImage (userImage 링크)

const SET_USER_ID = "user/SET_USER_ID";
const SET_USER_IMAGE = "user/SET_USER_IMAGE";

// 액션 생성자
// 값 업데이트 용도?
// TODO: 이거 로그아웃 할 때 다 날려버리는 거 처리해야한다.
export const setUserID = (id) => ({
  type: SET_USER_ID,
  payload: id,
});
export const setUserImage = (url) => ({
  type: SET_USER_IMAGE,
  payload: url,
});

const initialState = {
  userId: "",
  userImage: "",
};

export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case SET_USER_IMAGE:
      return {
        ...state,
        userImage: action.payload,
      };
    default:
      return state;
  }
}

// selsector
export const selectUserId = (state) => state.userInfo.userId;
export const selectUserImage = (state) => state.userInfo.userImage;
