/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import '../style/Header.css'
import Logo from '../img/image 1.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'

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

            <div className='header' >
                <div className='container'>
                    Collecting system of professors research in the of Computer Science
                </div>
                <div className='shadow-xl'>
                    <div className='header-main'>
                        <img src={Logo} alt="image 1.png" className="Logo" width="150" />
                        {
                            auth ?
                                role === "Admin" ?
                                    <ul className='menu' >
                                        <li className="menu-link" >
                                            <NavLink className={getNavClass} to="/" exact>หน้าแรก</NavLink>
                                        </li>

                                        <li className="menu-link" >
                                            <Link to="/search" className={getNavClass}>ค้นหา</Link>
                                        </li>
                                        <li className="menu-link" >
                                            <Link to="/Static" className={getNavClass}>สถิติ</Link>
                                        </li>
                                        <li className="menu-link" >
                                            <Link to={"/edit_admin"} className={getNavClass}>Admin</Link>
                                        </li>
                                        <li className="menu-link" >
                                            <Link onClick={logouts} to="/login" >ออกจากระบบ</Link>
                
                                        </li>
                                    </ul>
                                    :
                                    <ul className='menu' >
                                        <li className="menu-link" >
                                            <NavLink className={getNavClass} to="/" exact>หน้าแรก</NavLink>
                                        </li>

                                        <li className="menu-link" >
                                            <Link to="/search" className={getNavClass}>ค้นหา</Link>
                                        </li>
                                        <li className="menu-link" >
                                            <Link to="/Static" className={getNavClass}>สถิติ</Link>
                                        </li>
                                        <li className="menu-link" >
                                            <Link to={"/profile"} className={getNavClass}>โปรไฟล์</Link>
                                        </li>
                                        <li className="menu-link" >
                                            <Link onClick={logouts} to="/login" >ออกจากระบบ</Link>
                
                                        </li>
                                    </ul>
                                :

                                <ul className='menu' >
                                    <li className="menu-link" >
                                        <NavLink className={getNavClass} to ="/" exact>หน้าแรก</NavLink>
                                        </li>

                                        <li className="menu-link" > 
                                            <Link to ="/search" className={getNavClass}>ค้นหา</Link>
                                        </li> 
                                        <li className="menu-link" >
                                        <Link to="/Static" className={getNavClass}>สถิติ</Link>
                                    </li>
                                    <NavLink to="/login" exact>
                                        <li className="menu-link" >
                                            <button type='button' class="login_btn" id="btnLogin" >เข้าสู่ระบบ</button>
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