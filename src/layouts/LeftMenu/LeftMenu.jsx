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

//     const renderReceiveProduct = () =>{
//         return menuList.filter((item) => item.label === 'Receive Product').map((item) =>{
//             return (
//                 <div className="leftmenu-submenu-item" key={item.key} onClick={() => onClickMenu(item)}>
//                     <FileTextOutlined  className='leftmenu-icon'/>
//                     <div className="">{item.submenu_name}</div>
//                 </div>

//             )
//         })

        
//     }

//     const renderDeliveryProduct = () =>{
//         return menuList.filter((item) => item.label === 'Delivery Product').map((item) =>{
//             return (
//                 <div className="leftmenu-submenu-item" key={item.key}  onClick={() => onClickMenu(item)} >
//                     <FileTextOutlined  className='leftmenu-icon'/>
//                     <div className="">{item.submenu_name}</div>
//                 </div>

//             )
//         })
//     }

//     const renderStock = () =>{
//         return menuList.filter((item) => item.label === 'Stock').map((item) =>{
//             return (
//                 <div className="leftmenu-submenu-item" key={item.key}  onClick={() => onClickMenu(item)} >
//                     <FileTextOutlined  className='leftmenu-icon'/>
//                     <div className="">{item.submenu_name}</div>
//                 </div>

//             )
//         })
//     }

//     const renderGeneral = () =>{
//         return menuList.filter((item) => item.label === 'General').map((item) =>{
//             return (
//                 <div className="leftmenu-submenu-item" key={item.key}  onClick={() => onClickMenu(item)} >
//                     <FileTextOutlined  className='leftmenu-icon'/>
//                     <div className="">{item.submenu_name}</div>
//                 </div>

//             )
//         })
//     }


//   return (
//     <div className={`leftmenu-main  ${isOpenMenu ? 'open' : ''}`} >
//         {
//             isOpenMenu ?
//             <div className="">
//                     <div className="receive-product">
//                         <div className="leftmenu-label">
//                             <label >
//                                 Receive Product
//                             </label>

//                         </div>
//                         {renderReceiveProduct()}
//                     </div>
//                     <div className="receive-product">
//                         <div className="leftmenu-label">
//                             <label >
//                                 Delivery Product
//                             </label>

//                         </div>
//                         {renderDeliveryProduct()}
//                     </div>
//                     <div className="receive-product">
//                         <div className="leftmenu-label">
//                             <label >
//                                 Stock
//                             </label>
//                         </div>
//                         {renderStock()}
//                     </div>
//                     <div className="receive-product">
//                         <div className="leftmenu-label">
//                             <label >
//                                 General
//                             </label>

//                         </div>
//                         {renderGeneral()}
//                     </div>

//             </div>
//             :
//             null
//         }
//     </div>
//   )
}

export default LeftMenu