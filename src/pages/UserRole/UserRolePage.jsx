import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { Button, Modal } from 'antd'
import './UserRole.scss'
import { useNavigate } from 'react-router-dom'
import { del, get } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

const UserRolePage = () => {
  const navigate = useNavigate()
  const [selectedRowKey, setSelectedRowKey] = useState([])
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [columns, setColumns] = useState([
    {
      key: 'role_name',
      dataIndex: 'role_name',
      title: 'Role Name'
    },
    {
      key: 'update_datetime',
      dataIndex: 'update_datetime',
      title: 'Latest update'
    },

  ])
  const [dataSource, setDataSource] = useState([])

  useEffect(() =>{
    getUserRoleList()
  },[])
  
  const getUserRoleList = async() =>{
    const url = `${baseURL}/user_role`
    const response = await get(url)
    if (response.success) {
      setDataSource(response.data)
    }
  }

  const onCLickAddUserRole = () =>{
    navigate('/user-roles/create?type=create')
  }

  const onClickDeleteUserRole = async() =>{
    const url = `${baseURL}/user_role/${selectedRowKey[0]}`
    try {
      const response = await del(url)
      if(response.success){
        window.location.reload()
      }
    } catch (error) {
      console.log('Error',error);
    }
  }
  console.log(dataSource,'<<dataSource');
  

  return (
    <div className='content-page'>
      <label>User Role</label>
      <div className="command-tab">
        <Button onClick={() => onCLickAddUserRole()} type='primary'>Add</Button>
        <Button onClick={() => setShowDeleteModal(true)} color='danger' variant='solid' disabled={selectedRowKey.length > 1 || !selectedRowKey.length}>Delete</Button>
      </div>
      <CustomTable 
        selectedRowKey={selectedRowKey}
        setSelectedRowKey={(e) => setSelectedRowKey(e)}
        columns={columns}
        selectedRow={true}
        dataSource={dataSource}
        onDoubleClickPath='user-roles'
      />
      <Modal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={() => onClickDeleteUserRole()}
      >
        Delete Role?
      </Modal>
    </div>
  )
}

export default UserRolePage