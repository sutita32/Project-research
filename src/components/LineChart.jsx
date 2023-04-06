/* eslint-disable no-unused-vars */
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from "./Data";


const options={
  responsive: true,
  layout:{
    autoPadding:false,
    padding:{
      right:20

    }
  },
  scales: {
    xAxes: [{
        display: false
    }],
    yAxes: [{
        display: false
    }]
},
plugins: {
  title: {
      display: true,
      text: 'จำนวนงานวิจัย'
  },
  legend: {
    display:false
  }
}
}
function LineChart(item) {
  let stat =[];
  if(item.data){
    // console.log("item=>data=>",item.data)
    let temp = new Date(item.data[0].Publication_date).getFullYear();
    let count = 1 ;
    for(let i=1;i<item.data.length;i++){
      let yearr = new Date(item.data[i].Publication_date).getFullYear();
      // console.log("index=",i," stat=>Year=>",yearr, "&pu",item.data[i].Publication_date)
      if(i === item.data.length-1 ){
        stat.push({
          year : yearr,
          N : count+1
        })
      }
      if(yearr === temp ){
        count++;
      }else{
        stat.push({
          year : temp,
          N : count
        })
        count=1;
        temp=yearr;
      }
      if(i === item.data.length-1 ){
        stat.push({
          year : yearr,
          N : count
        })
      }
    }
  }

  const data = {
    labels: stat.map((data)=>data.year),
    datasets: [
      {
        label: "จำนวน",
        data: stat.map((data)=>data.N),
        borderColor: '#7d0f3f',
        backgroundColor: '#7d0f3f'
      },
    ],
  };
  
  // const data = {
  //   labels: UserData.map((data)=>data.years),
  //   datasets: [
  //     {
  //       label: "Pop",
  //       data: UserData.map((data)=>data.doc_num),
  //       borderColor: '#7d0f3f',
  //       backgroundColor: '#7d0f3f'
  //     },
  //   ],
  // };
  return (
    <>
      <Line data={data} options={options} height={item.h} width={item.w}></Line>
    </>
  );
}

export default LineChart;
