import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { Button, Modal } from 'antd'
import './Customer.scss'
import { useNavigate } from 'react-router-dom'
import { del, get } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

const CustomerPage = () => {
  const navigate = useNavigate()
  const [selectedRowKey, setSelectedRowKey] = useState([])
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [columns, setColumns] = useState([
    {
      key: 'customer_name',
      dataIndex: 'customer_name',
      title: 'Customer Name'
    },
    // {
    //   key: 'update_datetime',
    //   dataIndex: 'update_datetime',
    //   title: 'Latest update'
    // },

  ])

  const onCLickAddCustomer = () =>{
    navigate('/customers/create?type=create')
  }

  const onClickDeleteCustomer = async() =>{
    const url = `${baseURL}/customer/${selectedRowKey[0]}`
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
      <label>Customer</label>
      <div className="command-tab">
        <Button onClick={() => onCLickAddCustomer()} type='primary'>Add</Button>
        <Button onClick={() => setShowDeleteModal(true)} color='danger' variant='solid' disabled={selectedRowKey.length > 1 || !selectedRowKey.length}>Delete</Button>
      </div>
      <CustomTable 
        selectedRowKey={selectedRowKey}
        setSelectedRowKey={(e) => setSelectedRowKey(e)}
        columns={columns}
        selectedRow={true}
        onDoubleClickPath='customers'
        api={'/customer'}
      />
      <Modal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={() => onClickDeleteCustomer()}
      >
        Delete Role?
      </Modal>
    </div>
  )
}

export default CustomerPage