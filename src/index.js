import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import Cookies from 'universal-cookie';
import Signup from './components/Signup/Signup';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const cookies = new Cookies();

// cookies.set("username", "arseni")
// cookies.remove("username")

let userSession = cookies.get("username")


let isLoggedInVar = false;

if(userSession == null) {
  isLoggedInVar = false;
} else {
  isLoggedInVar = true;
}

let IsLoggedIn = (props) => {
  const cookie = props.isLoggedIn;
  
  if(!cookie) {
    return <Login />
  }
  return <Main />
}

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<IsLoggedIn isLoggedIn={isLoggedInVar} />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
