import React from "react";
import styled from "../../styles/atoms/CommentStoredBox.module.scss";
/**
 * 댓글 리스트들 보여주는 컴포넌트
 * @returns
 */
const CommentStoredBox = ({ comment }) => {
  return <div style={{ position: "flex" }}>{comment}</div>;
};

export default CommentStoredBox;
