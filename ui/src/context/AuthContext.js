import axios from "axios";
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isCandidate: false,
  isAdmin: false,
  isClickedLogInButton: false,
  department: "",
  isElectionStarted: false,
  //chefId: null,
  onLogout: () => {},
  onLogin: () => {},
  handleLogin: () => {},
  handleCandidate: () => {},
  handleAdmin: () => {},
  withdrawCand: () => {},
  handleElection: () => {},
});

export const AuthContextProvider = (props) => {
  const [department, setDepartment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClickedLogInButton, setIsClickedLogInButton] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isElectionStarted, setIsElectionStarted] = useState(false);

  useEffect(() => {
    const sid = localStorage.getItem("sid");
    const studentInfo = localStorage.getItem("studentInfo");
    const aid = localStorage.getItem("aid");
    const adminInfo = localStorage.getItem("adminInfo");
    if (sid) {
      axios
        .get(`http://localhost:3001/api/v1/student/department/${sid}`)
        .then((res) => {
          setDepartment(res.data.data.depName.name);
        });
    }

    if (sid !== undefined && sid !== null) {
      if (JSON.parse(studentInfo).isCandidate) {
        setIsCandidate(true);
      }

      setIsLoggedIn(true);
    } else if (aid) {
      if (aid !== undefined && JSON.parse(adminInfo).isAdmin) {
        setIsAdmin(true);
      }
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // ELECTION BAŞLAMA BACKEND KONTROLÜ
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
    setDepartment("");
  };

  const handleCandidate = () => {
    setIsCandidate(true);
  };

  const handleElection = () => {
    setIsElectionStarted((prevState) => !prevState);
  };

  const withdrawCand = () => {
    setIsCandidate(false);
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
        department: department,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        handleLogin: handleLogin,
        handleCandidate: handleCandidate,
        handleAdmin: handleAdmin,
        withdrawCand: withdrawCand,
        handleElection: handleElection,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
