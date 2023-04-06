import React from "react";
import { Bar } from "react-chartjs-2";



function Graph123({ getdata }) {
    let year = [];
    let sum = [];
    // console.log("datdadtatdad=>",getdata)
    if (getdata.length > 0) {
        year.length=0;
        sum.length=0;
        let list = [];
        //   list = getdata;
        //   
        for(let i=0 ;i< getdata.length;i++){
            list.push(getdata[i])
        }
        list.sort((a, b) => new Date(a.Publication_date).getFullYear()- new Date(b.Publication_date).getFullYear());
        list = list.filter((obj, index) => {
            return index === list.findIndex(o => obj.name_research.toLowerCase() === o.name_research.toLowerCase());
        });
        // console.log("dataresearch graph=>",list)
        // year.push(new Date(list[0].Publication_date).getFullYear());
        let t = 0 ;
        let tempy = new Date(list[0].Publication_date).getFullYear();
        let c = 1;
        year.push(tempy);
        sum.push(c);
        for (let i = 1; i < list.length; i++) {
            let y = new Date(list[i].Publication_date).getFullYear();
            if (y === tempy) sum[t] = c++ ;
            else {
            year.push(tempy);
            tempy = y;
            sum.push(c);
            c = 1;
            t++;
            }
            if (i === list.length - 1) {
                year.push(y);
            // tempy = y;
                sum.push(c);
            }
        }
    }

    const data = {
      labels: year,
      datasets: [
        {
          label: "Research is have",
          data: sum ,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 0.2)"],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },labels: {
            display: false,
          },
      },
    //   responsive: true,
    };
    return (
      <>
        <Bar data={data} options={options}></Bar>
      </>
    );
  }

  export default Graph123;