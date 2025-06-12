import Input from 'antd/es/input/Input';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './Product.scss'
import { Button } from 'antd';
import { get, post, put } from '../../utils/httpMethods'
const baseURL = import.meta.env.VITE_BASE_URL

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    attribute_1: '',
    attribute_2: '',
    attribute_3: '',
    attribute_4: '',
    custom_barcode: '',
  })
  const [loading, setLoading] = useState(false)
  const query = new URLSearchParams(useLocation().search);
  const type = query.get('type');
  const itemType = type === 'create' ? 'Create' : 'Edit'

  const onChangeProduct = (key, value) => {
    setProduct((prev) =>({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() =>{
    if(type === 'edit'){
      getProduct()
    }
  },[])
  
  const setInitialValue = (data) =>{
    setProduct((prev) => ({
      ...prev,
      attribute_1: data.attribute_1,
      attribute_2: data.attribute_2,
      attribute_3: data.attribute_3,
      attribute_4: data.attribute_4,
      custom_barcode: data.custom_barcode,
    }))
  }
  
  const getProduct = async() =>{
    const url = `${baseURL}/product/${id}`
    const response = await get(url)
    if (response.success) {
      const data = response.data[0]
      setInitialValue(data)
    }
  }

  const onSave = async() =>{
    setLoading(true)
    let url = `${baseURL}/product`
    let update = post
    const data = product
    if(type === 'edit'){
      url = `${baseURL}/product/${id}`
      update = put
    }
    try {
      const response = await update(url,data)
      if (response.success) {
        navigate('/products')
      }
    } catch (error) {
      console.log('Error', error);
    }finally{
      setLoading(false)
      
    }
 

  }

  const onCancelButton = () =>{
    setProduct((prev) => ({
      ...prev,
      attribute_1: '',
      attribute_2: '',
      attribute_3: '',
      attribute_4: '',
      custom_barcode: '',
    }))
    navigate('/products')
  }


  return (
    <div className='content-page'>
      <label >{itemType} - Product</label>

      <div className="product-form">
        <div className="product-form-box">
          <label >Category</label>
          <Input 
            value={product.attribute_1}
            className='product-form-input'
            onChange={(e) => onChangeProduct('attribute_1',e.target.value)}
          />
        </div>
        <div className="product-form-box">
          <label >Brand</label>
          <Input 
          value={product.attribute_2}
            className='product-form-input'
            onChange={(e) => onChangeProduct('attribute_2',e.target.value)}
          />
        </div>
        <div className="product-form-box">
          <label >Size</label>
          <Input 
        value={product.attribute_3}
            className='product-form-input'
            onChange={(e) => onChangeProduct('attribute_3',e.target.value)}
          />
        </div>
        <div className="product-form-box">
          <label >Color</label>
          <Input 
          value={product.attribute_4}
            className='product-form-input'
            onChange={(e) => onChangeProduct('attribute_4',e.target.value)}
          />
        </div>
        <div className="product-form-box">
          <label >Product Barcode</label>
          <Input 
            disabled={type === 'edit' && product.custom_barcode}
            value={product.custom_barcode}
            className='product-form-input'
            onChange={(e) => onChangeProduct('custom_barcode',e.target.value)}
          />
        </div>

      </div>

        <div className="save-and-cancel">
          <div className="save-btn">
            <Button onClick={() => onSave()} disabled={loading} type='primary'>Save</Button>
          </div>
          <div  className="save-btn">
            <Button disabled={loading} onClick={() => onCancelButton()} >Cancel</Button>
          </div>
        </div>
    </div>
  )
}

export default EditItem