import jwtDecode from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (err) {
    console.error("Error decoding token:", err);
    return true;
  }
};

export const logout = (navigate) => {
  localStorage.clear();
  navigate("/");
};

export const checkTokenAndRedirect = (navigate) => {
  const token = localStorage.getItem("jwt_token");
  if (!token || isTokenExpired(token)) {
    logout(navigate);
    return false;
  }
  return true;
};

export const getUserRole = () => {
  const token = localStorage.getItem("jwt_token");
  if (!token) return null;

  try {
    const { rol } = jwtDecode(token);
    return rol || null;
  } catch (err) {
    console.error("Error decoding token to get role:", err);
    return null;
  }
};
