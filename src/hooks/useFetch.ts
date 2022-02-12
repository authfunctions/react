import { NavigateFunction } from "react-router-dom";
import { useRefresh } from "./useRefresh";
import {
  AuthBody,
  Body,
  internal_fetch_api,
  Methods,
  NavigateFunctionWrapper,
} from "../hooks";
import { useLogout } from "./useLogout";

export type FetchFunction = <T>(
  url: string,
  method?: Methods | undefined,
  body?: any,
  headers?: object | undefined,
) => Promise<{
  err: boolean;
  res: Response;
  data: T | null;
  nav: NavigateFunctionWrapper;
  auth: AuthBody;
}>;

export function useFetch(navigator: NavigateFunction): FetchFunction {
  return async function <T>(
    url: string,
    method?: Methods,
    body?: any,
    headers?: object,
  ): Promise<{
    err: boolean;
    res: Response;
    data: Body<T>["data"];
    nav: NavigateFunctionWrapper;
    auth: AuthBody;
  }> {
    const refresh = useRefresh(navigator);
    const logout = useLogout(navigator);

    const {
      json: { auth: auth1, data: data1 },
      res: res1,
    } = await internal_fetch_api<T>(url, method, body, headers);

    if (auth1.code === 1 || auth1.code === 2) {
      const { code, err } = await refresh();

      if (err && code !== 5) {
        return {
          auth: auth1,
          data: data1,
          err: true,
          nav: (await logout()).nav,
          res: res1,
        };
      }

      const {
        json: { auth: auth2, data: data2 },
        res: res2,
      } = await internal_fetch_api<T>(url, method, body, headers);

      if (auth2.code === 1 || auth2.code === 2) {
        return {
          auth: auth2,
          data: data2,
          err: true,
          nav: (await logout()).nav,
          res: res2,
        };
      }

      return {
        auth: auth2,
        data: data2,
        err: false,
        nav: () => {},
        res: res2,
      };
    }

    return { auth: auth1, data: data1, err: false, nav: () => {}, res: res1 };
  };
}
