import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ReactECharts from 'echarts-for-react';
const baseURL = import.meta.env.VITE_BASE_URL
import { get, post } from '../../utils/httpMethods'
import AlertModal from '../../components/AlertModal/AlertModal'
import { useNavigate } from 'react-router-dom'
import { DatePicker, Select } from 'antd';
import './Homepage.scss'
import dayjs from 'dayjs';


const monthLabels = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

const Homepage = () => {
const [alertMessage, setAlertMessage] = useState('')
  const [loading,setLoading] = useState(false)
  const [dasboardData, setDashboardData] = useState([])
  const [chartOption, setChartOption] = useState({});
  // const [dashBoardType, setDashboardType] = useState('monthly')
  const [dashboardYear, setDashboardYear] = useState(dayjs())
    const navigate = useNavigate();

  useEffect(() =>{
    checkAuth()
    getDashboardData(dashboardYear.year())
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

  const getDashboardData = async(dateString) =>{
    setLoading(true)
    try {
      const url = `${baseURL}/product/dashboard`

      const data = {
        year: dateString
      }
      const response = await post(url,data)

      const option = convertToChartOption(response.data);
      setChartOption(option);

    } catch (error) {
      console.log('Error',error);
    }finally{
      setLoading(false)
    }
  }

  const convertToChartOption = (resultData) => {
    const receiveData = resultData.map(item => parseInt(item.total_receive));
    const sendedData = resultData.map(item => parseInt(item.total_sended));
  
    return {
      title: {
        text: 'ยอดรับ-ส่งสินค้ารายเดือน',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['รับสินค้า', 'ส่งสินค้า']
      },
      xAxis: {
        type: 'category',
        data: monthLabels,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'รับสินค้า',
          type: 'bar',
          data: receiveData,
        },
        {
          name: 'ส่งสินค้า',
          type: 'bar',
          data: sendedData,
        },
      ],
    };
  };

  const onChangeDashboardYear = async (date, dateString) =>{
    setDashboardYear(date)
    await getDashboardData(dateString)
  }

  return (
    <div className="">
      <div className='content-page'>
        <div className="dashboard-type">
        {/* <label htmlFor="" style={{fontSize:'16px',fontWeight:'500'}}>Dashboard Type</label> */}
          {/* <Select value={dashboardYear} style={{width:'10%'}} onChange={(value) => onChangeDashboardType(value)}>
            {
              dashboardTypeOptions.map((item) =>{
                return(<Select.Option value={item.value}>{item.label}</Select.Option>  )
              })
            } 
          </Select> */}
          <DatePicker 
            value={dashboardYear}
            picker='year'
            onChange={onChangeDashboardYear}
          />
        </div>
        <ReactECharts
          option={chartOption}
          style={{ height: '400px', width: '100%' }}
        />
      </div>
    <AlertModal 
        message={alertMessage}
        onClose={handleCloseAlert}
    />
    </div>
  )
}

export default Homepage