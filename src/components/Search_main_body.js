import React from "react";
import { NavLink } from "react-router-dom";
import { workData } from "./workData";
function Search_main_body({ data1, sendWorkIndex }) {
  var data_show = [];
  if (data1 * 10 <= workData.length) {
    for (var i = 0; i < 10; i++) {
      data_show[i] = workData[data1 * 10 - 10 + i];
    }
  } else if (data1 * 10 > workData.length) {
    for (var j = 0; j < (workData.length % 10) - 1; j++) {
      data_show[j] = workData[data1 * 10 - 9 + j];
    }
    for (
      var k = (workData.length % 10) - 1;
      k < data1 * 10 - workData.length - 1;
      k++
    ) {
      data_show[k] = "0";
    }
  }

  return (
    <>
      {data_show.map((item, index) => (
        <NavLink to={item.url} onClick={() => sendWorkIndex(item.id - 1)}>
          <div
            key={index}
            class="h-auto mx-auto pt-2 px-6 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 "
          >
            <div class="rounded">
              <div class="w-full h-full flex flex-col justify-between  bg-regal-red rounded-lg border border-gray-400 mb-1 p-8">
                <div class="min-h-card">
                  <h4 class="font-normal text-white ">
                    {item.topic}
                  </h4>
                  <p class="font-normal text-white  text-sm">
                    ผู้วิจัย: {item.userName} <br></br>Tag: {item.topic_type}
                  </p>
                </div>
                <div>
                  <div class="font-normal pt-3 flex items-center justify-between text-white  relative bottom-1 ">
                    <p>{item.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  );
}
export default Search_main_body;
