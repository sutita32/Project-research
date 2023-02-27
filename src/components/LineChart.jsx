/* eslint-disable no-unused-vars */
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from "./Data";

const data = {
  labels: UserData.map((data)=>data.years),
  datasets: [
    {
      label: "Pop",
      data: UserData.map((data)=>data.doc_num),
      borderColor: '#7d0f3f',
      backgroundColor: '#7d0f3f'
    },
  ],
};
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
  return (
    <>
      <Line data={data} options={options} height={item.h} width={item.w}></Line>
    </>
  );
}

export default LineChart;
