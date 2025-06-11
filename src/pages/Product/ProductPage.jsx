import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { Button, Modal } from 'antd'
import './Product.scss'
import { useNavigate } from 'react-router-dom'
import { del, get } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

const ProductPage = () => {
  const navigate = useNavigate()
  const [selectedRowKey, setSelectedRowKey] = useState([])
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [columns, setColumns] = useState([
    {
      key: 'attribute_1',
      dataIndex: 'attribute_1',
      title: 'Category'
    },
    {
      key: 'attribute_2',
      dataIndex: 'attribute_2',
      title: 'Brand'
    },
    {
      key: 'attribute_3',
      dataIndex: 'attribute_3',
      title: 'Size'
    },
    {
      key: 'attribute_4',
      dataIndex: 'attribute_4',
      title: 'Color'
    },

  ])

  const onCLickAddProduct = () =>{
    navigate('/products/create?type=create')
  }

  const onClickDeleteProduct = async() =>{
    const url = `${baseURL}/product/${selectedRowKey[0]}`
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
      <label>Product</label>
      <div className="command-tab">
        <Button onClick={() => onCLickAddProduct()} type='primary'>Add</Button>
        <Button onClick={() => setShowDeleteModal(true)} color='danger' variant='solid' disabled={selectedRowKey.length > 1 || !selectedRowKey.length}>Delete</Button>
      </div>
      <CustomTable 
        selectedRowKey={selectedRowKey}
        setSelectedRowKey={(e) => setSelectedRowKey(e)}
        columns={columns}
        selectedRow={true}
        api={'/product'}
        onDoubleClickPath='products'
      />
      <Modal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={() => onClickDeleteProduct()}
      >
        Delete Product?
      </Modal>
    </div>
  )
}

export default ProductPage