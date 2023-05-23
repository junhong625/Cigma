import reactDom from "react-dom";

// 모달 Render를 root 밖에서 하기 위한 Portal
const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");
  return reactDom.createPortal(children, el);
};

export default ModalPortal;