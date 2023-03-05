/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React , { useEffect, useState }from "react";
import { workData } from "./workData";
import "../style/detailPage.css";
import LineChart from "./LineChart";
import { NavLink } from "react-router-dom";

function SetBackButton({ index }) {
  var page;
  if (index <= 10) {
    page = "/search/1";
  } else if (index <= 20) {
    page = "/search/2";
  } else if (index <= 30) {
    page = "/search/3";
  } else {
    page = "/";
  }
  return (
    <>
      <NavLink to={page}>
        <div class="flex place-content-center mb-10">
          <button class="flex text-white bg-regal-red py-2.5 px-6 rounded-full transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer">
            ย้อนกลับ
          </button>
        </div>
      </NavLink>
    </>
  );
}
 
function detailPage({ getid ,data}) {
  console.log("getID=>",getid)
  return (
    <>
      <div class="bg-regal-red w-full h-10"></div>
      <div class="flex place-content-center	">
        <div class="flex w-8/12 h-auto mt-16 mb-8 bg-regal-red bg-opacity-30 rounded-more p-16 shadow-sm">
          <div class="grid grid-cols-10 w-full h-full">
            <div class="grid grid-rows-3 col-span-3">
              <div class="pt-10 row-span-1 flex place-items-center place-content-center pr-16">
                <img
                  src="http://cs.kmutnb.ac.th/img/Personnel/pls.jpg"
                  class="rounded-full h-40"
                />
              </div>
            </div>
            <div class="col-span-7 px-4 text-regal-red-text">
              <p class="topic-text mb-4">{data[getid].name_research}</p>
              <div class="detail-text grid grid-rows-7">
                <div class="grid grid-cols-8">
                  <div class="col-span-2">ผู้วิจัย</div>
                  {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                  <div class="col-span-6">: {data[getid].title_name+data[getid].firstname_professor+" "+data[getid].lastname_professor}</div>
                </div>
                <div class="grid grid-cols-8">
                  <div class="col-span-2">วันที่เผยแพร่</div>
                  {/* <div class="col-span-6">: {workData[getid - 1].date}</div> */}
                  <div class="col-span-6">: {new Date(data[getid].Publication_date).toLocaleDateString('en-US') }</div>
                </div>
                <div class="grid grid-cols-8">
                  <div class="col-span-2">conference</div>
                  {/* <div class="col-span-6">: {workData[getid - 1].id}</div> */}
                  <div class="col-span-6">: {data[getid].conference}</div>
                </div>
                <div class="grid grid-cols-8">
                  {/* <div class="col-span-2">punlisher iee</div> */}
                  {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                  <div class="col-span-6">: {data[getid].title_name+data[getid].firstname_professor+" "+data[getid].lastname_professor}</div>
                </div>
                <div class="grid grid-cols-8">
                  <div class="col-span-2">รายละเอียด</div>
                  <div class="col-span-6 ">
                    : {data[getid].Description}
                  </div>
                </div>
                <div class="grid grid-cols-8">
                  <div class="col-span-2">total citations</div>
                  <div class="col-span-6 pb-8">
                    : {<LineChart h="20" w="60" />}
                  </div>
                </div>
                <div class="grid grid-cols-8">
                  <div class="col-span-2">ลิงก์</div>
                  {/* <div class="col-span-6">: {workData[getid - 1].userName}</div> */}
                  <div class="col-span-6">: {data[getid].title_name+data[getid].firstname_professor+" "+data[getid].lastname_professor}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SetBackButton index={getid - 1} />
    </>
  );
}

export default detailPage;
