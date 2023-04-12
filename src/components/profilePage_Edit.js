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
import Scopus from "./scopus_Edit";
import { FiEdit2 } from "react-icons/fi";
import { Button, Modal, Upload, Space, Tag, Select, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MdClose } from "react-icons/md";
import { techData } from "./TeacherData_set";
import { IoMdAdd } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Bar } from "react-chartjs-2";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment";
import { Spin } from "antd";
import Graph123 from "./Graph_profile";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ProfilePage_Edit(props) {
  const MySwal = withReactContent(Swal);
  // console.log("ssssssssssssssssssssssssssssssssss", props.getID);
  const navigate = useNavigate();

  // console.log( " auth=>",auth)
  const [user, setUser] = useState();
  const [dataShow, setDataShow] = useState(techData);
  const [imgsrc, setimgsrc] = useState("");
  const [fnamet, setfnamet] = useState("");
  const [titlenamet, settitlenamet] = useState("");
  const [lnamet, setlnamet] = useState("");

  const [fnamee, setfnamee] = useState("");
  const [lnamee, setlnamee] = useState("");
  const [study, setstudy] = useState([]);
  const [inputstudy, setinputstudy] = useState("");
  const [email, setemail] = useState("");
  const [interest, setinterest] = useState([]);
  const [inputinterest, setinputinterest] = useState("");
  const [delstudy, setdelstudy] = useState([]);
  const [delinter, setdelinter] = useState([]);

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
      name: imgsrc,
      status: "done",
      url: imgsrc,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [datapro, setdatapro] = useState([]);
  const [dataresearch, setdataresearch] = useState([]);
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  useEffect(() => {
    let auth;
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.clear();
      navigate("/login");
    }
    if(props.getID){
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " +token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "id": props.getID
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("http://localhost:4000/api/professor/get-databyadmin", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.data.length > 0) {
            localStorage.setItem("user1",JSON.stringify(result.data[0]))
            setUser(result.data[0]);
            setimgsrc(result.data[0].img);
            settitlenamet(result.data[0].title_name);
            setfnamet(result.data[0].firstname_professor);
            setlnamet(result.data[0].lastname_professor);
            const wordname = result.data[0].Keyword.split(" ");
            setfnamee(wordname[0]);
            setlnamee(wordname[1]);
            setemail(result.data[0].Email);
          }
          // return console.log(result);
        })
        .catch((error) => console.log("error", error));


      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "id": props.getID,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4000/api/search/getresearchbypro", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.data) {
            setdataresearch(result.data);
            
            setDataTable(
              <Scholar
                getdata={result.data.sort((a, b) => new Date(b.Publication_date).getFullYear() - new Date(a.Publication_date).getFullYear() )}
                openModal2={(item) => openModal2(item)}
                sendResearchIndex={(item)=> props.sendResearchIndex(item)}
              />
            );
            setIsLoading(false);
          }
          // return console.log(result);
        })
        .catch((error) => console.log("error", error));

      raw = JSON.stringify({
        "id": props.getID,
      });

      requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4000/api/professor/getskillbyidpro", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.data) {
            setinterest(result.data);
            setIsLoading(false);
          }
          // return console.log(result);
        })
        .catch((error) => console.log("error", error));

      fetch(
        "http://localhost:4000/api/professor/get-qulificationbyidpro",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.data) {
            setstudy(result.data);
            setIsLoading(false);
          }
          // return console.log("qulification=>", result);
        })
        .catch((error) => console.log("error", error));

    }else{
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch("http://localhost:4000/api/professor/get-data", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          if (result === "Invalid Token") {
            localStorage.clear();
            navigate("/login");
          }
          // return console.log(result);
        })
        .catch((error) => console.log("error", error));

      let auth;
      if (localStorage.getItem("user")) {
        auth = JSON.parse(localStorage.getItem("user"));
        setUser(auth);
        setimgsrc(auth.img);
        settitlenamet(auth.title_name);
        setfnamet(auth.firstname_professor);
        setlnamet(auth.lastname_professor);
        const wordname = auth.Keyword.split(" ");
        setfnamee(wordname[0]);
        setlnamee(wordname[1]);
        setemail(auth.Email);
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        id: auth.ID_professor,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4000/api/search/getresearchbypro", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.data) {
            setdataresearch(result.data);
            setIsLoading(false);
            setDataTable(
              <Scholar
                getdata={result.data.sort((a, b) => new Date(b.Publication_date).getFullYear() - new Date(a.Publication_date).getFullYear() )}
                openModal2={(item) => openModal2(item)}
                sendResearchIndex={(item)=> props.sendResearchIndex(item)}
              />
            );
          }
          // return console.log(result);
        })
        .catch((error) => console.log("error", error));

      raw = JSON.stringify({
        id: auth.ID_professor,
      });

      requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4000/api/professor/getskillbyidpro", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.data) {
            setinterest(result.data);
            setIsLoading(false);
          }
          // return console.log(result);
        })
        .catch((error) => console.log("error", error));

      fetch(
        "http://localhost:4000/api/professor/get-qulificationbyidpro",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.data) {
            setstudy(result.data);
            setIsLoading(false);
          }
          // return console.log("qulification=>", result);
        })
        .catch((error) => console.log("error", error));
    }
  }, []);
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

  const logstudy = (id) => {
    let token = localStorage.getItem("token");
    console.log(id);
    if (id) {
      var temp = study;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        qualification_id: id,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://localhost:4000/api/professor/del-studtbyidpro",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          if (result === "delete Success") {
            var t = [];
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].ID_qualification !== id) {
                t.push(temp[i]);
              }
            }
            setstudy(t);
          }

          // return console.log(result);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const loginter = (id) => {
    let token = localStorage.getItem("token");
    console.log(id);
    if (id) {
      var temp = interest;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        coreskill_id: id,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://localhost:4000/api/professor/del-skillbyidpro",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          if (result === "delete Success") {
            var t = [];
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].ID_coreskill !== id) {
                t.push(temp[i]);
              }
            }
            setinterest(t);
          }
          // return console.log(result);
        })
        .catch((error) => console.log("error", error));
    }
  };
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
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    var raw;
    if(props.getID){
      raw = JSON.stringify({
        title: titlenamet,
        firstname: fnamet,
        lastname: lnamet,
        email: email,
        keyword: fnamee + " " + lnamee,
        IDpro : props.getID
      });
    }else{
      raw = JSON.stringify({
        title: titlenamet,
        firstname: fnamet,
        lastname: lnamet,
        email: email,
        keyword: fnamee + " " + lnamee,
      });
    }
    

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://localhost:4000/api/professor/update-professor",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.massage === "UPDATE professor is Success") {
          settitlenamet(titlenamet);
          setfnamet(fnamet);
          setlnamet(lnamet);
          setfnamee(fnamee);
          setlnamee(lnamee);
          setemail(email);
        }
        // return console.log(result);
      })
      .catch((error) => console.log("error", error));

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    if(props.getID){
      let auth = JSON.parse(localStorage.getItem("user1"));
      setUser(auth);
      setimgsrc(auth.img);
      settitlenamet(auth.title_name);
      setfnamet(auth.firstname_professor);
      setlnamet(auth.lastname_professor);
      const wordname = auth.Keyword.split(" ");
      setfnamee(wordname[0]);
      setlnamee(wordname[1]);
      setemail(auth.Email);
    }else{
      let auth = JSON.parse(localStorage.getItem("user"));
      setUser(auth);
      setimgsrc(auth.img);
      settitlenamet(auth.title_name);
      setfnamet(auth.firstname_professor);
      setlnamet(auth.lastname_professor);
      const wordname = auth.Keyword.split(" ");
      setfnamee(wordname[0]);
      setlnamee(wordname[1]);
      setemail(auth.Email);
    }
    

    setIsModalOpen(false);
  };

  const submitModal = (e) => {
    e.preventDefault();
    console.log("submit");

    const form = e.target;
    const formData = new FormData(form);
    let token = localStorage.getItem("token");

    const formJson = Object.fromEntries(formData.entries());
    console.log("formJson =>", formJson);
    if (canedit) {
      setfnamet(formJson.firstnamethai);
      setlnamet(formJson.lastnamethai);
      setfnamee(formJson.firstnameeng);
      setlnamee(formJson.firstnameeng);
      if(formJson.oldpassword && formJson.newpassword){
        console.log("oldpassword=> ", formJson.oldpassword, "&newpassword=> ",formJson.newpassword);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
        myHeaders.append("Content-Type", "application/json");
        var raw;
        if(props.getID){
          raw = JSON.stringify({
            "oldpassword": formJson.oldpassword,
            "newpassword": formJson.newpassword,
            "Idpro":props.getID
          });
        }else{
          raw = JSON.stringify({
            "oldpassword": formJson.oldpassword,
            "newpassword": formJson.newpassword
          });
        }

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:4000/api/auth/change-password", requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.msg == 'Your password reset Success!!'){
              MySwal.fire({
                html:<i>{result.msg}</i>,
                icon: 'success',
              }).then((value) => {
                setoldpassword("");
                setnewpassword("");
              })
            }else{
              MySwal.fire({
                html:<i>{result.msg}</i>,
                icon: 'error'
            })
            }
            // return console.log(result);
          })
          .catch(error => console.log('error', error));
        
      }
      if (formJson.study) {
        var temp = study;
        console.log("temp=> ", temp);
        setinputstudy("");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var raw;
        if(props.getID){
          raw = JSON.stringify({
            qualification: formJson.study,
            Idpro :props.getID
          });
        }else{
          raw = JSON.stringify({
            qualification: formJson.study,
          });
        }

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "http://localhost:4000/api/professor/insert-qulificationbyidpro",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.data) {
              temp.push({
                ID_qualification: result.data.insertId ? result.data.insertId : result.data.ID_qualification,
                name_qualification: formJson.study,
              });
              setstudy(temp);
            }
            // return console.log(result);
          })
          .catch((error) => console.log("error", error));
      }
      setemail(formJson.email);
      if (formJson.interest) {
        var temp = interest;
        // console.log("temp interest=> ", temp);
        setinputinterest("");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var raw;
        if(props.getID){
          raw = JSON.stringify({
            skill: formJson.interest,
            Idpro :props.getID
          });
        }else{
          raw = JSON.stringify({
            skill: formJson.interest,
          });
        }

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "http://localhost:4000/api/professor/insert-skillbypro",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.data) {
              temp.push({
                ID_coreskill: result.data.insertId ? result.data.insertId : result.data.ID_coreskill ,
                name_coreskill: formJson.interest,
              });
              setinterest(temp);
            }
            // return console.log(result);
          })
          .catch((error) => console.log("error", error));
      }
    }
    setcanedit(true);
  };

  // const cancleModal = (e) => {
  //   e.preventDefault();
  //   console.log("cancle");
  // };

  const inputoldpasschange = (e) => {
    setoldpassword(e.target.value);
  };
  const inputnewpasschange = (e) => {
    setnewpassword(e.target.value);
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
  const inputtitlenametchange = (e) => {
    settitlenamet(e.target.value);
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
  const [PublicherAdd, setPublicherAdd] = useState("");
  const [publisherAdd, setPublisherAdd] = useState("");
  const [descriptionAdd, setDescriptionAdd] = useState("");
  const [linkAdd, setLinkAdd] = useState("");
  const [focustype , setfocustype] = useState("scholar");
  const [focussorty , setfocussorty] = useState(true);
  const [focussortc , setfocussortc] = useState(false);


  const submitAdd = (e) => {
    e.preventDefault();

    console.log(
      "outputdata=> " +
        JSON.stringify({
          name_re: topicAdd,
          authors: userNameAdd,
          Pu_date: dateAdd,
          conference: conferenceAdd,
          Publisher: PublicherAdd,
          ID_Type: publisherAdd,
          Description: descriptionAdd,
          link: linkAdd,
        })
    );
    let token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    var raw;
    if(localStorage.getItem("Role") == 'Admin'){
        raw = JSON.stringify({
        name_re: topicAdd,
        authors: userNameAdd,
        Pu_date: dateAdd,
        conference: conferenceAdd,
        Publisher: PublicherAdd,
        ID_Type: publisherAdd,
        Description: descriptionAdd,
        link: linkAdd,
        Idpro: props.getID
      });
    }else{
      raw = JSON.stringify({
      name_re: topicAdd,
      authors: userNameAdd,
      Pu_date: dateAdd,
      conference: conferenceAdd,
      Publisher: PublicherAdd,
      ID_Type: publisherAdd,
      Description: descriptionAdd,
      link: linkAdd,
    });
    }
    
    

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://localhost:4000/api/research/insert-researchbypro",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.msg === "Insert data Research Success!!") {
          let temp = dataresearch;
          temp.push({
            ID_research: result.data.insertId,
            name_research: topicAdd,
            authors: userNameAdd,
            Publication_date: dateAdd,
            conference: conferenceAdd,
            Publisher: PublicherAdd,
            ID_Type: parseInt(publisherAdd),
            Description: descriptionAdd,
            Link: linkAdd,
          });
          MySwal.fire({
            html:<i>{result.msg}</i>,
            icon: 'success',
          })
        }else{
          MySwal.fire({
            html:<i>{result.msg}</i>,
            icon: 'error'
          })
        }
        return console.log(result);
      })
      .catch((error) => console.log("error", error));

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
    // console.log("dateString=>",dateString)
    setDateAdd(dateString);
  };
  const conferenceAddChange = (e) => {
    setConferenceAdd(e.target.value);
  };
  const publicherAddChange = (e) => {
    setPublicherAdd(e.target.value);
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
    setfocustype("scholar");
    var listdata = dataresearch;
    listdata = listdata.sort((a, b) => new Date(b.Publication_date).getFullYear()- new Date(a.Publication_date).getFullYear() )
    setDataTable(
      <Scholar getdata={listdata} openModal2={(item) => openModal2(item)}  sendResearchIndex={(item)=> props.sendResearchIndex(item)}/>
    );
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
    setfocustype("scopus");
    var listdata = dataresearch;
    listdata = listdata.sort((a, b) => new Date(b.Publication_date).getFullYear()- new Date(a.Publication_date).getFullYear() )
    setDataTable(
      <Scopus getdata={listdata} openModal2={(item) => openModal2(item)} sendResearchIndex={(item)=> props.sendResearchIndex(item)}/>
    );
    setTimeout(() => {
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }, 100);
  };

  const [dataTable, setDataTable] = useState(
    <Scholar getdata={dataresearch} openModal2={(item) => openModal2(item)} sendResearchIndex={(item)=> props.sendResearchIndex(item)} />
  );
  //แบ่งชื่อ-นามสกุล
  // const word = workData[0].userName.split(" ");

  const sortingyear =()=>{
    setfocussorty(true);
    setfocussortc(false);
  }
  const sortingcited =()=>{
    setfocussorty(false);
    setfocussortc(true);
  }

  useEffect(()=>{
    if(focussorty){
      let listdata = dataresearch;
      listdata = listdata.sort((a, b) => new Date(b.Publication_date).getFullYear()- new Date(a.Publication_date).getFullYear())
      if(focustype === "scholar"){
        setDataTable(
          <Scholar
            getdata={listdata}
            sendResearchIndex={(item) => props.sendResearchIndex(item)}
            status={true}
          />
        )
      }else if(focustype === "scopus"){
        setDataTable(
          <Scopus
            getdata={listdata}
            sendResearchIndex={(item) => props.sendResearchIndex(item)}
            status={true}
          />
        )
      }
    }else if(focussortc){
      var listdata1 = dataresearch;
      listdata1 = listdata1.sort((a, b) => b.Citation- a.Citation);
      
      if(focustype === "scholar"){
        console.log("do ci =>",listdata1)
        setDataTable(
          <Scholar
            getdata={listdata1}
            sendResearchIndex={(item) => props.sendResearchIndex(item)}
            status={false}
          />
        )
      }else if(focustype === "scopus"){
        setDataTable(
          <Scopus
            getdata={listdata1}
            sendResearchIndex={(item) => props.sendResearchIndex(item)}
            status={false}
          />
        )
      }
    }
    
  },[focussorty,focussortc])

  const word = workData[0].userName.split(" ");
  let img = "../img/adp.jpg";


  const openModal2 = (val) => {
    // console.log(" openModal2",val)
    // console.log(" dataresearch",dataresearch)
    if (val === "null") {
      setTopicAdd("");
      setUserNameAdd("");
      setDateAdd("");
      setConferenceAdd("");
      setPublicherAdd("");
      setPublisherAdd("");
      setDescriptionAdd("");
      setLinkAdd("");
    } else {
      let temp = dataresearch.filter((obj, index) => {
        return obj.ID_research === val;
      })
      // console.log(" openModal2 temp",temp)
      setTopicAdd(temp[0].name_research);
      setUserNameAdd(temp[0].title_name + temp[0].firstname_professor +" "+temp[0].lastname_professor);
      let date =new Date(temp[0].Publication_date).toISOString().split('T')[0];
      setDateAdd(date);
      setConferenceAdd(temp[0].ConferenceOrJornal);
      setPublicherAdd(temp[0].Publisher);
      if(temp[0].name_Type === 'scholar'){
        setPublisherAdd('1')
      }else{
        setPublisherAdd('2')
      }
      
      setDescriptionAdd(temp[0].Description);
      setLinkAdd(temp[0].Link);
    }
    setIsModal2Open(true);
  };

  if (isLoading) return <><div className="h-[80px] pt-[40px]">
  <Spin tip="Loading" size="large">
    <div className="content" />
  </Spin></div>;</>;
  else
    return (
      <div className="relative">
        <div class="z-[-1] absolute h-full w-full">
          <div id="back-bg-top" class="z-[-1] h-[500px] w-full"></div>
        </div>
        <div class="absolute z-[-2] h-full w-full">
          <div class="h-[500px] w-full bg-white"></div>
        </div>
        <div class="z-[-3] absolute w-full h-full bg-regal-red"></div>
        <div class=" grid place-items-center w-full min-h-[500px] top-[130px] pb-[50px] pt-[220px]">
          <div class="rounded-[20px] w-10/12 h-fit bg-[#EFEFEF] p-[17px] overflow-hidden">
            <div class="gap-[8px] w-full h-full bg-white rounded-[8px] ">
              <div className="grid edit_button_pos1 w-full h-[120px]">
                <button
                  onClick={showModal}
                  className="z-[20] px-[18px] py-[8px] rounded-[12px] font-bold1 bg-regal-red edit_button_pos2 text-white hover:bg-white hover:text-regal-red border-2 border-regal-red hover:border-2 hover:border-regal-red"
                >
                  <div className="flex">
                    แก้ไขข้อมูล
                    <div className="ml-[8px] h-[20px] w-[20px]">
                      <FiEdit2 className="h-full w-full" />
                    </div>
                  </div>
                </button>
                <Modal
                  footer={null}
                  open={isModalOpen}
                  onCancel={handleCancel}
                  width={650}
                >
                  <form onSubmit={submitModal}>
                    <p>แก้ไขข้อมูล</p>
                    <div class="grid  place-items-center w-full h-fit">
                      <div>
                        {/* <Upload
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
                        </Upload> */}
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
                    <p>คำนำหน้า-ชื่อ-สกุลภาษาไทย</p>
                    <div className="grid grid-cols-2">
                      <input
                        class="w-[230px] mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="firstnamethai"
                        type="text"
                        placeholder="คำนำหน้าภาษาไทย"
                        onChange={inputtitlenametchange}
                        value={titlenamet}
                      />
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
                      {study.map((item, index) => (
                        <Tag
                          closable
                          onClose={() => logstudy(item.ID_qualification)}
                          className="flex w-fit h-fit px-[8px] py-[5px] text-[14px]"
                          closeIcon={
                            <div className="w-[16px] h-full">
                              <MdClose class="h-full w-full" />
                            </div>
                          }
                        >
                          {item.name_qualification}
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
                      {interest.map((item, index) => (
                        <Tag
                          closable
                          onClose={() => loginter(item.ID_coreskill)}
                          className="flex w-fit h-fit px-[8px] py-[5px] text-[14px]"
                          closeIcon={
                            <div className="w-[16px] h-full">
                              <MdClose class="h-full w-full" />
                            </div>
                          }
                        >
                          {item.name_coreskill}
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
                    <p>Change Password</p>
                    <input
                        class="w-[230px] mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="oldpassword"
                        type="text"
                        placeholder="Old Password"
                        onChange={inputoldpasschange}
                        value={oldpassword}
                      />
                      <input
                        class="w-[240px] mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="newpassword"
                        type="text"
                        placeholder="New Password"
                        onChange={inputnewpasschange}
                        value={newpassword}
                      />
                    <button
                      type="submit"
                      className="ml-[15px] w-fit h-fit px-[15px] py-[8px] rounded-[10px] bg-regal-red text-white"
                    >
                      เปลี่ยน
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
                  </div>
                  <div className="max-[480]:text-[14px] py-[3px]">
                    {titlenamet + fnamet}
                    {"  "}
                    {lnamet}
                  </div>
                  <div className="py-[3px]">
                    {fnamee}
                    {"  "}
                    {lnamee}
                  </div>
                  <div className=" font-bold max-[480]:text-[14px] mt-[30px] py-[3px]">
                    วุฒิการศึกษา
                  </div>
                  {study.map((item, index) => (
                    <div className="py-[3px]">{item.name_qualification}</div>
                  ))}
                  <div className="grid place-items-center">
                    <div className="flex h-[30px] w-auto mt-[30px] py-[3px]">
                      <HiOutlineMail className="mr-[10px] h-full w-[30px] text-regal-red" />
                      {email}
                    </div>
                    </div>
                </div>
              </div>
              <div className="grid place-items-center w-full h-fit class_graph123">
                <div class="h-[260px] min-[481px]:w-[1000px] max-[480]:w-[200px]  grid place-items-center">
                  <Graph123 getdata={dataresearch} />
                </div>
              </div>
              <div className="grid place-items-center w-full h-[10px]">
                <div className="h-[1px] w-[95%] border-t-[1px] border-gray-300"></div>
              </div>
              <div className="flex justify-center w-full h-fit">
                <div className="w-full h-fit">
                  <div className="font-bold1 max-[480]:text-[14px] py-[8px] h-fit w-fit ml-[100px] mt-[40px]">
                    Interests
                  </div>
                </div>
              </div>
              <div className="flex w-full h-fit">
                <div className=" class_tab_tag h-full"></div>
                <div className="w-full h-fit flex flex-wrap class_tab_tag2">
                  {interest.map((item) => (
                    <NavLink
                    to={`/interest_person/${item.ID_coreskill}`}
                    onClick={() => props.sendCoreSkillID(item.ID_coreskill)}
                  >
                    <div className="font-bold1 text-white py-[8px] px-[15px] bg-regal-red rounded-[10px] w-fit h-fit mt-[16px] ml-[18px]">
                      {item.name_coreskill}
                    </div>
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="grid place-items-center w-full h-[10px]">
                <div className="h-[1px] w-[95%] border-t-[1px] border-gray-300 mt-[15px]"></div>
              </div>
              <div className="relative flex mt-[20px] ml-[30px]">
                <button onClick={clickScholar} className={scholarBtn}>
                  Scholar
                </button>
                <button onClick={clickScopus} className={scopusBtn}>
                  Scopus
                </button>
                {/* ปุ่ม Add------------------------------------------------------------------------ */}
                {/* <button
                  onClick={() => openModal2("null")}
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
                    <DatePicker onChange={onChangeDateAdd} 
                    value={moment(dateAdd)}
                    />
                    <p>การประชุม & วารสารวิชาการ </p>
                    <p>
                      *หากเป็นการประชุมให้ใส่ Conference นำหน้า หรือ
                      หากเป็นวารสารวิชาการให้ใส่ Journal นำหน้า
                    </p>
                    <input
                      class="w-full mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="conference"
                      type="text"
                      placeholder="เช่น Conference ******* หรือ Journal *********"
                      onChange={conferenceAddChange}
                      value={conferenceAdd}
                    />
                    <p>ผู้เผยแพร่</p>
                    <input
                      class="w-full mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="conference"
                      type="text"
                      placeholder="เพิ่มผู้เผยแพร่.."
                      onChange={publicherAddChange}
                      value={PublicherAdd}
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
                          value: "1",
                          label: "Scholar",
                        },
                        {
                          value: "2",
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
                </Modal> */}
                {/* ------------------------------------------------------------------------------------------ */}
              </div>
              <div className="grid place-content-center w-full h-fit class_add_btn_pos"><button
                  onClick={() => openModal2("null")}
                  className="bg-regal-red text-white rounded-[12px] hover:bg-white hover:text-regal-red border-[2px] border-regal-red px-[16px] py-[3px]"
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
                    <DatePicker onChange={onChangeDateAdd} 
                    value={moment(dateAdd)}
                    />
                    <p>การประชุม & วารสารวิชาการ </p>
                    <p>
                      *หากเป็นการประชุมให้ใส่ Conference นำหน้า หรือ
                      หากเป็นวารสารวิชาการให้ใส่ Journal นำหน้า
                    </p>
                    <input
                      class="w-full mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="conference"
                      type="text"
                      placeholder="เช่น Conference ******* หรือ Journal *********"
                      onChange={conferenceAddChange}
                      value={conferenceAdd}
                    />
                    <p>ผู้เผยแพร่</p>
                    <input
                      class="w-full mb-[5px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="conference"
                      type="text"
                      placeholder="เพิ่มผู้เผยแพร่.."
                      onChange={publicherAddChange}
                      value={PublicherAdd}
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
                          value: "1",
                          label: "Scholar",
                        },
                        {
                          value: "2",
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
                </Modal></div>
              
              <div className="mt-[13px] flex flex-col justify-center mx-[20px]">
                <div className="head_low_table grid text-xs text-white uppercase bg-regal-red w-full rounded-[10px]">
                  <div
                    scope="col"
                    className="px-6 py-3 rounded-l-lg font-medium head_low_table_product"
                  >
                    Product name
                  </div>
                  <div
                    scope="col"
                    className="grid place-content-center px-6 py-3 font-medium"
                  >
                     <button onClick={()=>sortingyear()}>YEAR</button>
                  </div>
                  <div
                    scope="col"
                    className="grid place-content-center px-6 py-3 font-medium"
                  >
                    <button onClick={()=>sortingcited()}>CITED BY</button>
                  </div>
                  <div
                    scope="col"
                    className="grid place-content-center px-6 py-3 font-medium"
                  ></div>
                </div>
                <tbody>
                  {dataTable}
                  {showAdd}
                </tbody>
              </div>
            </div>
          </div>
        </div>
        <div class="z-[20] grid place-items-center absolute top-[148px] w-full h-[140px]">
          <img
            src={imgsrc}
            class="h-[140px] w-[140px] rounded-full object-cover"
          ></img>
        </div>
        <div class="z-[10] grid place-items-center absolute top-[140px] w-full h-[80px] transform translate-y-[100%] overflow-hidden">
          <div className="relative transform translate-y-[-50%]">
            <div className="bg-[#EFEFEF] h-[160px] w-[160px] rounded-full object-cover"></div>
          </div>
        </div>
      </div>
    );
}

export default ProfilePage_Edit;
