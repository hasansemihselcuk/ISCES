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
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClickedLogInButton, setIsClickedLogInButton] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const sid = localStorage.getItem("sid");
    const studentInfo = localStorage.getItem("studentInfo");
    if (studentInfo.isCandidate) {
      setIsCandidate(true);
    }
    if (studentInfo.isAdmin) {
      setIsAdmin(true);
    }
    if (sid !== undefined && sid !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("sid");
    localStorage.removeItem("studentInfo");
    setIsLoggedIn(false);
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
