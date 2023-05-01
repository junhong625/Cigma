import { useDispatch, useSelector } from "react-redux";
import {
  selectDefaultColor,
  selectDefaultFontSize,
} from "../../store/defaultTextSlice";
import { useEffect, useRef, useState } from "react";
import {
  setInputFieldBlurred,
  setInputFieldFocused,
} from "../../store/toolSlice";
import { modifyText } from "../../store/textSlice";
import { activateSelctor } from "../../store/toolSlice";
import style from "../../styles/organisms/TextEditor.module.scss";
import { SHAPE_TEXT_STYLES } from "../../constants/styles";

const TextEditior = ({ textIndex, artBoardRef, ...textEditor }) => {
  const dispatch = useDispatch();

  const defaultColor = useSelector(selectDefaultColor);
  const defaultFontSize = useSelector(selectDefaultFontSize);

  const textRef = useRef();
  const inputRef = useRef();

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const handleBlur = (event) => {
    const newText = {
      // 택스트 내용
      text: inputRef.textContent,
      // 색상
      color: defaultColor,
      // 폰트사이즈
      fontSize: defaultFontSize,
      // 높이
      height: event.target.clientHeight,
      // 가로
      width: event.target.clientWidth,
      // Text index
      textIndex: textIndex,
    };
    setIsDoubleClicked(false);
    dispatch(modifyText(newText));
    dispatch(activateSelctor());
    dispatch(setInputFieldBlurred());
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [inputRef, isDoubleClicked]);

  useEffect(() => {
    if (!textRef.current) return;
    if (textEditor.height !== textRef.current.clientHeight) {
      dispatch(
        modifyText({
          textIndex: textIndex,
          height: textEditor.current.clientHeight,
          width: textEditor.current.clientWidth,
        })
      );
    }
  }, [textEditor, textIndex, dispatch]);

  if (isDoubleClicked)
    return (
      <form>
        <div
          ref={inputRef}
          className={style.input}
          style={{
            top: textEditor.top,
            left: textEditor.left,
            fontSize: defaultFontSize,
            color: defaultColor,
          }}
          contentEditable="plaintext-only"
          suppressContentEditableWarning
          // 맞춤법 검사 여부
          spellCheck={false}
          // 포커스 시 이벤트
          onFocus={() => dispatch(setInputFieldFocused())}
          // 포커스 해제 시 이벤트
          onBlur={handleBlur}
        >
          {textEditor.text}
        </div>
      </form>
    );
  // 아닐때
  return (
    <>
      <div
        ref={textRef}
        className={style.idle}
        style={{
          top: textEditor.top,
          left: textEditor.left,
          fontSize: textEditor.fontSize,
          color: textEditor.color,
          borderBottom: SHAPE_TEXT_STYLES.BORDER,
        }}
        // 더블 클릭시
        onDoubleClick={() => {
          setIsDoubleClicked(true);
        }}
      >
        {textEditor.text}
      </div>
    </>
  );
};

export default TextEditior;
