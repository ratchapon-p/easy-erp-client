import React, { useEffect, useState } from 'react'
import './LoginPage.scss'
import { Button, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserAction } from '../../redux/slices/usersSlice/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from "react-toastify";

const LoginPage = () => {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const [ authData, setAuthData ] = useState({
    username: '',
    password: ''
  })
  const {error,loading,userInfo} = useSelector((state) => state?.users?.userAuth)

  useEffect(() =>{

  },[])

  const onChangeHandler = (key,value) => {
    setAuthData((prev) =>({
      ...prev,
      [key]: value
    }))
  }

  const onSubmitHandler = async() => {
    const {username, password} = authData
    dispatch(loginUserAction({username, password}))
    
  }
  
  useEffect(() => {
    if (userInfo?.data?.success) {
      window.location.href = "/";
    }
    if(error) {
      toast.error(error.message)
    }
  }, [userInfo, error]);

  return (
    <div className='login-page-main'>
      <div className="login-box">
        <div className="login-content">
        <label>Welcome</label>
        {/* {error?.message ? 
        <div className='invalid-login'>{error?.message}</div>:
        null  
      } */}
        <div className="username-box">
          <label>Username</label>
          <Input 
            onChange={(e) => onChangeHandler('username', e.target.value)}
          />
        </div>
        <div className="password-box">
          <label>Password</label>
          <Input 
            type='password'
            onChange={(e) => onChangeHandler('password', e.target.value)}
          />
        </div>
        <Button  type='primary' onClick={() => onSubmitHandler()} >Login</Button>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginPage