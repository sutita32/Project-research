/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function Form_forgotpass() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [inputs, setInputs] = useState({});
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit =async (event)=>{
        event.preventDefault();
        console.log("inputs=>",inputs)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": inputs.email,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:4000/api/auth/reset-password", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.msg === 'Your password reset Success!!'){
                MySwal.fire({
                    html:<i>{result.msg}</i>,
                    icon: 'success',
                  }).then((value) => {
                    navigate('/login')
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
    }

  return (
    <div>
        <section class="bg-indigo-50 ">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Change Password
          </h2>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your E-mail</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                        placeholder="name@company.com" 
                        required=""
                        value={inputs.email || ""} 
                        onChange={handleChange}
                    />
              </div>
              {/* <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">OldPassword</label>
                  <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                  required=""
                  value={inputs.password || ""} 
                    onChange={handleChange}
                  />
              </div>
              <div>
                  <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 ">New password</label>
                  <input type="password" 
                  name="confirmpassword" 
                  id="confirmpassword" 
                  placeholder="••••••••" 
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                  value={inputs.confirmpassword || ""} 
                    onChange={handleChange}
                  required=""/>
              </div>
              <div class="flex items-start">
                  
              </div> */}
              <button type="submit" class="w-full text-white bg-regal-red hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Reset passwod</button>
          </form>
      </div>
  </div>
</section>
    </div>
  )
}

export default Form_forgotpass