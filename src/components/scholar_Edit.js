/* eslint-disable jsx-a11y/scope */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React,{useState} from "react";
import "../style/user_person.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

function Scholar() {

  const [dataScholar, setDatascholar] = useState([
    {
      id: 1,
      pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
      name: 'S Prasomphan',
      Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
      year: '2015',
      cited: '38'
    },
    {
      id: 2,
      pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
      name: 'S Prasomphan',
      Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
      year: '2015',
      cited: '38'
    },
    {
      id: 3,
      pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
      name: 'S Prasomphan',
      Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
      year: '2015',
      cited: '38'
    },
    {
      id: 4,
      pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
      name: 'S Prasomphan',
      Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
      year: '2015',
      cited: '38'
    },
    {
      id: 5,
      pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
      name: 'S Prasomphan',
      Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
      year: '2015',
      cited: '38'
    },
    {
      id: 6,
      pname: 'Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram',
      name: 'S Prasomphan',
      Conference: '2015 International Conference on Systems, Signals and ImageProcessing …',
      year: '2015',
      cited: '38'
    },
  ])

  function handleDeleteClike(id){
    const removeItem = dataScholar.filter(dataScholar =>{
      return dataScholar.id !== id
    })
    setDatascholar(removeItem)
  }

  const renderTable=(
    <>
   {dataScholar.map((item)=> (
       <div class="bg-white grid grid-cols-10" key={item.id}>
       <div
         scope="row"
         class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap col-span-7"
       >
         <a href="#">
          {item.pname}
         </a>
         <p className="text-gray-400 font-normal"> {item.name}</p>
         <p className="text-gray-400 font-normal">
         {item.Conference}
         </p>
       </div>
       <div class="grid place-content-center px-6 py-4">{item.year}</div>
       <div class="grid place-content-center px-6 py-4">{item.cited}</div>
       <div class="grid place-content-center px-6 py-4">
         <div className="flex">
           <button className="h-[25px] w-[25px] mx-[14px] hover:text-gray-500">
             <BiEditAlt className="h-full w-full" />
           </button>
           <button className="h-[25px] w-[25px] mx-[14px] hover:text-gray-500">
             <RiDeleteBin6Line className="h-full w-full" onClick={() => handleDeleteClike(item.id)}/>
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

export default Scholar;
