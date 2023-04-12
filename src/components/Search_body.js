/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
   // eslint-disable-next-line no-const-assign
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

// const num_of_year = 20;
// const year_start = 2566;



function Search_body({ data1, sendResearchIndex , searchdata ,setsearchdata} ) {
  const [checkyear, setchecksyear] = useState(new Array(100).fill(false));
  const [checkteach, setcheckteach] = useState(new Array(100).fill(false));
  const [checklist, setchecklist] = useState(0);
  const [keyword ,setkeyword] =useState(searchdata.keyword);
  const [data ,setdata] =useState(searchdata.data);
  // const {keyword ,data } = searchdata;


  const [DATA ,setDATA] = useState();

  useEffect(()=>{
    setkeyword(searchdata.keyword);
    setdata(searchdata.data)

  },[setsearchdata])
 

  // if(data !== DATA && DATA){
  //   setDATA(data)
  // }
  // tempdata=data
  // console.log("sdadsad",data)
  if(data){
    data_year.length=0;
    data_name_list.length=0;
    /* เอาไว้ลูปเลขปี && อาจารย์*/
    let list_name_sort = data.sort((a, b) => {
      return a.ID_professor - b.ID_professor;
    });
    let list_year_sort = data.sort((a, b) => {
      return new Date(a.Publication_date).getFullYear() - new Date(b.Publication_date).getFullYear() ;
    }); 
    // console.log("list_name_sort=>",list_name_sort)
    // console.log("list_year_sort=>",list_year_sort)
    let temp1 = new Date(list_year_sort[0].Publication_date).getFullYear();
    let count = 1 ;
    
    for(let i=1;i<list_year_sort.length;i++){
      let year = new Date(list_year_sort[i].Publication_date).getFullYear();
      
      if(temp1 === year){
        count++;
      }else{
        data_year.push({
          year : temp1,
          N : count
        })
        temp1 = new Date(list_year_sort[i].Publication_date).getFullYear();
        count=1;
      }
      if(i === list_year_sort.length-1 ){
        data_year.push({
          year : year,
          N : count
        })
      }
    }
    // console.log("data_yeart=>",data_year)
    data_name_list = list_name_sort.filter(
      (obj, index) =>
      list_name_sort.findIndex((item) => item.Keyword === obj.Keyword) === index
    );
    // console.log("data_name_list=>",data_name_list)
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
    let tempdata =[];
    let test= [];
    // console.log("checkyear=>",checkyear)
    // console.log("checkteacr=>",checkteach)
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
                if(data_name_list[j].Keyword === data[k].Keyword && data_year[i].year === yearr){
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
    if(test.length > 0){
      tempdata = test;
    }
    
    // console.log("tempdata =>",tempdata)
    setDATA(tempdata);
    setsearchdata(tempdata);
    // setsearchdata(DATA);
  }
  
  return (
    <div className="body-set" onAbort={localStorage.setItem("temp", "delete")}>
      <div className="grid grid-cols-8">
        <div className=" col-span-6 font-semibold text-slate-800 font-['Prompt'] px-8 pt-8 pb-5">
          <div >ค้นหา: {keyword ? keyword:"ยังไม่ได้ค้นหา...."}</div>
          <div>ผลลัพธ์ทั้งหมด: {data ? data.length : 0 } รายการ</div>
          { DATA && data.length > 0? 
          <div>กรองเจอ : {DATA ? DATA.length : 0 } รายการ</div>
          :<div></div>
          }
        </div>
      </div>
      <div className="grid min-[921px]:grid-cols-8 gap-4 max-[920px]:grid-cols-6 ">
        { data && !DATA ?
          // displaysearch(data1,sendWorkIndex,tempdata ? tempdata:data)
          <div className="col-span-6">
            <Search_main_body data1={data1} sendResearchIndex={(item)=> sendResearchIndex(item)} searchdata={ data} />
          </div>
          :
          <div className="col-span-6">
            <Search_main_body data1={data1} sendResearchIndex={(item)=> sendResearchIndex(item)} searchdata={DATA } />
          </div>
        }
        <div className=" col-span-2 max-[480px]:hidden">
          <div className="my-4 h-60 place-item-center bg-white  max-w-sm rounded shadow-lg">
            <div className="h-80">
              <LineChart  h="800" w="1000" data={data}  />
            </div>
          </div>
          <form onSubmit={fillteryear}>
          <div className="sticky top-0">
            <div className=" max-w-xl rounded overflow-hidden shadow-lg bg-white">
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

                {/* <select id="list" onChange={focuslist} className=" bg-slate-200">
                  {
                    data_year_list.map((item, index)=>(
                      <option value={index} >{item}</option>
                    ))
                  }
                </select> */}
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
                
                  <div class="grid grid-cols-3 p-5 ">
                    {data_year.map((item, index)=>(
                      
                      <div key={index} class="flex items-center mr-4">
                        <input
                          id={{index}}
                          type="checkbox"
                          value={item.year}
                          // checked={checkyear[index]}
                          onChange={() => focusyearr( index)}
                          class="w- h-3 accent-regal-red bg-gray-100 rounded focus:ring-blue-500 "
                        />
                        <label
                          for={index}
                          class="ml-2 text-sm font-medium text-gray-900"
                        >
                          {item.year}
                        </label>
                        
                      </div>
                      
                    ))}
                  
                  </div>
                </p>
              </div>
            </div>
            <div class="h-8 "></div>
            <div class=" max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <div iv class="px-6 py-4">
                <div class="font-bold text-xl mb-2">ผู้วิจัย</div>
                <p class="text-gray-700 text-base">
                  {data_name_list.map((item, index) => (
                    <div key={index} class="flex items-center mr-4">
                      <input
                        id={index}
                        type="checkbox"
                        value={item.title_name+item.firstname_professor+" "+item.lastname_professor}
                        // checked={checkteach[index]}
                        onChange={() => focusteach( index)}
                        class="w-4 h-4 accent-regal-red bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700"
                      />
                      <label
                        for={index}
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-text-dark"
                      >
                        {item.title_name+item.firstname_professor+" "+item.lastname_professor}
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
