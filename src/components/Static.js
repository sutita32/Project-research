import React, { useEffect } from "react";
import Graph1 from "./Graph1";
import Graph2 from "./Graph2";
import "../style/Static.css";
import { useState } from "react";
import { UserData } from "./Garph_stat";
import { UserData_AJ } from "./Graph_aj";
import StaticTypeBottom from "./StaticTypeBottom";
import StaticPersonBottom from "./StaticPersonBottom";
import { BiChevronDown } from "react-icons/bi";
import { types } from "./Types";
import { year } from "./Year";
import { Dropdown, Space } from "antd";

function Static(props) {

  const [typesNow, setTypesNow] = useState(types[0].name);
  const [yearNow, setYearNow] = useState("ทั้งหมด");
  const [dataresearch , setdataresearch] = useState([]);
  const [professorlist , setprofessor] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  // const [listcolor ,setlistcolor] =useState(new Array(100).fill("#"+Math.floor(Math.random()*16777215).toString(16)));
  // const [listyeardrop , setlistyear] = useState([]);
  let listcolor = [];
  for(let i =0 ;i< 100;i++){
    listcolor.push("#"+Math.floor(Math.random()*16777215).toString(16))
  }
  useEffect(()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:4000/api/search/get-all-orderbyyear", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.data){
          setdataresearch(result.data);
          setIsLoading(false);
        }
        // return console.log("dataresearch=>",result);
      })
      .catch(error => {
        setIsLoading(true);
        return console.log('error', error);
      });

    fetch("http://localhost:4000/api/professor/get-all-data", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.data){
        setprofessor(result.data);
        setIsLoading(false);
      }
      // return console.log(result);
    })
    .catch(error => {
      setIsLoading(true);
      return console.log('error', error);
    });



  },[])

  function LowerShow() {
    return <StaticPersonBottom typesNow={typesNow} dataresearch ={dataresearch} professorlist={professorlist} sendTeacherIndex={(item) => props.sendTeacherIndex(item)}/>;
  }

  function SumNumber() {
    var sum = 0;
    if (typesNow === types[0].name) {
      return dataresearch.length;
    } else if (typesNow === types[1].name) {
      for(let i=0;i<dataresearch.length;i++){
        if(dataresearch[i].ID_Type === 1) sum++;
      }
      return sum;
    }
    else if (typesNow === types[2].name) {
      for(let i=0;i<dataresearch.length;i++){
        if(dataresearch[i].ID_Type === 2) sum++;
      }
      return sum;
    }
  }

  //set form ใส่ dropdown ต้องเป็นคำว่า items เท่านั้น
  let dataDropdown = [
    {
      items: [
        {
          label: (
            <button className="font-bold1 w-full h-full text-start">
              {types[0].name}
            </button>
          ),
          key: "0",
        },
        {
          label: (
            <button className="font-bold1 w-full h-full text-start">
              {types[1].name}
            </button>
          ),
          key: "1",
        },
        {
          label: (
            <button className="font-bold1 w-full h-full text-start">
              {types[2].name}
            </button>
          ),
          key: "2",
        },
      ],
    },
    {
      items: [
        {
          label: (
            <button className="font-bold1 w-full h-full text-start">
              ทั้งหมด
            </button>
          ),
          key: "0",
          value :"ทั้งหมด"
        },
        // {
        //   label: (
        //     <button className="font-bold1 w-full h-full text-start">
        //       {year[1].id}
        //     </button>
        //   ),
        //   key: "1",
        // },
      ],
    },
  ];

  //Onclick form ของ Dropdown
  const onClickType = (info) => {

    setTypesNow(types[info.key].name);
  };
  const onClickYear = (info) => {
    console.log("info year=>",info)
    setYearNow(dataDropdown[1].items[info.key].value);
    // setYearNow(year[info.key].id);
    console.log("info year=>",info)
  };

  if( isLoading && dataresearch.length === 0) return (<>Loading....</>)
  else {
    let c=1;
    dataDropdown[1].items.push({
      label: (
        <button className="font-bold1 w-full h-full text-start">
          {new Date(dataresearch[0].Publication_date).getFullYear()}
        </button>
      ),
      key: "1",
      value : new Date(dataresearch[0].Publication_date).getFullYear().toString()
    });
    let temp= new Date(dataresearch[0].Publication_date).getFullYear();
    for(let i=1;i<dataresearch.length;i++){
      let com =new Date(dataresearch[i].Publication_date).getFullYear()
      if(com !== temp){
        dataDropdown[1].items.push(
          {
            label: (
              <button className="font-bold1 w-full h-full text-start">
                {new Date(dataresearch[i].Publication_date).getFullYear()}
              </button>
            ),
            key: (c+1).toString(),
            value :new Date(dataresearch[i].Publication_date).getFullYear().toString()
          }
        )
        temp = com;
        c++;
      }
    }
    
  return (
    <>
      <div className="h-[30px] w-full bg-regal-red"></div>
      <div className="bg-[#F0F8FF] pl-[120px] pt-[40px] pb-[20px]">
        <Dropdown
          menu={{
            items: dataDropdown[0].items,
            onClick: onClickType,
          }}
          trigger={["click"]}
          className="bg-regal-red px-[16px] py-[8px] rounded-lg text-white"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <div className="w-fit font-bold1">{typesNow}</div>

              <div className="h-[18px] w-[24px]">
                <BiChevronDown className="w-full h-full" />
              </div>
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className=" h-[550px] flex bg-[#F0F8FF]">
        <div className="h-[400px] w-[400px] top-[0px] left-[120px] relative shadow-2xl px-[30px] py-[30px] bg-white rounded-[20px]">
          <p className=" font-normal text-center">จำนวนงานวิจัย{typesNow}</p>
          <Graph1 typesNow={typesNow} yearNow={yearNow}  dataresearch={dataresearch} professorlist={professorlist} listcolor={listcolor}/>
        </div>
        <div className=" h-[400px] w-[800px] top-[0px] left-[240px] relative shadow-2xl px-[30px] py-[30px] bg-white rounded-[20px]">
          <p className=" font-normal text-center">
            จำนวนงานวิจัย{typesNow}ในปี ค.ศ. {yearNow}
          </p>
          <Graph2 typesNow={typesNow} yearNow={yearNow} dataresearch={dataresearch} professorlist={professorlist} listcolor={listcolor}/>
          <div class="absolute top-[28px] right-[40px]">
            <Dropdown
              menu={{ items: dataDropdown[1].items, onClick: onClickYear }}
              trigger={["click"]}
              className="bg-regal-red px-[13px] py-[8px] rounded-lg text-white "
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className="w-[24px] font-bold1">{yearNow}</div>

                  <div className="h-[18px] w-[18px]">
                    <BiChevronDown className="w-full h-full" />
                  </div>
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-[#F0F8FF]  h-[200px] w-full">
        <div class="grid grid-cols-10  h-[100%] w-[80%] rounded-[30px] bg-regal-red text-white">
          <div class="grid col-span-6 place-items-center font-bold1 text-[20px]">
            จำนวนงานวิจัย{typesNow}
          </div>
          <div class="grid grid-rows-3 place-items-center col-span-4  bg-white bg-opacity-[0.3] font-bold1 text-[18px] py-[30px]">
            <div>จำนวน</div>
            <div>
              <SumNumber />
            </div>
            <div>รายการ</div>
          </div>
        </div>
      </div>
      <LowerShow />
    </>
  );
  }
}

export default Static;
