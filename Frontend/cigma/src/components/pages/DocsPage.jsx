import React from 'react';
import styles from '../../styles/pages/DocsPage.module.scss';
import DocsMenu from '../organisms/DocsMenu';
import { Outlet } from 'react-router-dom';
function DocsPage() {
    return (
        <div className={styles.container}>
            <DocsMenu />
            <Outlet />
        </div>
    );
}

export default DocsPage;
