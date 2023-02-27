import React from 'react'
import '../style/Banner_search.css'
import { FiSearch } from "react-icons/fi";

function Banner_seach() {
  return (
    <div className="banner-bg">
          <div className="searchBox">
            <form className='banner-1'>
              <input className='s-banner' type="search" placeholder="Search" required/>
              <i className="icon-search"><FiSearch/></i>
            </form>
          </div>
    </div>
   
  )
}

export default Banner_seach