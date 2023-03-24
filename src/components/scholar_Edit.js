/* eslint-disable jsx-a11y/scope */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React,{useEffect, useState} from "react";
import "../style/user_person.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";


function Scholar({getdata}) {
  console.log("getdata=>",getdata)
  // const [dataScholar, setDatascholar] = useState([
  //   {
  //     id: 1,
  //     pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
  //     name: 'S Prasomphan',
  //     Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
  //     year: '2015',
  //     cited: '38'
  //   },
  //   {
  //     id: 2,
  //     pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
  //     name: 'S Prasomphan',
  //     Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
  //     year: '2015',
  //     cited: '38'
  //   },
  //   {
  //     id: 3,
  //     pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
  //     name: 'S Prasomphan',
  //     Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
  //     year: '2015',
  //     cited: '38'
  //   },
  //   {
  //     id: 4,
  //     pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
  //     name: 'S Prasomphan',
  //     Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
  //     year: '2015',
  //     cited: '38'
  //   },
  //   {
  //     id: 5,
  //     pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
  //     name: 'S Prasomphan',
  //     Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
  //     year: '2015',
  //     cited: '38'
  //   },
  //   {
  //     id: 6,
  //     pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
  //     name: 'S Prasomphan',
  //     Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
  //     year: '2015',
  //     cited: '38'
  //   },
  // ])
  // data_name_list = list_name_sort.filter(
  //   (obj, index) =>
  //   list_name_sort.findIndex((item) => item.Keyword === obj.Keyword) === index
  // );
  const [dataScholar, setDatascholar] = useState(getdata.filter((obj,index)=> {return obj.name_Type === "scholar"}));
  const [pageNow, setPageNow] = useState(1);
  const [dataShow, setDataShow] = useState(
    dataScholar.slice(pageNow * 10 - 10, 11)
  );
  const [isLoading , setIsLoading] =useState(true);
  // useEffect(()=>{
  //   let research= [];
  //   for(let i=0;i<getdata.length ;i++){
  //     if(getdata[i].ID_Type === 1){
  //       research.push(getdata[i]);
  //     }
  //   }
  //   setDatascholar(research)
  //   setIsLoading(false);
  // },[]);
  function handleDeleteClike(id){
    console.log("del id => ",id)
    let token = localStorage.getItem('token');
    let temp = dataScholar;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "researchid": id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:4000/api/research/del-researchbypro", requestOptions)
      .then(response => response.text())
      .then(result => {
        if(result === 'delete Success'){
          // var removeItem = dataScholar.filter(dataScholar =>{
          //   return dataScholar.ID_research !== id
          // })
          var t =[];
          for(let i=0;i<temp.length;i++){
            if(temp[i].ID_research !== id) {
              t.push(temp[i]) ;
            }
          }
          setDatascholar(t)
          console.log('dataafterdel',dataScholar)
          setDataShow(dataScholar.slice(pageNow * 10 - 10, pageNow * 10));
        }
        return console.log(result);
      })
      .catch(error => console.log('error', error));

    
  }
  const clickRight = () => {
    setPageNow(pageNow + 1);
  };

  const clickLeft = () => {
    setPageNow(pageNow - 1);
  };
  useEffect(()=>{
    let research= [];
    for(let i=0;i<getdata.length ;i++){
      if(getdata[i].name_Type === "scholar"){
        research.push(getdata[i]);
      }
    }
    console.log("dataScholar=>",research);
    setDatascholar(research)
    setIsLoading(false)
    // console.log("dataScholar after=>",dataScholar);
    setDataShow(research.slice(pageNow * 10 - 10, pageNow * 10));
  },[]);
  useEffect(()=>{

    setDataShow(dataScholar.slice(pageNow * 10 - 10, pageNow * 10));
  },[pageNow]);
  
  
  const renderTable=(
    <>
   {dataShow.map((item,index)=> (
       <div class="bg-white grid grid-cols-10" key={item.ID_research}>
       <div
         scope="row"
         class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap col-span-7"
       >
         <a href="#">
          {item.name_research}
         </a>
         <p className="text-gray-400 font-normal"> {item.Keyword}</p>
         <p className="text-gray-400 font-normal"> {item.name_Type}</p>
         <p className="text-gray-400 font-normal">
         {item.conference}
         </p>
       </div>
       <div class="grid place-content-center px-6 py-4">{new Date(item.Publication_date).getFullYear()}</div>
       <div class="grid place-content-center px-6 py-4">{item.Citation}</div>
       <div class="grid place-content-center px-6 py-4">
         <div className="flex">
           <button className="h-[25px] w-[25px] mx-[14px] hover:text-gray-500">
             <BiEditAlt className="h-full w-full" />
           </button>
           <button className="h-[25px] w-[25px] mx-[14px] hover:text-gray-500">
             <RiDeleteBin6Line className="h-full w-full" onClick={() => handleDeleteClike(item.ID_research)}/>
           </button>
         </div>
       </div>
     </div>
   ))} 
   <div className="grid place-content-center w-full h-[40px] my-[8px]">
        <div className="flex h-[40px] w-[150px]">
          <div className="grid place-items-center h-[40px] w-[50px]">
            <button
              onClick={clickLeft}
              className={pageNow === 1 ? "text-white cursor-default" : ""}
            >
              <BsArrowLeftShort className="h-[25px] w-[25px]" />
            </button>
          </div>
          <div className="grid place-items-center h-[40px] w-[50px]">
            {pageNow}
          </div>
          <div className="grid place-items-center h-[40px] w-[50px]">
            <button
              onClick={clickRight}
              className={
                pageNow === Math.ceil(dataScholar.length / 10)
                  ? "text-white cursor-default"
                  : ""
              }
            >
              <BsArrowRightShort className="h-[25px] w-[25px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
  
  if(isLoading) return( <></>)
  else return <>{renderTable}</>;
}

export default Scholar;
