/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React,{useState} from 'react'
import '../style/Header.css'
import Logo from '../img/image 1.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import ReactTypingEffect from 'react-typing-effect'
import { HiMenu,HiX } from "react-icons/hi";


function Header({loginstatus}) {
    const auth = localStorage.getItem('user');
    const role = localStorage.getItem('Role');

    const [click,setClick] = useState(false);
    const handleClikc = () => setClick(!click);
    console.log(click);
    const closeMobileMenu = () => setClick(false);

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
                                    <ul className={click ? "menu active" : "menu"} >
                                        <li className="menu-link" >
                                            <NavLink className={getNavClass} to="/" exact onClick={closeMobileMenu}>หน้าแรก</NavLink>
                                        </li>

                                        <li className="menu-link" >
                                            <NavLink to="/search" className={getNavClass} onClick={closeMobileMenu}>ค้นหา</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink to="/Static" className={getNavClass} onClick={closeMobileMenu}>สถิติ</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink to={"/edit_admin"} className={getNavClass} onClick={closeMobileMenu}>Admin</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink onClick={()=>{logouts();closeMobileMenu()}} to="/login" >ออกจากระบบ</NavLink>
                
                                        </li>
                                    </ul>
                                    :
                                    <ul className={click ? "menu active" : "menu"} >
                                        <li className="menu-link" >
                                            <NavLink className={getNavClass} to="/" exact onClick={closeMobileMenu}>หน้าแรก</NavLink>
                                        </li>

                                        <li className="menu-link" >
                                            <NavLink to="/search" className={getNavClass} onClick={closeMobileMenu}>ค้นหา</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink to="/Static" className={getNavClass} onClick={closeMobileMenu}>สถิติ</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink to={"/profile"} className={getNavClass} onClick={closeMobileMenu}>โปรไฟล์</NavLink>
                                        </li>
                                        <li className="menu-link" >
                                            <NavLink onClick={()=>{logouts();closeMobileMenu()}} to="/login" >ออกจากระบบ</NavLink>
                
                                        </li>
                                    </ul>
                                :

                                <ul className={click ? "menu active" : "menu"}>
                                    <li className="menu-link" >
                                        <NavLink className={getNavClass} to ="/" exact onClick={closeMobileMenu}>หน้าแรก</NavLink>
                                        </li>

                                        <li className="menu-link" > 
                                            <NavLink to ="/search" className={getNavClass} onClick={closeMobileMenu}>ค้นหา</NavLink>
                                        </li> 
                                        <li className="menu-link" >
                                        <NavLink to="/Static" className={getNavClass} onClick={closeMobileMenu}>สถิติ</NavLink>
                                    </li>
                                    <NavLink to="/login" exact  onClick={closeMobileMenu}>
                                        <li className="menu-link" >
                                            <button type='button' class="login_btn hover:bg-[#865369] hover:text-white focus:bg-[#865369]" id="btnLogin" >เข้าสู่ระบบ</button>
                                        </li>
                                    </NavLink> 
                               </ul>

                            } 
                             <div className='mobile-menu' onClick={handleClikc}>
                                {click ? (
                                    <HiX/>
                                ) : (
                                    <HiMenu/>
                                )}
                            </div>
                    </div>
                </div>
            </div>


        </>

    )
}


export default Header