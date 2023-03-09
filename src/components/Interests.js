/* eslint-disable jsx-a11y/anchor-is-valid */
import React ,{ useEffect, useState}from 'react'
import '../style/interests.css'



function Interests() {
    const [dataskill , setdataskill] = useState([]);
    const [isLoading ,setIsLoading] = useState(true);

    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("http://localhost:4000/api/professor/get-all-skill", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.data){
                setdataskill(result.data);
                setIsLoading(false);
            }
            // return console.log("dataskill=>",result.data);
        })
        .catch(error => console.log('error', error));

    },[]);


    if(isLoading) return (<>Loading....</>)
    else return (
    <><div className='toppic'>
          Interesting
      </div>
      <div className='interest'>
            {   dataskill.map((item,index)=>(
                <div className='contianner'>
                    <a class="index-one" href='#'>
                        <span className='button font-medium '>{item.name_coreskill}</span>
                    </a>              
                </div>
            ))}
                
            
              {/* <div className='contianner'>
                  <a class="index-one" href='#'>
                      <span className='button font-medium '>Artificial Intelligence</span>
                  </a>              
              </div>
              <div className='contianner'>
                  <a class="index-one" href='#'>
                      <span className='button font-medium '>Machine Learning</span>
                  </a>                  
              </div>
              <div className='contianner'>
                  <a class="index-one" href='#'>
                      <span className='button font-medium '>Computer Graphics</span>
                  </a>                 
              </div>
              <div className='contianner'>
                  <a class="index-one" href='#'>
                      <span className='button font-medium '>Ad hoc Network</span>
                  </a>
                  
              </div>
              <div className='contianner'>
                  <a class="index-one" href='#'>
                      <span className='button'>Geostatistics</span>
                  </a>                  
              </div>
          </div>
          <div className='interest1'>
          <div className='contianner1'>
                  <a class="index-one1" href='#'>
                      <span className='button1 font-medium '>Parallel Processing</span>
                  </a>
                  
              </div>
              <div className='contianner1'>
                  <a class="index-one1" href='#'>
                      <span className='button1 font-medium '>Human Computer Interaction</span>
                  </a>                 
              </div>
              <div className='contianner1'>
                  <a class="index-one1" href='#'>
                      <span className='button1 font-medium '>Computer vision</span>
                  </a>                
              </div>
              <div className='contianner1'>
                  <a class="index-one1" href='#'>
                      <span className='button1 font-medium '>Time Series</span>
                  </a>                 
              </div> */}
              
            </div>

          </>
  )
}

export default Interests