import { useToken } from "./hooks/useToken";

const config = {
  AUTH_URL: "",
  API_URL: "",
};

export function setConfig(apiURL: string, authURL: string) {
  config.API_URL = apiURL;
  config.AUTH_URL = authURL;
}

export interface AuthBody {
  code: number;
  err: boolean;
}

export interface Body<T> {
  auth: AuthBody;
  data: T | null;
}

export interface Return {
  code: number;
  err: boolean;
  nav: NavigateFunctionWrapper;
}

export type NavigateFunctionWrapper = (path?: string) => void;

export type Methods = "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function internal_fetch_auth<T, U>(
  path: string,
  body: T,
): Promise<Body<U>> {
  const res = await fetch(`${config.AUTH_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
}

export async function internal_fetch_api<T>(
  url: string,
  method?: Methods,
  body?: any,
  headers?: object,
) {
  const { get } = useToken("access");
  const res = await fetch(config.API_URL + url, {
    method: method,
    body:
      method === "GET" || method === "HEAD" ? undefined : JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${get()}`,
      ...headers,
    },
  });

  const json: Body<T> = await res.json();

  return { json, res };
}