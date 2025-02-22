import { app } from "@/firebase";
import { deleteCookie } from "cookies-next";
import { getAuth, signOut } from "firebase/auth";

const logout = (redirect?: boolean) => {
  const auth = getAuth(app);
  deleteCookie("token");
  localStorage.removeItem("persist:root");
  if (redirect) window.location.href = "/login";
  signOut(auth).catch((error) => {
    console.log("Error:", error);
  });
};

export default logout;
