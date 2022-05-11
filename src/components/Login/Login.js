import React from 'react'
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className='bg-bg h-[100vh] flex items-center flex-col py-12'>
        <div className='w-[30%] flex flex-col'>
            <div id="upper" className='mb-12'>
                <h1 className='text-mainText text-3xl font-semibold mb-2'>
                    Login
                </h1>
                <p className='text-xl w-[70%]'>
                    Enter your login data or create a new 
                    account to use this service
                </p>
            </div>
            <div id="inputs" className='w-[90%] mb-4'>
                <div className='mb-8'>
                    <input className='drop-shadow-xl w-full h-[60px] rounded px-4' placeholder='Username' type="text" />
                </div>
                <div>
                    <input className='drop-shadow-xl w-full h-[60px] rounded px-4' placeholder='Password' type="text" />
                </div>
            </div>
            <div id="link" className='text-linkText mb-12'>
                <i><Link to="/signup">Don't have an account yet? Create a new one here</Link></i>
            </div>
            <div id="btn" className='flex justify-center items-center w-[90%]'>
                <div className='cursor-pointer drop-shadow-xl w-[50%] h-[60px] flex items-center justify-center font-semibold rounded bg-white'>
                    Login
                </div>
            </div>
        </div>
    </div>
  )
}
