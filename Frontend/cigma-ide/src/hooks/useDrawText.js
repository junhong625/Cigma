import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentScale,
  selectCurrentTool,
  selectIsDragScrolling,
  selectIsSelectorActivated,
} from "../store/toolSlice";
import {
  selectDefaultColor,
  selectDefaultFontSize,
  selectDefaultThickness,
} from "../store/defaultTextSlice";

const useDrawText = () => {
  const dispatch = useDispatch();

  const currentScale = useSelector(selectCurrentScale);
  const defaultColor = useSelector(selectDefaultColor);
  const defaultFontSize = useSelector(selectDefaultFontSize);
  const defaultThickness = useSelector(selectDefaultThickness);
  const currentTool = useSelector(selectCurrentTool);
  const isDragScrolling = useSelector(selectIsDragScrolling);
  const isSelctorActivated = useSelector(selectIsSelectorActivated);
};

export default useDrawText;
