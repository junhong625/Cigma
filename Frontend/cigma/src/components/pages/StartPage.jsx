import React from 'react';
import NavBar from '../organisms/NavBar';
import '../../styles/pages/StartPage.scss';
import ButtonAtom from '../atoms/ButtonAtom';
import OnboardItem from "../organisms/OnboardItem";
function StartPage() {
    return (
        <div className="navigation-container">
            <NavBar />
            <div className="image-container">
                <div className="title-container">
                    <label>Code + Figma = Cigma</label>
                    <label className="sub-label">함께 코딩하는 즐거움</label>
                    <ButtonAtom buttonName={'다운로드'} />
                </div>
            </div>
            <OnboardItem
                color={"#ffffff"}
                iconName={"group1.png"}
                title={"넓은 화면에서 편집하기"}
                subTitle={"펼쳐진 넓은 캔버스에서 코드 에디터를 실행해보세요."}
                subSecondTitle={"확대/축소가 가능한 캔버스에서 마음껏 코드를 펼칠 수 있습니다."}
                reversed={true}
            />
            <OnboardItem
                color={"#eaeaeb"}
                iconName={"group3.png"}
                title={"오픈된 소스로 누구나 "}
                subTitle={"Cigma는 오픈소스 프로젝트입니다."}
                subSecondTitle={"공개된 소스코드를 다운받고, 코드를 수정하여 프로젝트에 기여할 수 있습니다."}
                reversed={false}
            />
            <OnboardItem
                color={"#ffffff"}
                iconName={"group2.png"}
                title={"실시간으로 코드 작성하기"}
                subTitle={"동료들과 함께 작업하고, 코드 편집을 진행 할 수 있어요. "}
                subSecondTitle={"프로젝트에 함께 접속하여 실시간으로 편집을 진행 할 수 있습니다."}
                reversed={true}
            />
        </div>
    );
}

export default StartPage;
