import React, { useState } from "react";
import { useFetch, useLogout, useToken } from "@authfunctions/react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigator = useNavigate();

  const [authCode, setAuthCode] = useState<number | null>(null);

  const logout = useLogout(navigator);
  const fetcher = useFetch(navigator);
  const { values } = useToken("refresh");

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

    console.log(data?.name);
  }

  async function onToken() {
    console.log(values());
  }

  return (
    <div>
      <button onClick={onLogout}>Logout!</button>
      {authCode ? <p>Error Code: {authCode}</p> : ""}
      <br />
      <button onClick={onFetch}>Fetch! (console)</button>
      <br />
      <button onClick={onToken}>Token Data! (console)</button>
    </div>
  );
}
