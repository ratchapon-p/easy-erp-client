import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/tables/CustomTable'
import { get } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

export const StockBalance = () => {
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
    {
      key: 'total',
      dataIndex: 'total',
      title: 'Total'
    },
  ])
  const [dataSource, setDataSource] = useState([])

  useEffect(() =>{
    getStockBalance()
  },[])

  const mockData = [
    {
      attribute_1: 'Skirt',
      attribute_2: 'RUSH',
      attribute_3: 'S',
      attribute_4: 'Red',
      total: 10
    },
    {
      attribute_1: 'T-Shirt',
      attribute_2: 'RUSH',
      attribute_3: 'XL',
      attribute_4: 'Navy Blue',
      total: 6
    },
    {
      attribute_1: 'Jeans',
      attribute_2: 'AUXA',
      attribute_3: 'L',
      attribute_4: 'Black',
      total: 101
    },
    {
      attribute_1: 'Shirt',
      attribute_2: 'POLO',
      attribute_3: 'L',
      attribute_4: 'Blue',
      total: 105
    },
    {
      attribute_1: 'Short',
      attribute_2: 'AMMY',
      attribute_3: 'M',
      attribute_4: 'Cyan',
      total: 76
    },
  ]

  const getStockBalance = async() =>{
    const url = `${baseURL}/product`
    const response = await get(url)
    if (response.success) {
      setDataSource(response.data)
    }
  }

  return (
    <div className='content-page'>
      <label>Stock Balance</label>
      <CustomTable 
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  )
}
