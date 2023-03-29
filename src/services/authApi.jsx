import { useAsync } from "../hooks/useAsync";
import { api } from "./api";

export function useSignup() {
  const req = (name, email, password) => {
    const url = "/users";
    const body = { name, email, password };
    return api.post(url, body);
  }

  return useAsync(req, false);
}

export function useSignin() {
  const req = (login, password) => {
    const url = "/login";
    const body = { login, password };
    return api.post(url, body);
  }

  return useAsync(req, false);
}

