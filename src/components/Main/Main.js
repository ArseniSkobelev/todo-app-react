import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Spinner } from "@chakra-ui/spinner";
import Todo from "../Todo/Todo";

const cookies = new Cookies();

export default function Main() {
  let username = cookies.get("username");
  let userSession = cookies.get("username") != null;

  const [statusMessage, setStatusMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  let Logout = () => {
    cookies.remove("username");
    cookies.remove("email");
    cookies.remove("password");
    navigate("/login");
  };

  const changeStatus = (event, title) => {
    setIsLoading(true);
    let data = {
      owner: username,
      title: title,
      newstatus: 0,
    };

    const url = "http://localhost:3001/changeTodoStatus";
    fetch(url, {
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
        setTodos(data.data);
        console.log(todos);
        setTimeout(() => {
          setStatusMessage();
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        return console.error("Error:", error);
      });
    window.location.reload(false);
    return;
  };

  const getUserTodos = () => {
    setIsLoading(true);
    let data = {
      owner: username,
    };

    const url = "http://localhost:3001/getTodos";
    fetch(url, {
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
        setTodos(data.data);
        console.log(todos);
        setTimeout(() => {
          setStatusMessage();
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        return console.error("Error:", error);
      });
    return;
  };

  useEffect(() => {
    if (userSession === false) {
      navigate("/login");
    }
  });

  useEffect(() => {
    setIsLoading(true);
    let data = {
      owner: cookies.get("username"),
    };

    const url = "http://localhost:3001/getTodos";
    fetch(url, {
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
        setTodos(data.data);
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
  }, []);

  return (
    <>
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
        <div className="bg-bg h-[100vh] flex items-center flex-col py-12">
          <div className="w-[90%] sm:w-[70%] md:w-[60%] items-center lg:w-[50%] xl:w-[30%] flex flex-col">
            <div id="upper" className="mb-12">
              <div id="upper-title" className="flex row items-center mb-2">
                <div id="svg" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44.943"
                    height="26.657"
                    viewBox="0 0 44.943 26.657"
                    className="cursor-pointer"
                    onClick={Logout}
                  >
                    <g
                      id="Icon_feather-arrow-left"
                      data-name="Icon feather-arrow-left"
                      transform="translate(-5.5 -4.672)"
                    >
                      <path
                        id="Path_1"
                        data-name="Path 1"
                        d="M48.443,18H7.5"
                        transform="translate(0)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                      />
                      <path
                        id="Path_2"
                        data-name="Path 2"
                        d="M18,28.5,7.5,18,18,7.5"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                      />
                    </g>
                  </svg>
                </div>
                <h1 className="text-mainText text-3xl font-semibold ml-4">
                  Welcome back, <span className="capitalize">{username}</span>!
                </h1>
              </div>
              <p className="text-xl w-[90%] pl-16">
                You have currently {todos ? todos.length : "0"} tasks awaiting
                completion
              </p>
            </div>
            <div id="todos" className="w-[90%]">
              {todos
                ? todos.map(function (item, i) {
                    if (item.status === 0) return <></>;
                    return (
                      <Todo
                        key={i}
                        title={item.Title}
                        click={(event) => changeStatus(event, item.Title)}
                        status={item.Status}
                      />
                    );
                  })
                : ""}
            </div>
            <div id="link" className="text-linkText mb-12"></div>
            <div
              id="btn"
              className="flex justify-center items-center w-[90%] flex-row"
            >
              <div className="cursor-pointer drop-shadow-xl w-[50%] h-[60px] flex text-center items-center justify-center font-semibold rounded bg-white">
                <Link to="/create">Create a new todo</Link>
              </div>
              <div
                className="ml-4 cursor-pointer drop-shadow-xl w-[50%] h-[60px] flex items-center text-center justify-center font-semibold rounded bg-white"
                onClick={getUserTodos}
              >
                Refresh
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
    </>
  );
}
