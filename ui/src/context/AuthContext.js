import { set } from "mongoose";
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isCandidate: false,
  isAdmin: false,
  isClickedLogInButton: false,
  //chefId: null,
  onLogout: () => {},
  onLogin: () => {},
  handleLogin: () => {},
  handleCandidate: () => {},
  handleAdmin: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClickedLogInButton, setIsClickedLogInButton] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const sid = localStorage.getItem("sid");
    const studentInfo = localStorage.getItem("studentInfo");

    if (sid !== undefined && sid !== null) {
      if (JSON.parse(studentInfo).isCandidate) {
        console.log("a");
        setIsCandidate(true);
      }
      if (JSON.parse(studentInfo).isAdmin) {
        console.log("b");
        setIsAdmin(true);
      }
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const logoutHandler = () => {
    const sid = localStorage.getItem("sid");
    const aid = localStorage.getItem("aid");
    if (sid) {
      localStorage.removeItem("sid");
      localStorage.removeItem("studentInfo");
    }
    if (aid) {
      localStorage.removeItem("aid");
      localStorage.removeItem("adminInfo");
    }
    setIsAdmin(false);
    setIsCandidate(false);
    setIsLoggedIn(false);
  };

  const handleCandidate = () => {
    setIsCandidate(true);
  };

  const handleAdmin = () => {
    setIsAdmin(true);
  };

  const handleLogin = () => {
    setIsClickedLogInButton((prevState) => !prevState);
  };

  const loginHandler = (data) => {
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isClickedLogInButton: isClickedLogInButton,
        isCandidate: isCandidate,
        isAdmin: isAdmin,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        handleLogin: handleLogin,
        handleCandidate: handleCandidate,
        handleAdmin: handleAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
