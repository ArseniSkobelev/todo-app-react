import React, { useState } from 'react'
import { Link } from "react-router-dom";

export default function Signup() {
    const [Username, setUsername] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    async function createUser () {
        let data = {
            username: Username,
            email: Email,
            password: Password
        }

        const url = "http://localhost:3001/createUser"
        let res = await fetch(url, {
            method: "POST",
            cors: "*",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
        console.log(res.json())
        // return res.json()
    }

    return (
    <div className='bg-bg h-[100vh] flex items-center flex-col py-12'>
        <div className='w-[30%] flex flex-col'>
            <div id="upper" className='mb-12'>
                <h1 className='text-mainText text-3xl font-semibold mb-2'>
                    Create a new account
                </h1>
                <p className='text-xl w-[90%]'>
                    Enter your data to create a new user 
                    account or login with your existing user
                </p>
            </div>
            <div id="inputs" className='w-[90%] mb-4'>
                <div className='mb-8'>
                    <input value={Username} onInput={e => setUsername(e.target.value)} className='drop-shadow-xl w-full h-[60px] rounded px-4' placeholder='Username' type="text" />
                </div>
                <div className='mb-8'>
                <input value={Email} onInput={e => setEmail(e.target.value)} className='drop-shadow-xl w-full h-[60px] rounded px-4' placeholder='Email' type="email" />
                </div>
                <div>
                <input value={Password} onInput={e => setPassword(e.target.value)} type="password" className='drop-shadow-xl w-full h-[60px] rounded px-4' placeholder='Password' />
                </div>
            </div>
            <div id="link" className='text-linkText mb-12'>
                <i><Link to="/login">Already have an account? Login here</Link></i>
            </div>
            <div id="btn" className='flex justify-center items-center w-[90%]'>
                <div className='cursor-pointer drop-shadow-xl w-[50%] h-[60px] flex items-center justify-center font-semibold rounded bg-white' onClick={createUser}>
                    Create account
                </div>
            </div>
        </div>
    </div>
  )
}
