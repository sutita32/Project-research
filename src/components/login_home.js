/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import Logo from '../img/image 1.png'
import { Link, NavLink } from 'react-router-dom'


function login_home() {
  return (
    <div className='header' >
    <div className='container'>
        Collecting system of professors research in the of Computer Science 
    </div>  
    <div className='shadow-xl'>
        <div className='header-main'>
            <img src={Logo} alt="image 1.png" className="Logo" width="150"/>
        
                <ul className='menu' >

                    <li className="menu-link" >
                        <NavLink  to ="/" exact>HOME</NavLink>
                    </li>

                    <li className="menu-link" > 
                        <Link to ="/search" >SEARCH</Link>
                    </li>

                    <li className="menu-link" >
                    
                    </li>
                </ul>
        </div>
    </div>
    </div>
  )
}

export default login_home