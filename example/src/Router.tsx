import { Guard } from "@authfunctions/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Guard type="LoggedOutOnly">
              <Login />
            </Guard>
          }
        />
        <Route
          path="/register"
          element={
            <Guard type="LoggedOutOnly">
              <Register />
            </Guard>
          }
        />
        <Route
          path="/"
          element={
            <Guard type="LoggedInOnly">
              <Index />
            </Guard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
