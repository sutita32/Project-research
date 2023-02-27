/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import "../style/user_person.css";
import Scholar from "./scholar";
import Scopus from './scopus'
import {techData} from './TeacherData'
import Scholas1 from "./Scholas1";

localStorage.setItem("tableNow", "scholar");

function User_person({getid}) {
  console.log('ในuser_person')
  console.log(getid)
  //เอาไว้อัพเดต focus
  const [scholarBtn, setScholartBtn] = useState(
    "h-[40px] w-auto bg-regal-red text-white rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal outline-none"
  );
  const [scopusBtn, setScopustBtn] = useState(
    "h-[40px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal"
  );

  const [dataTable, setDataTable] = useState(<Scholas1 />);
  const database = [
    {
      username: "Machine Learning",
    },
    {
      username: "Geostatistics",
    },
    {
      username: "Time Series",
    },
    {
      username: "Computer Graphics",
    },
  ];

  //สิ่งที่จะทำเมื่อกดปุ่ม Scholar
  const clickScholar = () => {
    setScholartBtn(
      "h-[40px] w-auto bg-regal-red text-white border-regal-red border-2 rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal "
    );
    setScopustBtn(
      "h-[40px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal"
    );
    console.log("กดสกอลา");
    setDataTable(<Scholas1 />);
  };

  //สิ่งที่จะทำเมื่อกดปุ่ม Scopus
  const clickScopus = () => {
    setScholartBtn(
      "h-[40px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal"
    );
    setScopustBtn(
      "h-[40px] w-auto bg-regal-red text-white border-regal-red border-2 rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal"
    );
    console.log("กดสกอปัส");
    setDataTable(<Scopus />);
  };

  return (
    <div>
      <div class="h-[30px] w-full bg-regal-red"></div>
      <div class="p-16">
        <div class="p-8 bg-white shadow mt-24">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
            <div class="relative ">
              <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
                <img
                  class="h-full w-full rounded-full "
                  src={techData[getid].imgSrc}
                  alt=""
                />
              </div>
            </div>

            <div class="space-x-8 md:mt-0 "></div>
          </div>

          <div class="mt-20 m-1 text-center border-b pb-12 ">
            <h1 class="text-xl font-medium text-gray-700 mt-[150px]">
            {techData[getid].name}
            </h1>
            <p class="font-light text-gray-600 mt-3">
              ชื่อภาษาอังกฤษ
            </p>

            <p class="mt-8 text-gray-700 font-semibold">วุฒิการศึกษา</p>
            <p class="mt-2 text-gray-500">
              ปริญญาโท วท.ม. (วิศวกรรมซอฟต์แวร์) จุฬาลงกรณ์มหาวิทยาลัย{" "}
            </p>
            <p class="mt-2 text-gray-500">
              ปริญปริญาตรี วท.บ. (วิทยาการคอมพิวเตอร์) มหาวิทยาลัยขอนแก่น
            </p>
            <p class="grid place-content-center mt-[10px]">
              <div class="flex h-[30px] w-auto">
                <HiOutlineMail class="mr-[10px] h-full w-[30px] text-regal-red" />
                {techData[getid].email}
              </div>
            </p>
          </div>

          <div class="mt-20 m-1 text-left border-b pb-12">
            <label class="text-gray-800 text-left font-bold lg:px-16">
              Interest
            </label>
            <ul className="toppics">
              <li className="toppics_li">{database[0].username}</li>
              <li className="toppics_li">{database[1].username}</li>
              <li className="toppics_li">{database[2].username}</li>
              <li className="toppics_li">{database[3].username}</li>
            </ul>
          </div>
          <div class="flex">
            <button onClick={clickScholar} class={scholarBtn} autoFocus="true">
              Scholar
            </button>
            <button onClick={clickScopus} class={scopusBtn}>
              Scopus
            </button>
          </div>
          <div class="mt-[13px] flex flex-col justify-center">
            <table class="w-full text-sm text-left text-gray-800">
              <thead class="text-xs text-white uppercase bg-regal-red ">
                <tr>
                  <th scope="col" class="px-6 py-3 rounded-l-lg font-medium">
                    Product name
                  </th>
                  <th scope="col" class=" px-6 py-3 font-medium">
                    YEAR
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-r-lg font-medium">
                    CITED BY
                  </th>
                </tr>
              </thead>
              <tbody>{dataTable}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User_person;
