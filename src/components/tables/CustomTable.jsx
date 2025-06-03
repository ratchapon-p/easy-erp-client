import { Table,Checkbox,Input } from 'antd'
import React, { useState } from 'react'
import './CustomTable.scss'
import { useNavigate } from 'react-router-dom'


const CustomTable = ({
    columns,
    dataSource,
    onDoubleClickPath,
    selectedRowKey, setSelectedRowKey,
    selectedRow=false
}) => {
    const navigate = useNavigate() 
    const [searchText, setSearchText] = useState({});

    const handleSearchChange = (key, value) => {
      setSearchText(prev => ({ ...prev, [key]: value }));
    };
    const rowSelection = {
        selectedRowKey,
        onChange: (selectedRowKey) =>{
            setSelectedRowKey(selectedRowKey)
        }
    }

    const limit = 50;

 

    const renderTable = () => {
        return columns.map((col) => ({
          ...col,
          title: (
            <div>
              <Input
                style={{borderRadius: '0',margin: '0'}}
                placeholder={`Search ${col.title}`}
                value={searchText[col.key] || ''}
                onChange={(e) => handleSearchChange(col.key, e.target.value)}
              />
              <div className="" style={{padding: '10px'}}>{col.title}</div>
            </div>
          ),
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
            rowSelection={selectedRow ? rowSelection: false}
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