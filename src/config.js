export const DOMAIN = window.location.origin;
export const BASE_URL = "/";
export const SSO_UI_URL = "https://sso.ui.ac.id/cas2";
export const SSO_UI_LOGIN_URL = `${SSO_UI_URL}/login?service=${DOMAIN}${BASE_URL}`;
export const SSO_UI_LOGOUT_URL = `${SSO_UI_URL}/logout?url=${DOMAIN}${BASE_URL}`;
