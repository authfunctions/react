import { NavigateFunction } from "react-router-dom";
import { internal_fetch_auth, Return } from "../hooks";
import { useToken } from "./useToken";

interface Props {
  login: string;
  password: string;
}

export type LoginFunction = (props: Props) => Promise<Return>;

interface ResponseBody {
  accessToken: string;
  refreshToken: string;
}

export function useLogin(navigator: NavigateFunction): LoginFunction {
  const { set: setAccess } = useToken("access");
  const { set: setRefresh } = useToken("refresh");

  return async function (props: Props): Promise<Return> {
    const { auth, data } = await internal_fetch_auth<Props, ResponseBody>(
      "/login",
      props,
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

    setAccess(data?.accessToken)
    setRefresh(data?.refreshToken)

    const redirectParam = new URLSearchParams(window.location.search).get("r");

    return {
      ...returnValues,
      nav: (path?: string) => navigator(path || redirectParam || "/"),
    };
  };
}
