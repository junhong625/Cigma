import React from 'react';
import '../../styles/atoms/NavItem.scss';
function NavItem({ itemText }) {
    return <>
        <div className={ itemText==="Login" ? "login":"item"}>{itemText}</div>
    </> 
}

export default NavItem;
