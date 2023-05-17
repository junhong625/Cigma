import React, { useRef } from 'react'
import styles from '../../styles/atoms/CreateProjectForm.module.scss';
import { FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import useModalClickOutside from "../../hooks/useModalClickOutside";
/**
 * 
 * @param setIsClicked:  나타나는 버튼 선택 여부
 * @param text : form 입력데이터 설정
 * @param setText : form 입력데이터 설정 useState
 * @param apiFunc : 전송버튼 클릭 시 api 호출
 *
 */
function CreateProjectForm({ setIsClicked, text, setText, apiFunc }) {
  const ref = useRef();
  useModalClickOutside(ref, () => {
    setIsClicked(false);
   })
  // onblur로 바깥영역 접근할때 클릭해제로 부모 조건에 의해 숨김처리되게끔?
  const dispatch = useDispatch();
  const add = (event) => { 
    event.preventDefault();
    if (text.length > 0) {
      apiFunc();
      setText("");
    } else { 
      alert("프로젝트 이름을 설정해주세요.");
    }

  }
  return (
    <div style={{
      display: "flex",
      position: "row"
    }}
    onBlur={() => { 
      console.log('blurred');
      setIsClicked(false);
  }}>
      <div className={styles.commentBox}
        
      >
        <form className={styles.commentForm}>
          <input
            style={{
              border: "none",
              backgroundColor: "inherit"
            }}
            type="text"
            onChange={(event) => setText(event.target.value)}
            value={text}
            placeholder="프로젝트 이름 작성"
          />
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            type="submit"
            onClick={() => { 
              add();
            }}
          >
            <FiEdit/>
          </button>
        </form>  
      </div>
    </div>
  )
}

export default CreateProjectForm