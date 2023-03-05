import React from "react";
import { useState } from "react";
import { UserData_AJ } from "./Graph_aj";
import "../style/Static.css";

function StaticPersonBottom() {
  const dataShow = UserData_AJ.sort(function (a, b) {
    return b.data_num - a.data_num;
  });
  return (
    <div class="bg-[#F0F8FF] pt-[30px]">
      <div class="grid place-items-center w-full min-h-[70px]">
        <div class="grid h-auto w-[90%]">
          <div class="text-white font-bold1 text-[17px] h-[45px] w-full bg-regal-red rounded-[5px] grid grid-cols-10">
            <div class="col-span-1  grid place-items-center">
              <div>ลำดับที่</div>
            </div>
            <div class="grid place-items-center col-span-5 ">
              <div>รายชื่อเจ้าของผลงานทั้งหมด</div>
            </div>
            <div class="grid place-items-center col-span-2 ">
              <div>จำนวนผลงาน</div>
            </div>
            <div class="grid place-items-center col-span-2">
              <div></div>
            </div>
          </div>
        </div>
        {dataShow.map((item, index) => (
          <div class="grid h-auto w-[90%] my-[10px]">
            <div class="font-bold1 h-[40px] w-full  grid grid-cols-10">
              <div class="col-span-1  grid place-items-center">
                <div>{index + 1}</div>
              </div>
              <div class="grid place-items-center col-span-5 ">
                <div>{item.name}</div>
              </div>
              <div class="grid place-items-center col-span-2">
                <div>{item.data_num}</div>
              </div>
              <div class="grid place-items-center col-span-2">
                <div>ปุ่มกด</div>
              </div>
            </div>
          </div>
        ))}
        <div class="w-full h-[30px]"></div>
      </div>
    </div>
  );
}

export default StaticPersonBottom;
