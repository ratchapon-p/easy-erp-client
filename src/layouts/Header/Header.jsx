import React, { useEffect, useState } from 'react'
import { UnorderedListOutlined,LogoutOutlined,BellFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown, Menu } from 'antd';
import { io } from 'socket.io-client'
const serverUrl = import.meta.env.VITE_SERVER_URL

import './Header.scss'
import LeftMenu from '../LeftMenu/LeftMenu';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../../redux/slices/usersSlice/userSlice';
import Notification from '../notification/notification';

const Header = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate();
    const menuItemList = [
        {
          key: 'receive-product',
          label: 'Receive Product',
          submenu_name: 'Receive Product',
          path: '/receive-product'
        },
        {
          key: 'delivery-product',
          label: 'Delivery Product',
          submenu_name: 'Delivery Product',
          path: '/delivery-product'
        },
        {
          key: 'stock-balance',
          label: 'Stock',
          submenu_name: 'Stock Balance',
          path: '/stock-balance'
        },
        {
          key: 'products',
          label: 'General',
          submenu_name: 'Product',
          path: '/products'
        },
        {
          key: 'users',
          label: 'General',
          submenu_name: 'Users',
          path: '/users'
        },

      ]
    const {error,loading,userInfo} = useSelector((state) => state?.users?.userAuth)
    const [message,setMessage] = useState([])
    const mockUser = {
      //TODO: max len of text is 24
      username: 'user01958475fjerasdasdasdasdu',
      profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }
  
    const [userData, setUserData] = useState({})
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [menuList, setMenuList] = useState([])

    const socket = io(serverUrl)

    useEffect(() =>{
      setUserData(mockUser)
      setMenuList(menuItemList)

      
      socket.on('notification',(data) =>{
        setMessage((prev) => [...prev,data.message])
      })
      return () => {
          socket.off('notification')
      }
    },[])
  
    const onClickMenu = (e) =>{
    for (const item of menuItemList) {
      
        if (item.key === e.key && item?.path) {
          navigate(item.path);
          setIsOpenMenu(false)
          break;
        }
      }
    }
    const onClickLogout = () =>{
      dispatch(logoutUserAction())
      window.location.reload();
    }

    return (
        <div className="header-main">
            <div className={`header-services-compoenet ${userInfo ? "" : "not-auth"}`} style={{width: '100%', background: '#C57A24',maxHeight: '65px'}}>
                {
                  userInfo ?
                    <div className="header-services-left">
                        <div className="logocomp">
                            <Button type="text" style={{ color: 'white' }} onClick={() => setIsOpenMenu(!isOpenMenu)}>
                                <UnorderedListOutlined className="list-header-logo" />
                            </Button>
                        </div>
                    </div>
                  : null
                }

                <div className="logo" onClick={() => navigate('/')}>
                    EASY ERP
                </div>
                {
                  userInfo ? 
                    <div className="header-services-right" >
                      <Dropdown
                        overlay={<Notification message={message} />}
                        
                        trigger={['click']}
                        placement="bottomRight"
                      >
                        <div className="userinfo-header">
                          <BellFilled className="list-header-logo" style={{ cursor: 'pointer' }} />
                        </div>
                      </Dropdown>
                        <div className="userinfo-header" onClick={() => onClickLogout()}>
                          <LogoutOutlined className='list-header-logo' />
                        </div>
          
                    </div>
                  : null
                }

            </div>
            
        <LeftMenu 
            onClickMenu={(e) => onClickMenu(e)}
            isOpenMenu={isOpenMenu}
            menuList={menuList}
        />
        </div>
    )
}

export default Header