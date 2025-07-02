import React from 'react'
import { FileTextOutlined } from '@ant-design/icons';

import './LeftMenu.scss'

const LeftMenu = ({
    menuList,
    isOpenMenu,
    onClickMenu
}) => {

    const renderSection = (label) => {
        const items = menuList.filter((item) => item.label === label);
        if (items.length === 0) return null;

        return (
            <div className="receive-product">
                <div className="leftmenu-label">
                    <label>{label}</label>
                </div>
                {items.map((item) => (
                    <div className="leftmenu-submenu-item" key={item.key} onClick={() => onClickMenu(item)}>
                        <FileTextOutlined className="leftmenu-icon" />
                        <div>{item.submenu_name}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`leftmenu-main ${isOpenMenu ? 'open' : ''}`}>
            {isOpenMenu && (
                <div>
                    {renderSection('Receive Product')}
                    {renderSection('Delivery Product')}
                    {renderSection('Stock')}
                    {renderSection('General')}
                </div>
            )}
        </div>
    );

}

export default LeftMenu