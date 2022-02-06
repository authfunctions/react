import { NavigateFunction } from "react-router-dom";
import { internal_fetch_auth, NavigateFunctionWrapper } from "../hooks";
import { useToken } from "./useToken";

interface Props {
  refreshToken: string;
}

interface Return {
  code: number;
  err: boolean;
  nav: NavigateFunctionWrapper;
}

export type LogoutFunction = () => Promise<Return>;

export function useLogout(navigator: NavigateFunction): LogoutFunction {
  return async function (): Promise<Return> {
    const { get } = useToken("refresh");

    const { auth } = await internal_fetch_auth<Props, null>("/logout", {
      refreshToken: get(),
    });

    const returnValues = {
      code: auth.code,
      err: auth.err,
    };

    if (auth.err) {
      return {
        ...returnValues,
        nav: () => {},
      };
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    return {
      ...returnValues,
      nav: (path?: string) => navigator(path || "/login"),
    };
  };
}
