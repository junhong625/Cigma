import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "../../styles/organisms/DevDocs.module.scss";

export const DevDocs = () => {
  const codeRenderer = ({ value }) => {
    return <pre>{value}</pre>;
  };
  const breakRenderer = () => {
    return <br />;
  };

  const emojiRenderer = ({ children }) => {
    const emojiName = children[0].value; // 이모지 이름은 자식 노드의 값으로 전달됩니다
    const emojiUnicode = emoji.getUnicode(emojiName); // emoji-dictionary를 사용하여 이모지의 유니코드를 가져옵니다

    if (emojiUnicode) {
      return <span>{emojiUnicode}</span>; // 이모지를 렌더링합니다
    } else {
      return <span>{children}</span>; // 이모지가 없는 경우 텍스트로 렌더링합니다
    }
  };

  const renderers = {
    code: codeRenderer,
    break: breakRenderer,
    emoji: emojiRenderer,
  };

  const markdown = `
  ## 개발자 튜토리얼
  
  > Cigma는 오픈소스 프로젝트로 소스코드를 공개하고 있습니다. 
  
  ---
  ### Cigma IDE 실행 방법
  
  step 1. 원격 저장소 복제하기

  \`\`\`
  $ git clone {URL}
  \`\`\`

  step 2. 프로젝트 폴더로 이동

  \`\`\`
  $ cd Frontend/Cigma-ide
  \`\`\`

  step 3. 동작에 필요한 node_modules 다운로드

  \`\`\`
  $ npm i
  \`\`\`

  step 4. project 실행

  \`\`\`
  $ npm run dev
  \`\`\`

  ---
  ### 프로젝트 구조

  Cigma-ide 파일 구조

  \`\`\`
  // 폴더경로
  // cigma-ide/src
  src
  ┣ api
  ┃ ┣ .gitkeep
  ┃ ┗ fileTree.js
  ┣ assets
  ┃ ┗ react.svg
  ┣ components
  ┃ ┣ atoms
  ┃ ┃ ┣ ButtonAtom.jsx
  ┃ ┃ ┣ CommentCreateBox.jsx
  ┃ ┃ ┣ CommentStoredBox.jsx
  ┃ ┃ ┣ CursorAtom.jsx
  ┃ ┃ ┣ CustomDragPreviewAtom.jsx
  ┃ ┃ ┣ CustomNodeAtom.jsx
  ┃ ┃ ┣ EditPointer.jsx
  ┃ ┃ ┣ HeaderBtnAtom.jsx
  ┃ ┃ ┣ TypeIconAtom.jsx
  ┃ ┃ ┗ UserToken.jsx
  ┃ ┣ organisms
  ┃ ┃ ┣ CodeEditor.jsx
  ┃ ┃ ┣ CodeEditor.module.scss
  ┃ ┃ ┣ Comment.jsx
  ┃ ┃ ┣ EditorOrganism.jsx
  ┃ ┃ ┣ FileTreeOrganism.jsx
  ┃ ┃ ┣ HeaderOrganism.jsx
  ┃ ┃ ┣ SideBar.jsx
  ┃ ┃ ┣ TermOrganism.jsx
  ┃ ┃ ┗ TextEditior.jsx
  ┃ ┗ pages
  ┃ ┃ ┣ WorkBenchPage.jsx
  ┃ ┃ ┗ WorkSpacePage.jsx
  ┣ constants
  ┃ ┣ styles.js
  ┃ ┗ typeLang.js
  ┣ hooks
  ┃ ┣ useDragCodeEditor.js
  ┃ ┣ useDragText.js
  ┃ ┣ useDragToResize.js
  ┃ ┣ useDragToScroll.js
  ┃ ┣ useDrawCodeEditor.js
  ┃ ┣ useDrawText.js
  ┃ ┣ useGlobalKeyboardShortCut.js
  ┃ ┣ useMockZoom.js
  ┃ ┗ useTermWs.js
  ┣ library
  ┃ ┗ xterm-for-react
  ┃ ┃ ┣ index.ts
  ┃ ┃ ┗ XTerm.tsx
  ┣ query
  ┃ ┗ .gitkeep
  ┣ store
  ┃ ┣ codeEditorSlice.js
  ┃ ┣ configureStore.js
  ┃ ┣ defaultSettingSlice.js
  ┃ ┣ defaultTextSlice.js
  ┃ ┣ initTerm.js
  ┃ ┣ initYDoc.js
  ┃ ┣ runFileSlice.js
  ┃ ┣ textSlice.js
  ┃ ┣ toolSlice.js
  ┃ ┗ treeData.js
  ┣ styles
  ┃ ┣ atoms
  ┃ ┃ ┣ ButtonAtom.module.scss
  ┃ ┃ ┣ CommentCreateBox.module.scss
  ┃ ┃ ┣ CommentStoredBox.module.scss
  ┃ ┃ ┣ CustomDragPreviewAtom.module.scss
  ┃ ┃ ┣ CustomNodeAtom.module.scss
  ┃ ┃ ┣ HeaderBtnAtom.module.scss
  ┃ ┃ ┗ UserToken.module.scss
  ┃ ┣ organisms
  ┃ ┃ ┣ Comment.module.scss
  ┃ ┃ ┣ FileTreeOrganism.module.scss
  ┃ ┃ ┣ HeaderOrganism.module.scss
  ┃ ┃ ┣ SideBar.module.scss
  ┃ ┃ ┣ TermOrganism.module.scss
  ┃ ┃ ┗ TextEditor.module.scss
  ┃ ┣ pages
  ┃ ┃ ┣ WorkBenchPage.module.scss
  ┃ ┃ ┗ WorkSpacePage.module.scss
  ┃ ┣ _colors.scss
  ┃ ┣ _commonColor.scss
  ┃ ┣ _fonts.scss
  ┃ ┣ _forwards.scss
  ┃ ┣ _mixins.scss
  ┃ ┗ _variables.scss
  ┣ tools
  ┃ ┣ batchActions.js
  ┃ ┣ computeMockZoom.js
  ┃ ┣ computePreviewElement.js
  ┃ ┣ computeSelectionBox.js
  ┃ ┗ computeSnapPosition.js
  ┣ App.jsx
  ┣ App.module.scss
  ┣ constants.js
  ┣ index.css
  ┗ main.jsx
  \`\`\`

  ---
  ### 기술 스택  
`;

  return (
    <div style={{}}>
      <ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>
    </div>
  );
};
