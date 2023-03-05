import React from "react";
import { UserData } from "./Garph_stat";
import { UserData_AJ } from "./Graph_aj";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

function Graph1({ typesNow }) {
  var dataShow;
  if (typesNow === "จำแนกตามประเภท") {
    dataShow = UserData;
  } else if (typesNow === "จำแนกตามผู้วิจัย") {
    dataShow = UserData_AJ;
  }

  const data = {
    labels: dataShow.map((item) => item.name),
    datasets: [
      {
        label: "จำนวนงานวิจัย",
        data: dataShow.map((item) => item.data_num),
        backgroundColor: dataShow.map((item) => item.color),
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          boxWidth: 20,
          boxHeight: 10,
        },
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <>
      <Doughnut data={data} options={options}></Doughnut>
    </>
  );
}

export default Graph1;
