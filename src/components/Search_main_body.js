/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
import React from "react";
import { NavLink } from "react-router-dom";
import { workData } from "./workData";



function Search_main_body({ data1, sendWorkIndex , searchdata }) {
  let data_show = [];
  console.log("searchdata => ", searchdata)
  if(searchdata){
    data_show.length = 0;

    for(let j=0 ; j < 10 ; j++){
      if ((((data1-1) * 10) +j) < searchdata.length){
        data_show.push(searchdata[j+ ((data1 - 1) * 10) ]);
      }else{
        break ;
      }
      
    }
  }
  // console.log("data_show => ", data_show)
  // if (data1 * 10 <= data_length) {
  //   for (var i = 0; i < 10; i++) {
  //     data_show[i] = searchdata.data[data1 * 10 - 10 + i];
  //   }
  // } else if (data1 * 10 > data_length) {
  //   for (var j = 0; j < (data_length % 10) - 1; j++) {
  //     data_show[j] = searchdata.data[data1 * 10 - 9 + j];
  //   }
  //   for (
  //     var k = (data_length % 10) - 1;
  //     k < data1 * 10 - data_length - 1;
  //     k++
  //   ) {
  //     data_show[k] = "0";
  //   }
  // }


  return (
    <>
      { data_show ? 
        data_show.map((item, index) => (
          <NavLink to='detail'
          // {`/${item.name_research}/`} 
          onClick={() => sendWorkIndex(index)}>
            <div
              key={index}
              class="h-auto mx-auto pt-2 px-6 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 "
            >
              <div class="rounded">
                <div class="w-full h-full flex flex-col justify-between  bg-regal-red rounded-lg border border-gray-400 mb-1 p-8">
                  <div class="min-h-card">
                    <h4 class="font-normal text-white ">
                      {item.name_research}
                    </h4>
                    <p class="font-normal text-white  text-sm">
                      ผู้วิจัย: {item.title_name}{item.firstname_professor}&nbsp;{item.lastname_professor} <br></br>Tag: {item.conference}
                      <br></br>From : {item.name_Type}
                      <br></br>Citation : {item.Citation}
                    </p>
                  </div>
                  <div>
                    <div class="font-normal pt-3 flex items-center justify-between text-white  relative bottom-1 ">
                      <p>{new Date(item.Publication_date).toLocaleDateString('en-US')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        ))
        :
        <div>
        </div>
      }

      
    </>
  );
}
export default Search_main_body;
