import React, { useEffect, useState } from 'react'

import './Notification.scss'
import { Menu } from 'antd'

const Notification = ({
  message
}) => {

  return (
    <div className='notification-windows'>
        <Menu>
          {message.length === 0 ? (
            <Menu.Item key="no-msg" disabled>No notifications</Menu.Item>
          ) : (
            message.map((msg, idx) => <Menu.Item key={idx}>{msg}</Menu.Item>)
          )}
        </Menu>
    </div>
  )
}

export default Notification