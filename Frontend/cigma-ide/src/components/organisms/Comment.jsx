import React from "react";
import styles from "../../styles/organisms/Comment.module.scss";
import CommentCreateBox from "../atoms/CommentCreateBox";
import CommentStoredBox from "../atoms/CommentStoredBox";

/**
 *
 * @param editor에서 사용되는 comment창
 */
const Comment = ({ comments, codeEditorIndex, left, height, width }) => {
  return (
    <div
      style={{
        top: 0,
        left: left,
        height: height,
        width: width,
      }}
      className={styles.comment}
    >
      <CommentCreateBox codeEditorIndex={codeEditorIndex} />
      {/* comment들 보여지는 컴포넌트 */}

      <div style={{ padding: "1em", background: "lightblue" }}>
        {comments.length !== 0 ? (
          <>
            {/* 일단 임의로 index로 돌리기 */}
            {comments.map((index) => {
              return <CommentStoredBox comment={index} key={index} />;
            })}
          </>
        ) : (
          <div>empty!!!</div>
        )}
      </div>
    </div>
  );
};

export default Comment;
