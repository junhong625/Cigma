import React from "react";
import { BsFillFolderFill } from "react-icons/bs";
import { BsFillFileImageFill } from "react-icons/bs";
import { BsFileText } from "react-icons/bs";
import { BsFileTextFill } from "react-icons/bs";

export const TypeIcon = (props) => {
  if (props.droppable) {
    return <BsFillFolderFill />;
  }

  switch (props.fileType) {
    case "image":
      return <BsFillFileImageFill />;
    case "csv":
      return <BsFileText />;
    case "text":
      return <BsFileTextFill />;
    default:
      return null;
  }
};
