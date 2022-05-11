import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Main() {
  let username = cookies.get("username")
  let userSession = cookies.get("username") != null

  const navigate = useNavigate();

  if(!userSession) {
    navigate("/login")
  }

  let logout = () => {
    cookies.remove("username")
    cookies.remove("email")
    cookies.remove("password")
    navigate('/login')
  }

  return (
    <div className='bg-bg h-[100vh] flex items-center flex-col py-12'>
    <div className='w-[30%] flex flex-col'>
        <div id="upper" className='mb-12'>
            <div id="upper-title" className='flex row items-center mb-2'>
              <div id="svg" className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="44.943" height="26.657" viewBox="0 0 44.943 26.657" className='cursor-pointer' onClick={logout}>
                  <g id="Icon_feather-arrow-left" data-name="Icon feather-arrow-left" transform="translate(-5.5 -4.672)">
                    <path id="Path_1" data-name="Path 1" d="M48.443,18H7.5" transform="translate(0)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                    <path id="Path_2" data-name="Path 2" d="M18,28.5,7.5,18,18,7.5" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                  </g>
                </svg>
              </div>
              <h1 className='text-mainText text-3xl font-semibold ml-4'>
                  Welcome back, {username}
              </h1>
            </div>
            <p className='text-xl w-[90%] pl-16'>
                You have currently X tasks awaiting completion
            </p>
        </div>
        <div id="inputs" className='w-[90%] mb-4'>

        </div>
        <div id="link" className='text-linkText mb-12'>
        </div>
        <div id="btn" className='flex justify-center items-center w-[90%]'>
            <div className='cursor-pointer drop-shadow-xl w-[50%] h-[60px] flex items-center justify-center font-semibold rounded bg-white'>
                Create a new task
            </div>
        </div>
    </div>
</div>
  )
}
