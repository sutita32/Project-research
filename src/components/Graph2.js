import React from "react";
import { Bar } from "react-chartjs-2";
import { UserData_AJ } from "./Graph_aj";
import { UserData } from "./Garph_stat";
import { typePerYearAll } from "./Graph_Type";
import { personPerYearAll } from "./Graph_Person";
import "chart.js/auto";

function Graph1({ typesNow, yearNow }) {
  var dataShow;
  if (typesNow === "จำแนกตามประเภท") {
    dataShow = typePerYearAll[2565 - yearNow];
  } else if (typesNow === "จำแนกตามผู้วิจัย") {
    dataShow = personPerYearAll[2565 - yearNow];
  }
  const data = {
    labels: dataShow.map((item) => item.name),
    datasets: [
      {
        label: "",
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
      },
      labels: {
        display: false,
      },
    },
    layout: {
      padding: 20,
    },
  };
  return (
    <>
      <Bar data={data} options={options}></Bar>
    </>
  );
}

export default Graph1;
