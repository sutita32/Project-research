/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../style/loginUser.css'
import 'tw-elements';
import './Header'


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function LoginUser(props) {
  const [loginstatus,setloginstatus] = useState("public")
  const [focusState2, setFocusState2] =  useState("z-10 head-login-right relative bottom-[-30px] right-[-3.5px] h-[70px] w-[400px]  focus:outline-none border-2 border-red-500")



  const Checkk = () => {
    // console.log(focusState1);
    console.log(focusState2);
  }

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [inputs, setInputs] = useState({});

  useEffect(() =>{
    const auth = localStorage.getItem('user');
    if(auth)
      navigate('/profile')
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); //ป้องกันการเปลี่ยนแปลงหน้า
    console.log(loginstatus)
    let ch = 0;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if(loginstatus==="public"){
      // console.log("hhhhhh")
      var raw = JSON.stringify({
        "email": inputs.uname,
        "password": inputs.pass
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      await fetch("http://localhost:4000/api/auth/login-professor", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        if( result.user ){
          ch=1;
          localStorage.setItem("user",JSON.stringify(result.user))
          localStorage.setItem("Role",result.Role)
          MySwal.fire({
            html:<i>{result.msg}</i>,
            icon: 'success',
          }).then((value) => {
            localStorage.setItem('token',result.accessToken)
              if (loginstatus==="public")
              {
                navigate('/profile')
                props.loginstatus(loginstatus);
              }
          })
        }
        // return console.log(result);
      })
      .catch(error => console.log('error', error));
    }
    if(ch === 0){
      raw = JSON.stringify({
        "email": inputs.uname,
        "password": inputs.pass
      });

      requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      await fetch("http://localhost:4000/api/auth/login-professor1", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        if( result.user ){
          ch=1;
          localStorage.setItem("user",JSON.stringify(result.user))
          localStorage.setItem("Role",result.Role)
          MySwal.fire({
            html:<i>{result.msg}</i>,
            icon: 'success',
          }).then((value) => {
            localStorage.setItem('token',result.accessToken)
              if (loginstatus==="public")
              {
                navigate('/profile')
                props.loginstatus(loginstatus);
              }
          })
        }
        // return console.log(result);
      })
      .catch(error => console.log('error', error));
    }
    if(ch === 0){

      raw = JSON.stringify({
        "username": inputs.uname ,
        "password": inputs.pass
      });
  
      requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch("http://localhost:4000/api/auth/login-admin", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.user){
            ch =1;
            localStorage.setItem("user",JSON.stringify(result.user))
            localStorage.setItem("Role",result.Role)
            MySwal.fire({
                html:<i>{result.msg}</i>,
                icon: 'success',
            }).then((value) => {
              localStorage.setItem('token',result.accessToken)
              navigate('/edit_admin')
                
            })
          }else {
              MySwal.fire({
                  html:<i>{result.msg}</i>,
                  icon: 'error'
              })
          }
          return console.log(result);
        })
        .catch(error => console.log('error', error));
    }
  }


  const renderForm = (
    <>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>E-mail </label>
          <input 
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:border-black focus:ring-0' 
            type="text" 
            name="uname" 
            placeholder='username'
            value={inputs.uname || ""} 
            onChange={handleChange}
            required />
        
        </div>
        <div className="input-container">
          <label>Password </label>
          <input 
            className='block text-sm py-3 px-4 rounded-[10px] w-full border outline-none focus:border-black focus:ring-0' 
            type="password" 
            name="pass" 
            placeholder='password'
            value={inputs.pass || ""} 
            onChange={handleChange}
            required />
        </div>
        <div className="button-container">
          <input type="submit"/>
        </div>
        <div  className="text-sm text-blue-700 hover:underline w-full text-center mt-[20px]"><a href="/forgot-pass">Forgot Password?</a></div>
      </form>
    </div>
   </>
  );

  return (
  <>
    <div className="relative form-img">
      <div className='absolute top-0 left-0 h-full w-full bg-btw '></div>
    <div className='grid  min-[921px]:grid-cols-2 max-[920px]:grid-cols-1'>
   <div></div>

      <div className="form-2">
        <div className="z-20 pb-[4rem] max-[391px]:px-[2rem] min-[391px]:px-[5rem] login-form">
          <div class="text-center mb-[3rem] mt-[2rem] text-[18px]"></div>
          <div  className="title"><a href='/login_admin'>LOGIN</a></div>
          {renderForm}
        </div>
      </div>
    </div>
    </div>
   
  </>
  )
}

export default LoginUser