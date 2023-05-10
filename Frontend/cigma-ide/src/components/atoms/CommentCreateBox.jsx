import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../styles/atoms/CommentCreateBox.module.scss";
import { addComment } from "../../store/codeEditorSlice";
import { FiEdit } from "react-icons/fi";

const CommentCreateBox = ({ codeEditorIndex }) => {
  const dispatch = useDispatch();
  // 댓글내용
  const [inputValue, setInputValue] = useState("");
  // 댓글 추가하기
  const add = (event) => {
    event.preventDefault();
    if (inputValue.length > 0) {
      dispatch(addComment({ codeEditorIndex: codeEditorIndex, comment: inputValue }));
      setInputValue("");
    } else {
      alert("댓글 내용 똑바로 입력하셈..");
    }
  };
  return (
    <div className={styles.commentBox}>
      <form className={styles.commentForm}>
        <input
          style={ {border:"none",  backgroundColor: "inherit"}}
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
          placeholder="comment 작성하기"
        />
        <button style={{backgroundColor: "transparent", border: "none"} } type="submit" onClick={add}>
          <FiEdit />
        </button>
      </form>
    </div>
  );
};

export default CommentCreateBox;
