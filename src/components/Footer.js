import React from 'react'
import '../style/Footer.css'

function Footer() {
  return (
    <>
    <footer class="text-center text-white bg-regal-red xl:text-left">
      <div class="flex mx-6 py-10 text-center md:text-left justify-center">
        <div class="grid grid-cols-3  w-[1300px]">
          <div class="">
            <p class="mb-10 flex items-center justify-center font-normal1 md:justify-start">
              ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ
            </p>
            <p className=' text-gray-300 text-[16px] mb-10 font-normal2'>
              คณะวิทยาศาสตร์ประยุกต์
            </p>
            <p className=' text-gray-300 text-[16px] font-normal2'>
            มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
            </p>
          </div>
          <div class="pl-[90px] max-[480px]:pl-0">
            <p
              class="mb-4 flex justify-center font-normal1 md:justify-start">
              เมนูลัด
            </p>
            <p class="mb-4">
              <a href="/" class="text-white font-normal2 hover:text-beige font-normal2"
                >หน้าแรก</a >
            </p>
            <p class="mb-4">
              <a href="/search" class="text-white hover:text-beige font-normal2"
                >ค้นหา</a>
            </p>
            <p>
              <a href="/Static" class="text-white hover:text-beige font-normal2"
                >สถิติ</a>
            </p>
          </div>
          <div>
            <p
              class="mb-4 flex justify-center font-normal1 md:justify-start">
              ติดต่อเรา
            </p>
            <p class="mb-4 flex items-center justify-center md:justify-start font-normal2">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 viewBox="0 0 24 24" 
                 fill="currentColor" 
                 class="mr-3 h-5 w-5">
                <path 
                    fill-rule="evenodd" 
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" 
                    clip-rule="evenodd" />
            </svg>
            ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ<br/>คณะวิทยาศาสตร์ประยุกต์<br/> มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
            </p>
            <p class="mb-4 flex items-center justify-center md:justify-start font-normal2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="mr-3 h-5 w-5 ">
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clip-rule="evenodd" />
              </svg>
              02-555-2000 ต่อ 4601, 4602<br/>
              (ในเวลาราชการ)
            </p>
          </div>
        </div>
      </div>
      <div class=" bg-neutral-800 p-6 text-center font-normal2">
        <span>© 2023 Department of Computer and Information Sciences, Faculty of Applied Science (KMUTNB)</span>
      </div>
    </footer>
  </>
  )
}
export default Footer