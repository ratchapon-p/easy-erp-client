import { Table,Checkbox,Input, Select, Dropdown,Button,Menu, DatePicker  } from 'antd'
import React, { useState } from 'react'
import './CustomTable.scss'
import { useNavigate } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons';
import { get } from '../../utils/httpMethods'
import { useEffect } from 'react';
const baseURL = import.meta.env.VITE_BASE_URL

const CustomTable = ({
    columns,
    api,
    onDoubleClickPath,
    selectedRowKey, setSelectedRowKey,
    selectedRow=false
}) => {
    const navigate = useNavigate() 
    const [searchText, setSearchText] = useState({});
    const [dataSource, setDataSource] = useState([])
    const handleSearchChange = (key, value) => {
      setSearchText(prev => ({ ...prev, [key]: value }));
    };
    const rowSelection = {
        selectedRowKey,
        onChange: (selectedRowKey) =>{
            setSelectedRowKey(selectedRowKey)
        }
    }

    useEffect(() =>{
      handleSearchSubmit()
    },[])

    const limit = 50;

    const filterList = [
      {
        key: 'grether',
        value: 'grether',
        label: 'Grether Than',
      },
      {
        key: 'less',
        value: 'less',
        label: 'Less Than',
      },
      {
        key: 'equal',
        value: 'equal',
        label: 'Equal',
      },
      {
        key: 'asc',
        value: 'asc',
        label: 'Ascending',
      },
      {
        key: 'desc',
        value: 'desc',
        label: 'Descending',
      },

    ]

const handleSearchSubmit = async() => {
  const query = {
    limit: limit,
    offSet: 0,
    tz: '+07:00',
    filterdata: {},
    searchText: searchText
  };

  try {
    
  const url = `${baseURL}${api}?${new URLSearchParams({
    limit: query.limit,
    offSet: query.offSet,
    tz: encodeURIComponent(query.tz),
    filterdata: JSON.stringify(query.filterdata),
    searchText: JSON.stringify(query.searchText)
  })}`;
  const response = await get(url)
  setDataSource(response.data)
  
  } catch (error) {
    console.log(error,'<<Error');
    setDataSource([])
    
  }

};

  const filterMenu = (
    <Menu>
      {filterList.map((item) => (
        <Menu.Item key={item.key} onClick={() => handleSearchSubmit(item.value)}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
 
  const renderColInput = (col) =>{
    const dateKey = ['update_datetime']
    if(dateKey.includes(col.key)){
      return(
        <DatePicker 
          style={{width: '100%',borderRadius: '0',margin: '0'}}
          onChange={(date) => handleSearchChange(col.key, date)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearchSubmit();
          }}
          format="DD-MM-YYYY"
          value={null}
        />
      )
    }else{
      return(
        <Input
          style={{borderRadius: '0',margin: '0'}}
          placeholder={`Search ${col.title}`}
          value={searchText[col.key] || ''}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearchSubmit();
          }}
          onChange={(e) => handleSearchChange(col.key, e.target.value)}
        />
      )
    }
  }

  const renderTable = () => {
      return columns.map((col) => ({
        ...col,
        title: (
          <div>
            {renderColInput(col)}
            <div className="column-filter" style={{ padding: "10px" }}>
              <p>{col.title}</p>
              {/* <Dropdown
                placement="topRight"
                overlay={filterMenu}
                trigger={["click"]}
              >
                <div className="column-dropdown-icon">
                  <DownOutlined className="dropdown-outline" />
                </div>
              </Dropdown> */}
            </div>
          </div>
        ),
        render: (text, record, index) => {
          if (col.key === "total") {
            const dataText = text ? text : 0;
            return <div style={{ color: "#2095c1" }}>{dataText}</div>;
          }
          return text;
        },
      }));
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