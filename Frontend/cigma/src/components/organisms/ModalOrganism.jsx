import React from "react";
import useModalClickOutside from '../../hooks/useModalClickOutside'
import styles from '../../styles/organisms/ModalOrganism.module.scss';

function ModalOrganism({ type, action, setModalOpen, apiFunc }) {
  // project 생성
  /**
   * 상위 컴포넌트에서 세팅해야할 것
   1. * 액션 클릭했을때 Modal 컴포넌트 보여주기
  const [modalOpen, setModalOpen] = useState(false);
  <button onClick={() => setModalOpen(true)}>클릭해야할것</button>

  2. props 넘겨주기
  - type : 종류 (일기장, 일기, 댓글, 대나무, 대나무잎)
  - action : 삭제, 신고
  - apiFunc : 예 선택시 실행할 함수
  {modalOpen && (
    <Modal type={'댓글신고'} setModalOpen={setModalOpen} apiFunc={api 요청 보낼 함수} />
    )}
    */
  
  const ref = useRef();
  useModalClickOutside(ref, () => {
    setModalOpen(false);
  });
  return <div>ModalOrganism</div>;
}

export default ModalOrganism;
