import { setupAxiosInstance } from "api";

export function persistAuth(auth) {
  setupAxiosInstance(auth.token);
  localStorage.setItem("auth", JSON.stringify(auth));
}

export function loadAuth() {
  const persistedAuth = localStorage.getItem("auth");

  if (!persistedAuth) {
    return null;
  }

  const asJson = JSON.parse(persistedAuth);
  setupAxiosInstance(asJson.token);
  return asJson;
}
