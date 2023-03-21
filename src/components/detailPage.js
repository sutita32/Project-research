/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React , { useEffect, useState }from "react";
import { workData } from "./workData";
import "../style/detailPage.css";
import LineChart from "./LineChart";
import { NavLink, useNavigate } from "react-router-dom";

function SetBackButton({ index }) {
  var page = '/search/';
  let k = (index/10);
  const navigate =useNavigate();
  const Goback =()=>{
    navigate(-1);
  }
  return (
    <>
      {/* <NavLink to={page+parseInt(k).toString()}> */}
        <div class="flex place-content-center mb-10">
          <button onClick={Goback} class="flex text-white bg-regal-red py-2.5 px-6 rounded-full transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer">
            ย้อนกลับ
          </button>
        </div>
      {/* </NavLink> */}
    </>
  );
}
 
function detailPage({ getid, data}) {
  const navigate = useNavigate();
  // const [researchdata , setresearch] = useState();
  const id =((getid.data1-1)*10)+getid.index;
  console.log("getID=>",id);
  console.log(" data data data=>", data);
  if(getid.index === -1) {
      navigate('/search/')
      
    }
      
    
  let wc= data[id].conference.split(" ");
  
  let confer=[];
  for(let i=1;i<wc.length;i++){
    confer.push(wc[i]+" ")
  }
  console.log("confer=>",confer)
  return (
    <>
      <div class="bg-regal-red w-full h-10"></div>
      <div class="flex place-content-center	">
        <div class="flex w-8/12 h-auto mt-16 mb-8 bg-regal-red bg-opacity-30 rounded-more p-16 shadow-sm">
          <div class="grid grid-cols-10 w-full h-full">
            <div class="grid grid-rows-3 col-span-3">
              <div class="pt-10 row-span-1 flex place-items-center place-content-center pr-16">
                <img
                  src={data[id].img}
                  class="rounded-full h-40"
                />
              </div>
            </div>
            <div class="col-span-7 px-4 text-regal-red-text">
              <p class="topic-text mb-4">{data[id].name_research}</p>
              <div class="detail-text grid grid-rows-7">
                <div class="grid grid-cols-8">
                  <div class="col-span-2">ผู้วิจัย</div>
                  {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                  <div class="col-span-6">: {data[id].title_name+data[id].firstname_professor+" "+data[id].lastname_professor}</div>
                </div>
                <div class="grid grid-cols-8">
                  <div class="col-span-2">ผู้เขียน</div>
                  {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                  <div class="col-span-6">: {data[id].authors}</div>
                </div>
                <div class="grid grid-cols-8">
                  <div class="col-span-2">วันที่เผยแพร่</div>
                  {/* <div class="col-span-6">: {workData[getid - 1].date}</div> */}
                  <div class="col-span-6">: {new Date(data[id].Publication_date).toLocaleDateString('en-US') }</div>
                </div>
                <div class="grid grid-cols-8">
                  {
                    wc[0] === "Conference" ?
                    <><div class="col-span-2">conference</div><div class="col-span-6">: {confer}</div></>
                    :
                    <><div class="col-span-2">Journal
                    </div><div class="col-span-6">: {confer}</div></>
                  }
                  
                </div>
                <div class="grid grid-cols-8">
                  {/* <div class="col-span-2">punlisher iee</div> */}
                  {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                  <div class="col-span-6">: {data[id].title_name+data[id].firstname_professor+" "+data[id].lastname_professor}</div>
                </div>
                <div class="grid grid-cols-8">
                  <div class="col-span-2">รายละเอียด</div>
                  <div class="col-span-6 ">
                    : {data[id].Description}
                  </div>
                </div>
                <div class="grid grid-cols-8">
                  <div class="col-span-2">total citations</div>
                  <div class="col-span-6 pb-8">
                    : {data[id].Citation}
                  </div>
                </div>
                <div class="grid grid-cols-8">
                  <div class="col-span-2">ลิงก์</div>
                  {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                  <div class="col-span-6" >: <a href={data[id].Link}>{data[id].name_research}</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SetBackButton index={getid.index + (getid.data1*10)  } />
    </>
  );
}

export default detailPage;
