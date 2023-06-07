import axios from "axios";
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isCandidate: false,
  isNominee: false,
  isAdmin: false,
  isClickedLogInButton: false,
  department: "",
  isElectionStarted: false,
  isElectionFinished: false,
  targetDate: "",
  //chefId: null,
  onLogout: () => {},
  onLogin: () => {},
  handleLogin: () => {},
  handleCandidate: () => {},
  handleNominee: () => {},
  handleAdmin: () => {},
  calculateCountdown: () => {},
  handleTargetDate: () => {},
  withdrawCand: () => {},
  finishElection: () => {},
  startElection: () => {},
});

export const AuthContextProvider = (props) => {
  const [department, setDepartment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClickedLogInButton, setIsClickedLogInButton] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [isNominee, setIsNominee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isElectionStarted, setIsElectionStarted] = useState(false);
  const [targetDate, setTargetDate] = useState(null);
  const [isElectionFinished, setIsElectionFinished] = useState(false);

  useEffect(() => {
    const sid = localStorage.getItem("sid");
    const studentInfo = localStorage.getItem("studentInfo");
    const aid = localStorage.getItem("aid");
    const adminInfo = localStorage.getItem("adminInfo");
    const electionInfo = JSON.parse(localStorage.getItem("electionInfos"));
    if (electionInfo) {
      setIsElectionStarted(electionInfo.isActive);
    }
    if (sid) {
      axios
        .get(`https://isces.onrender.com/api/v1/student/department/${sid}`)
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
  }, [isLoggedIn, isElectionStarted, targetDate]);

  const logoutHandler = () => {
    const sid = localStorage.getItem("sid");
    const aid = localStorage.getItem("aid");

    if (sid) {
      localStorage.removeItem("electionInfos");
      localStorage.removeItem("sid");
      localStorage.removeItem("studentInfo");
    }
    if (aid) {
      localStorage.removeItem("electionInfos");
      localStorage.removeItem("aid");
      localStorage.removeItem("adminInfo");
    }
    localStorage.removeItem("isReset");
    setIsAdmin(false);
    setIsCandidate(false);
    setIsLoggedIn(false);
    setDepartment("");
  };

  const handleTargetDate = (date) => {
    setTargetDate(date);
  };

  const handleNominee = () => {
    setIsNominee((prevState) => !prevState);
  };

  const calculateCountdown = () => {
    const now = new Date().getTime();
    if (localStorage.getItem("electionInfos")) {
      const endDate = JSON.parse(localStorage.getItem("electionInfos")).endDate;
      const targetTime = new Date(endDate).getTime();
      const remainingTime = targetTime - now;

      // Calculate days, hours, and minutes
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );

      return {
        days,
        hours,
        minutes,
      };
    } else {
      const day = 0;
      const month = 0;
      const year = 0;
      return {
        day,
        month,
        year,
      };
    }
  };

  const handleCandidate = () => {
    setIsCandidate(true);
  };

  const finishElection = () => {
    setIsElectionFinished(true);
    setIsElectionStarted(false);
  };

  const startElection = () => {
    setIsElectionStarted(true);
  };

  const withdrawCand = () => {
    setIsNominee(false);
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
        isElectionStarted: isElectionStarted,
        isNominee: isNominee,
        isElectionFinished: isElectionFinished,
        targetDate: targetDate,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        handleLogin: handleLogin,
        handleCandidate: handleCandidate,
        handleAdmin: handleAdmin,
        withdrawCand: withdrawCand,
        startElection: startElection,
        calculateCountdown: calculateCountdown,
        handleTargetDate: handleTargetDate,
        finishElection: finishElection,
        handleNominee: handleNominee,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
