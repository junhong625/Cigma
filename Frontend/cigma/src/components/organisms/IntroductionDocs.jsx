import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "../../styles/organisms/IntroductionDocs.module.scss";
export const IntroductionDocs = () => {
  const codeRender = ({ value }) => {
    return <code>{value}</code>;
  };
  // markdown render 설정
  const renderers = {
    code: codeRender,
  };

  // 마크다운 설정
  const markdown = `
  ## 사용자 문서

  > 기본적인 사용 방법을 안내합니다 

  ---
  ### 팀 생성

  Cigma는 \`팀\`과 \`프로젝트\`로 구성되어있습니다. \`팀\`은 자유롭게 생성 가능합니다. 
  
  \`프로젝트\`는 \`팀\` 당 최대 1개까지 생성가능합니다. 여러 개의 프로젝트를 생성하고 싶다면 \`팀\`을 새롭게 개설해야합니다.
  
  ---
  ### 팀원 초대
  ---
  ### 프로젝트 생성
  ---
  ### 팀 삭제
  ---
  ### 단축키 설명 및 키 사용방법
  `;
  return (
    <div>
      <ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>
    </div>
  );
};
