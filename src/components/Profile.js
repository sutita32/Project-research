/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../img/image 1.png'
import "../style/profilePage.css";
import { BiEdit } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { workData } from "./workData";
import ProfilePage_Interest from "./profilePage_Interest";  

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Profile() {

    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [isLoaded, setIsLoaded] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        console.log("user => ",JSON.parse(localStorage.getItem('user')))

        if(localStorage.getItem('user')){
          setUser(JSON.parse(localStorage.getItem('user')));
          setIsLoaded(false)
        }
        
        if(!token){
          localStorage.clear();
          navigate('/login')
        }
      }, [])
      const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
      }

      const [ShowInterestBlock] = useState(<ProfilePage_Interest />);
  
      // console.log(user)
      if(isLoaded) return (<>Loading</>)
      else{
        return (
            <>
                    {/* <div>{user.fname}</div>
            <div>{user.lname}</div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div><img src={user.avatar} width={100}/></div> */}
            {/* <div><button onClick={logout}>LOGOUT</button></div> */}

            <div className="grid grid-rows-6 min-h-[700px] w-full">
        <div className="row-span-2 w-full">
          <div id="back-bg-top" className="h-full w-full"></div>
        </div>
        <div className="row-span-4 w-full ">
          <div className="bg-regal-red w-full h-full bg-opacity-90"></div>
        </div>
      </div>
      <div className="grid place-items-center absolute w-full h-[500px] top-[300px] mb-[50px]">
        <div className="grid grid-rows-6 rounded-[20px] w-10/12 h-full bg-[#EFEFEF] p-[11px]">
          <div className="w-full h-full row-span-1"></div>
          <div className="grid grid-cols-10 gap-[8px] w-full h-[410px] row-span-5">
            <div className="grid grid-rows-10 col-span-3 gap-[8px] h-[410px] w-full">
              <div className="box-in-profile row-span-6 py-[14px] px-[15px] overflow-y-scroll h-full w-full">
                {ShowInterestBlock}
              </div>
              <div className="grid grid-rows-2 place-items-center box-in-profile row-span-4 w-full h-full">
                <div className="relative top-[17px]">
                  <button className="grid place-items-center grid-rows-1 w-[200px] h-[40px] hover:bg-regal-red hover:text-white rounded-more">
                    <div className="flex">
                      <div className="grid place-items-center h-[23px] w-[23px]">
                        <FaUserEdit className="h-full w-full mr-[5px]" />
                      </div>
                      <div className="grid place-content-center"> แก้ไขโปรไฟล์</div>
                    </div>
                  </button>
                </div>
                <div className="relative bottom-[17px]">
                <NavLink to="/forgot-pass">
                  <button className="grid place-items-center grid-rows-1 w-[200px] h-[40px] hover:bg-regal-red hover:text-white rounded-more">
                    <div className="flex">
                      <div className="grid place-items-center h-[25px] w-[25px]">
                        <BiEdit className="h-full w-full mr-[5px]" />
                      </div>
                      <div className="grid place-content-center">แก้ไขรหัสผ่าน</div>
                    </div>
                  </button>
                </NavLink>
                </div>
              </div>
            </div>
            <div className="box-in-profile col-span-7 p-[15px]">
              <div className="flex">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div> About</div>
              </div>
              <div className=" h-full w-full grid grid-cols-10 ">
                <div className="grid grid-cols-10 col-span-1 place-items-center">
                  <div className=" line-right col-span-4 w-full h-[300px] mb-[20px]"></div>
                </div>
                <div className="grid grid-cols-10 col-span-9 mt-[30px]">
                  <div className="grid grid-rows-5 col-span-2">
                    <div className="">Username</div>
                    <div>ชื่อจริง</div>
                    <div>นามสกุล</div>
                    <div>Email</div>
                    <div>เบอร์โทรศัพท์</div>
                  </div>
                  <div className="grid grid-rows-5 col-span-8 ">
                    <span className="inline-block align-middle ">
                      : &emsp;&emsp;&emsp;{user.username}
                    </span>
                    <div>:&emsp;&emsp;&emsp;{user.first_name} </div>
                    <div>:&emsp;&emsp;&emsp;{user.last_name} </div>
                    <div>:&emsp;&emsp;&emsp;{user.Email} </div>
                    <div>:&emsp;&emsp;&emsp;{user.phonenumber}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid place-items-center absolute top-[228px] border-blue-700 w-full h-[140px]">
        <img
          // src={user.avatar}
          class="h-[140px] rounded-full"
        ></img>
      </div>
            </>
          )

      }
}

export default Profile
