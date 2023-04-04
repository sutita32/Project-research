import React from 'react'
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import { useState, useEffect } from 'react';

const dataAll = [{ name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" }, { name: "2112355", year: "2511" },]


function ShowUpperTable() {

    const [pageNow, setPageNow] = useState(1);
    const [dataShow, setDataShow] = useState(
        dataAll.slice(pageNow * 10 - 10, 11)
    );
    const clickRight = () => {
        setPageNow(pageNow + 1);
        setTimeout(() => {
            window.scrollTo({
                top: 600,
                behavior: "smooth",
            });
        }, 100);
    };

    const clickLeft = () => {
        setPageNow(pageNow - 1);
        setTimeout(() => {
            window.scrollTo({
                top: 600,
                behavior: "smooth",
            });
        }, 100);
    };
    useEffect(() => {
        setDataShow(dataAll.slice(pageNow * 10 - 10, pageNow * 10));
    }, [pageNow]);
    return (
        <div className='grid h-auto w-[90%]'>
            
                {dataShow.map((item, index) => (
                    <div class="h-auto w-full bg-white rounded-[5px] grid grid-cols-10">
                        <div
                            scope="row"
                            class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap col-span-8 overflow-hidden"
                        >
                            {/* <NavLink
              to={`../idresearch=${item.ID_research}`}
              onClick={() => props.sendResearchIndex(item.ID_research)}
            > */}
                            {item.name}
                            {/* </NavLink> */}

                            {/* <p className="text-gray-400 font-normal3"> {item.Keyword}</p>
            <p className="text-gray-400 font-normal3">{item.conference}</p> */}
                        </div>
                        <div></div>
                        <div class="grid place-content-center px-6 py-4">
                            {/* {new Date(item.Publication_date).getFullYear()} */}
                            {item.year}
                        </div>
                        {/* <div class="grid place-content-center px-6 py-4">{item.Citation}</div> */}
                    </div>
                ))}
                <div className="grid place-content-center w-full h-[40px] my-[8px]">
                    <div className="flex h-[40px] w-[150px]">
                        <div className="grid place-items-center h-[40px] w-[50px]">
                            <button
                                onClick={clickLeft}
                                className={pageNow === 1 ? "text-white cursor-default" : ""}
                                disabled={pageNow === 1 ? true : false}
                            >
                                <BsArrowLeftShort className="h-[25px] w-[25px]" />
                            </button>
                        </div>
                        <div className="grid place-items-center h-[40px] w-[50px]">
                            {pageNow}
                        </div>
                        <div className="grid place-items-center h-[40px] w-[50px]">
                            <button
                                onClick={clickRight}
                                className={
                                    pageNow === Math.ceil(dataAll.length / 10)
                                        ? "text-white cursor-default"
                                        : ""
                                }
                                disabled={pageNow === Math.ceil(dataAll.length / 10) ? true : false}
                            >
                                <BsArrowRightShort className="h-[25px] w-[25px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
    )
}

export default ShowUpperTable