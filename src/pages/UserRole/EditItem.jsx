import Input from 'antd/es/input/Input';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './UserRole.scss'
import { Button, Checkbox, Select, Table } from 'antd';
import { get, post, put } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState({
    role_name: '',
  })
  const [loading, setLoading] = useState(false)
  const query = new URLSearchParams(useLocation().search);
  const type = query.get('type');
  const itemType = type === 'create' ? 'Create' : 'Edit'
  const [roleAccess, setRoleAccess] = useState({
    'receive-product': false,
    'delivery-product': false,
    'stock-balance': false,
    'products': false,
    'users': false,
    'user-roles': false,
  })
const roleAccessCol = [
    {
      key: 'role_name',
      dataIndex: 'role_name',
      title: 'Role Name'
    },
    {
      key: 'role_access',
      dataIndex: 'role_access',
      title: 'Access Menu'
    },
  ]

    const roleAccessList = [
      {
          key: 'receive-product',
          role_name: 'Receive Product',
        },
        {
          key: 'delivery-product',
          role_name: 'Delivery Product',
        },
        {
          key: 'stock-balance',
          role_name: 'Stock Balance',
        },
        {
          key: 'products',
          role_name: 'Product',
        },
        {
          key: 'users',
          label: 'General',
          role_name: 'User',
        },
        {
          key: 'user-roles',
          role_name: 'User Role',
        },
        {
          key: 'customers',
          role_name: 'Customer',
        },
    ]

  const onChangeUser = (key, value) => {
    setUserRole((prev) =>({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() =>{
    if(type === 'edit'){
      getUserRole()
    }
  },[])

  const onCheckedRole = (record,value) =>{
    setRoleAccess((prev) =>({
      ...prev,
      [record]: value
    }))
  }

  const renderTable = () => {
      return roleAccessCol.map((col) => ({
        ...col,
        render: (text, record, index) => {
          if(col.key === 'role_access'){
              return (
                  <Checkbox 
                    checked={roleAccess[record.key]}
                    onChange={(e) => onCheckedRole(record.key,e.target.checked)}
                  />
              )
          }
          return text
        }
      }))
    }
  
  const setInitialValue = (data) =>{
    setUserRole((prev) => ({
      ...prev,
      role_name: data.role_name,
    }))
    setRoleAccess(data.role_access)
  }
  
  const getUserRole = async() =>{
    const url = `${baseURL}/user_role/${id}`
    const response = await get(url)
    if (response.success) {
      const data = response.data[0]
      setInitialValue(data)
    }
  }

  const onSave = async() =>{
    setLoading(true)
    let url = `${baseURL}/user_role`
    let update = post
    const data = {
      role_name: userRole.role_name,
      role_access: roleAccess
    }
    
    if(type === 'edit'){
      url = `${baseURL}/user_role/${id}`
      update = put
    }
    try {
      const response = await update(url,data)
      if (response.success) {
        navigate('/user-roles')
      }
    } catch (error) {
      console.log('Error', error);
    }finally{
      setLoading(false)
      
    }
  }

  const onCancelButton = () =>{
    setUserRole((prev) => ({
      ...prev,
      role_name: '',
    }))
    navigate('/user-roles')
  }

  return (
    <div className='content-page'>
      <label >{itemType} - User Role</label>

      <div className="user-role-form">
        <div className="user-role-form-box">
          <label >Role name</label>
          <Input 
            value={userRole.role_name}
            className='user-role-form-input'
            onChange={(e) => onChangeUser('role_name',e.target.value)}
          />
        </div>
      </div>

      <div className="user-role-access-form">
        <Table 
          columns={renderTable()}
          dataSource={roleAccessList}
        />
      </div>

        <div className="save-and-cancel">
          <div className="save-btn">
            <Button onClick={() => onSave()} disabled={loading} type='primary'>Save</Button>
          </div>
          <div  className="save-btn">
            <Button disabled={loading} onClick={() => onCancelButton()} >Cancel</Button>
          </div>
        </div>
    </div>
  )
}

export default EditItem