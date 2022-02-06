import React, { useState } from "react";
import { useLogout } from "@authfunctions/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Index() {
  const navigator = useNavigate();

  const [authCode, setAuthCode] = useState<number | null>(null);

  const logout = useLogout(navigator);

  async function onLogout() {
    const { code, err, nav } = await logout();

    if (err) return setAuthCode(code);

    return nav();
  }
  return (
    <div>
      <button onClick={onLogout}>Logout!</button>
      {authCode ? <p>Error Code: {authCode}</p> : ""}
    </div>
  );
}
