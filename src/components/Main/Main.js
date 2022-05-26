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
        <div className="flex justify-center">
          <div className="bg-bg h-[100vh] flex items-center mt-auto flex-col bg-top-wave bg-no-repeat bg-top bg-contain w-[500px]">
            <div id="upper" className="mb-24 500:mb-16 py-2 px-4 500:py-8 500:px-0 415:py-6">
              <div id="upper-title" className="flex row items-center">
                <h1 className="text-white text-xl 500:text-3xl 500:mb-2 font-semibold">
                  Welcome back, <span className="capitalize">{username}</span>!
                </h1>
              </div>
              <p className="text-white 500:text-xl">
                You have currently {todos ? todos.length + " " : "0 "}
                {todos && todos.length === 1 ? " task" : "tasks"} awaiting completion
              </p>
            </div>
            <div id="todos" className="w-[90%] overflow-auto h-[57%]">
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
              className="flex justify-center items-center w-[90%] flex-col mb-4"
            >
              <Link to="/create" className="w-full">
                <div className="cursor-pointer drop-shadow-xl w-full mb-4 h-[60px] flex text-center items-center justify-center font-semibold rounded bg-white">
                  Create a new todo
                </div>
              </Link>
              <div
                className="cursor-pointer drop-shadow-xl w-full h-[60px] flex items-center text-center justify-center font-semibold rounded bg-white"
                onClick={Logout}
              >
                Logout
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
