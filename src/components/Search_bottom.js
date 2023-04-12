/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../style/Search_bottom.css";
import GoToTop from "./GoToTop.js";

// let resultbtpage = [];

function Make_circle({ data1, page_now }) {
  var url_name = "/search/" + data1.toString();
  // var url_name = "/search/";
  return (
    <>
      <NavLink to={url_name} exact>
        <button
          id="button"
          class={
            data1 == page_now
              ? /////////////////
                "btn-color-active mx-1 bg-transparent font-semibold h-[30px] w-[30px]"
              : "btn-color mx-1 bg-transparent font-semibold h-[30px] w-[30px]"
          }
        >
          <div class="grid place-items-center h-full w-full">{data1}</div>
          {/* //////////////////////////// */}
        </button>
      </NavLink>
      <GoToTop />
    </>
  );
}
function Make_dot() {
  return (
    <>
      <span class="text-set-position"> . . .</span>
    </>
  );
}

function Search_bottom({ page_now, searchdata }) {
  /////////////////////////////////
  const [resultBTPage, setResultBTPage] = useState([]);
  // console.log("asearchdata searchdata searchdata =>",searchdata )
  useEffect(() => {
    let npage = 0;
    if (searchdata.data) {
      npage = searchdata.data.length / 10;
      if (npage > 0 && npage <= 4) {
        let temp = [];
        for (let i = 1; i <= npage + 1; i++) {
          temp.push(<Make_circle data1={i} page_now={page_now} />);
        }
        setResultBTPage(temp);
      } else if (npage > 4) {
        let temp = [];
        let temp2 = [];
        for (let i = 1; i <= npage + 1; i++) {
          temp.push(<Make_circle data1={i} page_now={page_now} />);
        }
        // console.log("temp_lenght =====>", temp.length);
        if (temp.length < 7) {
          for (let i = 0; i < temp.length; i++) {
            temp2.push(temp[i]);
          }
        } else if (page_now < 3) {
          temp2.push(temp[0]);
          temp2.push(temp[1]);
          temp2.push(temp[2]);
          temp2.push(temp[3]);
          temp2.push(<Make_dot />);
          temp2.push(temp[temp.length - 1]);
        } else if (page_now == 3) {
          temp2.push(temp[0]);
          temp2.push(temp[1]);
          temp2.push(temp[2]);
          temp2.push(temp[3]);
          temp2.push(temp[4]);
          temp2.push(<Make_dot />);
          temp2.push(temp[temp.length - 1]);
        } else if (page_now == 4) {
          temp2.push(temp[0]);
          temp2.push(temp[1]);
          temp2.push(temp[2]);
          temp2.push(temp[3]);
          temp2.push(temp[4]);
          temp2.push(temp[5]);
          temp2.push(<Make_dot />);
          temp2.push(temp[temp.length - 1]);
        } else if (page_now >= 5 && page_now <= temp.length - 4) {
          temp2.push(temp[0]);
          temp2.push(<Make_dot />);
          temp2.push(temp[page_now - 3]);
          temp2.push(temp[page_now - 2]);
          temp2.push(temp[page_now - 1]);
          temp2.push(temp[page_now]);
          temp2.push(temp[parseInt(page_now) + 1]);
          temp2.push(<Make_dot />);
          temp2.push(temp[temp.length - 1]);
        } else if (page_now == temp.length - 3) {
          temp2.push(temp[0]);
          temp2.push(<Make_dot />);
          temp2.push(temp[temp.length - 6]);
          temp2.push(temp[temp.length - 5]);
          temp2.push(temp[temp.length - 4]);
          temp2.push(temp[temp.length - 3]);
          temp2.push(temp[temp.length - 2]);
          temp2.push(temp[temp.length - 1]);
        } else if (page_now == temp.length - 2) {
          temp2.push(temp[0]);
          temp2.push(<Make_dot />);
          temp2.push(temp[temp.length - 5]);
          temp2.push(temp[temp.length - 4]);
          temp2.push(temp[temp.length - 3]);
          temp2.push(temp[temp.length - 2]);
          temp2.push(temp[temp.length - 1]);
        } else if (page_now > temp.length - 2) {
          temp2.push(temp[0]);
          temp2.push(<Make_dot />);
          temp2.push(temp[temp.length - 4]);
          temp2.push(temp[temp.length - 3]);
          temp2.push(temp[temp.length - 2]);
          temp2.push(temp[temp.length - 1]);
        }
        setResultBTPage(temp2);
      }
    }
  }, [searchdata, page_now]);

  /////////////////////////////////

  return (
    <>
      <div class="grid min-[481px]:grid-cols-8 max-[480px]:grid-cols-6">
        <div class="body-set-bottom col-span-6 place-self-center min-h-full">
          <div class="h-12 mx-auto w-auto font-bold">{resultBTPage}</div>
        </div>
      </div>
    </>
  );
}

export default Search_bottom;
