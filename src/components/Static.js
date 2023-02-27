import React from 'react'
import Graph1 from './Graph1'
import Graph2 from './Graph2'
import '../style/Static.css'

function Static() {
  return (
    <>
    <div className="h-[30px] w-full bg-regal-red"></div>
    <div className='bg-[#F0F8FF] text-right pr-[230px] pt-[30px] pb-[15px]'>
      <p className=' font-semibold1'>ข้อมูล ณ วันที่ 26 กุมภาพันธ์ 2566</p>
    </div>
    <div className=' h-[550px] flex bg-[#F0F8FF]'>
      <div className='h-[400px] w-[400px] top-[0px] left-[220px] relative shadow-2xl px-[30px] py-[30px] bg-white rounded-[20px]'>
        <p className=' font-normal text-center'>จำนวนงานวิจัยจำแนกตามประเภท</p>
        <Graph1 />
      </div>
      <div className='h-[400px] w-[400px] top-[0px] left-[500px] relative shadow-2xl px-[30px] py-[30px] bg-white rounded-[20px]'>
      <p className=' font-normal text-center'>จำนวนงานวิจัยของผู้วิจัย</p>
        <Graph2/>
      </div>
    </div>
    <div className='bg-[#F0F8FF]'>
    
    </div>
    </>
  )
}

export default Static