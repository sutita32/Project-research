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
        <div className="bg-regal-red w-full h-5 mb-[50px]"></div>
        <div className="h-fit min-[481px]:w-8/12 max-[480px]:w-10/12 set_center"><p className="topic-text text-regal-red">{dataresearch.name_research}</p></div>
        <div className="flex place-content-center	">
          
        
          <div className="flex min-[481px]:w-8/12 max-[480px]:w-10/12 h-auto mt-[20px] mb-8 bg-white rounded-[10px] min-[481px]:px-16 min-[481px]:py-16 shadow-2xl max-[480px]:px-6 max-[480px]:py-10">
            <div className="grid  w-full h-full">
              
              <div className="col-span-7 px-4 text-regal-red-text">
                
                <div className="detail-text grid grid-rows-7">
                  {/* <div className="grid grid-cols-8"> */}
                    {/* <div className="col-span-2">ผู้วิจัย</div> */}
                    {/* <div className="col-span-6">: {workData[getid - 1].userName}</div> */}
                    {/* <div className="col-span-6">: {dataresearch.title_name+dataresearch.firstname_professor+" "+dataresearch.lastname_professor}</div> */}
                  {/* </div> */}
                  <div className="grid grid-cols-8">
                    <div className="col-span-2">ผู้เขียน</div>
                    {/* <div className="col-span-6">: {workData[getid - 1].userName}</div> */}
                    <div className="col-span-6">: {dataresearch.authors}</div>
                  </div>
                  <div className="grid grid-cols-8">
                    <div className="col-span-2">วันที่เผยแพร่</div>
                    {/* <div className="col-span-6">: {workData[getid - 1].date}</div> */}
                    <div className="col-span-6">: {new Date(dataresearch.Publication_date).toLocaleDateString('en-US') }</div>
                  </div>
                  <div className="grid grid-cols-8">
                    {
                      wc[0] === "Conference" ?
                      <><div className="col-span-2">Conference</div><div className="col-span-6">: {confer}</div></>
                      :  wc[0] === "Journal" ? 
                        <><div className="col-span-2">Journal
                        </div><div className="col-span-6"> : {confer}</div></>
                        :
                        <><div className="col-span-2"> Conference Or Journal
                        </div><div className="col-span-6"> : {dataresearch.conference}</div></>
                    }
                    
                  </div>
                  {
                    dataresearch.Publisher !== '-' ? 
                    <div className="grid grid-cols-8">
                      <div className="col-span-2">Publisher</div>
                      <div className="col-span-6">: {dataresearch.Publisher}</div>
                    </div>
                    :<></>
                  }
                  
                  <div className="grid grid-cols-8">
                    <div className="col-span-2">รายละเอียด</div>
                    <div className="col-span-6 ">
                      : {dataresearch.Description}
                    </div>
                  </div>
                  <div className="grid grid-cols-8">
                    <div className="col-span-2">total citations</div>
                    <div className="col-span-6 pb-8">
                      : {dataresearch.Citation}
                    </div>
                  </div>
                  <div className="grid grid-cols-8">
                    <div className="col-span-2">ลิงก์</div>
                    {/* <div className="col-span-6">: {workData[getid - 1].userName}</div> */}
                    <div className="col-span-6" >: <a href={dataresearch.Link} className=" text-sky-400 ">{dataresearch.name_research}</a></div>
                  </div>
                  <div className="grid grid-cols-8">
                    <div className="col-span-2">Scraping From </div>
                    <div className="col-span-6 pb-8">
                      : {dataresearch.name_Type}
                    </div>
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