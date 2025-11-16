import { jwtDecode } from "jwt-decode";

const userData = () => {
  const token = localStorage.getItem("token");
  if (!token) return null; // No token → no user

  try {
    const decoded = jwtDecode(token);

    // Check expiration
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.warn("Token expired");
      localStorage.removeItem("token");
      return null;
    }

    return decoded; // { userId, username, email, exp }
  } catch (err) {
    console.error("Invalid token", err);
    localStorage.removeItem("token");
    return null;
  }
};

export default userData;
