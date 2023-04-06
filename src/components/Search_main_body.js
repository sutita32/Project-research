/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
import React from "react";
import '../style/Search_main_body.css'
import { NavLink } from "react-router-dom";
// import { workData } from "./workData";



function Search_main_body({ data1, sendResearchIndex , searchdata }) {
  let data_show = [];
  // console.log("searchdata => ", searchdata)
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



  return (
    <>
      { data_show ? 
        data_show.map((item, index) => (
          <NavLink to={`../idresearch=${item.ID_research}`}
          // {`/${item.name_research}/`} 
          onClick={() => sendResearchIndex(item.ID_research)}>
            <div
              key={index}
              class="h-auto mx-auto pt-2 px-6 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 "
            >
              <div class="rounded">
                <div class="w-full h-full flex flex-col justify-between bg-white rounded-lg border shadow-lg mb-1 p-8">
                  <div class="min-h-card">
                    <h4 class="font-semibold text-regal-red ">
                      {item.name_research}
                    </h4>
                    <p class="font-normal2 text-regal-red  text-[12px]">
                      ผู้วิจัย: {item.title_name}{item.firstname_professor}&nbsp;{item.lastname_professor} 
                      <br></br>ผู้เขียน: {item.authors}
                      <br></br>Tag: {item.conference}
                      <br></br>From : {item.name_Type}
                      <br></br>Citation : {item.Citation}
                    </p>
                  </div>
                  <div>
                    <div class="font-normal2 pt-3 flex items-center justify-between text-regal-red  relative bottom-1 ">
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
