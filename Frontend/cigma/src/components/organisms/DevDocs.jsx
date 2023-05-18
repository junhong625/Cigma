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
  Frontend-FE

  \`\`\`
"@reduxjs/toolkit": "^1.9.5",
"axios": "^1.4.0",
"lottie-react": "^2.4.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-markdown": "^8.0.7",
"react-redux": "^8.0.5",
"react-router-dom": "^6.10.0",
"react-transition-group": "^4.4.5",
"redux-persist": "^6.0.0",
"sass": "^1.62.0"

\`\`\`

Frontend-IDE

\`\`\`
"@minoru/react-dnd-treeview": "^3.4.4",
"@monaco-editor/react": "^4.5.0",
"@reduxjs/toolkit": "^1.9.5",
"archiver": "^5.3.1",
"axios": "^1.4.0",
"cors": "^2.8.5",
"express": "^4.18.2",
"express-fileupload": "^1.4.0",
"fs-extra": "^11.1.1",
"http-proxy-middleware": "^2.0.6",
"lib0": "^0.2.74",
"lodash": "^4.17.21",
"multer": "^1.4.5-lts.1",
"node-pty": "^0.10.1",
"prop-types": "^15.8.1",
"re-resizable": "^6.9.9",
"react": "^18.2.0",
"react-dnd": "^16.0.1",
"react-dom": "^18.2.0",
"react-dropzone": "^14.2.3",
"react-icons": "^4.8.0",
"react-query": "^3.39.3",
"react-redux": "^8.0.5",
"redux-undo": "^1.0.1",
"redux-yjs-bindings": "^0.3.1",
"sass": "^1.62.1",
"socket.io-client": "^4.6.1",
"ws": "^8.13.0",
"xterm": "^5.1.0",
"xterm-addon-attach": "^0.8.0",
"xterm-addon-fit": "^0.7.0",
"y-leveldb": "^0.1.2",
"y-monaco": "^0.1.4",
"y-presence": "^0.2.3",
"y-protocols": "^1.0.5",
"y-websocket": "^1.5.0",
"yjs": "^13.6.0"
\`\`\`
Backend

\`\`\`
- java: 11
- spring-boot: 2.7.11
- spring-boot-devtools
- spring-boot-starter-security
- spring-boot-starter-data-jpa
- spring-boot-starter-data-redis
- spring-boot-starter-web
- spring-boot-starter-jdbc
- spring-boot-starter-parent: 3.0.4
- spring-cloud-starter-aws:2.2.6.RELEASE
- lombok
- firebase-admin: 9.1.1
- jjwt: 0.11.5
- mysql: 8.0.32
- jcraft:jsch:0.1.5
- commons-io:commons-io:2.11.0
- io.fabric8:kubernetes-client:6.5.0
- io.kubernetes:client-java:18.0.0
\`\`\`
docker

\`\`\`
caffeincoding/cigma-ide:latest
\`\`\`
`;

  return (
    <div style={{}}>
      <ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>
    </div>
  );
};
