import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { UserData } from './Garph_stat';

const data = {
    labels: UserData.map((item)=>item.name),
    datasets: [{
      label: 'จำนวนงานวิจัย',
      data: UserData.map((item)=>item.data_num),
      backgroundColor: UserData.map((item)=>item.color),
      hoverOffset: 20
    }]
  };

const options = {
        plugins: {
            legend: {
                display:false,
                position:'bottom',
                labels:{
                    boxWidth:20,
                    boxHeight:10
                }
            }
        },
        layout:{
            padding:20
        }
    
}



function Graph1() {
  return (
    <>
    <Doughnut data={data} options={options} ></Doughnut>
    </>
  )
}

export default Graph1