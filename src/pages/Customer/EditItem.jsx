import Input from 'antd/es/input/Input';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './Customer.scss'
import { Button, Table } from 'antd';
import { PlusSquareFilled,EditOutlined,DeleteOutlined } from '@ant-design/icons';
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
    type: 'create',
    contact_name: {
      label: 'Customer name',
      content: '',
      type: 'input'
    },
    position:  {
      label: 'Position',
      content: '',
      type: 'input'
    },
    address:  {
      label: 'Address',
      content: '',
      type: 'input'
    },
    phone_number:  {
      label: 'Phone',
      content: '',
      type: 'input'
    },
    email:  {
      label: 'Email',
      content: '',
      type: 'input'
    },
    notes:  {
      label: 'Note',
      content: '',
      type: 'input'
    },
  })

  const [customerContactList, setCustomerContactList] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [selectedIndex,setSelectedIndex] = useState(null)

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

  const renderTable = () => {
    return customerColumn.map((col) => ({
      ...col,
      render: (text, record, index) => {
        if(col.key === 'actions'){
            return (
              <div className="" style={{display:'flex',gap: '10px'}}>
                <Button onClick={() => onClickEditItem(record,index)}><EditOutlined /></Button>
                <Button><DeleteOutlined /></Button>
              </div>
            )
        }
        return text.content
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
      customer_contact_list: customerContactList
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
    setOpenModal(true)
  }

  const onClickEditItem = (item,index) =>{
    setCustomerContactData({...item,type: 'edit'})
    setSelectedIndex(index)
    setOpenModal(true)
  }

  const onOkModal = () =>{
  const isCreate = customerContactData.type === 'create'

  const newItem = { ...customerContactData }

  if (isCreate) {
    setCustomerContactList((prev) => [...prev, newItem])
  } else {
    setCustomerContactList((prev) => {
      const newList = [...prev]
      newList[selectedIndex] = newItem
      return newList
    })
  }
    setCustomerContactData((prev) =>({
      ...prev,
      type: 'create',
      contact_name: {
        label: 'Customer name',
        content: '',
        type: 'input'
      },
      position:  {
        label: 'Position',
        content: '',
        type: 'input'
      },
      address:  {
        label: 'Address',
        content: '',
        type: 'input'
      },
      phone_number:  {
        label: 'Phone',
        content: '',
        type: 'input'
      },
      email:  {
        label: 'Email',
        content: '',
        type: 'input'
      },
      notes:  {
        label: 'Note',
        content: '',
        type: 'input'
      },
    }))

    setOpenModal(false)
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
          dataSource={customerContactList}
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
          modalContent={customerContactData}
          setModalContent={(item) => setCustomerContactData(item)}
          onOk={() => onOkModal()}
          onCancel={() => setOpenModal(false)}
        />
    </div>
  )
}

export default EditItem