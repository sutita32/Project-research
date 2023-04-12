/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import "../style/user_person.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs"

function Scopus(props) {
  // console.log("getdata =>",props.getdata)
  let research = [];

  for (let i = 0; i < props.getdata.length; i++) {
    if (props.getdata[i].ID_Type === 2) {
      research.push(props.getdata[i]);
    }
  }
  const [pageNow, setPageNow] = useState(1);
  const [dataShow, setDataShow] = useState(
    research.slice(pageNow * 10 - 10, 11)
  );

  useEffect(()=>{
    research.length=0;
    for (let i = 0; i < props.getdata.length; i++) {
      if (props.getdata[i].ID_Type === 2) {
        research.push(props.getdata[i]);
      }
    }
    setPageNow(1)
    setDataShow(research.slice(1* 10 - 10, 11));

  },[props.getdata, props.status])
  // console.log("getdata =>", research);
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
    
    setDataShow(research.slice(pageNow * 10 - 10, pageNow * 10));
  },[pageNow]);
  return (
    <>
      {dataShow.map((item, index) => (
        <div class="bg-white grid body_low_table_contact">
          <div
            scope="row"
            class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap body_low_table_product_contact overflow-hidden"
          >
            <NavLink
              to={`../idresearch=${item.ID_research}`}
              onClick={() => props.sendResearchIndex(item.ID_research)}
            >
              {item.name_research}
            </NavLink>

            <p className="text-gray-400 font-normal3"> {item.Keyword}</p>
            <p className="text-gray-400 font-normal3">{item.conference}</p>
          </div>
          <div class="grid place-content-center px-6 py-4">
            {new Date(item.Publication_date).getFullYear()}
          </div>
          <div class="grid place-content-center px-6 py-4">{item.Citation}</div>
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
                pageNow === Math.ceil(research.length / 10)
                  ? "text-white cursor-default"
                  : ""
              }
              disabled = {pageNow === Math.ceil(research.length / 10) ? true:false}
            >
              <BsArrowRightShort className="h-[25px] w-[25px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scopus;
