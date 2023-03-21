/* eslint-disable jsx-a11y/scope */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React,{useState,useEffect} from "react";
import "../style/user_person.css";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

function Scopus({getdata}) {

  // const [dataScopus, setDatascopus] = useState([
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
  // ])
  const [dataScopus, setDatascopus] = useState(getdata);
  function handleDeleteClike(id){
    const removeItem = dataScopus.filter(dataScopus =>{
      return dataScopus.ID_research !== id
    })
    setDatascopus(removeItem)
  };
  useEffect(()=>{
    let research= [];
    for(let i=0;i<getdata.length ;i++){
      if(getdata[i].ID_Type === 2){
        research.push(getdata[i]);
      }
    }
    setDatascopus(research)
  },[]);
  const renderTable=(
    <>
   {dataScopus.map((item, index)=> (
       <div class="bg-white grid grid-cols-10" key={item.ID_research}>
       <div
         scope="row"
         class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap col-span-7"
       >
         <a href="#">
          {index+1+". "+item.name_research}
         </a>
         <p className="text-gray-400 font-normal"> {item.Keyword}</p>
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
    </>
  );
  return (
    <>
      {renderTable}
    </>
  );
}

export default Scopus;
