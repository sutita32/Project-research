/* eslint-disable jsx-a11y/scope */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "../style/profilePage.css";
import { BiEdit } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { workData } from "./workData";
import { useState } from "react";
import ProfilePageInterest from "./profilePage_Interest";
import { HiOutlineMail } from "react-icons/hi";
import Scholar from "./scholar";
import Scopus from "./scopus";
import { Bar } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import { Alert, Space, Spin } from "antd";
function ProfilePage(props) {
  // console.log("getid=>",getid)

  const [isLoading, setIsLoading] = useState(true);
  const [datapro, setdatapro] = useState([]);
  const [dataresearch, setdataresearch] = useState([]);
  const [dataresearchgraph , setdataresearchgraph]= useState([]);
  const [dataskill, setdataskill] = useState([]);
  const [dataqulification, setqulification] = useState([]);
  const [dataTable, setDataTable] = useState(
    <Scholar
      getdata={dataresearch}
      sendResearchIndex={(item) => props.sendResearchIndex(item)}
    />
  );
  const [focustype , setfocustype] = useState("scholar");
  const [focussorty , setfocussorty] = useState(true);
  const [focussortc , setfocussortc] = useState(false);
  //ปุ่มเรียงมากไปน้อยน้อยไปมาก หาdaTAYEAR ไม่เจอ
  const [order, setorder] = useState("ASC");
  // console.log(dataresearch,"year")

    
  useEffect(() => {
    // console.log("getid =>",getid)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      userID: props.getid,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://localhost:4000/api/professor/get-data-not-verify",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.massage === "professor is Success" || result.data) {
          setdatapro(result.data[0]);
          setIsLoading(false);
        }
        // return console.log(result);
      })
      .catch((error) => console.log("error", error));

    raw = JSON.stringify({
      id: props.getid,
    });

    requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/search/getresearchbypro", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setdataresearchgraph(result.data.sort((a, b) => new Date(a.Publication_date).getFullYear()- new Date(b.Publication_date).getFullYear() ));
          setdataresearch(result.data.sort((a, b) => new Date(b.Publication_date).getFullYear()- new Date(a.Publication_date).getFullYear() ));
          
          setDataTable(
            <Scholar
              getdata={result.data.sort((a, b) => new Date(b.Publication_date).getFullYear()- new Date(a.Publication_date).getFullYear() )}
              sendResearchIndex={(item) => props.sendResearchIndex(item)}
              status={true}
            />
          );
          setIsLoading(false);
        }
        // return console.log(result);
      })
      .catch((error) => console.log("error", error));

    raw = JSON.stringify({
      id: props.getid,
    });

    requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/professor/getskillbyidpro", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setdataskill(result.data);
          setIsLoading(false);
        }
        // return console.log(result);
      })
      .catch((error) => console.log("error", error));

    fetch(
      "http://localhost:4000/api/professor/get-qulificationbyidpro",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setqulification(result.data);
          setIsLoading(false);
        }
        // return console.log("qulification=>",result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  //เอาไว้อัพเดต focus
  const [scholarBtn, setScholartBtn] = useState(
    "h-[35px] w-auto bg-regal-red text-white rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4 outline-none"
  );
  const [scopusBtn, setScopustBtn] = useState(
    "h-[35px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4"
  );

  //สิ่งที่จะทำเมื่อกดปุ่ม Scholar
  const clickScholar = () => {
    setScholartBtn(
      "h-[35px] w-auto bg-regal-red text-white border-regal-red border-2 rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4 "
    );
    setScopustBtn(
      "h-[35px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4"
    );
    console.log("กดสกอลา");
    setfocustype("scholar");
    setDataTable(
      <Scholar
        getdata={dataresearch}
        sendResearchIndex={(item) => props.sendResearchIndex(item)}
        status={true}
      />
    );
    setTimeout(() => {
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }, 100);
  };

  //สิ่งที่จะทำเมื่อกดปุ่ม Scopus
  const clickScopus = () => {
    setScholartBtn(
      "h-[35px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4"
    );
    setScopustBtn(
      "h-[35px] w-auto bg-regal-red text-white border-regal-red border-2 rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4"
    );
    console.log("กดสกอปัส");
    setfocustype("scopus");
    setDataTable(
      <Scopus
        getdata={dataresearch}
        sendResearchIndex={(item) => props.sendResearchIndex(item)}
        status={false}
      />
    );
    setTimeout(() => {
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }, 100);
  };
  const sortingyear =()=>{
    setfocussorty(true);
    setfocussortc(false);
  }
  const sortingcited =()=>{
    setfocussorty(false);
    setfocussortc(true);
  }
  
  useEffect(()=>{
    if(focussorty == true){
      let listdata = dataresearch;
      listdata.sort((a, b) => new Date(b.Publication_date).getFullYear()- new Date(a.Publication_date).getFullYear() )
      if(focustype === "scholar"){
        setDataTable(
          <Scholar
            getdata={listdata}
            sendResearchIndex={(item) => props.sendResearchIndex(item)}
            status={true}
          />
        )
      }else if(focustype === "scopus"){
        setDataTable(
          <Scopus
            getdata={listdata}
            sendResearchIndex={(item) => props.sendResearchIndex(item)}
            status={true}
          />
        )
      }
    }else if(focussortc){
      let listdata = dataresearch;
      listdata.sort((a, b) => b.Citation- a.Citation)
      if(focustype === "scholar"){
        setDataTable(
          <Scholar
            getdata={listdata}
            sendResearchIndex={(item) => props.sendResearchIndex(item)}
            status={false}
          />
        )
      }else if(focustype === "scopus"){
        setDataTable(
          <Scopus
            getdata={listdata}
            sendResearchIndex={(item) => props.sendResearchIndex(item)}
            status={false}
          />
        )
      }
    }
    
  },[focussorty,focussortc])

  // useEffect(()=>{
  //   if(focussortc == true){
  //     let listdata = dataresearch;
  //     listdata.sort((a, b) => b.Citation- a.Citation)
  //     if(focustype === "scholar"){
  //       setDataTable(
  //         <Scholar
  //           getdata={listdata}
  //           sendResearchIndex={(item) => props.sendResearchIndex(item)}
  //           status={false}
  //         />
  //       )
  //     }else if(focustype === "scopus"){
  //       setDataTable(
  //         <Scopus
  //           getdata={listdata}
  //           sendResearchIndex={(item) => props.sendResearchIndex(item)}
  //           status={false}
  //         />
  //       )
  //     }
  //   }
    
  // },[focussortc]);

  useEffect(()=>{
    setdataresearchgraph( dataresearchgraph.sort((a, b) => new Date(b.Publication_date).getFullYear()- new Date(a.Publication_date).getFullYear() ))
  },[dataresearch])
  //แบ่งชื่อ-นามสกุล
  const word = workData[0].userName.split(" ");

  function Graph123() {
    let year = [];
    let sum = [];
    if (dataresearchgraph.length > 0) {
      console.log("dataresearch graph=>",dataresearchgraph)
      year.push(new Date(dataresearchgraph[0].Publication_date).getFullYear());
      let tempy = new Date(dataresearchgraph[0].Publication_date).getFullYear();
      let c = 1;
      for (let i = 1; i < dataresearchgraph.length; i++) {
        let y = new Date(dataresearchgraph[i].Publication_date).getFullYear();
        if (y === tempy) c++;
        else {
          year.push(y);
          tempy = y;
          sum.push(c);
          c = 1;
        }
        if (i === dataresearchgraph.length - 1) {
          // year.push(y);
          // tempy = y;
          sum.push(c);
        }
      }
    }

    const data = {
      labels: year,
      datasets: [
        {
          label: "Research is have",
          data: sum,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 0.2)"],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
    };
    return (
      <>
        <Bar data={data} options={options}></Bar>
      </>
    );
  }


  if (isLoading) return <>
  <Spin tip="Loading" size="large">
  <div className="content" />
</Spin></>;
  else
    return (
      <div className="relative">
        <div class="z-[-1] absolute h-full w-full">
          <div id="back-bg-top" class="z-[-1] h-[500px] w-full"></div>
        </div>
        <div class="absolute z-[-2] h-full w-full">
          <div class="h-[500px] w-full bg-white"></div>
        </div>
        <div class="z-[-3] absolute w-full h-full bg-regal-red"></div>
        <div class=" grid place-items-center w-full min-h-[500px] top-[130px] pb-[50px] pt-[220px]">
          <div class="rounded-[20px] w-10/12 h-fit bg-[#EFEFEF] p-[17px] overflow-hidden">
            <div class="gap-[8px] w-full h-full bg-white rounded-[8px] ">
              <div className="w-full h-[120px]"></div>
              <div className="flex justify-center w-full h-[300px] ">
                <div className=" text-center font-bold1">
                  <div className="absolute h-[100px] w-[160px] overflow-hidden left-[679px] top-[237px]">
                  </div>
                  <div className="text-[19px] py-[3px]">
                    {datapro.title_name +
                      datapro.firstname_professor +
                      " " +
                      datapro.lastname_professor}
                  </div>
                  <div className="py-[3px]">{datapro.Keyword}</div>
                  <div className=" font-bold mt-[30px] py-[3px]">
                    วุฒิการศึกษา
                  </div>
                  {dataqulification.map((item, index) => (
                    <div className="py-[3px]">{item.name_qualification}</div>
                  ))}
                  <div className="grid place-items-center">
                    <div className="flex h-[30px] w-auto mt-[30px] py-[3px]">
                      <HiOutlineMail className="mr-[10px] h-full w-[30px] text-regal-red" />
                      {datapro.Email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid place-items-center w-full h-fit">
                <div class="h-[260px] w-[1000px] grid place-items-center">
                  <Graph123 />
                </div>
              </div>
              <div className="grid place-items-center w-full h-[10px]">
                <div className="h-[1px] w-[95%] border-t-[1px] border-gray-300"></div>
              </div>
              <div className="flex justify-center w-full h-fit">
                <div className="w-full h-fit">
                  <div className="font-bold1 font-bold py-[8px] h-fit w-fit ml-[100px] mt-[40px]">
                    Interests
                  </div>
                </div>
              </div>
              <div className="flex w-full h-fit mb-[20px]">
                <div className="w-[140px] h-full "></div>
                <div className="w-full h-fit flex flex-wrap">
                  {dataskill.map((item) => (
                    <NavLink 
                      to={`/interest_person/${item.ID_coreskill}`}
                      onClick={() => props.sendCoreSkillID(item.ID_coreskill)}
                    >
                      <div className="font-bold1 text-white py-[8px] px-[15px] bg-regal-red rounded-[10px] w-fit h-fit mt-[16px] ml-[18px]">
                      {item.name_coreskill}
                    </div>
                    </NavLink>
                    
                  ))}
                </div>
              </div>
              <div className="grid place-items-center w-full h-[10px]">
                <div className="h-[1px] w-[95%] border-t-[1px] border-gray-300"></div>
              </div>
              <div className="flex mt-[20px] ml-[30px]">
                <button onClick={clickScholar} className={scholarBtn}>
                  Scholar
                </button>
                <button onClick={clickScopus} className={scopusBtn}>
                  Scopus
                </button>
              </div>
              <div className="mt-[13px] flex flex-col justify-center mx-[20px]">
                <thead className="grid grid-cols-10 text-xs text-white uppercase bg-regal-red w-full rounded-[10px]">
                  <div
                    scope="col"
                    className="px-6 py-3 rounded-l-lg font-medium col-span-8"
                  >
                    Product name
                  </div>
                  <div
                    scope="col"
                    className="grid place-content-center px-6 py-3 font-medium"
                  >
                    <button onClick={()=>sortingyear()}>YEAR</button>
                  </div>
                 
                  <div
                    scope="col"
                    className="grid place-content-center px-6 py-3 font-medium"
                  >
                    <button onClick={()=>sortingcited()}>CITED BY</button>
                    
                  </div>
                </thead>
                <tbody>{dataTable}</tbody>
              </div>
            </div>
          </div>
        </div>
        <div class="z-[20] grid place-items-center absolute top-[148px] w-full h-[140px]">
          <img
            src={datapro.img}
            class="h-[140px] w-[140px] rounded-full object-cover"
          ></img>
        </div>
        <div class="z-[10] grid place-items-center absolute top-[140px] w-full h-[80px] transform translate-y-[100%] overflow-hidden">
          <div className="relative transform translate-y-[-50%]">
            <div className="bg-[#EFEFEF] h-[160px] w-[160px] rounded-full object-cover"></div>
          </div>
        </div>
      </div>
    );
}

export default ProfilePage;
