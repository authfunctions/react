import { useToken } from "@authfunctions/react";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

export default function Router() {
  const { values } = useToken("refresh");
  useEffect(() => {
    console.log(values());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}
