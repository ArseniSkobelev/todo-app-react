import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Spinner } from "@chakra-ui/spinner";

const cookies = new Cookies();

export default function Login() {
  cookies.remove("username");
  cookies.remove("email");
  cookies.remove("password");

  const navigate = useNavigate();

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function checkLogin() {
    setIsLoading(true);
    let data = {
      username: Username,
      password: Password,
    };

    console.log(data);

    const url = "http://localhost:3001/checkLogin";
    await fetch(url, {
      method: "POST",
      cors: "*",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        cookies.set("username", Username);
        setIsLoading(false);
        if (data.message === true) {
          navigate("/main");
        } else {
          setErrorMessage("❌ The username or password were incorrect!");
          setTimeout(() => {
            setErrorMessage();
          }, 3000);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        return console.error("Error:", error);
      });
    return;
  }

  return (
    <div>
      {isLoading ? (
        <div className="bg-bg h-[100vh] w-[100vw] flex items-center justify-center flex-col">
          <h1 className="font-semibold mb-8 text-3xl">Loading</h1>
          <Spinner
            size="xl"
            width={100}
            height={100}
            speed={"0.7s"}
            thickness={"5px"}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="bg-bg h-[100vh] flex items-center flex-col bg-top-wave bg-no-repeat bg-top bg-contain w-[500px]">
            <div className="items-center flex flex-col w-full px-8">
              <div id="upper" className="mb-12">
                <div className="mb-32 pt-8">
                  <h1 className="text-white text-3xl font-semibold">
                    ToDo App 🗿
                  </h1>
                </div>
                <h1 className="text-mainText text-3xl font-semibold">Login</h1>
                <p className="text-xl w-[100%] mt-4">
                  Enter your login data or create a new account to use this
                  service
                </p>
              </div>
              <div id="inputs" className="w-[100%] mb-4">
                <div className="mb-8">
                  <input
                    value={Username}
                    onInput={(e) => setUsername(e.target.value)}
                    className="drop-shadow-xl w-full h-[60px] rounded px-4"
                    placeholder="Username"
                    type="text"
                  />
                </div>
                <div>
                  <input
                    value={Password}
                    onInput={(e) => setPassword(e.target.value)}
                    type="password"
                    className="drop-shadow-xl w-full h-[60px] rounded px-4"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div id="link" className="text-linkText mt-4">
                <i>
                  <Link to="/signup">
                    Don't have an account yet? Create a new one here
                  </Link>
                </i>
              </div>
            </div>
            <div className="bg-bot-wave w-full flex bg-cover pt-32 bg-no-repeat bg-center mt-auto">
              <div
                id="btn"
                className="flex justify-center items-center w-full pb-8"
              >
                <div
                  className="cursor-pointer drop-shadow-xl w-[90%] h-[60px] flex items-center justify-center font-semibold rounded bg-white"
                  onClick={checkLogin}
                >
                  Login
                </div>
              </div>
            </div>
            {errorMessage && (
              <p className="bottom-0 absolute py-8 px-4 mb-2 rounded bg-black text-white">
                {" "}
                {errorMessage}{" "}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
