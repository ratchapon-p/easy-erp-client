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
  // const [dataSource, setDataSource] = useState([])

  useEffect(() =>{
    // getStockBalance()
  },[])

  // const getStockBalance = async() =>{
  //   const url = `${baseURL}/product`
  //   const response = await get(url)
  //   if (response.success) {
  //     setDataSource(response.data)
  //   }
  // }

  return (
    <div className='content-page'>
      <label>Stock Balance</label>
      <CustomTable 
        columns={columns}
        api={'/product'}
      />
    </div>
  )
}
