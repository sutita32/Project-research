/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import "../style/user_person.css";
import { NavLink } from "react-router-dom";
function Scopus(props) {
  // console.log("getdata =>",getdata)
  let research = [];
  for (let i = 0; i < props.getdata.length; i++) {
    if (props.getdata[i].ID_Type == 2) {
      research.push(props.getdata[i]);
    }
  }
  return (
    <>
      {research.map((item, index) => (
        <div class="bg-white grid grid-cols-10">
          <div
            scope="row"
            class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap col-span-8 overflow-hidden"
          >
            <NavLink
              to={`../idresearch=${item.ID_research}`}
              onClick={() => props.sendResearchIndex(item.ID_research)}
            >
              {item.name_research}
            </NavLink>

            <p className="text-gray-400 font-normal3"> {item.Keyword}</p>
            <p className="text-gray-400 font-normal3">{item.conference}</p>
          </div>
          <div class="grid place-content-center px-6 py-4">
            {new Date(item.Publication_date).getFullYear()}
          </div>
          <div class="grid place-content-center px-6 py-4">{item.Citation}</div>
        </div>
      ))}
    </>
  );
}

export default Scopus;
