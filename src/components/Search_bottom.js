/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../style/Search_bottom.css";
import GoToTop from "./GoToTop.js";

function Make_circle({ data1, page_now }) {
  var url_name = "/search/" + data1.toString();
  return (
    <>
      <NavLink to={url_name} exact>
        <button
          id="button"
          class={
            data1 == page_now
              ? "btn-color-active mx-1 bg-transparent font-semibold py-2 px-4 border rounded-full"
              : "btn-color mx-1 bg-transparent font-semibold py-2 px-4 border rounded-full"
          }
        >
          {data1}
        </button>
      </NavLink>
      <GoToTop />
    </>
  );
}
function Make_dot() {
  return (
    <>
      <span class="text-set-position"> . . . . . .</span>
    </>
  );
}

function Search_bottom({ page_now }) {
  return (
    <>
      <div class="grid grid-cols-8">
        <div class="body-set-bottom col-span-6 place-self-center min-h-full">
          <div class="h-12 mx-auto w-auto font-bold">
            {/* <Make_circle />
            <Make_dot /> */}
            <Make_circle data1="1" page_now={page_now} />
            <Make_circle data1="2" page_now={page_now} />
            <Make_circle data1="3" page_now={page_now} />
            {/* <Make_circle />
            <Make_circle />
            <Make_circle />
            <Make_circle />
            <Make_dot />
            <Make_circle /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search_bottom;
