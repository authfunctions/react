import { NavigateFunction } from "react-router-dom";
import { internal_fetch_auth, Return } from "../hooks";

interface Props {
  email: string;
  username: string;
  password: string;
}

export type RegisterFunction = (props: Props) => Promise<Return>;

type ResponseBody = null

export function useRegister(navigator: NavigateFunction): RegisterFunction {
  return async function (props: Props): Promise<Return> {
    const { auth } = await internal_fetch_auth<Props, ResponseBody>(
      "/register",
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

    return {
      ...returnValues,
      nav: (path?: string) => navigator(path || "/login"),
    };
  };
}
