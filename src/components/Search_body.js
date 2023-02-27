/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import "../style/Search_body.css";
import Search_main_body from "./Search_main_body";
import LineChart from "./LineChart";

const data_krub = 15;

const data_year_list = [
  "แสดงปีที่ต่ำกว่าปีที่เลือก",
  "แสดงปีที่มากกว่าปีที่เลือก",
];
const data_name_list = ["เจมส์", "โบว์"];

const num_of_year = 20;
const year_start = 2566;
var data_year = [];

function Search_body({ data1, sendWorkIndex }) {
  /*เอาไว้ลูปเลขปี*/
  for (let i = 0; i < num_of_year; i++) {
    data_year[i] = year_start - i;
  }

  return (
    <div className="body-set">
      <div className="grid grid-cols-8">
        <div className=" col-span-6 font-head px-8 pt-8 pb-5">
          <div >ค้นหา: ......</div>
          <div>ผลลัพธ์ทั้งหมด: {data_krub.length} รายการ</div>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-6">
          <Search_main_body data1={data1} sendWorkIndex={sendWorkIndex} />
        </div>
        <div className=" col-span-2 ">
          <div className="my-5 h-60 place-item-center">
            <div className="h-80">
              <LineChart h="500" w="620" />
            </div>
          </div>
          <div className="sticky top-0">
            <div className=" max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">ปีที่เผยแพร่</div>
                <p className="text-gray-700 text-base">
                  <div className="flex items-center mr-4">
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
                  </div>
                  {data_year_list.map((item, index) => (
                    <div key={index} class="flex items-center mr-4">
                      <input
                        id={index * 1.1232 + 0.08}
                        type="checkbox"
                        value=""
                        class="w-4 h-4 accent-regal-red bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700"
                      />
                      <label
                        for={index * 1.1232 + 0.08}
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-text-dark"
                      >
                        {item}
                      </label>
                    </div>
                  ))}

                  <div class="grid grid-cols-3 p-5">
                    {data_year.map((item, index) => (
                      <div key={index} class="flex items-center mr-4">
                        <input
                          id={index * 1.1102 + 0.03}
                          type="checkbox"
                          value=""
                          class="w- h-3 accent-regal-red bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700"
                        />
                        <label
                          for={index * 1.1102 + 0.03}
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-text-dark"
                        >
                          {item}
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
                        id={index * 0.685 + 0.0003}
                        type="checkbox"
                        value=""
                        class="w-4 h-4 accent-regal-red bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700"
                      />
                      <label
                        for={index * 0.685 + 0.0003}
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-text-dark"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </p>
              </div>
            </div>
            <div class="h-4"></div>
            <div class="w-4/12 h-auto mx-auto">
              <button
                type="submit"
                class="text-white bg-regal-red font-medium py-2.5 px-6 rounded-full text-sm transition ease-in-out hover:-translate-1 hover:scale-105 duration-300 cursor-pointer"
              >
                ค้นหา
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search_body;
