import React from "react";
import styles from "../../styles/organisms/Comment.module.scss";
import CommentCreateBox from "../atoms/CommentCreateBox";
import CommentStoredBox from "../atoms/CommentStoredBox";
import { MdOutlineWarning } from "react-icons/md";
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
      {comments.length > 0 ? (
        <div className={styles["comment-container"]}>
          {comments.map((index) => {
            return <CommentStoredBox comment={index} key={index} />;
          })}
        </div>
      ) : (
        <div className={styles["comment-empty"]}>
          <div className={styles["comment-empty-box"]}>
            <div className={styles.font}>
              <MdOutlineWarning />
            </div>
            <div style={{ fontWeight: "bold" }}>아직 작성된 댓글이 없어요!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
