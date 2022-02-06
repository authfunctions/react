import { setConfig } from "@authfunctions/react";
import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";

setConfig("http://127.0.0.1:5000/api", "http://127.0.0.1:5000/auth");

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root"),
);
