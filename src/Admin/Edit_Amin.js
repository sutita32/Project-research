/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState} from 'react'
import { BiEditAlt } from "react-icons/bi";
import { BiExport } from "react-icons/bi";

import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal, Space, Table, Select} from 'antd';


import '../style/Edit_Admin.css'



function Edit_Amin() {
    const [data, setData] = useState([   
        {
          id: 1,
          name: 'ผศ.ดร.อัครา ประโยชน์',
        },
        {
            id: 2,
          name: 'รศ.ดร.ธนภัทร์ อนุศาสน์อมรกุล',
        },
        {
            id: 3,
          name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 4,
          name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 5,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 6,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 7,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 8,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 9,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 10,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 11,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 12,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 13,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 14,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 15,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 16,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 17,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 18,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 19,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 20,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id:21,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
        {
            id: 22,
            name: 'ผศ.ดร.ลือพล พิพานเมฆาภรณ์',
        },
    ]);

    
    const columns = [
        {
          title: 'ลำดับ',
          dataIndex: 'id',
          key: 'id',
          render: (text) => <p className=''>{text}</p>,
        },
        {
          title: 'ชื่อ-สกุล',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: ' ',
          key: 'action',
          render: ( record) => (
            <Space size="middle" >
                <div  className='edit-1'>
                    <div className='edit'>
                        <button><BiEditAlt/></button>
                    </div>
                    <div className='edit'>
                        <button><BiExport/></button>
                    </div>
                    <div className='edit-delete'>
                        <button ><RiDeleteBin6Line className='text-red-700' onClick={() =>
                            onDelete(record)
                        }/></button>
                    </div>
                </div>
            </Space>
          ),
        },
      ];
        const onDelete = (record) => {
            Modal.confirm({
              title: "คุณแน่ใจจะลบรายชื่ออาจารย์ ?",
              okText: "Yes",
              okType: "danger",
              onOk: () => {
                setData((pre) => {
                  return pre.filter((person) => person.id !== record.id);
                });
              },
            });
          };
          const handleChange = (value) => {
            console.log(`selected ${value}`);
          };

          const renderDropdown =(
            <>
           <Space wrap>
            <Select
                defaultValue="0"
                style={{
                    width: 120,
                }}
                onChange={handleChange}
                options={[
                    {
                    value: '0',
                    label: 'กรุณาเลือก',
                    },
                    {
                    value: '1',
                    label: 'ทุก 15 วัน',
                    },
                    {
                    value: '2',
                    label: 'ทุก 1 เดือน',
                    },
                    {
                    value: '3',
                    label: 'ทุก 3 เดือน',
                    },
                    {
                    value: '4',
                    label: 'ทุก 6 เดือน',
                    },
                    {
                    value: '5',
                    label: 'ทุก 12 เดือน',
                    },
                ]}/>
            </Space>
            </>

          );
        const renderTable = (
            <>
            <Table 
            columns={columns} 
            dataSource={data} 
            />
            </>
        );
        

  return (
    <>
    <div className='edit3'>
    <div className='h-[50px] mt-[8px]'>ตั้งเวลาในการดึง {renderDropdown}</div>
    <button className='text-white bg-regal-red font-medium py-2.5 px-6 rounded-full text-sm transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer ml-4'>บันทึก </button>
    <button className='text-white bg-regal-red font-medium py-2.5 px-6 rounded-full text-sm transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer ml-6'>ยกเลิก </button>
    </div>
    <div className='h-[800px]'>
        { renderTable}
    </div>
     </>
  )
}

export default Edit_Amin