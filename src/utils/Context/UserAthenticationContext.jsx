import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/config";

const UseAuthenticationContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([null]);
  const [close,setClose] = useState(false);

  function logOut() {
    window.localStorage.removeItem("insightfulToken");
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function EmailVerification() {
    return Promise((resolve, reject) => {
      sendEmailVerification(user)
        .then(() => {
          resolve({
            message: `Email Sent to ${user.email}`,
            status: true,
          });
        })
        .catch((error) => {
          reject({
            message: error,
            status: false,
          });
        });
    });
  }
  function githubSignIn() {
    const githubAuthProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UseAuthenticationContext.Provider
      value={{
        user,
        blogs,
        setBlogs,
        logOut,
        googleSignIn,
        githubSignIn,
        EmailVerification,
        close,
        setClose
      }}
    >
      {children}
    </UseAuthenticationContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UseAuthenticationContext);
}
