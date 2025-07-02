import { Input, Modal } from 'antd'
import React from 'react'

const AddItemModal = ({
    modalTitle,
    modalContent,
    isOpenModal=false,
    setModalContent,
    onOk,
    onCancel
}) => {

  const handleChange = (key, value) => {    
    setModalContent(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        content: value
      }
    }));
  };  

  return (
    <div>
        <Modal
            title={modalTitle}
            open={isOpenModal}
            onOk={onOk}
            onCancel={onCancel}
        >
          {
            Object.entries(modalContent).map(([key,{label,content,type}]) =>{
              if (type == 'input') {
                return(
                  <div key={key} className="" style={{margin: '10px'}}>
                    <label style={{fontSize:'16px'}} >{label}</label>
                    <Input 
                      onChange={(e) => handleChange(key,e.target.value)}
                      value={content}
                    />
                  </div>
                )
              }
            })
          }
        </Modal>
    </div>
  )
}

export default AddItemModal