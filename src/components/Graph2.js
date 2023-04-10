import React from "react";
import { Bar } from "react-chartjs-2";
import { UserData_AJ } from "./Graph_aj";
import { UserData } from "./Garph_stat";
import { typePerYearAll } from "./Graph_Type";
import { personPerYearAll } from "./Graph_Person";
import "chart.js/auto";

function Graph1({ typesNow, yearNow , dataresearch ,professorlist, listcolor}) {
  // var dataShow;
  // console.log("dataprofessorlist graph2=>",professorlist)
  // console.log("dataresearch graph2=>",dataresearch)
  // console.log("yearNow =>",yearNow)
  // console.log("listcolor =>",listcolor)
  let dataShow =[];
  
  if (typesNow === "จำแนกทั้งหมด"){
    // dataresearch = dataresearch.filter((obj, index) => {
    //   return index === dataresearch.findIndex(o =>  obj.name_research.toLowerCase() === o.name_research.toLowerCase());
    // });
    for(let i=0 ;i < professorlist.length ;i++){
      let count = 0;
      for( let j=0;j<dataresearch.length ;j++){
        let year = new Date(dataresearch[j].Publication_date).getFullYear().toString();
        if( (dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase()) )&& yearNow === "ทั้งหมด"   ) count++;
        else if((dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase()) )&& year === yearNow) {
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
        if( (dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase()) ) && yearNow === "ทั้งหมด" && dataresearch[j].ID_Type === 1) count++;
        else if((dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase()) ) && year === yearNow && dataresearch[j].ID_Type === 1) {
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
        if( (dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase()) ) && yearNow === "ทั้งหมด" && dataresearch[j].ID_Type === 2) count++;
        if((dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase()) ) && year === yearNow && dataresearch[j].ID_Type === 2) {
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
