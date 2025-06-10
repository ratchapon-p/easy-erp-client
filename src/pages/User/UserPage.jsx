import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { Button, Modal } from 'antd'
import './User.scss'
import { useNavigate } from 'react-router-dom'
import { del, get } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

const UserPage = () => {
  const navigate = useNavigate()
  const [selectedRowKey, setSelectedRowKey] = useState([])
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [columns, setColumns] = useState([
    {
      key: 'firstname',
      dataIndex: 'firstname',
      title: 'Firstname'
    },
    {
      key: 'lastname',
      dataIndex: 'lastname',
      title: 'Lastname'
    },
    {
      key: 'username',
      dataIndex: 'username',
      title: 'Username'
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role'
    },

  ])
  const [dataSource, setDataSource] = useState([])

  useEffect(() =>{
    getUserList()
  },[])
  const getUserList = async() =>{
    const url = `${baseURL}/user`
    const response = await get(url)
    if (response.success) {
      setDataSource(response.data)
    }
  }

  const onCLickAddUser = () =>{
    navigate('/users/create?type=create')
  }

  const onClickDeleteUser = async() =>{
    const url = `${baseURL}/user/${selectedRowKey[0]}`
    try {
      const response = await del(url)
      if(response.success){
        window.location.reload()
      }
    } catch (error) {
      console.log('Error',error);
    }
  }


  return (
    <div className='content-page'>
      <label>User</label>
      <div className="command-tab">
        <Button onClick={() => onCLickAddUser()} type='primary'>Add</Button>
        <Button onClick={() => setShowDeleteModal(true)} color='danger' variant='solid' disabled={selectedRowKey.length > 1 || !selectedRowKey.length}>Delete</Button>
      </div>
      <CustomTable 
        selectedRowKey={selectedRowKey}
        setSelectedRowKey={(e) => setSelectedRowKey(e)}
        columns={columns}
        selectedRow={true}
        dataSource={dataSource}
        onDoubleClickPath='users'
      />
      <Modal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={() => onClickDeleteUser()}
      >
        Delete User?
      </Modal>
    </div>
  )
}

export default UserPage