import React from "react";
import { BsFillFolderFill } from "react-icons/bs";
import { BsFillFileImageFill } from "react-icons/bs";
import { BsFileText } from "react-icons/bs";
import { BsFileTextFill } from "react-icons/bs";

export const TypeIcon = (props) => {
  if (props.droppable) {
    return <BsFillFolderFill />;
  }

  // 입력된 data의 fileType에 따라 아이콘을 변경
  switch (props.fileType) {
    case "png":
      return <BsFillFileImageFill />;
    case "csv":
      return <BsFileText />;
    case "txt":
      return <BsFileTextFill />;
    default:
      return null;
  }
};
