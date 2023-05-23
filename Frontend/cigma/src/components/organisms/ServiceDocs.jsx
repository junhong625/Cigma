import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "../../styles/organisms/IntroductionDocs.module.scss";

export const ServiceDocs = () => {
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
  ## 서비스 소개

  > 삼성청년소프트웨어아카데미 8기 자율프로젝트 - 오픈소스 도메인

  ---

  ### 개발 기간

  2023년 4월 ~ 2023년 5월

  ---

  ### 대표 Contributers

  \`황진태\` FE, BE, IDE FE, IDE BE 개발 담당

  \`안준홍\` BE, 메인 서버 개발, k3s를 활용한 서버 구성 담당

  \`이윤진\` FE, 메인 FE, IDE FE 개발 담당

  \`이한나\` FE, 메인 FE, IDE FE 개발 담당

  ---

  ### 기획의도

  오픈소스 도메인으로서 개발자들을 위한 서비스를 기획했습니다. 개발을 하며 실시간으로 소통과 작업이 어려웠던 경험을 바탕으로 서비스를 기획하게 되었습니다. 
  
  ---

  ### 기획목표
  여러 명이서 함께 작업할 때 실시간으로 코드를 공유하여 협업을 용이하게 한다. 텍스트 작성 및 댓글 작성으로 사용자들간 실시간 소통이 활발하게 이루어지도록 한다.

  `;

  return (
    <div style={{}}>
      <ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>
    </div>
  );
};
