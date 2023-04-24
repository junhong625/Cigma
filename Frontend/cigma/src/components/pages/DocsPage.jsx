import React from 'react';
import styles from '../../styles/pages/DocsPage.module.scss';
import DocsMenu from '../organisms/DocsMenu';
function DocsPage() {
    return (
        <div className={styles.container}>
            <DocsMenu />
            <div className={styles.docs}>
                <div>aaa</div>
                <div>bbb</div>
            </div>
        </div>
    );
}

export default DocsPage;
