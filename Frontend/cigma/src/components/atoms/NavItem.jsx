import React from 'react';
import '../../styles/atoms/NavItem.scss';
function NavItem({ itemText }) {
    return <div className="item">{itemText}</div>;
}

export default NavItem;
