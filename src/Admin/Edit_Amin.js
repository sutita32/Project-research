/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react'
import { BiEditAlt } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal, Space, Table, Select} from 'antd';
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";
import '../style/Edit_Admin.css'



function Edit_Amin() {
    const navigate = useNavigate();
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
    const [isLoading ,setIsLoading] = useState(true);
    const [Massagescrap, setmassagescrap] = useState("");
    const [professorlist, setprofessorlist] =useState([]);
    const [valuescrap , setvaluescrap] = useState(0);



    const scrapChange = (value) => {
        setvaluescrap(value);
      };
    useEffect(()=>{
        let token = localStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        fetch("http://localhost:4000/api/admin/get-databyid", requestOptions)
        .then(response => response.text())
        .then(result => {
          if(result === "Invalid Token"){
            localStorage.clear();
            navigate('/login');
          }else{
            setIsLoading(false);
          }
          return console.log(result);
        })
        .catch(error => console.log('error', error));

        fetch("http://localhost:4000/api/admin/get-timescrap", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.Timeset){
                    setmassagescrap(result.Timeset);
                }
                
                // return console.log(result);
            })
            .catch(error => console.log('error', error));

        requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:4000/api/professor/get-all-data", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.data){
                setprofessorlist(result.data);
            }
            return console.log(result);
        })
        .catch(error => console.log('error', error));
    },[]);

    
    const onExport = async(record) =>{
        console.log("record =>",record)
        let Idpro = record.ID_professor;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "id": Idpro
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let data1 =await fetch("http://localhost:4000/api/research/getresearch-idpro", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.data){
                return result.data;
            }
            
            return null;
            // return console.log(result);
        })
        .catch(error => {
         
            return console.log('error', error);
        });
        

        await console.log("datalist=>",data1)
        if(data1!== null){
            const fileType ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            let fileName= record.Keyword+" research";

            const ws = XLSX.utils.json_to_sheet(data1);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, fileName + fileExtension);
        }else{
            console.log("Can't Export file")
        }
        
    }

    const handleOk = () =>{
        console.log("valuescrap=>",valuescrap)
        let token = localStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "Settime": valuescrap
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:4000/api/admin/settime", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result)
            return console.log(result);
        })
        .catch(error => console.log('error', error));
    }


    
    const columns = [
        {
          title: 'ลำดับ',
          dataIndex: 'ID_professor',
          key: 'id',
          render: (text) => <p className=''>{text}</p>,
        },
        {
          title: 'ชื่อ-สกุล',
          dataIndex: 'Keyword',
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
                        <button onClick={()=> onExport(record)}><BiExport/></button>
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
            console.log("record =>",record)
            Modal.confirm({
              title: "คุณแน่ใจจะลบรายชื่ออาจารย์ ?",
              okText: "Yes",
              okType: "danger",
              onOk: () => {



                setData((pre) => {
                  return pre.filter((person) => person.ID_professor !== record.ID_professor);
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
                
                style={{
                    width: 120,
                }}
                onChange={scrapChange}
                value={valuescrap}
                options={[
                    {
                    value: 0,
                    label: 'ทุก 3 ชม.',
                    },
                    {
                    value: 1,
                    label: 'ทุก 1 วัน.',
                    },
                    {
                    value: 2,
                    label: 'ทุก 3 วัน',
                    },
                    {
                    value: 3,
                    label: 'ทุก วันอาทิทย์',
                    },
                    {
                    value: 4,
                    label: 'ทุก 15 วัน',
                    },
                    {
                    value: 5,
                    label: 'ทุก 1 เดือน',
                    },
                    {
                    value: 6,
                    label: 'ทุก 3 เดือน',
                    }
                ]}/>
            </Space>
            </>

          );
        const renderTable = (
            <>
            <Table 
            columns={columns} 
            dataSource={professorlist} 
            />
            </>
        );
        
    if( isLoading) return ( <>Loading.......</>)
    else return (
    <>
    <div className='edit3'>
    <div className='h-[50px] mt-[8px]'>เวลาset up ปัจจุบัน {Massagescrap}   ตั้งเวลาในการดึง {renderDropdown}</div>
    <button 
    onClick={handleOk}
    className='text-white bg-regal-red font-medium py-2.5 px-6 rounded-full text-sm transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer ml-4'>
        บันทึก 
    </button>
    <button className='text-white bg-regal-red font-medium py-2.5 px-6 rounded-full text-sm transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer ml-6'>ยกเลิก </button>
    </div>
    <div className='h-[800px]'>
        { renderTable}
    </div>
     </>
  )
}

export default Edit_Amin