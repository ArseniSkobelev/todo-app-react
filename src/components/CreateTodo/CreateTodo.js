import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Spinner } from "@chakra-ui/spinner";

const cookies = new Cookies();

export default function CreateTodo() {
  const navigate = useNavigate();

  const [TodoTitle, setTodoTitle] = useState("");

  const [statusMessage, setStatusMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function checkLogin() {
    setIsLoading(true);
    let data = {
      title: TodoTitle,
      status: 1,
      owner: cookies.get("username"),
    };

    console.log(data);

    const url = "http://localhost:3001/createTodo";
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
        setIsLoading(false);
        setStatusMessage(data.message);
        setTimeout(() => {
          setStatusMessage();
        }, 3000);
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
          <div className="bg-bg h-[100vh] flex items-center flex-col bg-top-wave bg-no-repeat bg-top bg-contain w-[500px] px-8">
            <div id="upper" className="mb-12">
              <div className="mb-32 pt-8">
                <h1 className="text-white text-3xl font-semibold">
                  ToDo App 🗿
                </h1>
              </div>
              <h1 className="text-mainText text-2xl font-semibold mb-2">
                Create Todo
              </h1>
              <p className="text-xl w-[90%]">
                Enter a todo title and click the 'Create todo' button to create
                a new todo.
              </p>
            </div>
            <div id="inputs" className="w-[100%] mb-4">
              <div className="mb-8">
                <input
                  value={TodoTitle}
                  onInput={(e) => setTodoTitle(e.target.value)}
                  className="drop-shadow-xl w-full h-[60px] rounded px-4"
                  placeholder="Todo title"
                  type="text"
                />
              </div>
            </div>
            <div id="link" className="text-linkText mb-12">
              <i>
                <Link to="/main">Go back</Link>
              </i>
            </div>
            <div id="btn" className="flex justify-center items-center w-[90%]">
              <div
                className="cursor-pointer drop-shadow-xl w-[50%] h-[60px] flex items-center justify-center font-semibold rounded bg-white"
                onClick={checkLogin}
              >
                Create todo
              </div>
            </div>
          </div>
          {statusMessage && (
            <p className="bottom-0 absolute py-8 px-4 mb-2 rounded bg-black text-white">
              {" "}
              {statusMessage}{" "}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
