import React from 'react';
import styles from '../../styles/atoms/DocsItem.module.scss';
function DocsItem({ itemText }) {
    return <div className={styles.item}>{itemText}</div>;
}

export default DocsItem;
