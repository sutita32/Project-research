/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../style/profilePage.css";
import { BiEdit } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { workData } from "./workData";
import { RxCrossCircled } from "react-icons/rx";
import { useState } from "react";
import ProfilePage_Interest from "./profilePage_Interest";

function ProfilePage() {
  const [ShowInterestBlock] = useState(<ProfilePage_Interest />);
  

  //แบ่งชื่อ-นามสกุล
  const word = workData[0].userName.split(" ");

  return (
    <>
      <div class="grid grid-rows-6 min-h-[700px] w-full">
        <div class="row-span-2 w-full">
          <div id="back-bg-top" class="h-full w-full"></div>
        </div>
        <div class="row-span-4 w-full ">
          <div class="bg-regal-red w-full h-full bg-opacity-90"></div>
        </div>
      </div>
      <div class="grid place-items-center absolute w-full h-[500px] top-[300px] mb-[50px]">
        <div class="grid grid-rows-6 rounded-[20px] w-10/12 h-full bg-[#EFEFEF] p-[11px]">
          <div class="w-full h-full row-span-1"></div>
          <div class="grid grid-cols-10 gap-[8px] w-full h-[410px] row-span-5">
            <div class="grid grid-rows-10 col-span-3 gap-[8px] h-[410px] w-full">
              <div class="box-in-profile row-span-6 py-[14px] px-[15px] overflow-y-scroll h-full w-full">
                {ShowInterestBlock}
              </div>
              <div class="grid grid-rows-2 place-items-center box-in-profile row-span-4 w-full h-full">
                <div class="relative top-[17px]">
                  <button class="grid place-items-center grid-rows-1 w-[200px] h-[40px] hover:bg-regal-red hover:text-white rounded-more">
                    <div class="flex">
                      <div class="grid place-items-center h-[23px] w-[23px]">
                        <FaUserEdit class="h-full w-full mr-[5px]" />
                      </div>
                      <div class="grid place-content-center"> แก้ไขโปรไฟล์</div>
                    </div>
                  </button>
                </div>
                <div class="relative bottom-[17px]">
                  <button class="grid place-items-center grid-rows-1 w-[200px] h-[40px] hover:bg-regal-red hover:text-white rounded-more">
                    <div class="flex">
                      <div class="grid place-items-center h-[25px] w-[25px]">
                        <BiEdit class="h-full w-full mr-[5px]" />
                      </div>
                      <div class="grid place-content-center">แก้ไขรหัสผ่าน</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div class="box-in-profile col-span-7 p-[15px]">
              <div class="flex">
                <svg
                  class="h-5"
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
              <div class=" h-full w-full grid grid-cols-10 ">
                <div class="grid grid-cols-10 col-span-1 place-items-center">
                  <div class=" line-right col-span-4 w-full h-[300px] mb-[20px]"></div>
                </div>
                <div class="grid grid-cols-10 col-span-9 mt-[30px]">
                  <div class="grid grid-rows-5 col-span-2">
                    <div class="">Username</div>
                    <div>ชื่อจริง</div>
                    <div>นามสกุล</div>
                    <div>Email</div>
                    <div>เบอร์โทรศัพท์</div>
                  </div>
                  <div class="grid grid-rows-5 col-span-8 ">
                    <span class="inline-block align-middle ">
                      : &emsp;&emsp;&emsp;{word[0]}&emsp;{word[1]}
                    </span>
                    <div>: </div>
                    <div>: </div>
                    <div>: </div>
                    <div>: </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid place-items-center absolute top-[228px] border-blue-700 w-full h-[140px]">
        <img
          src="https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.6435-9/167084877_3611020235663621_2658686305999705607_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeE9xNBp92oD8Rz3CeAFljiBnJ4aVVDnRQ6cnhpVUOdFDnCTQAt13QeMfFvW20lOrTfdkQGLuL6guH3CN9Kp4kHB&_nc_ohc=Dp0n9pWkKUAAX8i1Vmx&_nc_ht=scontent.fbkk10-1.fna&oh=00_AfCOiEO4hw7988SRJsyf_wtv912O74OZ2wXt2Mn8--ewYA&oe=641EA01B"
          class="h-[140px] rounded-full"
        ></img>
      </div>
    </>
  );
}

export default ProfilePage;
