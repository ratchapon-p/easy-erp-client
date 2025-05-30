import React, { useState } from 'react'
import './DeliveryProduct.scss'
import { Input } from 'antd'
import { post } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

const DeliveryProduct = () => {
  const [loading, setLoading] = useState(false)
  const [barcode, setBarcode] = useState('')
  
  const onChangeScanBarcode = async(barcode) =>{
    setBarcode(barcode)
    setLoading(true)
    const url = `${baseURL}/scanner/scanout`
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
    <div className='content-page delivery-product'>
    <label>Delivery Product</label>
      <div className="delivery-product-content">
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

export default DeliveryProduct