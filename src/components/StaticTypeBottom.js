import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect } from "react";
import { useState } from "react";
import { workData } from "./workData";
import "../style/Static.css";

const NUM_PER_PAGE = 6;

function StaticTypeBottom() {
  const [pageNow, setPageNow] = useState(1);
  const [typeShow, setTypeShow] = useState(
    workData.slice((pageNow - 1) * NUM_PER_PAGE, pageNow * NUM_PER_PAGE)
  );

  useEffect(() => {
    setTypeShow(
      workData.slice((pageNow - 1) * NUM_PER_PAGE, pageNow * NUM_PER_PAGE)
    );
  }, [pageNow]);

  function GetYear({ getIndex }) {
    var temp = typeShow[getIndex].date.split(" ");
    return temp[3];
  }

  function Pagination() {
    const prevData = () => {
      window.scrollTo({
        top: 1150,
        behavior: "smooth",
      });
      var temp = pageNow - 1;
      setPageNow(temp);
    };

    const nextData = () => {
      window.scrollTo({
        top: 1150,
        behavior: "smooth",
      });
      var temp = pageNow + 1;
      setPageNow(temp);
    };

    function LeftButton() {
      if (pageNow === 1) {
        return <div class="h-[30px] w-[30px]"></div>;
      } else {
        return (
          <>
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
          </>
        );
      }
    }

    function RightButton() {
      if (pageNow === Math.ceil(workData.length / NUM_PER_PAGE)) {
        return <div class="h-[30px] w-[30px]"></div>;
      } else {
        return (
          <>
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
          </>
        );
      }
    }

    return (
      <div class="flex">
        <LeftButton />
        <div class="grid place-items-center mx-[20px]">{pageNow}</div>
        <RightButton />
      </div>
    );
  }

  return (
    <div class="bg-[#F0F8FF] pt-[30px]">
      <div class="flex justify-center w-full h-[200px]">
        <div class="flex justify-center bg-regal-red w-[80%] h-[160px] rounded-[20px]">
          <form class="flex items-center mx-8 w-[800px]">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="search-static"
                class="h-14 bg-gray-50 text-gray-900 text-sm rounded-[10px] block w-full pl-10 p-2.5  dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white focus:border-[0] focus:ring-[0] focus:outline-none border-[0]"
                placeholder="พิมพ์คำที่ต้องการจะค้นหาที่นี่.."
                required
              />
            </div>
            <button
              type="submit"
              class="p-2.5 ml-2 text-sm font-medium text-white bg-regal-red rounded-full hover:bg-regal-red-hover focus:ring-4 focus:outline-none focus:ring-regal-red-hover dark:pink-900 dark:hover:pink-900"
            >
              <svg
                class="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </form>
        </div>
      </div>
      <div class="grid place-items-center w-full h-auto ">
        <div class="grid w-[90%] h-auto">
          <div class="text-white font-bold1 h-[45px] w-full bg-regal-red rounded-[5px] grid grid-cols-10">
            <div class="col-span-6 ">
              <div class="text-[17px] grid place-content-center w-fit h-full ml-[25px]">
                หัวข้อ
              </div>
            </div>
            <div class="text-[15px] grid grid-cols-3 place-items-center col-span-4">
              <div>TYPE</div>
              <div>YEAR</div>
              <div>CITED BY</div>
            </div>
          </div>
        </div>
        {typeShow.map((item, index) => (
          <div class="grid w-[90%] h-auto my-[10px]">
            <div class="h-fit w-full">
              <div class="font-bold1 grid grid-cols-10 my-[8px]">
                <div class=" col-span-6 ">
                  <div class="grid place-content-center w-fit h-full ml-[20px]">
                    <div class="min-h-[53px]">{item.topic}</div>
                    <div class="text-[13px] text-gray-500">{item.userName}</div>
                  </div>
                </div>
                <div class="grid grid-cols-3 place-items-center col-span-4">
                  <div>{item.topic_type}</div>
                  <div>
                    <GetYear getIndex={index} />
                  </div>
                  <div>1</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div class="py-[20px]">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default StaticTypeBottom;
