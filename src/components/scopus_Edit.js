/* eslint-disable jsx-a11y/scope */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";
import "../style/user_person.css";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function Scopus(props) {

  const [dataScopus, setDatascopus] = useState(
    props.getdata.filter((obj, index) => {
      return obj.name_Type === "Scopus";
    })
  );
  function handleDeleteClike(id) {
    // console.log("del id => ",id)
    let token = localStorage.getItem('token');
    let temp = dataScopus;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      researchid: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/research/del-researchbypro", requestOptions)
      .then(response => response.text())
      .then(result => {
        if(result === 'delete Success'){
          var t =[];
          for(let i=0;i<temp.length;i++){
            if(temp[i].ID_research !== id) {
              t.push(temp[i]) ;
            }
          }
          setDatascopus(t);
          console.log("dataafterdel", dataScopus);
          setDataShow(t.slice(pageNow * 10 - 10, pageNow * 10));
        }
        return console.log(result);
      })
      .catch((error) => console.log("error", error));

    // const removeItem = dataScopus.filter(dataScopus =>{
    //   return dataScopus.ID_research !== id
    // })
    // setDatascopus(removeItem);
  }

  const [pageNow, setPageNow] = useState(1);
  const [dataShow, setDataShow] = useState(
    dataScopus.slice(pageNow * 10 - 10, 11)
  );

  useEffect(()=>{
    setDatascopus(props.getdata.filter((obj, index) => {
      return obj.name_Type === "Scopus";
    }));
    let list = props.getdata.filter((obj, index) => {
      return obj.name_Type === "Scopus";
    });
  
    setPageNow(1)

    setDataShow(list.slice(1* 10 - 10, 11))
  },[props.getdata,props.status])

  const clickRight = () => {
    setPageNow(pageNow + 1);
    setTimeout(() => {
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }, 100);
  };

  const clickLeft = () => {
    setPageNow(pageNow - 1);
    setTimeout(() => {
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }, 100);
  };
  useEffect(() => {
    // let research= [];
    // for(let i=0;i<getdata.length ;i++){
    //   if(getdata[i].name_Type === 'Scopus'){
    //     research.push(getdata[i]);
    //   }
    // }
    // setDatascopus(research);

    setDataShow(dataScopus.slice(pageNow * 10 - 10, pageNow * 10));
  }, [pageNow]);

  const renderTable = (
    <>
      {dataShow.map((item, index) => (
        <div class="bg-white grid body_low_table" key={item.ID_research}>
          <div
            scope="row"
            class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap body_low_table_product overflow-hidden"
          >
            <NavLink
              to={`../idresearch=${item.ID_research}`}
              onClick={() => props.sendResearchIndex(item.ID_research)}
            >
              <a>{item.name_research}</a>
            </NavLink>
            
            <p className="text-gray-400 font-normal3"> {item.Keyword}</p>
            <p className="text-gray-400 font-normal3"> {item.name_Type}</p>
            <p className="text-gray-400 font-normal3">
              {item.ConferenceOrJornal}
            </p>
          </div>
          <div class="grid place-content-center px-6 py-4">
            {new Date(item.Publication_date).getFullYear()}
          </div>
          <div class="grid place-content-center px-6 py-4">{item.Citation}</div>
          <div class="grid place-content-center px-6 py-4">
            <div className="flex">
              <button className="h-[25px] w-[25px] mx-[14px] hover:text-gray-500">
                <BiEditAlt
                  onClick={() => props.openModal2(item.ID_research)}
                  className="h-full w-full"
                />
              </button>
              <button className="h-[25px] w-[25px] mx-[14px] hover:text-gray-500">
                <RiDeleteBin6Line
                  className="h-full w-full"
                  onClick={() => handleDeleteClike(item.ID_research)}
                />
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
              disabled = {pageNow === 1 ? true:false}
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
                pageNow === Math.ceil(dataScopus.length / 10)
                  ? "text-white cursor-default"
                  : ""
              }
              disabled = {pageNow === Math.ceil(dataScopus.length / 10) ? true:false}
            >
              <BsArrowRightShort className="h-[25px] w-[25px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
   return <>{renderTable}</>;
}

export default Scopus;
