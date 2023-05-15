import React from "react";
import styles from "../../styles/atoms/CommentStoredBox.module.scss";
/**
 * 댓글 리스트들 보여주는 컴포넌트
 * @returns
 */
const CommentStoredBox = ({ comment }) => {
  return (
    <div className={styles["comment-container"]}>
      <div>{comment}</div>
      <div>{comment}</div>
    </div>
  );
};

export default CommentStoredBox;
