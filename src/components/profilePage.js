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
function ProfilePage(props) {
  // console.log("getid=>",getid)

  const [isLoading , setIsLoading] = useState(true);
  const [datapro , setdatapro] =useState([]);
  const [dataresearch , setdataresearch] = useState([]);
  const [dataskill , setdataskill]=useState([]);
  const [dataqulification , setqulification] =useState([]);
  
  useEffect(()=>{
    // console.log("getid =>",getid)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      "userID": props.getid
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:4000/api/professor/get-data-not-verify", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.massage === "professor is Success" || result.data){
          setdatapro(result.data[0]);
          setIsLoading(false);
        }
        // return console.log(result);
      })
      .catch(error => console.log('error', error));
    
    
    raw = JSON.stringify({
      "id": props.getid
    });

    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:4000/api/search/getresearchbypro", requestOptions)
      .then(response => response.json())
      .then(result => {
        if( result.data){
          setdataresearch(result.data);
          setIsLoading(false);
          setDataTable(<Scholar getdata={result.data} sendResearchIndex={(item) =>props.sendResearchIndex(item) }/>);
        }
        // return console.log(result);
      })
      .catch(error => console.log('error', error));
    
      raw = JSON.stringify({
        "id": props.getid
      });
  
      requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch("http://localhost:4000/api/professor/getskillbyidpro", requestOptions)
        .then(response => response.json())
        .then(result => {
          if( result.data){
            setdataskill(result.data);
            setIsLoading(false);
          }
          // return console.log(result);
        })
        .catch(error => console.log('error', error));
      
        fetch("http://localhost:4000/api/professor/get-qulificationbyidpro", requestOptions)
        .then(response => response.json())
        .then(result => {
          if( result.data){
            setqulification(result.data);
            setIsLoading(false);
          }
          // return console.log("qulification=>",result);
        })
        .catch(error => console.log('error', error));
  } , [])
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
    setDataTable(<Scholar getdata={dataresearch} sendResearchIndex={(item) =>props.sendResearchIndex(item) }/>);
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
    setDataTable(<Scopus getdata={dataresearch} sendResearchIndex={(item) =>props.sendResearchIndex(item) }/>);
    setTimeout(() => {
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }, 100);
  };


  const [dataTable, setDataTable] = useState(<Scholar getdata={dataresearch} sendResearchIndex={(item) =>props.sendResearchIndex(item) }/>);
  //แบ่งชื่อ-นามสกุล
  const word = workData[0].userName.split(" ");

  function Graph() {

    let year =[];
    let sum =[];
    if(dataresearch.length> 0){
      year.push(new Date(dataresearch[0].Publication_date).getFullYear());
      let tempy = new Date(dataresearch[0].Publication_date).getFullYear();
      let c =1;
      for(let i=1;i<dataresearch.length;i++){
        let y =new Date(dataresearch[i].Publication_date).getFullYear();
        if(y === tempy) c++;
        else{
          year.push(y);
          tempy = y;
          sum.push(c);
          c = 1;
        }
        if( i === dataresearch.length-1){
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

  // function Graph() {
  //   const data = {
  //     labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
  //     datasets: [
  //       {
  //         label: "My First Dataset",
  //         data: [65, 59, 80, 81, 56, 55, 40, 20],
  //         backgroundColor: ["rgba(255, 99, 132, 0.2)"],
  //         borderColor: ["rgba(255, 99, 132, 0.2)"],
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  //   const options = {
  //     plugins: {
  //       legend: {
  //         display: false,
  //       },
  //     },
  //     responsive: true,
  //   };
  //   return (
  //     <>
  //       <Bar data={data} options={options}></Bar>
  //     </>
  //   );
  // }

  if(isLoading) return( <>Loading.....</>)
  else
  return (
    <div className="relative">
      <div class="z-[-1] absolute grid grid-rows-6 h-full w-full">
        <div class="row-span-2 w-full">
          <div id="back-bg-top" class="h-full w-full"></div>
        </div>
        <div class="row-span-4 w-full ">
          <div class="bg-regal-red w-full min-h-full bg-opacity-90"></div>
        </div>
      </div>
      <div class=" grid place-items-center w-full min-h-[500px] top-[130px] pb-[50px] pt-[220px]">
        <div class="rounded-[20px] w-10/12 h-fit bg-[#EFEFEF] p-[17px] overflow-hidden">
          <div class="gap-[8px] w-full h-full bg-white rounded-[8px] ">
            <div className="w-full h-[120px]"></div>
            <div className="flex justify-center w-full h-[300px] ">
              <div className=" text-center font-bold1">
                <div className="absolute h-[100px] w-[160px] overflow-hidden left-[679px] top-[237px]">
          
                </div>
                <div className="text-[19px] py-[3px]">{datapro.title_name+datapro.firstname_professor+" "+datapro.lastname_professor}</div>
                <div className="py-[3px]">{datapro.Keyword}</div>
                <div className=" font-bold mt-[30px] py-[3px]">
                  วุฒิการศึกษา
                </div>
                { dataqulification.map((item,index)=>(
                  <div className="py-[3px]">{item.name_qualification}</div>
                
                ))
                }
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
                <Graph />
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
                  <div className="font-bold1 text-white py-[8px] px-[15px] bg-regal-red rounded-[10px] w-fit h-fit mt-[16px] ml-[18px]">
                    {item.name_coreskill}
                  </div>
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
                  YEAR
                </div>
                <div
                  scope="col"
                  className="grid place-content-center px-6 py-3 font-medium"
                >
                  CITED BY
                </div>
              </thead>
              <tbody>{dataTable}</tbody>
            </div>
          </div>
        </div>
      </div>
      <div class="z-[20] grid place-items-center absolute top-[148px] w-full h-[140px]">
        <img
          alt=""
          src={datapro.img}
          className="h-[140px] w-[140px] rounded-full object-cover"
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
