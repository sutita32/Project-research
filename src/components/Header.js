/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import '../style/Header.css'
import Logo from '../img/image 1.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import ReactTypingEffect from 'react-typing-effect'

function Header({loginstatus}) {
    const auth = localStorage.getItem('user');
    const role = localStorage.getItem('Role');
    const navigate = useNavigate();
    const logouts = () => {
        localStorage.clear();
        navigate('/login')
    }
    

    function getNavClass(navLinkProps) {
        let navClass = 'testbt';
        if (!navLinkProps.isActive) navClass += 'testbt';
        return navClass;
    }



    return (
        <>

            <div className='z-[999] header sticky top-0' >
                <div className='container'>
                    <ReactTypingEffect text={['Research Gathering System of Computer and Information Science Department']} speed={30} eraseDelay={1500}/>
                </div>
                <div className='shadow-xl'>
                    <div className='header-main' >
                        <img src={Logo} alt="image 1.png" className="Logo" width="150" />
                        {
                            auth ?
                                role === "Admin" ?
                                    <ul className='menu' >
                                        <li className="menu-link" >
                                            <NavLink className={getNavClass} to="/" exact>หน้าแรก</NavLink>
                                        </li>

                                        <li className="menu-link" >
                                            <NavLink to="/search" className={getNavClass}>ค้นหา</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink to="/Static" className={getNavClass}>สถิติ</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink to={"/edit_admin"} className={getNavClass}>Admin</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink onClick={logouts} to="/login" >ออกจากระบบ</NavLink>
                
                                        </li>
                                    </ul>
                                    :
                                    <ul className='menu' >
                                        <li className="menu-link" >
                                            <NavLink className={getNavClass} to="/" exact>หน้าแรก</NavLink>
                                        </li>

                                        <li className="menu-link" >
                                            <NavLink to="/search" className={getNavClass}>ค้นหา</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink to="/Static" className={getNavClass}>สถิติ</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink to={"/profile"} className={getNavClass}>โปรไฟล์</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink onClick={logouts} to="/login" >ออกจากระบบ</NavLink>
                
                                        </li>
                                    </ul>
                                :

                                <ul className='menu' >
                                    <li className="menu-link" >
                                        <NavLink className={getNavClass} to ="/" exact>หน้าแรก</NavLink>
                                        </li>

                                        <li className="menu-link" > 
                                            <NavLink to ="/search" className={getNavClass}>ค้นหา</NavLink>
                                        </li> 
                                        <li className="menu-link" >
                                        <NavLink to="/Static" className={getNavClass}>สถิติ</NavLink>
                                    </li>
                                    <NavLink to="/login" exact>
                                        <li className="menu-link" >
                                            <button type='button' class="login_btn hover:bg-[#865369] focus:bg-[#865369]" id="btnLogin" >เข้าสู่ระบบ</button>
                                        </li>
                                    </NavLink> 
                               </ul>

                            } 
                    </div>
                </div>
            </div>

        </>

    )
}


export default Header