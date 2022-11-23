import jwtDecode from "jwt-decode";
import { Loginredirect } from "shared/LoginRedirect/LoginRedirect";

export function TokenCheck() {
  const storeToken = localStorage.getItem("token");
  if (storeToken === null || "") {
    Loginredirect();
  } else {
    const { exp } = jwtDecode(storeToken);
    const expirationTime = exp * 1000 - 6000;
    if (Date.now() >= expirationTime) {
      localStorage.clear();
      Loginredirect();
    }
  }
}
