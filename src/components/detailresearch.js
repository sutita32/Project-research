/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React , { useEffect, useState }from "react";
import { workData } from "./workData";
import "../style/detailPage.css";
import LineChart from "./LineChart";
import { NavLink, useNavigate } from "react-router-dom";


function Detailresearch({ getid}) {



    const navigate = useNavigate();
    // const [researchdata , setresearch] = useState();
    const [isLoading ,setIsLoading]=useState(true);
    const [dataresearch ,setdataresearch]=useState([]);
    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "id": getid
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:4000/api/research/getresearch", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.data){
                setdataresearch(result.data[0]);
                setIsLoading(false);
            }
            // return console.log(result);
        })
        .catch(error => console.log('error', error));

    },[])


    // const id =((getid.data1-1)*10)+getid.index;
    // console.log("getID=>",id);
    // console.log(" data data data=>", data);
    // if(getid.index === -1) {
    //     navigate('/search/')
        
    //   }
        
      
    
    
    if(isLoading) return(<>Loading....</>)
    else {
        let wc= dataresearch.conference.split(" ");
        
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
                    src={dataresearch.img}
                    class="rounded-full h-40"
                  />
                </div>
              </div>
              <div class="col-span-7 px-4 text-regal-red-text">
                <p class="topic-text mb-4">{dataresearch.name_research}</p>
                <div class="detail-text grid grid-rows-7">
                  <div class="grid grid-cols-8">
                    <div class="col-span-2">ผู้วิจัย</div>
                    {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                    <div class="col-span-6">: {dataresearch.title_name+dataresearch.firstname_professor+" "+dataresearch.lastname_professor}</div>
                  </div>
                  <div class="grid grid-cols-8">
                    <div class="col-span-2">ผู้เขียน</div>
                    {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                    <div class="col-span-6">: {dataresearch.authors}</div>
                  </div>
                  <div class="grid grid-cols-8">
                    <div class="col-span-2">วันที่เผยแพร่</div>
                    {/* <div class="col-span-6">: {workData[getid - 1].date}</div> */}
                    <div class="col-span-6">: {new Date(dataresearch.Publication_date).toLocaleDateString('en-US') }</div>
                  </div>
                  <div class="grid grid-cols-8">
                    {
                      wc[0] === "Conference" ?
                      <><div class="col-span-2">Conference</div><div class="col-span-6">: {confer}</div></>
                      :
                      <><div class="col-span-2">Journal
                      </div><div class="col-span-6">: {confer}</div></>
                    }
                    
                  </div>
                  <div class="grid grid-cols-8">
                    {/* <div class="col-span-2">punlisher iee</div> */}
                    {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                    <div class="col-span-6">: {dataresearch.title_name+dataresearch.firstname_professor+" "+dataresearch.lastname_professor}</div>
                  </div>
                  <div class="grid grid-cols-8">
                    <div class="col-span-2">รายละเอียด</div>
                    <div class="col-span-6 ">
                      : {dataresearch.Description}
                    </div>
                  </div>
                  <div class="grid grid-cols-8">
                    <div class="col-span-2">total citations</div>
                    <div class="col-span-6 pb-8">
                      : {dataresearch.Citation}
                    </div>
                  </div>
                  <div class="grid grid-cols-8">
                    <div class="col-span-2">ลิงก์</div>
                    {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                    <div class="col-span-6" >: <a href={dataresearch.Link}>{dataresearch.name_research}</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <SetBackButton index={getid.index + (getid.data1*10)  } /> */}
      </>
    );
    }
  }
  
  export default Detailresearch;