import jwtDecode from "jwt-decode";

type Tokens = "refresh" | "access";

interface TokenPayload {
  id: string;
  email: string;
  username: string;
}

export function useToken(tokenName: Tokens) {
  return {
    get: () => localStorage.getItem(`${tokenName}Token`) || "",
    set: (token?: string | null) =>
      localStorage.setItem(`${tokenName}Token`, token || ""),
    del: () => localStorage.removeItem(`${tokenName}Token`),
    values: (): TokenPayload | null => {
      const token = useToken("refresh").get();

      if (!token) return null;

      return <TokenPayload>jwtDecode(token);
    },
  };
}
