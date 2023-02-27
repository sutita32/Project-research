/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import { useState } from "react";
import "../style/contacts.css";
import { techData } from "./TeacherData";
import { NavLink } from "react-router-dom";
function Contacts(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevData = () => {
    const isFirstData = currentIndex === 0;
    const newData = isFirstData
      ? techData.length - (techData.length % 8) - 8
      : currentIndex - 8;
    setCurrentIndex(newData);
  };

  const nextData = () => {
    const isLastData =
      currentIndex >= techData.length - (techData.length % 8) - 8;
    const newData = isLastData ? 0 : currentIndex + 8;
    setCurrentIndex(newData);
  };
  function SetData(props) {
    return (
      <>
        <div class="font-contacts h-[80px] grid grid-cols-10 px-[80px] w-[500px] place-self-center m-[10px]">
          <div class="grid place-items-end col-span-3 ">
            <img
              class="h-[80px] rounded-full"
              src={techData[currentIndex + 0].imgSrc}
            ></img>
          </div>
          <div class="grid grid-rows-2 col-span-7">
            <div class="pt-3">
              <NavLink to={techData[currentIndex + 0].url} onClick={()=>props.sendTeacherIndex(currentIndex + 0)}>
                {techData[currentIndex + 0].name}
                </NavLink>
                </div>
            <div>{techData[currentIndex + 0].email}</div>
          </div>
        </div>
        <div class="font-contacts h-[80px] grid grid-cols-10 px-[80px] w-[500px] place-self-center">
          <div class="grid place-items-end col-span-3 ">
            <img
              class="h-[80px] rounded-full"
              src={techData[currentIndex + 1].imgSrc}
            ></img>
          </div>
          <div class="grid grid-rows-2 col-span-7">
            <div class="pt-3"><NavLink to={techData[currentIndex + 1].url} onClick={()=>props.sendTeacherIndex(currentIndex + 1)}>
                {techData[currentIndex + 1].name}
                </NavLink></div>
            <div>{techData[currentIndex + 1].email}</div>
          </div>
        </div>
        <div class="font-contacts h-[80px] grid grid-cols-10 px-[80px] w-[500px] place-self-center">
          <div class="grid place-items-end col-span-3 ">
            <img
              class="h-[80px] rounded-full"
              src={techData[currentIndex + 2].imgSrc}
            ></img>
          </div>
          <div class="grid grid-rows-2 col-span-7">
            <div class="pt-3"><NavLink to={techData[currentIndex + 2].url} onClick={()=>props.sendTeacherIndex(currentIndex + 2)}>
                {techData[currentIndex + 2].name}
                </NavLink></div>
            <div>{techData[currentIndex + 2].email}</div>
          </div>
        </div>
        <div class="font-contacts h-[80px] grid grid-cols-10 px-[80px] w-[500px] place-self-center">
          <div class="grid place-items-end col-span-3 ">
            <img
              class="h-[80px] rounded-full"
              src={techData[currentIndex + 3].imgSrc}
            ></img>
          </div>
          <div class="grid grid-rows-2 col-span-7">
            <div class="pt-3"><NavLink to={techData[currentIndex + 3].url} onClick={()=>props.sendTeacherIndex(currentIndex + 3)}>
                {techData[currentIndex + 3].name}
                </NavLink></div>
            <div>{techData[currentIndex + 3].email}</div>
          </div>
        </div>
        <div class="font-contacts h-[80px] grid grid-cols-10 px-[80px] w-[500px] place-self-center">
          <div class="grid place-items-end col-span-3 ">
            <img
              class="h-[80px] rounded-full"
              src={techData[currentIndex + 4].imgSrc}
            ></img>
          </div>
          <div class="grid grid-rows-2 col-span-7">
            <div class="pt-3"><NavLink to={techData[currentIndex + 4].url} onClick={()=>props.sendTeacherIndex(currentIndex + 4)}>
                {techData[currentIndex + 4].name}
                </NavLink></div>
            <div>{techData[currentIndex + 4].email}</div>
          </div>
        </div>
        <div class="font-contacts h-[80px] grid grid-cols-10 px-[80px] w-[500px] place-self-center">
          <div class="grid place-items-end col-span-3 ">
            <img
              class="h-[80px] rounded-full"
              src={techData[currentIndex + 5].imgSrc}
            ></img>
          </div>
          <div class="grid grid-rows-2 col-span-7">
            <div class="pt-3"><NavLink to={techData[currentIndex + 5].url} onClick={()=>props.sendTeacherIndex(currentIndex + 5)}>
                {techData[currentIndex + 5].name}
                </NavLink></div>
            <div>{techData[currentIndex + 5].email}</div>
          </div>
        </div>
        <div class="font-contacts h-[80px] grid grid-cols-10 px-[80px] w-[500px] place-self-center">
          <div class="grid place-items-end col-span-3 ">
            <img
              class="h-[80px] rounded-full"
              src={techData[currentIndex + 6].imgSrc}
            ></img>
          </div>
          <div class="grid grid-rows-2 col-span-7">
            <div class="pt-3"><NavLink to={techData[currentIndex + 6].url} onClick={()=>props.sendTeacherIndex(currentIndex + 6)}>
                {techData[currentIndex + 6].name}
                </NavLink></div>
            <div>{techData[currentIndex + 6].email}</div>
          </div>
        </div>
        <div class="font-contacts h-[80px] grid grid-cols-10 px-[80px] w-[500px] place-self-center">
          <div class="grid place-items-end col-span-3 ">
            <img
              class="h-[80px] rounded-full"
              src={techData[currentIndex + 7].imgSrc}
            ></img>
          </div>
          <div class="grid grid-rows-2 col-span-7">
            <div class="pt-3"><NavLink to={techData[currentIndex + 7].url} onClick={()=>props.sendTeacherIndex(currentIndex + 7)}>
                {techData[currentIndex + 7].name}
                </NavLink></div>
            <div>{techData[currentIndex + 7].email}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="head">
        Persons (Dept. of Computer Science Faculty of Science)
      </div>
      <div class="grid">
        <div class="place-self-center h-[400px] w-10/12">
          <div class="grid max-w grid-cols-2 grid-rows-4 mx-auto text-center">
            <SetData class="transition ease-in-out delay-150" sendTeacherIndex={(item)=>{props.sendTeacherIndex(item)}}/>
          </div>
        </div>
      </div>
      <div class="grid place-content-center">
        <div class="grid grid-cols-3 w-[100px] mb-[20px] mt-[10px]">
          <button
            onClick={prevData}
            class="grid place-items-center h-[30px] w-[30px] text-white bg-regal-red  rounded-full transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer text-lg"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 rotate-180"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="grid place-items-center">{currentIndex / 8 + 1}</div>
          <button
            onClick={nextData}
            class="grid place-items-center h-[30px] w-[30px] text-white bg-regal-red  rounded-full transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer text-lg"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
export default Contacts;
