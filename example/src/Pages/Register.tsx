import React, { useState } from "react";
import { useRegister } from "@authfunctions/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const navigator = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState<number | null>(null);

  const register = useRegister(navigator);

  async function onRegister() {
    const { code, err, nav } = await register({
      email: email,
      username: username,
      password: password,
    });

    if (err) return setAuthCode(code);

    return nav();
  }

  return (
    <div>
      <input
        value={email}
        placeholder="E-Mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onRegister}>Register!</button>
      <br />
      <Link to="/login">To Login Site</Link>
      {authCode ? <p>Error Code: {authCode}</p> : ""}
    </div>
  );
}
