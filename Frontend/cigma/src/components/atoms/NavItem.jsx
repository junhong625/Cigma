import React from 'react';
import '../atoms/NavItem.scss';
function NavItem({ itemText }) {
    return <div className="item">{itemText}</div>;
}

export default NavItem;
