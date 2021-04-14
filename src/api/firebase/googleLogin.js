import firebase from "./index";
import { postGoogleLogin } from "../authApi";

const provider = new firebase.auth.GoogleAuthProvider();

const googleLogin = async (nextPage, setUser) => {
  const user = await firebase.auth().signInWithPopup(provider);

  postGoogleLogin(user.email, user.displayName);
  setUser({ email: user.email, name: user.displayName });
  nextPage();
};

export default googleLogin;
