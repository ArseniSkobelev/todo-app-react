import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Spinner } from "@chakra-ui/spinner"

const cookies = new Cookies();

export default function Login() {
    cookies.remove("username")
    cookies.remove("email")
    cookies.remove("password")

    const navigate = useNavigate();

    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    async function checkLogin() {
        setIsLoading(true)
        let data = {
            "username": Username,
            "password": Password
        }

        console.log(data)
        
        const url = "http://localhost:3001/checkLogin"
        await fetch(url, {
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
            cookies.set("username", Username)
            cookies.set("password", Password)
            setIsLoading(false)
            navigate('/main');
        })
        .catch((error) => {
            setIsLoading(false)
            console.error('Error:', error);
        });
        return
    }

  return (
      <div>
          {isLoading ?   
                <div className='bg-bg h-[100vh] w-[100vw] flex items-center justify-center'>
                    <Spinner size="xl" width={100} height={100} speed={"0.7s"} thickness={"5px"} />
                </div>
                : 
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
                                <input value={Username} onInput={e => setUsername(e.target.value)} className='drop-shadow-xl w-full h-[60px] rounded px-4' placeholder='Username' type="text" />
                            </div>
                            <div>
                                <input value={Password} onInput={e => setPassword(e.target.value)} type="password" className='drop-shadow-xl w-full h-[60px] rounded px-4' placeholder='Password' />
                            </div>
                        </div>
                        <div id="link" className='text-linkText mb-12'>
                            <i><Link to="/signup">Don't have an account yet? Create a new one here</Link></i>
                        </div>
                        <div id="btn" className='flex justify-center items-center w-[90%]'>
                            <div className='cursor-pointer drop-shadow-xl w-[50%] h-[60px] flex items-center justify-center font-semibold rounded bg-white' onClick={checkLogin}>
                                Login
                            </div>
                        </div>
                    </div>
                </div>
          }
      </div>
  )
}
