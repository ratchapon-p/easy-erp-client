import React, { useState } from 'react'
import './ReceiveProduct.scss'
import { Input } from 'antd'
import { post } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

const ReceiveProduct = () => {
  const [loading, setLoading] = useState(false)
  const [barcode, setBarcode] = useState('')
  
  const onChangeScanBarcode = async(barcode) =>{
    setBarcode(barcode)
    setLoading(true)
    const url = `${baseURL}/scanner/scanin`
    const data = {
      barcode
    }
    try {
      const response = await post(url,data)
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
      setBarcode('')
    }
  }

  return (
    <div className='content-page receive-product'>
    <label>Receive Product</label>
      <div className="receive-product-content">
        <label >Scan Product</label>

        <Input 
          value={barcode}
          disabled={loading}
          className='scan-receive-product'
          onChange={(e) => onChangeScanBarcode(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ReceiveProduct