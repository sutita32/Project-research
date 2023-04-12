import React,{ useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import "../style/Interest_Person.css"

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
      <div className="bg-regal-red w-full h-[30px]"></div>
      <div className="grid bg-[#F0F8FF] place-items-center h-[120px] w-full">
        <div className="grid place-content-center h-[30px] w-fit px-[50px] py-[30px] bg-white rounded-[20px] text-regal-red head_text shadow-2xl">
          {dataShow[0].name_coreskill}
        </div>
      </div>
      <div className="bg-[#F0F8FF]">
        <div className="grid place-items-center w-full min-h-[70px]">
          <div className="grid h-auto w-[90%]">
            <div className="text-white font-bold1 min-[921px]:text-[17px] max-[920px]:text-[14px] h-[45px] w-full bg-regal-red rounded-[5px] grid grid-cols-10">
              <div className=" col-span-4 grid place-items-center">รายชื่อ</div>
              <div className="col-span-4 grid place-items-center">อีเมล</div>
              <div className="col-span-2 grid place-items-center"></div>
              {/* <div className="col-span-1  grid place-items-center">
                <div>ลำดับที่</div>
              </div>
              <div className="grid place-items-center col-span-5 ">
                <div>รายชื่อเจ้าของผลงานทั้งหมด</div>
              </div>
              <div className="grid place-items-center col-span-2 ">
                <div>จำนวนผลงาน</div>
              </div>
              <div className="grid place-items-center col-span-2">
                <div></div>
              </div> */}
            </div>
          </div>
          {dataShow.map((item) => (
            <div className="grid h-auto w-[90%] py-[10px] bg-white shadow-sm">
              <div className="font-bold1 min-[921px]:text-[17px] max-[480px]:text-[10px] max-[920px]:text-[17px] h-[40px] w-full  grid grid-cols-10">
                <div className="col-span-4 grid place-items-center overflow-hidden">
                  <div>{item.title_name + item.firstname_professor +" "+ item.lastname_professor}</div>
                </div>
                <div className="col-span-4 grid place-items-center overflow-hidden">
                  <div>{item.Email}</div>
                </div>
                <div className="col-span-2 grid place-items-center">
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
          <div className="w-full h-[30px]"></div>
        </div>
      </div>
    </div>
  );
}

export default Interest_Person;
