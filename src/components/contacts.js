/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect } from "react";
import { useState } from "react";
import "../style/contacts.css";
import { techData } from "./TeacherData";
import { NavLink } from "react-router-dom";
import { Alert, Space, Spin } from "antd";

function Contacts(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [techdata, setteachdata] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/professor/get-all-data", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          // techdata = result.data;
          // setteachdata(result.data)
          setteachdata(result.data);
          setIsLoading(false);
        }
        // return console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const prevData = () => {
    // console.log("techdata.length =>",techdata.length)
    // console.log("currentIndex =>",currentIndex)
    // console.log("mod",techdata.length - (techdata.length % 8) - 8)

    const newData = currentIndex - 8;

    setCurrentIndex(newData);
  };

  const nextData = () => {
    // console.log("currentIndex =>",currentIndex)

    const newData = currentIndex + 8;
    setCurrentIndex(newData);
  };
  // console.log("dkwaldawldk=>>>",techdata)
  function SetData(props) {
    // console.log("dkwaldawldk=>>>",techdata)
    let data1 = [];
    let data2 = [];
    let i = 0;
    while (i < 8) {
      // console.log("currentIndex=>",currentIndex,"&" ,currentIndex+i)
      if (currentIndex + i >= techdata.length) break;
      else if (i < 4) data1.push(techdata[currentIndex + i]);
      else data2.push(techdata[currentIndex + i]);
      i++;
    }
    // console.log("data2=>",data2)
    return (
      <>
        <div class="grid grid-rows-4 divide-y place-content-center" >
          {data1.map((item, index) => (
            <div class="font-contacts h-[80px] grid grid-cols-10 px-[80px] w-[500px] m-[10px] max-[480px]:w-full max-[480px]:m-[0px] max-[480px]:my-[10px]">
              <div class="col-span-3 h-[60px] w-[60px] overflow-hidden rounded-full mt-[10px] ml-[10px]">
                <img alt="" class="" src={item.img}></img>
              </div>
              <div class="col-span-7 place-items-start h-full w-full pt-[15px] min-[390px]:w-full min-[390px]:ml-[10px]  max-[390px]:ml-[20px]">
                <div class="h-auto w-auto text-start">
                  <NavLink
                    onClick={() => props.sendTeacherIndex(item.ID_professor)}
                    to={`id=${item.ID_professor}`}
                  >
                    {item.title_name +
                      item.firstname_professor +
                      " " +
                      item.lastname_professor}
                  </NavLink>
                </div>  
                <div class="h-auto w-auto text-start">{item.Email}</div>
              </div>
            </div>
          ))}
        </div>
        <div class="grid grid-rows-4 divide-y place-content-center">
          {data2.map((item, index) => (
            <div class="font-contacts h-[80px] grid grid-cols-10 px-[80px] w-[500px] m-[10px] max-[480px]:w-full max-[480px]:m-[0px] max-[480px]:my-[10px]">
              <div class="col-span-3 h-[60px] w-[60px] overflow-hidden rounded-full mt-[10px] ml-[10px]">
                <img alt="" class="" src={item.img}></img>
              </div>
              <div class="col-span-7 place-items-start h-full w-full pt-[15px] min-[390px]:w-full min-[390px]:ml-[10px]  max-[390px]:ml-[20px]">
                <div class="h-auto w-auto text-start">
                  <NavLink
                    onClick={() => props.sendTeacherIndex(item.ID_professor)}
                    to={`id=${item.ID_professor}`}
                  >
                    {item.title_name +
                      item.firstname_professor +
                      " " +
                      item.lastname_professor}
                  </NavLink>
                </div>  
                <div class="h-auto w-auto text-start">{item.Email}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (isLoading) return <div className="h-[80px] pt-[40px]">
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin></div>;
  else
    return (
      <>
        <div className="head">
          Persons (Dept. of Computer Science Faculty of Science)
        </div>
        <div class="grid">
          <div class=" place-self-center min-[920px]:h-[400px] max-[480px]:h-[800px] w-full">
            <div class="grid min-[920px]:w-[1400px] min-[920px]:grid-cols-2 mx-auto min-[920px]:text-center max-[920px]:grid-rows-2 max-[920px]:w-full max-[480px]:divide-y max-[920px]:place-content-center" >
              <SetData
                sendTeacherIndex={(item) => props.sendTeacherIndex(item)}
              />
            </div>
          </div>
        </div>
        <div class="grid place-content-center">
          <div class="grid grid-cols-3 w-[100px] mb-[20px] mt-[10px]">
            {currentIndex === 0 ? (
              //////////////////////
              <div></div>
            ) : (
              ///////////////////////////
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
            )}
            <div class="grid place-items-center">{currentIndex / 8 + 1}</div>
            {currentIndex + 8 > techdata.length ? (
              <></>
            ) : (
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
            )}
          </div>
        </div>
      </>
    );
}
export default Contacts;
