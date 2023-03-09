/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import "../style/Search_body.css";
import Search_main_body from "./Search_main_body";
import LineChart from "./LineChart";
import { NavLink } from "react-router-dom";

const data_krub = 15;

const data_year_list = [
  "แสดงตามปีที่เลือก",
  "แสดงปีที่ต่ำกว่าปีที่เลือก",
  "แสดงปีที่มากกว่าปีที่เลือก",
];
let data_year = [];
let data_name_list = [];
let tempdata ;

// const num_of_year = 20;
// const year_start = 2566;



function Search_body({ data1, sendWorkIndex , searchdata ,setsearchdata} ) {
  const [checkyear, setchecksyear] = useState(new Array(100).fill(false));
  const [checkteach, setcheckteach] = useState(new Array(100).fill(false));
  const [checklist, setchecklist] = useState(0);
  
  const {keyword ,data } = searchdata;

  const [DATA ,setDATA] = useState();
  // tempdata=data
  // console.log("sdadsad",data)
  if(data){
    // tempdata = data;
    data_year.length=0;
    data_name_list.length=0;
    /* เอาไว้ลูปเลขปี && อาจารย์*/
    let temp1 = new Date(data[0].Publication_date).getFullYear();
    let count = 1 ;
    let count1 = 1 ;
    data_year.push({
      year : temp1,
      N : count,
    })

    data_name_list.push({
      name : data[0].title_name + data[0].firstname_professor +" "+ data[0].lastname_professor,
      keyword : data[0].Keyword,
    });
    let j=0,k=0;
    let temp2 = data[0].Keyword;
    for(let i=1;i<data.length;i++){
      let yearr = new Date(data[i].Publication_date).getFullYear();
      let name = data[i].title_name + data[i].firstname_professor +" "+ data[i].lastname_professor;
      // console.log("index=",i," stat=>Year=>",yearr, "&pu",data[i].Publication_date)
      // console.log("index=",i," stat=>teacher=>",name)
      if(yearr === temp1 ){
        count++;
        data_year[j] = {
          year : yearr,
          N : count,
        };
        
      }else if(yearr !== temp1){
        data_year.push({
          year : yearr,
          N : 1,
        });
        count=1;
        j++;
        temp1=yearr;
      }
      if(temp2 === data[i].Keyword){
        count1++;
        data_name_list[k]= {
          name : name,
          keyword : data[0].Keyword,
        };
      }else if(temp2 !== data[i].Keyword){
        data_name_list.push({
          name : name,
          keyword : data[0].Keyword,
        });
        k++;
        count=1;
        temp2=data[i].Keyword;
      }

    }
  }


  const focusyearr = ( position) =>{

    let updatedCheckedState = checkyear;
    updatedCheckedState[position] = !updatedCheckedState[position]
    // console.log("updatedCheckedState => ",updatedCheckedState)

    setchecksyear(updatedCheckedState);
  }
  const focusteach = (position ) =>{
    let updatedCheckedState = checkteach;
    updatedCheckedState[position] = !updatedCheckedState[position]
    
    setcheckteach(updatedCheckedState);
  }
  const focuslist = (e) =>{
    // let updatedCheckedState = checklist;
    // updatedCheckedState[position] = !updatedCheckedState[position]
    // for(let i =0;i<checklist.length;i++){
    //   if(position !== i) updatedCheckedState[i] = false ;
    // }
    // console.log('updatedCheckedState=>',updatedCheckedState)
    setchecklist(e.target.value);
    // console.log('updatedCheckedState=>',checklist)
  }
  const fillteryear = async (event) =>{
    // event.preventDefault();
    // console.log("datadatadatadata  =>",data.length)
    tempdata =null
    let test= [];
    
      for(let i=0;i < data_year.length;i++){
        if(checkyear[i]){
          // console.log("year cheak "+i+ "=>",data_year[i]);
          for(let j =0 ;j < data_name_list.length;j++){
            if(checkteach[j]){
              // console.log("Teach cheak "+j+ "=>",data_name_list[j]);
              // console.log(" DATA.length =>", data.length)
              for(let k = 0; k < data.length ;k++){
                // console.log("push Keyword =>",data[k].Keyword)
                let yearr = new Date(data[k].Publication_date).getFullYear();
                // console.log("push yearr =>",yearr)
                if(data_name_list[j].keyword === data[k].Keyword && data_year[i].year === yearr){
                  // console.log("push tempdata =>",data[k])
                  test.push(data[k]);
                }
              }
            }
          }
        }
      }
   
    
  
    // console.log("tempdata =>",test)
    // console.log("tempdata =>",tempdata)
    tempdata = test;
    // console.log("tempdata =>",tempdata)
    setDATA(tempdata);
    setsearchdata(DATA);
  }
  
  return (
    <div className="body-set" onAbort={localStorage.setItem("temp", "delete")}>
      <div className="grid grid-cols-8">
        <div className=" col-span-6 font-head px-8 pt-8 pb-5">
          <div >ค้นหา: {keyword ? keyword:"ยังไม่ได้ค้นหา...."}</div>
          <div>ผลลัพธ์ทั้งหมด: {data ? data.length : 0 } รายการ</div>
          { DATA ? 
          <div>กรองเจอ : {DATA ? DATA.length : 0 } รายการ</div>
          :<div></div>
        }
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4">
        { data?
          // displaysearch(data1,sendWorkIndex,tempdata ? tempdata:data)
          <div className="col-span-6">
            <Search_main_body data1={data1} sendWorkIndex={sendWorkIndex} searchdata={data } />
          </div>
          :
          <div className="col-span-6">
            <Search_main_body data1={data1} sendWorkIndex={sendWorkIndex} searchdata={DATA } />
          </div>
        }
        <div className=" col-span-2 ">
          <div className="my-5 h-60 place-item-center">
            <div className="h-80">
              <LineChart  h="800" w="1000" data={data}  />
            </div>
          </div>
          <form onSubmit={fillteryear}>
          <div className="sticky top-0">
            <div className=" max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">ปีที่เผยแพร่</div>
                <p className="text-gray-700 text-base">
                  {/* <div className="flex items-center mr-4">
                    <input
                      id="inline-checkbox-checked"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 accent-regal-red bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700"
                      checked="false"
                    />
                    <label
                      for="inline-checkbox-checked"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-text-dark"
                    >
                      แสดงตามปีที่เลือก
                    </label>
                  </div> */}

                <select id="list" onChange={focuslist}>
                  {
                    data_year_list.map((item, index)=>(
                      <option value={index} >{item}</option>
                    ))
                  }
                </select>
                  {/* {data_year_list.map((item, index) => (
                    <div key={index} class="flex items-center mr-4">
                      <input
                        id={index}
                        type="checkbox"
                        value={index}
                        checked = {!checklist[index]}
                        onChange={() => focuslist(index)}
                        class="w-4 h-4 accent-regal-red bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700"
                      />
                      <label
                        for={index }
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-text-dark"
                      >
                        {item}
                      </label>
                    </div>
                  ))} */}
                
                  <div class="grid grid-cols-3 p-5">
                    {data_year.map((item, index)=>(
                      
                      <div key={index} class="flex items-center mr-4">
                        <input
                          id={{index}}
                          type="checkbox"
                          value={item.year}
                          // checked={checkyear[index]}
                          onChange={() => focusyearr( index)}
                          class="w- h-3 accent-regal-red bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700"
                        />
                        <label
                          for={index}
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-text-dark"
                        >
                          {item.year}
                        </label>
                        
                      </div>
                      
                    ))}
                  
                  </div>
                </p>
              </div>
            </div>
            <div class="h-8"></div>
            <div class=" max-w-sm rounded overflow-hidden shadow-lg">
              <div iv class="px-6 py-4">
                <div class="font-bold text-xl mb-2">ผู้วิจัย</div>
                <p class="text-gray-700 text-base">
                  {data_name_list.map((item, index) => (
                    <div key={index} class="flex items-center mr-4">
                      <input
                        id={index}
                        type="checkbox"
                        value={item.name}
                        // checked={checkteach[index]}
                        onChange={() => focusteach( index)}
                        class="w-4 h-4 accent-regal-red bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700"
                      />
                      <label
                        for={index}
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-text-dark"
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                </p>
              </div>
            </div>
            <div class="h-4"></div>
            <div class="w-4/12 h-auto mx-auto">
              <NavLink to="/search/" >
                <button
                type="submit"
                class="text-white bg-regal-red font-medium py-2.5 px-6 rounded-full text-sm transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer"
                onClick={fillteryear}
                >
                กรอง
              </button>
              </NavLink>
              
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search_body;
