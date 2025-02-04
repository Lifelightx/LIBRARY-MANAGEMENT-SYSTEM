import React from 'react'

import { useNavigate } from 'react-router-dom'

function Heros() {
  const navigate = useNavigate()
  return (
    <div>
      <div className='flex flex-col justify-around items-center bg-[#e0fcff] py-8 mb-10 px-6'>
        <h1 className='font-[Montserrat] text-slate-700 py-18 text-5xl font-extrabold'>"WELCOME TO <span className='text-[#006D77]'>BOOKBYTE</span> <br /> YOUR GATEWAY TO KNOWLEDGE!" </h1>
        <div className="mt-2 mb-5">
          <button className="bg-[#006D77] hover:bg-[#008B9F] text-white font-[Montserrat] font-bold py-3 px-5 rounded-xl focus:outline-none focus:shadow-outline" onClick={() => navigate('/login')}>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Heros
