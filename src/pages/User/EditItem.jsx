import Input from 'antd/es/input/Input';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './User.scss'
import { Button, Select } from 'antd';
import { get, post, put } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    role_id: '',
  })
  const [userRole,setUserRole] = useState([])
  const [loading, setLoading] = useState(false)
  const query = new URLSearchParams(useLocation().search);
  const type = query.get('type');
  const itemType = type === 'create' ? 'Create' : 'Edit'

  const onChangeUser = (key, value) => {
    setUser((prev) =>({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() =>{
    getUserRoles()
    if(type === 'edit'){
      getUser()
    }
  },[])
  
  const setInitialValue = (data) =>{
    setUser((prev) => ({
      ...prev,
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      role_id: data.role_id,
    }))
  }
  
  const getUser = async() =>{
    const url = `${baseURL}/user/${id}`
    const response = await get(url)
    if (response.success) {
      const data = response.data[0]
      setInitialValue(data)
    }
  }

  const getUserRoles = async() =>{
        const url = `${baseURL}/user_role/all`
    const response = await get(url)
    if (response.success) {
      const data = response.data
      setUserRole(data)
    }
  }

  const onSave = async() =>{
    setLoading(true)
    let url = `${baseURL}/user`
    let update = post
    const data = user
    if(type === 'edit'){
      url = `${baseURL}/user/${id}`
      update = put
    }
    try {
      const response = await update(url,data)
      if (response.success) {
        navigate('/users')
      }
    } catch (error) {
      console.log('Error', error);
    }finally{
      setLoading(false)
      
    }
 

  }

  const onCancelButton = () =>{
    setUser((prev) => ({
      ...prev,
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      role_id: '',
    }))
    navigate('/users')
  }


  return (
    <div className='content-page'>
      <label >{itemType} - User</label>

      <div className="user-form">
        <div className="user-form-box">
          <label >Firstname</label>
          <Input 
            value={user.firstname}
            className='user-form-input'
            onChange={(e) => onChangeUser('firstname',e.target.value)}
          />
        </div>
        <div className="user-form-box">
          <label >Lastname</label>
          <Input 
          value={user.lastname}
            className='user-form-input'
            onChange={(e) => onChangeUser('lastname',e.target.value)}
          />
        </div>
        <div className="user-form-box">
          <label >Username</label>
          <Input 
        value={user.username}
            className='user-form-input'
            onChange={(e) => onChangeUser('username',e.target.value)}
          />
        </div>
        <div className="user-form-box">
          <label >Password</label>
          <Input 
            type='password'
          value={user.password}
            className='user-form-input'
            onChange={(e) => onChangeUser('password',e.target.value)}
          />
        </div>
        <div className="user-form-box">
          <label >User Role</label>
          <Select 
            value={user.role_id}
            className='user-form-select'
            onChange={(value) => onChangeUser('role_id',value)}
          >
            {
              userRole.map((item) =>{
                return(
                  <Select.Option value={item.id} key={item.id}>{item.role_name}</Select.Option>
                )
              })
            }
          </Select>
        </div>

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