/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "../style/interests.css";
import { NavLink } from "react-router-dom";
import { Alert, Space, Spin } from "antd";

function Interests(props) {
  const [dataskill, setdataskill] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [datashow, setdatashow] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:4000/api/professor/get-all-skill", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          setdataskill(result.data);
          setIsLoading(false);
          // return result.data;
        }
        // return console.log("dataskill=>",result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  if (isLoading) return <></>;
  else {
    // console.log("dataskill=>", dataskill);
    let temp = [];
    let t = dataskill[0];
    let count = 1;
    for (let i = 1; i < dataskill.length; i++) {
      
      if (t.ID_coreskill === dataskill[i].ID_coreskill) {
        count++;
      } else {
        temp.push({
          data: t,
          count: count,
        });
        count = 1;
        t = dataskill[i];
      }
      if (i === dataskill.length - 1) {
        temp.push({
          data: dataskill[i],
          count: count ,
        });
      }
    }
    temp.sort((a, b) => {
      return b.count - a.count;
    });
    let temp1=[];
    let c= 1;
    for(let i=0;i<temp.length;i++) {
      if(c <=10) temp1.push(temp[i]);
      c++;
    }

    // console.log("dataskill=>", temp1);

    return (
      <>
        <div className="toppic">Interesting</div>
        <div className="interest">
          {temp1.map((item, index) => (
            <div className="contianner">
              <NavLink
                to={`/interest_person/${item.data.ID_coreskill}`}
                onClick={() => props.sendCoreSkillID(item.data.ID_coreskill)}
              >
                <a class="index-one">
                  <span className="button font-in-tag max-[480px]:text-[13px]">
                    {item.data.name_coreskill}
                  </span>
                </a>
              </NavLink>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Interests;
