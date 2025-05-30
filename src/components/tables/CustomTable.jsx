import { Table,Checkbox,Input } from 'antd'
import React from 'react'
import './CustomTable.scss'
import { useNavigate } from 'react-router-dom'


const CustomTable = ({
    columns,
    dataSource,
    onDoubleClickPath
}) => {
    const navigate = useNavigate()
    const limit = 50;

    const renderTable = () => {
        return columns.map((col) => ({
          ...col,
          render: (text, record, index) => {
            if(col.key === 'total'){
                const dataText = text ? text : 0
                return (
                    <div style={{color:'#2095c1'}}>{dataText}</div>
                )
            }
            return text
          }
        }))
      }

  return (
    <div className='custom-table'>
        <Table 
            bordered={true}
            columns={renderTable()}
            dataSource={dataSource}
            onRow={(record, key) =>{
                const rowProps = {};
                if (onDoubleClickPath) {
                    rowProps.onDoubleClick = () => {
                        if(onDoubleClickPath){
                            navigate(`/${onDoubleClickPath}/${record.id}?type=edit`);
                        }else{
                            navigate(`/${onDoubleClickPath}/${record.id}`);
                        }
                    };
                }
                return rowProps;
            }}
        />
    </div>
  )
}

export default CustomTable