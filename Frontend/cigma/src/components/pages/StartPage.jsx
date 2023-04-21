import React from 'react';
import NavBar from '../organisms/NavBar';
import '../../styles/pages/StartPage.scss';
import ButtonAtom from '../atoms/ButtonAtom';
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
            <div>start</div>
            <div>온보딩첫페이지</div>
        </div>
    );
}

export default StartPage;
