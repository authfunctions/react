export { setConfig } from "./hooks";
export { useCheck } from "./hooks/useCheck";
export { useFetch } from "./hooks/useFetch";
export { useLoggedIn } from "./hooks/useLoggedIn";
export { useLogin } from "./hooks/useLogin";
export { useLogout } from "./hooks/useLogout";
export { useRefresh } from "./hooks/useRefresh";
export { useRegister } from "./hooks/useRegister";
export { useToken } from "./hooks/useToken";

import Guard from "./Guard";
export { Guard };

export type { CheckFunction } from "./hooks/useCheck";
export type { LoginFunction } from "./hooks/useLogin";
export type { LogoutFunction } from "./hooks/useLogout";
export type { RefreshFunction } from "./hooks/useRefresh";
export type { RegisterFunction } from "./hooks/useRegister";
