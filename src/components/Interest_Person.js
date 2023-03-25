import React,{ useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

function Interest_Person(props) {
  const [dataShow ,setdatashow] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": props.getCoreSkillID
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:4000/api/professor/getskilllistbyidskill", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.massage === "professor is Success"){
          setdatashow(result.data)
          setIsLoading(false)
        }
        // return console.log(result);
      })
      .catch(error => console.log('error', error));
  },[]);


  if(isLoading) return (<></>)
  else return (
    <div>
      <div class="bg-regal-red w-full h-[50px]"></div>
      <div class="grid bg-[#F0F8FF] place-items-center h-[120px] w-full">
        <div class="grid place-content-center h-[30px] w-fit px-[10px] bg-regal-red rounded-[10px] text-white ">
          {dataShow[0].name_coreskill}
        </div>
      </div>
      <div class="bg-[#F0F8FF]">
        <div class="grid place-items-center w-full min-h-[70px]">
          <div class="grid h-auto w-[90%]">
            <div class="text-white font-bold1 text-[17px] h-[45px] w-full bg-regal-red rounded-[5px] grid grid-cols-10">
              <div class=" col-span-4 grid place-items-center">รายชื่อ</div>
              <div class="col-span-4 grid place-items-center">อีเมล</div>
              <div class="col-span-2 grid place-items-center"></div>
              {/* <div class="col-span-1  grid place-items-center">
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
              </div> */}
            </div>
          </div>
          {dataShow.map((item) => (
            <div class="grid h-auto w-[90%] py-[10px] bg-white shadow-sm">
              <div class="font-bold1 h-[40px] w-full  grid grid-cols-10">
                <div class="col-span-4 grid place-items-center">
                  <div>{item.title_name + item.firstname_professor +" "+ item.lastname_professor}</div>
                </div>
                <div class="col-span-4 grid place-items-center">
                  <div>{item.Email}</div>
                </div>
                <div class="col-span-2 grid place-items-center">
                  <NavLink
                    to={`/id=${item.ID_professor}`}
                    onClick={() => props.sendTeacherIndex(item.ID_professor)}
                  >
                    <div>กดเพื่อดูโปรไฟล์</div>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
          <div class="w-full h-[30px]"></div>
        </div>
      </div>
    </div>
  );
}

export default Interest_Person;
