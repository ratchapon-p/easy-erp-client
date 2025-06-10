import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
const baseURL = import.meta.env.VITE_BASE_URL
import { get } from '../../utils/httpMethods'
import AlertModal from '../../components/AlertModal/AlertModal'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
const [alertMessage, setAlertMessage] = useState('')
  const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

  useEffect(() =>{
    checkAuth()
  },[])
  
  const checkAuth = async() =>{
    setLoading(true)
    const url = `${baseURL}/check`
    try {
      const response = await get(url)
      
    } catch (error) {
      if (error.response.data.code === 'TOKEN_EXPIRE') {
        setAlertMessage(error.response.data.message)
      }
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  const handleCloseAlert = () => {
    setAlertMessage('');
    localStorage.removeItem('userInfo')
    navigate('/authen')

  };

  return (
    <div className="">
      <div className='content-page'>Homepage</div>
    <AlertModal 
        message={alertMessage}
        onClose={handleCloseAlert}
    />
    </div>
  )
}

export default Homepage