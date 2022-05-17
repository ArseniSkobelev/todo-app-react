import React from "react";

export default function Todo(props) {
  return (
    <>
      {props.status === 1 ? (
        <div
          className="flex flex-row items-center w-[100%] bg-white drop-shadow-xl rounded h-[70px] px-8 mb-6"
          id={props.title}
        >
          <div>
            <div
              className="h-[20px] w-[20px] cursor-pointer drop-shadow-lg bg-white"
              onClick={props.click}
            ></div>
          </div>
          <div className="flex justify-center items-center px-4 text-xl">
            <h1>{props.title}</h1>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
