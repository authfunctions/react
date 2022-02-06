const config = {
  AUTH_URL: "",
  API_URL: "",
};

export function setConfig(apiURL: string, authURL: string) {
  config.API_URL = apiURL;
  config.AUTH_URL = authURL;
}

interface AuthBody {
  code: number;
  err: boolean;
}

interface Body<T> {
  auth: AuthBody;
  data: T | null;
}

export type NavigateFunctionWrapper = (path?: string) => void;

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
