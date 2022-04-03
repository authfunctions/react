import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedIn } from "./hooks/useLoggedIn";

type Type = "LoggedInOnly" | "LoggedOutOnly";

type Props = {
  type: Type;
  children: ReactNode | ReactNode[];
  loader?: ReactNode | ReactNode[];
  path?: string;
};

export default function Guard({ children, type, loader, path }: Props) {
  const navigator = useNavigate();
  const loggedIn = useLoggedIn(navigator);
  const [loading, setLoading] = useState(true);
  const [loggedState, setLoggedState] = useState(false);

  useEffect(() => {
    (async () => {
      const loggedInLocalVar = await loggedIn();
      let lpath: undefined | string;
      if (type === "LoggedInOnly") {
        if (loggedInLocalVar) setLoggedState(true);
        else lpath = (path || "/login") + "?r=" + window.location.pathname;
      } else if (type === "LoggedOutOnly") {
        if (loggedInLocalVar === false) setLoggedState(true);
        else lpath = path || "/";
      }
      if (lpath) window.location.href = window.location.origin + lpath;
      setLoading(false);
    })();
  }, []);

  return (
    <>{loading ? loader || <p>Loading...</p> : loggedState ? children : ""}</>
  );
}
