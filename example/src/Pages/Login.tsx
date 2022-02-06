import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@authfunctions/react";

export default function Login() {
  const navigator = useNavigate();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState<number | null>(null);

  const login = useLogin(navigator);

  async function onLogin() {
    const { code, err, nav } = await login({
      login: loginValue,
      password: password,
    });

    if (err) return setAuthCode(code);

    return nav();
  }

  return (
    <div>
      <input
        value={loginValue}
        placeholder="E-Mail or Username"
        onChange={(e) => setLoginValue(e.target.value)}
      />
      <input
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onLogin}>Login!</button>
      <br />
      <Link to="/register">To Register Site</Link>
      {authCode ? <p>Error Code: {authCode}</p> : ""}
    </div>
  );
}
