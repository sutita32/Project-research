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
  const [focusState1, setFocusState1] =  useState("z-30 head-login-left-focus relative bottom-[-30px] left-[-2.5px]   h-[70px] w-[200px]  focus:outline-none")
  const [focusState2, setFocusState2] =  useState("z-10 head-login-right relative bottom-[-30px] right-[-3.5px]   h-[70px] w-[200px]  focus:outline-none")

  const focusNow1 = () => {

  setloginstatus("public")

  setFocusState1("z-30 head-login-left-focus relative bottom-[-30px] left-[-2.5px]   h-[70px] w-[200px] focus:outline-none");
  setFocusState2("z-10 head-login-right relative bottom-[-30px] right-[-3.5px]   h-[70px] w-[200px] focus:outline-none");  }

  const focusNow2 = () => {

  setloginstatus("private")

  setFocusState1("z-10 head-login-left relative bottom-[-30px] left-[-2.5px]   h-[70px] w-[200px] focus:outline-none");
  setFocusState2("z-30 head-login-right-focus relative bottom-[-30px] right-[-3.5px]   h-[70px] w-[200px] focus:outline-none");  }

  const Checkk = () => {
    console.log(focusState1);
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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if(loginstatus==="public"){
      // console.log("hhhhhh")
      var raw = JSON.stringify({
        "username": inputs.uname,
        "password": inputs.pass
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      await fetch("http://localhost:4000/api/auth/login-user", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        if( result.user ){
              localStorage.setItem("user",JSON.stringify(result.user))
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
            }else{
              MySwal.fire({
                html:<i>{result.msg}</i>,
                icon: 'error'
              })
            }

        return console.log(result);
      })
      .catch(error => console.log('error', error));
    }else if(loginstatus=== "private") {

      console.log("llllll")
      let raw = JSON.stringify({
        "username": inputs.uname,
        "password": inputs.pass
      });
      
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("http://localhost:4000/api/auth/login-admin", requestOptions)
        .then(response => {
          return response.json();
        })
        .then(result => {
            if( result.accessToken ){
              localStorage.setItem("user",JSON.stringify(result.user))
              MySwal.fire({
                  html:<i>{result.msg}</i>,
                  icon: 'success',
              }).then((value) => {
                localStorage.setItem('token',result.accessToken)
                  if (loginstatus==="private")
                  {
                    navigate('/profile_aj')
                    console.log(loginstatus)
                    props.loginstatus(loginstatus);
                  }
              })
            }else{
              MySwal.fire({
                html:<i>{result.msg}</i>,
                icon: 'error'
              })
            }
    
            return console.log(result);
        })
        .catch(error => {
          return console.log('error', error);
        });
    }
  }


  const renderForm = (
    <>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input 
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none' 
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
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none' 
            type="password" 
            name="pass" 
            placeholder='password'
            value={inputs.pass || ""} 
            onChange={handleChange}
            required />
          
        </div>
        <a href="/forgot-pass" className="text-sm text-blue-700 hover:underline dark:text-blue-500 justify-items-end ">Forgot Password?</a>
        <div className="button-container">
          <input type="submit" />
        </div>
        <p class="mt-5 text-sm ml-5">Don't have an account? <a class="underline cursor-pointer text-blue-800" href='/register'> Sign Up</a></p>
      </form>
    </div>
    {/* <div className='form_1'>
      <form  >
        <div className="min-h-screen bg-purple-400 flex justify-center items-center">
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
              <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">LOGIN</h1>
          </div>
          <div class="space-y-4">
            <label className=' text-gray-700'>Username </label>
            <input type="text" placeholder="username" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" required/>
            {renderErrorMessage("uname")}
            <label className=' text-gray-700'>Password </label>
            <input type="text" placeholder="Password" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" required/>
            {renderErrorMessage("pass")}
          </div>
          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl" onSubmit={handleSubmit}>submit</button>
            <p className="mt-4 text-sm">Already Have An Account? <span className="underline cursor-pointer text-blue-900"> Sign In</span></p>
			    </div>
        </div>
        </div>
        </form>   
      </div> */}
   </>
  );

  return (
  <>
    <div class="h-[30px] w-full bg-regal-red"></div>
    <div className="form-2">
      <ui class="slect">
        <button onClick={focusNow1} class={focusState1}>
          <a class='btn-1 '>สำหรับบุคคลทั่วไป</a>
        </button>
        <button onClick={focusNow2} class={focusState2}>
          <a class='btn-1 '>สำหรับอาจารย์</a>
        </button>
      </ui>
      <div className="z-20 login-form">
        <div onClick={Checkk} className="title">LOGIN</div>
        { renderForm}
      </div>
    </div>
  </>
  )
}

export default LoginUser