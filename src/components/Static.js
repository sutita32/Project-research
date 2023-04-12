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
import { Dropdown, Space, Spin } from "antd";
import ShowUpperTable from "./ShowUpperTable";

function Static(props) {
  const [typesNow, setTypesNow] = useState(types[0].name);
  const [yearNow, setYearNow] = useState("ทั้งหมด");
  const [dataresearch, setdataresearch] = useState([]);
  const [professorlist, setprofessor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [listcolor ,setlistcolor] =useState(new Array(100).fill("#"+Math.floor(Math.random()*16777215).toString(16)));
  // const [listyeardrop , setlistyear] = useState([]);

  const [dataTable, setDataTable] = useState(
    <ShowUpperTable
    getdata={dataresearch}
    // sendResearchIndex={(item) => props.sendResearchIndex(item)}
    />
  );
  
  let listcolor = [];
  for (let i = 0; i < 100; i++) {
    listcolor.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }

  let filterresearch = [];

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:4000/api/search/get-all-orderbyyear",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setdataresearch(result.data);
          setDataTable(<ShowUpperTable getdata={result.data}  yearNow ={yearNow} typesNow={typesNow} sendResearchIndex={(item)=> props.sendResearchIndex(item)}/>)
          setIsLoading(false);
        }
        // return console.log("dataresearch=>",result);
      })
      .catch((error) => {
        setIsLoading(true);
        return console.log("error", error);
      });

    fetch("http://localhost:4000/api/professor/get-all-data", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setprofessor(result.data);
          setIsLoading(false);
        }
        // return console.log(result);
      })
      .catch((error) => {
        setIsLoading(true);
        return console.log("error", error);
      });
  }, []);

  function LowerShow() {
    return (
      <StaticPersonBottom
        typesNow={typesNow}
        yearNow={yearNow}
        dataresearch={dataresearch}
        professorlist={professorlist}
        sendTeacherIndex={(item) => props.sendTeacherIndex(item)}
      />
    );
  }
  // function setfilter(data){
  //   setDataTable(<ShowUpperTable getdata={data}/>)
  // }
  useEffect(()=>{
    let filterresearch =[];
    if(typesNow === "จำแนกทั้งหมด"){
      if(yearNow === "ทั้งหมด"){
        filterresearch =dataresearch;
      }else {
        for(let i=0;i<dataresearch.length;i++){
          if(yearNow === new Date(dataresearch[i].Publication_date).getFullYear().toString()){
            filterresearch.push(dataresearch[i]);
          }
        }
      }
    }else if(typesNow === "จำแนกตาม Scholar"){
      if(yearNow === "ทั้งหมด"){
        for(let i=0;i<dataresearch.length;i++){
          if(dataresearch[i].ID_Type === 1){
            filterresearch.push(dataresearch[i]);
          }
        }
      }else {
        for(let i=0;i<dataresearch.length;i++){
          if(yearNow === new Date(dataresearch[i].Publication_date).getFullYear().toString() && dataresearch[i].ID_Type === 1){
            filterresearch.push(dataresearch[i]);
          }
        }
      }
    }else if(typesNow === "จำแนกตาม Scopus"){
      if(yearNow === "ทั้งหมด"){
        for(let i=0;i<dataresearch.length;i++){
          if(dataresearch[i].ID_Type === 2){
            filterresearch.push(dataresearch[i]);
          }
        }
      }else {
        for(let i=0;i<dataresearch.length;i++){
          if(yearNow === new Date(dataresearch[i].Publication_date).getFullYear().toString() && dataresearch[i].ID_Type === 2){
            filterresearch.push(dataresearch[i]);
          }
        }
      }
    }

    setDataTable(<ShowUpperTable getdata={filterresearch} yearNow ={yearNow} typesNow={typesNow} sendResearchIndex={(item)=> props.sendResearchIndex(item)}/>)
  },[yearNow , typesNow])
  function SumNumber() {
    var sum = 0;
    filterresearch.length = 0;
    if (typesNow === types[0].name) {
      if(yearNow === "ทั้งหมด"){
        for(let i=0 ;i<dataresearch.length;i++) filterresearch.push(dataresearch[i]);
        filterresearch = filterresearch.filter((obj, index) => {
          return index === filterresearch.findIndex(o =>  obj.name_research.toLowerCase() === o.name_research.toLowerCase());
        });
        // setfilter(filterresearch)
        return filterresearch.length;
      }else {
        for (let i = 0; i < dataresearch.length; i++) {
          if (new Date(dataresearch[i].Publication_date).getFullYear().toString() === yearNow) {
            sum++;
            filterresearch.push(dataresearch[i]);
          }
        }
        return sum;
      }
      
    } else if (typesNow === types[1].name) {
      if(yearNow === "ทั้งหมด"){
        for (let i = 0; i < dataresearch.length; i++) {
          if (dataresearch[i].ID_Type === 1) {
            sum++;
            filterresearch.push(dataresearch[i]);
          }
        }
        return sum;
      }else{
        for (let i = 0; i < dataresearch.length; i++) {
          if (new Date(dataresearch[i].Publication_date).getFullYear().toString() === yearNow && dataresearch[i].ID_Type === 1 ) {
            sum++;
            filterresearch.push(dataresearch[i]);
          }
        }
        return sum;
      }
    } else if (typesNow === types[2].name) {
      if(yearNow === "ทั้งหมด"){
        for (let i = 0; i < dataresearch.length; i++) {
          if (dataresearch[i].ID_Type === 2) {
            sum++;
            filterresearch.push(dataresearch[i]);
          }
        }
        return sum;
      }else{
        for (let i = 0; i < dataresearch.length; i++) {
          if (new Date(dataresearch[i].Publication_date).getFullYear().toString() === yearNow && dataresearch[i].ID_Type === 2 ){
            sum++;
            filterresearch.push(dataresearch[i]);
          } 
        }
        return sum;
      }
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
          value: "ทั้งหมด",
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
    // console.log("info year=>", info);
    setYearNow(dataDropdown[1].items[info.key].value);
    // setYearNow(year[info.key].id);
    // console.log("info year=>", info);
  };

  if (isLoading) return <div className="h-[80px] pt-[40px]">
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin></div>;

  else if (dataresearch.length > 0) {
    let c = 1;
    // dataDropdown[1].items.push({
    //   label: (
    //     <button className="font-bold1 w-full h-full text-start">
    //       {new Date(dataresearch[0].Publication_date).getFullYear()}
    //     </button>
    //   ),
    //   key: "1",
    //   value: new Date(dataresearch[0].Publication_date)
    //     .getFullYear()
    //     .toString(),
    // });
    let temp = new Date(dataresearch[0].Publication_date).getFullYear();
    for (let i = 1; i < dataresearch.length; i++) {
      let com = new Date(dataresearch[i].Publication_date).getFullYear();
      if (com !== temp) {
        dataDropdown[1].items.push({
          label: (
            <button className="font-bold1 w-full h-full text-start">
              {new Date(dataresearch[i].Publication_date).getFullYear()}
            </button>
          ),
          key: (c).toString(),
          value: new Date(dataresearch[i].Publication_date)
            .getFullYear()
            .toString(),
        });
        temp = com;
        c++;
      }
    }

    
    return (
      <>
        <div className="h-[30px] w-full bg-regal-red"></div>
        <div className="bg-[#F0F8FF] pl-[80px] pt-[40px] pb-[20px]">
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
        <div className=" max-[391px]:h-[700px] max-[481px]:h-[800px] max-[920px]:h-[1000px] min-[921px]:h-[500px] min-[921px]:flex bg-[#F0F8FF]">
          <div className="max-[920px]:mb-[20px] max-[920px]:w-full  min-[921px]:h-[400px] min-[921px]:w-[640px] top-[0px] max-[920px]:left-0 min-[921px]:left-[80px] relative shadow-2xl py-[30px] bg-white rounded-[20px] overflow-visible">
            <p className=" font-normal text-center">จำนวนงานวิจัย{typesNow}</p>
            <Graph1
              typesNow={typesNow}
              yearNow={yearNow}
              dataresearch={dataresearch}
              professorlist={professorlist}
              listcolor={listcolor}
            />
          </div>
          <div className=" min-[921px]:h-[400px] min-[921px]:w-[760px] top-[0px] max-[920px]:left-0 min-[921px]:left-[100px] relative shadow-2xl px-[30px] py-[30px] bg-white rounded-[20px]">
            <p className=" font-normal text-center">
              จำนวนงานวิจัย{typesNow}ในปี ค.ศ. {yearNow}
            </p>
            <Graph2
              typesNow={typesNow}
              yearNow={yearNow}
              dataresearch={dataresearch}
              professorlist={professorlist}
              listcolor={listcolor}
            />
            <div class="absolute top-[28px] right-[40px]">
              <Dropdown
                menu={{ items: dataDropdown[1].items, onClick: onClickYear }}
                trigger={["click"]}
                className="bg-regal-red px-[13px] py-[8px] rounded-lg text-white "
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className="w-[24px] font-bold1">{yearNow}</div>

                    <div className="h-[18px] w-[18px] mr-3 ">
                      <BiChevronDown className="w-full h-full ml-4" />
                    </div>
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>

        <div class="bg-[#F0F8FF]">
          <div class="grid place-items-center w-full min-h-[70px]">
            <div class="grid h-auto w-[90%]">
              <div class="text-white font-medium text-[17px] h-[45px] w-full bg-regal-red rounded-[5px] grid grid-cols-10">
                <div
                  scope="col"
                  className="px-6 py-3 rounded-l-lg font-medium1 col-span-8"
                >
                  Product name
                </div>
                <div></div>
                <div
                  scope="col"
                  className="grid place-content-center  py-3 font-medium1 "
                >
                  YEAR
                </div>
              </div>
            </div>
            {dataTable}
            <div class="w-full h-[30px]"></div>
          </div>
        </div>

        <div className="flex justify-center bg-[#F0F8FF]  h-[200px] w-full">
          <div class="grid grid-cols-10  h-[100%] w-[80%] rounded-[30px] bg-regal-red text-white">
            <div class="grid col-span-6 place-items-center font-bold1 text-[20px] text-center">
              จำนวนงานวิจัย{typesNow}
            </div>

            <div class="grid grid-rows-3 place-items-center col-span-4  bg-white font-bold1 text-[18px] shadow-lg rounded-r-[28px] py-[30px]">
              <div className=" text-regal-red font-semibold">จำนวน</div>
              <div className=" text-regal-red ">
                <SumNumber />
              </div>
              <div className=" text-regal-red font-semibold">รายการ</div>
            </div>
          </div>
        </div>
        <LowerShow />
      </>
    );
  }
  else return (<></>)
}

export default Static;
