import Input from 'antd/es/input/Input';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './Customer.scss'
import { Button, Table } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import { get, post, put } from '../../utils/httpMethods'
import AddItemModal from '../../components/AddItemModal/AddItemModal';
const baseURL = import.meta.env.VITE_BASE_URL

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [customer, setCustomer] = useState({
    customer_name: '',
  })
  const [customerContactData,setCustomerContactData] = useState({
    contact_name: '',
    position: '',
    address: '',
    phone_number: '',
    email: '',
    notes: '',
  })

  const [customerContactList, setCustomerContactList] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const [loading, setLoading] = useState(false)
  const query = new URLSearchParams(useLocation().search);
  const type = query.get('type');
  const itemType = type === 'create' ? 'Create' : 'Edit'

  const customerColumn = [
    {
      key: 'contact_name',
      dataIndex: 'contact_name',
      title: 'Contact Name'
    },
    {
      key: 'position',
      dataIndex: 'position',
      title: 'Position'
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'Address'
    },
    {
      key: 'phone_number',
      dataIndex: 'phone_number',
      title: 'Phone Number'
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email'
    },
    {
      key: 'notes',
      dataIndex: 'notes',
      title: 'Note'
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: 'Edit/Delete'
    },
  ]
  
  //
  const customerContactInput = [
    {
      key: '',
      label: '',
      type: '',
      className: '',
    },
  ]

  const renderTable = () => {
    return customerColumn.map((col) => ({
      ...col,
      render: (text, record, index) => {
        if(col.key === 'role_access'){
            return
        }
        return text
      }
    }))
  }

  const onChangeUser = (key, value) => {
    setCustomer((prev) =>({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() =>{
    if(type === 'edit'){
      getCustomer()
    }
  },[])
  
  const setInitialValue = (data) =>{
    setCustomer((prev) => ({
      ...prev,
      customer_name: data.customer_name,
    }))
  }
  
  const getCustomer = async() =>{
    const url = `${baseURL}/customer/${id}`
    const response = await get(url)
    if (response.success) {
      const data = response.data[0]
      setInitialValue(data)
    }
  }

  const onSave = async() =>{
    setLoading(true)
    let url = `${baseURL}/customer`
    let update = post
    const data = {
      customer_name: customer.customer_name,
    }
    
    if(type === 'edit'){
      url = `${baseURL}/customer/${id}`
      update = put
    }
    try {
      const response = await update(url,data)
      if (response.success) {
        navigate('/customers')
      }
    } catch (error) {
      console.log('Error', error);
    }finally{
      setLoading(false)
      
    }
  }

  const onCancelButton = () =>{
    setCustomer((prev) => ({
      ...prev,
      customer_name: '',
    }))
    navigate('/customers')
  }

  const onClickAddItem = () =>{

  }

  const addContent = () =>{

  }

  return (
    <div className='content-page'>
      <label >{itemType} - Customer</label>

      <div className="customer-form">
        <div className="customer-form-box">
          <label >Customer name</label>
          <Input 
            value={customer.customer_name}
            className='customer-form-input'
            onChange={(e) => onChangeUser('customer_name',e.target.value)}
          />
        </div>
      </div>

      <div className="customer-table-form">
          <div className="add-item-button">
              <PlusSquareFilled 
              onClick={() => onClickAddItem()}
              style={{
                fontSize: '25px',
                color: '#1677ff',
              }}
            />
          </div>
        <Table 
          columns={renderTable()}
          // dataSource={}
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
        <AddItemModal 
          isOpenModal={openModal}
          modalTitle={``}
          modalContent
        />
    </div>
  )
}

export default EditItem