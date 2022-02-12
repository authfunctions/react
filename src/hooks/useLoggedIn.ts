import { NavigateFunction } from "react-router-dom";
import { useRefresh } from "./useRefresh";
import { useCheck } from "./useCheck";

export type LoggedInFunction = () => Promise<boolean>;

export function useLoggedIn(navigator: NavigateFunction): LoggedInFunction {
  const check = useCheck();
  const refresh = useRefresh(navigator);

  return async function (): Promise<boolean> {
    const { err: err1 } = await check();
    if (!err1) return true;
    const { err: err2 } = await refresh();
    return !err2;
  };
}
