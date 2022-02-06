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

export type RefreshFunction = () => Promise<Return>;

interface ResponseBody {
  accessToken: string;
}

export function useRefresh(navigator: NavigateFunction): RefreshFunction {
  return async function (): Promise<Return> {
    const { get } = useToken("refresh");
    const { set } = useToken("access");

    const { auth, data } = await internal_fetch_auth<Props, ResponseBody>(
      "/refresh",
      { refreshToken: get() },
    );

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

    set(data?.accessToken);

    return {
      ...returnValues,
      nav: (path?: string) => navigator(path || "/login"),
    };
  };
}
