import React from "react";
import { UserData } from "./Garph_stat";
import { UserData_AJ } from "./Graph_aj";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

function Graph1({ typesNow, yearNow,dataresearch ,professorlist ,listcolor}) {
  let dataShow =[];

  if (typesNow === "จำแนกทั้งหมด"){
    for(let i=0 ;i < professorlist.length ;i++){
      let count = 0;
      for( let j=0;j<dataresearch.length ;j++){
        let year = new Date(dataresearch[j].Publication_date).getFullYear().toString();
        if( dataresearch[j].Keyword === professorlist[i].Keyword && yearNow === "ทั้งหมด" ) count++;
        else if(dataresearch[j].Keyword === professorlist[i].Keyword && year === yearNow) {
          count++;
        }
      }
      dataShow.push({
        id: i,
        name : professorlist[i].title_name+professorlist[i].firstname_professor+" "+professorlist[i].lastname_professor ,
        data_num : count,
        color : listcolor[i]
      });
    }
  }else if(typesNow === "จำแนกตาม Scholar"){
    for(let i=0 ;i < professorlist.length ;i++){
      let count = 0;
      for( let j=0;j<dataresearch.length ;j++){
        let year = new Date(dataresearch[j].Publication_date).getFullYear().toString();
        if( dataresearch[j].Keyword === professorlist[i].Keyword && yearNow === "ทั้งหมด" && dataresearch[j].ID_Type === 1) count++;
        else if(dataresearch[j].Keyword === professorlist[i].Keyword && year === yearNow && dataresearch[j].ID_Type === 1) {
          count++;
        }
      }
      dataShow.push({
        id: i,
        name : professorlist[i].title_name+professorlist[i].firstname_professor+" "+professorlist[i].lastname_professor ,
        data_num : count,
        color : listcolor[i]
      });
    }

  }else if(typesNow === "จำแนกตาม Scopus"){
    for(let i=0 ;i < professorlist.length ;i++){
      let count = 0;
      for( let j=0;j<dataresearch.length ;j++){
        let year = new Date(dataresearch[j].Publication_date).getFullYear().toString();
        if( dataresearch[j].Keyword === professorlist[i].Keyword && yearNow === "ทั้งหมด" && dataresearch[j].ID_Type === 2) count++;
        else if(dataresearch[j].Keyword === professorlist[i].Keyword && year === yearNow && dataresearch[j].ID_Type === 2) {
          count++;
        }
      }
      dataShow.push({
        id: i,
        name : professorlist[i].title_name+professorlist[i].firstname_professor+" "+professorlist[i].lastname_professor ,
        data_num : count,
        color : listcolor[i]
      });
    }
  }

  // if (typesNow === "จำแนกตามประเภท") {
  //   dataShow = UserData;
  // } else if (typesNow === "จำแนกตามผู้วิจัย") {
  //   dataShow = UserData_AJ;
  // }

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
