import React, { useState } from "react";
import { useFetch, useLogout } from "@authfunctions/react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigator = useNavigate();

  const [authCode, setAuthCode] = useState<number | null>(null);

  const logout = useLogout(navigator);
  const fetcher = useFetch(navigator);

  async function onLogout() {
    const { code, err, nav } = await logout();

    if (err) return setAuthCode(code);

    return nav();
  }

  async function onFetch() {
    const { data, err, nav } = await fetcher<{ name: string }>("/test");

    if (err) {
      return nav();
    }

    console.log(data?.name)
  }
  
  return (
    <div>
      <button onClick={onLogout}>Logout!</button>
      {authCode ? <p>Error Code: {authCode}</p> : ""}
      <br />
      <button onClick={onFetch}>Fetch! (console)</button>
    </div>
  );
}
