import React from "react";
import { UserData } from "./Garph_stat";
import { UserData_AJ } from "./Graph_aj";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import '../style/Static.css'

function Graph1({ typesNow, yearNow,dataresearch ,professorlist ,listcolor}) {
  let dataShow =[];

  if (typesNow === "จำแนกทั้งหมด"){
    // dataresearch = dataresearch.filter((obj, index) => {
    //   return index === dataresearch.findIndex(o =>  obj.name_research.toLowerCase() === o.name_research.toLowerCase());
    // });
    for(let i=0 ;i < professorlist.length ;i++){
      let count = 0;
      for( let j=0;j<dataresearch.length ;j++){
        let year = new Date(dataresearch[j].Publication_date).getFullYear().toString();
        if( (dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase()))&& yearNow === "ทั้งหมด" ) count++;
        else if((dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase())) && year === yearNow) {
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
        if( (dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase())) && yearNow === "ทั้งหมด" && dataresearch[j].ID_Type === 1) count++;
        else if((dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase())) && year === yearNow && dataresearch[j].ID_Type === 1) {
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
        if( (dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase())) && yearNow === "ทั้งหมด" && dataresearch[j].ID_Type === 2) count++;
        else if((dataresearch[j].Keyword === professorlist[i].Keyword || dataresearch[j].authors.toLowerCase().includes(professorlist[i].Keyword.toLowerCase())) && year === yearNow && dataresearch[j].ID_Type === 2) {
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
  //   scales: {
  //     r: {
  //       ticks: {
  //         backdropPadding: {
  //             x: 10,
  //             y: 4
  //         }
  //       }
  //   }
  // },
    
    maintainAspectRatio : false,
    plugins: {
      legend: {
        display: false,
      },
      // datalabels: {
      //   color: '#000',
      //   align: 'end',
      //   anchor: 'end',
      //   formatter: function(value, context) {
      //     return context.chart.data.labels[context.dataIndex];
      //   },
      //   font: {
      //     size: 16,
      //     style: 'bold',
      //   }
      // },
    },
    layout: {
      padding: 40,
    },
  };

  const doughnutLabelsLine = { 
    id:'doughnutLabelsLine',
    afterDraw(chart, args, options){
      const {ctx, chartArea:{top, bottom, left, right, width, height}} = chart;
      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
          // console.log(width," ", height);

         
          if(chart.data.datasets[0].data[index] === 0 || chart.data.datasets[0].data[index] === 1 ){
          }
          else { console.log(chart.data.datasets[0].data[index])
            if(chart.data.datasets[0].data[index] > 2 && chart.data.datasets[0].data[index] < 16){
              const {x, y} = datapoint.tooltipPosition();
              // console.log("x => ", x , " y =>", y);
          const halfwidth = (width+80) / 2;
          const halfheight = (height+80) / 2;
          const xLine = x >= halfwidth ? x+30 : x-30;
          const yLine = y >= halfheight ? y+22 : y-22;
          const extraLine = x >= halfwidth ? 30 : -30;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(xLine, yLine);
          ctx.lineTo(xLine + extraLine, yLine);
          ctx.stroke();

          const textWidth =  ctx.measureText(chart.data.labels[index]).width;
          ctx.font = '10px Arial';
          const textXPosition = x>= halfwidth ? 'left' : 'right';
          ctx.textAlign = textXPosition;
          ctx.textBaseLine = 'middle';
          ctx.fillText(" " + chart.data.labels[index] + " ", xLine + extraLine, yLine);
            }else if (chart.data.datasets[0].data[index] <= 2){
              const {x, y} = datapoint.tooltipPosition();
          const halfwidth = (width+80) / 2;
          const halfheight = (height+80) / 2;
          const xLine = x >= halfwidth ? x+30 : x-30;
          const yLine = y >= halfheight ? y+50 : y-50;
          const extraLine = x >= halfwidth ? 30 : -30;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(xLine, yLine);
          ctx.lineTo(xLine + extraLine, yLine);
          ctx.stroke();

          const textWidth =  ctx.measureText(chart.data.labels[index]).width;
          ctx.font = '10px Arial';
          const textXPosition = x>= halfwidth ? 'left' : 'right';
          ctx.textAlign = textXPosition;
          ctx.textBaseLine = 'middle';
          ctx.fillText(" " + chart.data.labels[index] + " ", xLine + extraLine, yLine);
            }else{
              const {x, y} = datapoint.tooltipPosition();
          const halfwidth = (width+80) / 2;
          const halfheight = (height+80 ) / 2;
          const xLine = x >= halfwidth ? x+30 : x-30;
          const yLine = y >= halfheight ? y+30 : y-30;
          const extraLine = x >= halfwidth ? 30 : -30;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(xLine, yLine);
          ctx.lineTo(xLine + extraLine, yLine);
          ctx.stroke();

          const textWidth =  ctx.measureText(chart.data.labels[index]).width;
          ctx.font = '10px Arial';
          const textXPosition = x>= halfwidth ? 'left' : 'right';
          ctx.textAlign = textXPosition;
          ctx.textBaseLine = 'middle';
          ctx.fillText(" " + chart.data.labels[index] + " ", xLine + extraLine, yLine);
            }
          
          }
        })
      });
    }
  }

  return (
    <>
    <div className="w-full h-full flex justify-center items-center overflow-visible">
    <div className="h-[300px] w-full overflow-visible">
      <Doughnut data={data} options={options} plugins={[doughnutLabelsLine]} className="overflow-visible"> </Doughnut>
      </div>
      </div>
    </>
  );
}

export default Graph1;
