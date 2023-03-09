import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import 'tw-elements';
import '../components/Header'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function Login_Admin() {

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

  const handleSubmit = (event) => {
    event.preventDefault(); //ป้องกันการเปลี่ยนแปลงหน้า

    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "username": inputs.uname,
        "password": inputs.pass,
        // "expiresIn": 600000
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:4000/api/auth/login-admin", requestOptions)
        .then(response => response.json())
        
        .then(result => {
          if (result.user){
              localStorage.setItem("user",JSON.stringify(result.user))
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
        })
        .catch(error => console.log('error', error));
          console.log(inputs);
       
  }


    const renderForm = (
        <>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Username </label>
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
            <a href="/forgot-pass" className="text-sm text-blue-700 hover:underline dark:text-blue-500 ">Forgot Password?</a>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
        </>
        );
  return (
    <>
    <div class="h-[30px] w-full bg-regal-red"></div>
    <div className="form-2">
      <div className="z-20 login-form">
        <div class="text-center mb-[3rem] mt-[2rem] text-[18px]">สำหรับAdmin</div>
        <div  className="title"><a href='/login_admin'>LOGIN</a></div>
        { renderForm}
      </div>
    </div>
  </>
  )
}

export default Login_Admin