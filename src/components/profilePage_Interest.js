import React from "react";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
//ข้อมูล Interest
const InterestInitial = [
  {
    id: "a",
    name: "Machine Learning",
    statusDelBtn: false,
  },
  {
    id: "b",
    name: "5448618165",
    statusDelBtn: false,
  },
];
localStorage.setItem("DelStatus", false);

function ProfilePage_Interest() {
  //ให้ค่า Interest ดิ้นได้
  const [Interest, setInterest] = useState(InterestInitial);
  //ให้ค่า input ดิ้นได้
  const [inputs, setInputs] = useState({});

  //อัพเดตค่าใน Input ตลอดเวลา
  const updateInput = (e) => {
    localStorage.setItem("DelStatus", false);
    setInputs({ id: e.target.value, name: e.target.value });
  };
  //ปุ่ม del true=show false=hide
  function DelBtn({ id }) {
    const clickDel = () => {
      const temp = Interest.filter((item) => item.id !== id);
      setInterest(temp);
    };
    if (JSON.parse(localStorage.getItem("DelStatus"))) {
      return (
        <>
          <button onClick={clickDel}>
            <div class="h-[23px] w-[23px] ml-[8px]">
              <RxCrossCircled class="h-full w-full"></RxCrossCircled>
            </div>
          </button>
        </>
      );
    } else {
      return;
    }
  }

  //สิ่งที่จะทำเมื่อกด Add
  const clickAdd = () => {
    localStorage.setItem("DelStatus", false);
    if (inputs.id || inputs.name) {
      Interest.push({ id: inputs.id, name: inputs.name, statusDelBtn: false });
    }

    setInputs({ id: "", name: "" });
  };

  //สิ่งที่จำทำเมื่อกด ShowDel
  const clickShowDel = (e) => {
    if (JSON.parse(localStorage.getItem("DelStatus"))) {
      localStorage.setItem("DelStatus", false);
    } else {
      localStorage.setItem("DelStatus", true);
    }
    //คำสั่งนี้ทำให้ปุ่มลบโชว์ ทำไมก็ไม่รู้
    setInputs({});
  };
  return (
    <>
      <div class="sticky top-[0px] flex bg-white">
        <button
          onClick={clickShowDel}
          class=" rounded-full hover:text-white hover:bg-regal-red mb-[8px] pt-[2px]"
        >
          <IoMdAddCircleOutline class="h-[25px] w-[25px]" />
        </button>

        <input
          type="search1"
          onChange={updateInput}
          value={inputs.name}
          id={inputs.id}
          class="h-[30px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="เพิ่มไรก็ใส่ไป"
        />
        <button
          type="submit"
          onClick={clickAdd}
          class="h-[30px] text-regal-red hover:text-white bg-white border-[1.5px] dark:border-regal-red hover:bg-blue-800 focus:outline-none  font-[20px] rounded-lg text-sm w-full ml-[5px] sm:w-auto px-4 pb-[3px]  dark:bg-white dark:hover:bg-regal-red "
        >
          Add
        </button>
      </div>

      <div class="h-[1px] w-full">
        {Interest.map((item, index) => (
          <div class="grid place-content-center h-[35px] w-auto rounded-[13px] bg-regal-red text-white px-[15px] mb-[3px]">
            <div class="flex">
              {item.name}
              <DelBtn id={item.id} />
            </div>
          </div>
        ))}
      </div>
      <div class="absolute top-[93px] h-[14px] w-[321px] bg-white"></div>
    </>
  );
}

export default ProfilePage_Interest;
