/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react'
import { HiOutlineMail } from "react-icons/hi";
import "../style/user_person.css";
import Scholar from "./scholar";
import Scopus from './scopus'

import { NavLink, useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

localStorage.setItem("tableNow", "scholar");

function Profile_aj() {

    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);


    const [isLoaded, setIsLoaded] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        if(localStorage.getItem('user')){
            setUser(JSON.parse(localStorage.getItem('user')));
            setIsLoaded(false)
        }
        if(! token){
            localStorage.clear();
            navigate('/login')
        }
        
        // var requestOptions = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     redirect: 'follow'
        // };

        // fetch("https://www.melivecode.com/api/auth/user", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         if (result.status === 'ok') {
        //             setUser(result.user)
        //             setIsLoaded(false)
        //         } else if (result.status === 'forbidden') {
        //             MySwal.fire({
        //                 html: <i>{result.message}</i>,
        //                 icon: 'error'
        //             }).then((value) => {
        //                 navigate('/login')
        //             })
        //         }
        //         console.log(result)
        //     })
        //     .catch(error => console.log('error', error));

    }, [])

    //เอาไว้อัพเดต focus
    const [scholarBtn, setScholartBtn] = useState(
        "h-[35px] w-auto bg-regal-red text-white rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal4 outline-none"
    );
    const [scopusBtn, setScopustBtn] = useState(
        "h-[35px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal4"
    );

    const [dataTable, setDataTable] = useState(<Scholar />);
    const database = [
        {
            username: "Machine Learning",
        },
        {
            username: "Geostatistics",
        },
        {
            username: "Time Series",
        },
        {
            username: "Computer Graphics",
        },
    ];

    //สิ่งที่จะทำเมื่อกดปุ่ม Scholar
    const clickScholar = () => {
        setScholartBtn(
            "h-[35px] w-auto bg-regal-red text-white border-regal-red border-2 rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal4 "
        );
        setScopustBtn(
            "h-[35px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal4"
        );
        console.log("กดสกอลา");
        setDataTable(<Scholar />);
    };

    //สิ่งที่จะทำเมื่อกดปุ่ม Scopus
    const clickScopus = () => {
        setScholartBtn(
            "h-[35px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal4"
        );
        setScopustBtn(
            "h-[35px] w-auto bg-regal-red text-white border-regal-red border-2 rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal4"
        );
        console.log("กดสกอปัส");
        setDataTable(<Scopus />);
    };
    if (isLoaded) return (<>Loading</>)
    else {

        return (
            <div>
                <div className="h-[30px] w-full bg-regal-red"></div>
                <div className="p-16">
                    <div className="relative p-8 bg-white shadow mt-24">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
                            <div className="relative ">
                                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
                                    <img
                                        className="h-full w-full rounded-full "
                                        src={user.avatar}
                                        alt=""
                                    />
                                </div>
                            </div>

                            <div className="space-x-8 md:mt-0 "></div>
                        </div>

                        <div className="mt-20 m-1 text-center border-b pb-12 ">
                            <h1 className="text-xl font-medium text-gray-700 mt-[150px]">
                                {user.fname} {user.lname}
                            </h1>
                            <p className="font-light text-gray-600 mt-3">
                                ชื่อภาษาอังกฤษ
                            </p>

                            <p className="mt-8 text-gray-700 font-semibold">วุฒิการศึกษา</p>
                            <p className="mt-2 text-gray-500">
                                ปริญญาโท วท.ม. (วิศวกรรมซอฟต์แวร์) จุฬาลงกรณ์มหาวิทยาลัย{" "}
                            </p>
                            <p className="mt-2 text-gray-500">
                                ปริญปริญาตรี วท.บ. (วิทยาการคอมพิวเตอร์) มหาวิทยาลัยขอนแก่น
                            </p>
                            <p className="grid place-content-center mt-[10px]">
                                <div className="flex h-[30px] w-auto">
                                    <HiOutlineMail className="mr-[10px] h-full w-[30px] text-regal-red" />
                                    {user.email}
                                </div>
                            </p>
                        </div>

                        <div className="mt-20 m-1 text-left border-b pb-12">
                            <label className="text-gray-800 text-left font-bold lg:px-16">
                                Interest
                            </label>
                            <ul className="toppics">
                                <li className="toppics_li">{database[0].username}</li>
                                <li className="toppics_li">{database[1].username}</li>
                                <li className="toppics_li">{database[2].username}</li>
                                <li className="toppics_li">{database[3].username}</li>
                            </ul>
                        </div>
                        <div className="flex ">
                            <button onClick={clickScholar} className={scholarBtn} autoFocus="true">
                                Scholar
                            </button>
                            <button onClick={clickScopus} className={scopusBtn}>
                                Scopus
                            </button>
                            </div>

                            {/* <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className='relative  left-[1000px] h-[35px] w-auto bg-regal-red text-white rounded-[12px] px-[20px] text-[18px] mx-[15px] mt-[10px] font-normal4 outline-none' type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            stroke-width="1.5" 
                            stroke="currentColor" 
                            className="w-6 h-6">
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button> */}



                            {/* <!-- Modal toggle --> */}



                            <div className="mt-[13px] flex flex-col justify-center">
                                <table className="w-full text-sm text-left text-gray-800">
                                    <thead className="text-xs text-white uppercase bg-regal-red ">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 rounded-l-lg font-medium">
                                                Product name
                                            </th>
                                            <th scope="col" className=" px-6 py-3 font-medium">
                                                YEAR
                                            </th>
                                            <th scope="col" className=" px-6 py-3 font-medium">
                                                CITED BY
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-medium"></th>
                                            <th scope="col" className="px-3 py-3 rounded-r-lg font-medium"></th>
                                        </tr>
                                    </thead>
                                    <tbody>{dataTable}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            
        );
    }
}

export default Profile_aj