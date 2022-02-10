import { internal_fetch_auth, Return } from "../hooks";
import { useToken } from "./useToken";

interface Props {
  refreshToken: string;
  accessToken: string;
}

export type CheckFunction = () => Promise<Omit<Return, "nav">>;

export function useCheck(): CheckFunction {
  return async function (): Promise<Omit<Return, "nav">> {
    const { get: getRefresh } = useToken("refresh");
    const { get: getAccess } = useToken("access");

    const { auth } = await internal_fetch_auth<Props, null>("/check", {
      accessToken: getAccess(),
      refreshToken: getRefresh(),
    });

    const returnValues = {
      code: auth.code,
      err: auth.err,
    };

    if (auth.err) {
      return {
        ...returnValues,
      };
    }

    return {
      ...returnValues,
    };
  };
}
