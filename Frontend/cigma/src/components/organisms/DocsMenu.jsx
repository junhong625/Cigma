import React from 'react';
import DocsItem from '../atoms/DocsItem';
import styles from '../../styles/organisms/DocsMenu.module.scss';
import NavLogo from '../atoms/NavLogo';
function DocsMenu() {
    return (
        <div className={styles.menu}>
            <NavLogo className={styles.logo} />
            <DocsItem itemText={'시작하기'} />
            <DocsItem itemText={'시작하기'} />
            <DocsItem itemText={'시작하기'} />
        </div>
    );
}

export default DocsMenu;
