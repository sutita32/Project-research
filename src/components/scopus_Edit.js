/* eslint-disable jsx-a11y/scope */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";
import "../style/user_person.css";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";

function Scopus() {
  const [dataScopus, setDatascopus] = useState([
    {
      id: 1,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 2,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 3,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 4,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 5,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 6,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 7,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 8,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 9,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 10,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 11,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 12,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 13,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 14,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 15,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 16,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 17,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 18,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 19,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 20,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 21,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 22,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 23,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
    {
      id: 24,
      pname:
        "Improvement of speech emotion recognition with neural networkclassifier by using speech spectrogram",
      name: "S Prasomphan",
      Conference:
        "2015 International Conference on Systems, Signals and ImageProcessing …",
      year: "2015",
      cited: "38",
    },
  ]);
  function handleDeleteClike(id) {
    const removeItem = dataScopus.filter((dataScopus) => {
      return dataScopus.id !== id;
    });
    setDatascopus(removeItem);
  }

  const [pageNow, setPageNow] = useState(1);
  const [dataShow, setDataShow] = useState(
    dataScopus.slice(pageNow * 10 - 10, 11)
  );

  const clickRight = () => {
    setPageNow(pageNow + 1);
  };

  const clickLeft = () => {
    setPageNow(pageNow - 1);
  };

  useEffect(() => {
    setDataShow(dataScopus.slice(pageNow * 10 - 10, pageNow * 10));
  }, [pageNow]);

  const renderTable = (
    <>
      {dataShow.map((item) => (
        <div class="bg-white grid grid-cols-10" key={item.id}>
          <div
            scope="row"
            class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap col-span-7"
          >
            <a href="#">{item.pname}</a>
            <p className="text-gray-400 font-normal"> {item.name}</p>
            <p className="text-gray-400 font-normal">{item.Conference}</p>
          </div>
          <div class="grid place-content-center px-6 py-4">{item.year}</div>
          <div class="grid place-content-center px-6 py-4">{item.id}</div>
          <div class="grid place-content-center px-6 py-4">
            <div className="flex">
              <button className="h-[25px] w-[25px] mx-[14px] hover:text-gray-500">
                <BiEditAlt className="h-full w-full" />
              </button>
              <button className="h-[25px] w-[25px] mx-[14px] hover:text-gray-500">
                <RiDeleteBin6Line
                  className="h-full w-full"
                  onClick={() => handleDeleteClike(item.id)}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="grid place-content-center w-full h-[40px] my-[8px]">
        <div className="flex h-[40px] w-[150px]">
          <div className="grid place-items-center h-[40px] w-[50px]">
            <button
              onClick={clickLeft}
              className={pageNow === 1 ? "text-white cursor-default" : ""}
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
                pageNow === Math.ceil(dataScopus.length / 10)
                  ? "text-white cursor-default"
                  : ""
              }
            >
              <BsArrowRightShort className="h-[25px] w-[25px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
  return <>{renderTable}</>;
}

export default Scopus;
