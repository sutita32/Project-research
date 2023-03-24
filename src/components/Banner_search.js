import React, {useState} from 'react'
import '../style/Banner_search.css'
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Banner_seach(props) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = async (event)=>{
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "keyword": inputs.search
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:4000/api/search/search-keyword", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        
        if(result.data != null){
          props.searchdata({
            data :result.data,
            keyword :inputs.search
          });
          localStorage.setItem("temp", inputs.search);
          localStorage.setItem("dataresearch",JSON.stringify(result.data));
          navigate('/search/')
        }else{
          props.searchdata({
            data :null,
            keyword :inputs.search
          });
          navigate('/search/')
        }
        // return console.log(result);
      })
      .catch(error => console.log('error', error));

  }
  return (
    <div className="banner-bg">
          <div className="searchBox">
            <form className='banner-1' onSubmit={handleSubmit}>
              <input 
                className='s-banner' 
                type="text" 
                name='search'
                placeholder="Search" 
                onChange={handleChange} 
                value={inputs.search || ""}
                required
              />
              <button type="submit" className="icon-search"><FiSearch/></button>
            </form>
          </div>
    </div>
   
  )
}

export default Banner_seach