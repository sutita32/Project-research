/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/scope */
/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "../style/profilePage.css";
import { BiEdit } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { workData } from "./workData";
import { useState } from "react";
import ProfilePageInterest from "./profilePage_Interest";
import { HiOutlineMail } from "react-icons/hi";
import Scholar from "./scholar_Edit";
import Scopus from "./scopus _Edit";
import { FiEdit2 } from "react-icons/fi";
import { Button, Modal, Upload, Space, Tag, Select, DatePicker  } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MdClose } from "react-icons/md";
import { techData } from "./TeacherData_set";
import {IoMdAdd} from 'react-icons/io'
import {BiEditAlt} from "react-icons/bi"
import {RiDeleteBin6Line} from "react-icons/ri"

const log = (e) => {
  console.log(e);
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ProfilePage_Edit() {
  const [dataShow, setDataShow] = useState(techData);
  const [imgsrc, setimgsrc] = useState(techData[0].imgSrc);
  const [fnamet, setfnamet] = useState(techData[0].fnamet);
  const [lnamet, setlnamet] = useState(techData[0].lnamet);
  const [fnamee, setfnamee] = useState(techData[0].fnamee);
  const [lnamee, setlnamee] = useState(techData[0].lnamee);
  const [study, setstudy] = useState(techData[0].study);
  const [inputstudy, setinputstudy] = useState("");
  const [email, setemail] = useState(techData[0].email);
  const [interest, setinterest] = useState(techData[0].interest);
  const [inputinterest, setinputinterest] = useState("");
  // const [previewOpen, setPreviewOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState({
    uid: "-1",
    name: "image.png",
    status: "done",
    url: imgsrc,
  });
  // const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: imgsrc,
    },
  ]);
  const [canedit, setcanedit] = useState(true);

  // const handleCancelPic = () => setPreviewOpen(false);
  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  //   setPreviewTitle(
  //     file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //   );
  // };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setfnamet(fnamet);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setfnamet(techData[0].fnamet);
    setlnamet(techData[0].lnamet);

    setfnamee(techData[0].fnamee);

    setlnamee(techData[0].lnamee);
    setemail(techData[0].email);

    setIsModalOpen(false);
  };
  const submitModal = (e) => {
    e.preventDefault();
    console.log("submit");

    const form = e.target;
    const formData = new FormData(form);
    fetch("/some-api", { method: form.method, body: formData });
    const formJson = Object.fromEntries(formData.entries());
    if (canedit) {
      setfnamet(formJson.firstnamethai);
      setlnamet(formJson.lastnamethai);
      setfnamee(formJson.firstnameeng);
      setlnamee(formJson.firstnameeng);
      if (formJson.study) {
        var temp = study;
        temp.push(formJson.study);
        setstudy(temp);
        setinputstudy("");
      }
      setemail(formJson.email);
      if (formJson.interest) {
        var temp = interest;
        temp.push(formJson.interest);
        setinterest(temp);
        setinputinterest("");
      }
    }
    setcanedit(true);
  };

  const cancleModal = (e) => {
    e.preventDefault();
    console.log("cancle");
  };

  const inputstudychange = (e) => {
    setinputstudy(e.target.value);
  };

  const inputinterestchange = (e) => {
    setinputinterest(e.target.value);
  };
  const inputfnametchange = (e) => {
    setfnamet(e.target.value);
  };
  const inputlnametchange = (e) => {
    setlnamet(e.target.value);
  };
  const inputfnameechange = (e) => {
    setfnamee(e.target.value);
  };
  const inputlnameechange = (e) => {
    setlnamee(e.target.value);
  };
  const inputemailchange = (e) => {
    setemail(e.target.value);
  };

//ส่วน modal ของปุ่ม Add 
//-------------------------------------------------
const [isModal2Open, setIsModal2Open] = useState(false);
  const [dataAddding, setDataAdding] = useState({});
  const [topicAdd, setTopicAdd] = useState("");
  const [userNameAdd, setUserNameAdd] = useState("");
  const [dateAdd, setDateAdd] = useState("");
  const [conferenceAdd, setConferenceAdd] = useState("");
  const [publisherAdd, setPublisherAdd] = useState("");
  const [descriptionAdd, setDescriptionAdd] = useState("");
  const [linkAdd, setLinkAdd] = useState("");

  const submitAdd = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    fetch("/some-api", { method: form.method, body: formData });
    var formJson = Object.fromEntries(formData.entries());
    formJson.date = dateAdd;
    formJson.publisher = publisherAdd;
    console.log(formJson);
    setShowAdd(
      <div class="bg-white grid grid-cols-10">
        <div
          scope="row"
          class="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap col-span-7"
        >
          <a href="#">{formJson.topic}</a>
          <p className="text-gray-400 font-normal">{formJson.userName}</p>
          <p className="text-gray-400 font-normal">{formJson.conference}</p>
        </div>
        <div class="grid place-content-center px-6 py-4">
          {formJson.date.slice(0, 4)}
        </div>
        <div class="grid place-content-center px-6 py-4">55</div>
        <div class="grid place-content-center px-6 py-4">
          <div className="flex">
            <button className="h-[25px] w-[25px] mx-[14px] hover:text-gray-500">
              <BiEditAlt className="h-full w-full" />
            </button>
            <button className="h-[25px] w-[25px] mx-[14px] hover:text-gray-500">
              <RiDeleteBin6Line className="h-full w-full" />
            </button>
          </div>
        </div>
      </div>
    );
    setTopicAdd("");
    setUserNameAdd("");
    setDateAdd("");
    setConferenceAdd("");
    setPublisherAdd("");
    setDescriptionAdd("");
    setLinkAdd("");
  };

  const topicAddChange = (e) => {
    setTopicAdd(e.target.value);
  };
  const userNameAddChange = (e) => {
    setUserNameAdd(e.target.value);
  };
  const onChangeDateAdd = (date, dateString) => {
    setDateAdd(dateString);
  };
  const conferenceAddChange = (e) => {
    setConferenceAdd(e.target.value);
  };
  const publisherChange = (value) => {
    setPublisherAdd(value);
  };
  const descriptionAddChange = (e) => {
    setDescriptionAdd(e.target.value);
  };
  const linkAddChange = (e) => {
    setLinkAdd(e.target.value);
  };

  const [showAdd, setShowAdd] = useState(<div></div>);
//-------------------

  //เอาไว้อัพเดต focus
  const [scholarBtn, setScholartBtn] = useState(
    "h-[35px] w-auto bg-regal-red text-white rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4 outline-none"
  );
  const [scopusBtn, setScopustBtn] = useState(
    "h-[35px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4"
  );

  //สิ่งที่จะทำเมื่อกดปุ่ม Scholar
  const clickScholar = () => {
    setScholartBtn(
      "h-[35px] w-auto bg-regal-red text-white border-regal-red border-2 rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4 "
    );
    setScopustBtn(
      "h-[35px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4"
    );
    setDataTable(<Scholar />);
    setTimeout(() => {
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }, 100);
  };

  //สิ่งที่จะทำเมื่อกดปุ่ม Scopus
  const clickScopus = () => {
    setScholartBtn(
      "h-[35px] w-auto bg-white text-regal-red border-regal-red border-2 hover:bg-regal-red hover:text-white rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4"
    );
    setScopustBtn(
      "h-[35px] w-auto bg-regal-red text-white border-regal-red border-2 rounded-[12px] px-[20px] text-[16px] mx-[15px] mt-[10px] font-normal4"
    );
    setDataTable(<Scopus />);
    setTimeout(() => {
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }, 100);
  };

  const [dataTable, setDataTable] = useState(<Scholar />);
  //แบ่งชื่อ-นามสกุล
  const word = workData[0].userName.split(" ");

  return (
    <div className="relative">
      <div class="z-[-1] absolute grid grid-rows-6 h-full w-full">
        <div class="row-span-2 w-full">
          <div id="back-bg-top" class="h-full w-full"></div>
        </div>
        <div class="row-span-4 w-full ">
          <div class="bg-regal-red w-full min-h-full bg-opacity-90"></div>
        </div>
      </div>
      <div class=" grid place-items-center w-full min-h-[500px] top-[130px] pb-[50px] pt-[220px]">
        <div class="rounded-[20px] w-10/12 h-fit bg-[#EFEFEF] p-[17px] overflow-hidden">
          <div class="gap-[8px] w-full h-full bg-white rounded-[8px] ">
            <div className="grid place-items-end w-full h-[120px]">
              <button
                onClick={showModal}
                className="z-[20] px-[18px] py-[8px] rounded-[12px] font-bold1 bg-regal-red mr-[40px] mb-[50px] text-white hover:bg-white hover:text-regal-red border-2 border-regal-red hover:border-2 hover:border-regal-red"
              >
                <div className="flex">
                  แก้ไขข้อมูล
                  <div className="ml-[8px] h-[20px] w-[20px]">
                    <FiEdit2 className="h-full w-full" />
                  </div>
                </div>
              </button>
              <Modal footer={null} open={isModalOpen} width={560} onCancel={handleCancel}>
                <form onSubmit={submitModal}>
                  <p>แก้ไขข้อมูล</p>
                  <div class="grid  place-items-center w-full h-fit">
                    <div>
                      <Upload
                        action="http://localhost:3000/"
                        listType="picture-card"
                        fileList={fileList}
                        accept=".png,.jpg.,jpeg"
                        beforeUpload={(file) => {
                          console.log({ file });
                          setUploadImage({ file });
                          return false;
                        }}
                        // onPreview={handlePreview}
                        // onChange={handleChange}
                        onChange={handleChange}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      {/* <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancelPic}
                      >
                        <img
                          alt="example"
                          style={{
                            width: "100%",
                          }}
                          src={previewImage}
                        />
                      </Modal> */}
                    </div>
                  </div>
                  <p>ชื่อ-สกุลภาษาไทย</p>
                  <div className="grid grid-cols-2">
                    <input
                      class="w-[230px] mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="firstnamethai"
                      type="text"
                      placeholder="ชื่อจริงภาษาไทย"
                      onChange={inputfnametchange}
                      value={fnamet}
                    />
                    <input
                      class="w-[240px] mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="lastnamethai"
                      type="text"
                      placeholder="นามสกุลภาษาไทย"
                      onChange={inputlnametchange}
                      value={lnamet}
                    />
                  </div>

                  <p>ชื่อ-สกุลภาษาอังกฤษ</p>

                  <div className="grid grid-cols-2">
                    <input
                      class="w-[230px] mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="firstnameeng"
                      type="text"
                      placeholder="ชื่อจริงภาษาอังกฤษ"
                      onChange={inputfnameechange}
                      value={fnamee}
                    />
                    <input
                      class="w-[240px] mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="lastnameeng"
                      type="text"
                      placeholder="นามสกุลภาษาอังกฤษ"
                      onChange={inputlnameechange}
                      value={lnamee}
                    />
                  </div>
                  <p>วุฒิการศึกษา</p>
                  <Space size={[0, 8]} wrap>
                    {study.map((item) => (
                      <Tag
                        closable
                        onClose={log}
                        className="flex w-fit h-fit px-[8px] py-[5px] text-[14px]"
                        closeIcon={
                          <div className="w-[16px] h-full">
                            <MdClose class="h-full w-full" />
                          </div>
                        }
                      >
                        {item}
                      </Tag>
                    ))}
                  </Space>
                  <p></p>

                  <input
                    class=" mt-[8px] w-[260px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="study"
                    type="text"
                    placeholder="พิมพ์สิ่งต้องการจะเพิ่ม.."
                    value={inputstudy}
                    onChange={inputstudychange}
                  />
                  <button
                    type="submit"
                    className="ml-[15px] w-fit h-fit px-[15px] py-[8px] rounded-[10px] bg-regal-red text-white"
                  >
                    เพิ่ม
                  </button>
                  <p>Email</p>
                  <input
                    class="w-[340px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    type="text"
                    placeholder="Email address"
                    onChange={inputemailchange}
                    value={email}
                  />
                  <p>Interest</p>
                  <Space size={[0, 8]} wrap>
                    {interest.map((item) => (
                      <Tag
                        closable
                        onClose={log}
                        className="flex w-fit h-fit px-[8px] py-[5px] text-[14px]"
                        closeIcon={
                          <div className="w-[16px] h-full">
                            <MdClose class="h-full w-full" />
                          </div>
                        }
                      >
                        {item}
                      </Tag>
                    ))}
                  </Space>
                  <p></p>
                  <input
                    class=" mt-[8px] w-[260px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="interest"
                    type="text"
                    placeholder="พิมพ์สิ่งต้องการจะเพิ่ม.."
                    onChange={inputinterestchange}
                    value={inputinterest}
                  />
                  <button
                    type="submit"
                    className="ml-[15px] w-fit h-fit px-[15px] py-[8px] rounded-[10px] bg-regal-red text-white"
                  >
                    เพิ่ม
                  </button>
                  <div className="grid place-items-end w-full h-fit">
                    <div className="flex">
                      <div
                        onClick={handleCancel}
                        className="cursor-pointer h-fit w-fit bg-white border-[1px] border-regal-red text-regal-red rounded-[10px] hover:bg-gray-300 mx-[6px] px-[16px] py-[8px]"
                      >
                        ยกเลิก
                      </div>
                      <button
                        type="submit"
                        onClick={handleOk}
                        className="h-fit w-fit border-[1px] border-regal-red bg-regal-red text-white hover:bg-regal-red-hover rounded-[10px] mx-[6px] px-[16px] py-[8px]"
                      >
                        บันทึก
                      </button>
                    </div>
                  </div>
                </form>
              </Modal>
            </div>
            <div className="flex justify-center w-full h-[300px] ">
              <div className=" text-center font-bold1">
                <div className="absolute h-[100px] w-[160px] overflow-hidden left-[679px] top-[237px]">
                  <div className=" h-[160px] w-[160px] rounded-full bg-[#EFEFEF] translate-y-[-60%] "></div>
                </div>
                <div className="text-[19px] py-[3px]">
                  {fnamet}
                  {"  "}
                  {lnamet}
                </div>
                <div className="py-[3px]">
                  {fnamee}
                  {"  "}
                  {lnamee}
                </div>
                <div className=" font-bold mt-[30px] py-[3px]">
                  วุฒิการศึกษา
                </div>
                {study.map((item) => (
                  <div className="py-[3px]">{item}</div>
                ))}
                <div className="flex h-[30px] w-auto mt-[30px] py-[3px]">
                  <HiOutlineMail className="mr-[10px] h-full w-[30px] text-regal-red" />
                  {email}
                </div>
              </div>
            </div>
            <div className="grid place-items-center w-full h-[10px]">
              <div className="h-[1px] w-[95%] border-t-[1px] border-gray-300"></div>
            </div>
            <div className="flex justify-center w-full h-fit">
              <div className="w-full h-fit">
                <div className="font-bold1 font-bold py-[8px] h-fit w-fit ml-[100px] mt-[40px]">
                  Interests
                </div>
              </div>
            </div>
            <div className="flex w-full h-[100px]">
              <div className="w-[160px] h-[30px] "></div>
              {interest.map((item) => (
                <div className="font-bold1 text-white py-[8px] px-[15px] bg-regal-red rounded-[10px] w-fit h-fit mt-[16px] ml-[18px]">
                  {item}
                </div>
              ))}
            </div>
            <div className="grid place-items-center w-full h-[10px]">
              <div className="h-[1px] w-[95%] border-t-[1px] border-gray-300"></div>
            </div>
            <div className="relative flex mt-[20px] ml-[30px]">
              <button onClick={clickScholar} className={scholarBtn}>
                Scholar
              </button>
              <button onClick={clickScopus} className={scopusBtn}>
                Scopus
              </button>
              {/* ปุ่ม Add------------------------------------------------------------------------ */}
              <button
                onClick={() => setIsModal2Open(true)}
                className="absolute right-[50px] top-[10px] bg-regal-red text-white rounded-[12px] hover:bg-white hover:text-regal-red border-[2px] border-regal-red px-[16px] py-[3px]"
              >
                <div className="h-[25px] w-[25px]">
                  <IoMdAdd className="h-full w-full"></IoMdAdd>
                </div>
              </button>
              <Modal
                open={isModal2Open}
                onCancel={() => setIsModal2Open(false)}
                width={600}
                footer={null}
              >
                <form onSubmit={submitAdd}>
                  <div>เพิ่มข้อมูล</div>
                  <p>หัวข้อ</p>
                  <input
                    class="w-full mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="topic"
                    type="text"
                    placeholder="เพิ่มชื่อหัวข้อ.."
                    onChange={topicAddChange}
                    value={topicAdd}
                  />

                  <p>ผู้วิจัย</p>
                  <input
                    class="w-full mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="userName"
                    type="text"
                    placeholder="เพิ่มชื่อผู้วิจัย.."
                    onChange={userNameAddChange}
                    value={userNameAdd}
                  />
                  <p>วันที่</p>
                  <DatePicker onChange={onChangeDateAdd} />
                  <p>การประชุม</p>
                  <input
                    class="w-full mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="conference"
                    type="text"
                    placeholder="เพิ่มการประชุม.."
                    onChange={conferenceAddChange}
                    value={conferenceAdd}
                  />
                  <p>แหล่งที่มา</p>
                  <Select
                    onChange={publisherChange}
                    value={publisherAdd}
                    style={{
                      width: 120,
                    }}
                    options={[
                      {
                        value: "IEEE",
                        label: "IEEE",
                      },
                      {
                        value: "Scopus",
                        label: "Scopus",
                      },
                    ]}
                  ></Select>
                  <p>รายละเอียด</p>
                  <textarea
                    class="w-full mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="description"
                    type="text"
                    rows="4"
                    placeholder="เพิ่มรายละเอียด.."
                    onChange={descriptionAddChange}
                    value={descriptionAdd}
                  />
                  <p>ลิงก์</p>
                  <input
                    class="w-full mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="link"
                    type="text"
                    placeholder="www.xxxxxxxxxxxxxx.com"
                    onChange={linkAddChange}
                    value={linkAdd}
                  />
                  <div className="grid place-items-end">
                    <button
                      type="submit"
                      onClick={() => setIsModal2Open(false)}
                      className="h-fit w-fit border-[1px] border-regal-red bg-regal-red text-white hover:bg-regal-red-hover rounded-[10px] mt-[10px] mb-[6px] px-[16px] py-[8px]"
                    >
                      บันทึก
                    </button>
                  </div>
                </form>
              </Modal>
                          {/* ------------------------------------------------------------------------------------------ */}
            </div>
            <div className="mt-[13px] flex flex-col justify-center mx-[20px]">
              <thead className="grid grid-cols-10 text-xs text-white uppercase bg-regal-red w-full rounded-[10px]">
                <div
                  scope="col"
                  className="px-6 py-3 rounded-l-lg font-medium col-span-7"
                >
                  Product name
                </div>
                <div
                  scope="col"
                  className="grid place-content-center px-6 py-3 font-medium"
                >
                  YEAR
                </div>
                <div
                  scope="col"
                  className="grid place-content-center px-6 py-3 font-medium"
                >
                  CITED BY
                </div>
                <div
                  scope="col"
                  className="grid place-content-center px-6 py-3 font-medium"
                ></div>
              </thead>
              <tbody>{dataTable}{showAdd}</tbody>
            </div>
          </div>
        </div>
      </div>
      <div class="z-[10] grid place-items-center absolute top-[148px] w-full h-[140px]">
        <img
          alt=""
          src={imgsrc}
          class="h-[140px] w-[140px] rounded-full object-cover"
        ></img>
      </div>
    </div>
  );
}

export default ProfilePage_Edit;
