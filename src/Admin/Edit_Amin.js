/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal, Space, Table, Select } from "antd";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import "../style/Edit_Admin.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Edit_Amin(props) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState([
    {
      id: 1,
      name: "ผศ.ดร.อัครา ประโยชน์",
    },
    {
      id: 2,
      name: "รศ.ดร.ธนภัทร์ อนุศาสน์อมรกุล",
    },
    {
      id: 3,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 4,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 5,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 6,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 7,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 8,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 9,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 10,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 11,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 12,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 13,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 14,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 15,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 16,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 17,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 18,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 19,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 20,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 21,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
    {
      id: 22,
      name: "ผศ.ดร.ลือพล พิพานเมฆาภรณ์",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [Massagescrap, setmassagescrap] = useState("");
  const [professorlist, setprofessorlist] = useState([]);
  const [valuescrap, setvaluescrap] = useState(0);

  const scrapChange = (value) => {
    setvaluescrap(value);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("http://localhost:4000/api/admin/get-databyid", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === "Invalid Token") {
          localStorage.clear();
          navigate("/login");
        } else {
          setIsLoading(false);
        }
        return console.log(result);
      })
      .catch((error) => console.log("error", error));

    fetch("http://localhost:4000/api/admin/get-timescrap", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Timeset) {
          setmassagescrap(result.Timeset);
        }

        // return console.log(result);
      })
      .catch((error) => console.log("error", error));

    requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/professor/get-all-databyadmin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setprofessorlist(result.data);
        }
        return console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const onExport = async (record) => {
    // console.log("record =>", record);
    let Idpro = record.ID_professor;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: Idpro,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let data1 = await fetch(
      "http://localhost:4000/api/research/getresearch-idpro",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          
          return result.data;
        }else{
          
           return null;
        }

       
        // return console.log(result);
      })
      .catch((error) => {
        return console.log("error", error);
      });

    // await console.log("datalist=>", data1);
    if (data1 !== null) {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      let fileName = record.Keyword + " research";

      const ws = XLSX.utils.json_to_sheet(data1);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
      MySwal.fire({
        html:<i>{`Export Success !!`}</i>,
        icon: 'success',
      })
    } else {
      MySwal.fire({
        html:<i>{`Export Fail We Can't Export file !!`}</i>,
        icon: 'error',
      })
      // console.log("Can't Export file");
    }
  };

  const handleOk = () => {
    // console.log("valuescrap=>", valuescrap);
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Settime: valuescrap,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/admin/settime", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) return console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "ID_professor",
      key: "id",
      align: "center",
      render: (text) => (
        <div className="grid place-content-center">
          <p className="">{text}</p>
        </div>
      ),
    },
    {
      title: "ชื่อ-สกุล",
      dataIndex: "Keyword",
      key: "name",
      align: "center",
    },
    {
      title: " ",
      key: "action",
      align: "center",
      render: (record) => (
        <Space size="middle">
          <div className="edit-1">
            <div className="edit">
              <NavLink
                to={`/profile/${record.ID_professor}`}
                onClick={() => props.sendTechID(record.ID_professor)}
              >
                <button>
                  <BiEditAlt />
                </button>
              </NavLink>
            </div>
            <div className="edit">
              <button onClick={() => onExport(record)}>
                <BiExport />
              </button>
            </div>
            <div className="edit-delete">
              <button>
                <RiDeleteBin6Line
                  className="text-red-700"
                  onClick={() => onDelete(record)}
                />
              </button>
            </div>
          </div>
        </Space>
      ),
    },
  ];
  const onDelete = (record) => {
    // console.log("record =>", record);
    Modal.confirm({
      title: "คุณแน่ใจจะลบรายชื่ออาจารย์ ?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        let token = localStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "proID": record.ID_professor
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:4000/api/professor/delete-data", requestOptions)
          .then(response => response.text())
          .then((result) =>{
              if(result === "delete Success"){
                MySwal.fire({
                  html:<i>{`Delete Success !!`}</i>,
                  icon: 'success',
                }).then((value) => {
                  window.location.reload(false);
                })
              }else{
                MySwal.fire({
                  html:<i>{`Delete Faile !!`}</i>,
                  icon: 'error',
                }).then((value) => {
                  window.location.reload(false);
                })
              }
          })
          .catch(error => console.log('error', error));

        setData((pre) => {
          return pre.filter(
            (person) => person.ID_professor !== record.ID_professor
          );
        });
        
      },
    });
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const renderDropdown = (
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
              label: "ทุก 3 ชม.",
            },
            {
              value: 1,
              label: "ทุก 1 วัน.",
            },
            {
              value: 2,
              label: "ทุก 3 วัน",
            },
            {
              value: 3,
              label: "ทุก วันอาทิทย์",
            },
            {
              value: 4,
              label: "ทุก 15 วัน",
            },
            {
              value: 5,
              label: "ทุก 1 เดือน",
            },
            {
              value: 6,
              label: "ทุก 3 เดือน",
            },
          ]}
        />
      </Space>
    </>
  );
  const renderTable = (
    <>
      <Table columns={columns} dataSource={professorlist} headerClassName="set_head_table"/>
    </>
  );

  if (isLoading) return <>Loading.......</>;
  else
    return (
      <>
        <form className="grid place-content-center bg-gray-600">
          <div className="grid place-content-center bg-gray-300 h-fit my-[20px] rounded-[5px] class_gray_area text-center">
            <div className="h-[50px] mt-[8px]">
              เวลา set up ปัจจุบัน {Massagescrap} ตั้งเวลาในการดึง
            </div>
            <div class="grid place-content-center mb-[15px] ">
              {renderDropdown}
            </div>
            <div class="grid place-content-center mb-[15px]">
              <button
                onClick={handleOk}
                className="text-white bg-regal-red font-medium py-2.5 px-6 rounded-full text-sm transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer w-fit "
              >
                บันทึก
              </button>
            </div>
          </div>
        </form>
        <div className="h-[900px]  bg-gray-300 pt-[60px]" >
          <div className="make-center w-10/12">{renderTable}</div>
        </div>
      </>
    );
}

export default Edit_Amin;
