import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { Button } from 'antd'
import './Product.scss'
import { useNavigate } from 'react-router-dom'
import { get } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

const ProductPage = () => {
  const navigate = useNavigate()
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
  const [dataSource, setDataSource] = useState([])

  useEffect(() =>{
    getProductList()
  },[])

  // const mockData = [
  //   {
  //     id: 1,
  //     attribute_1: 'Skirt',
  //     attribute_2: 'RUSH',
  //     attribute_3: 'S',
  //     attribute_4: 'Red',
  //   },
  //   {
  //     id: 2,
  //     attribute_1: 'T-Shirt',
  //     attribute_2: 'RUSH',
  //     attribute_3: 'XL',
  //     attribute_4: 'Navy Blue',
  //   },
  //   {
  //     id: 3,
  //     attribute_1: 'Jeans',
  //     attribute_2: 'AUXA',
  //     attribute_3: 'L',
  //     attribute_4: 'Black',
  //   },
  //   {
  //     id: 4,
  //     attribute_1: 'Shirt',
  //     attribute_2: 'POLO',
  //     attribute_3: 'L',
  //     attribute_4: 'Blue',
  //   },
  //   {
  //     id: 5,
  //     attribute_1: 'Short',
  //     attribute_2: 'AMMY',
  //     attribute_3: 'M',
  //     attribute_4: 'Cyan',
  //   },
  // ]

  const getProductList = async() =>{
    const url = `${baseURL}/product`
    const response = await get(url)
    if (response.success) {
      setDataSource(response.data)
    }
  }

  const onCLickAddProduct = () =>{
    navigate('/products/create?type=create')
  }


  return (
    <div className='content-page'>
      <label>Product</label>
      <div className="command-tab">
        <Button onClick={() => onCLickAddProduct()} type='primary'>Add</Button>
        <Button color='danger' variant='solid'>Delete</Button>
      </div>
      <CustomTable 
        columns={columns}
        dataSource={dataSource}
        onDoubleClickPath='products'
      />
    </div>
  )
}

export default ProductPage