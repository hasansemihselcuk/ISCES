import axios from "axios";
import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isCandidate: false,
  isAdmin: false,
  isClickedLogInButton: false,
  department: "",
  isElectionStarted: false,
  isElectionFinished: false,
  //chefId: null,
  onLogout: () => {},
  onLogin: () => {},
  handleLogin: () => {},
  handleCandidate: () => {},
  handleAdmin: () => {},
  calculateCountdown: () => {},
  handleTargetDate: () => {},
  withdrawCand: () => {},
  handleElection: () => {},
  finishElection: () => {},
});

export const AuthContextProvider = (props) => {
  const [department, setDepartment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClickedLogInButton, setIsClickedLogInButton] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isElectionStarted, setIsElectionStarted] = useState(false);
  const [targetDate, setTargetDate] = useState(null);
  const [isElectionFinished, setIsElectionFinished] = useState(false);

  useEffect(() => {
    const sid = localStorage.getItem("sid");
    const studentInfo = localStorage.getItem("studentInfo");
    const aid = localStorage.getItem("aid");
    const adminInfo = localStorage.getItem("adminInfo");
    const isElectionStarted = JSON.parse(localStorage.getItem("electionInfos"));

    if (isElectionStarted) {
      if (isElectionStarted.isActive) {
        setIsElectionStarted(true);
      }
    } else {
      axios.get("http://localhost:3001/api/v1/admin/election").then((res) => {
        console.log(res);
        setIsElectionStarted(res.data.data.election.isActive);
        localStorage.setItem(
          "electionInfos",
          JSON.stringify({
            isActive: true,
            endDate: res.data.data.election.endDate,
          })
        );
      });
    }
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
    localStorage.removeItem("electionInfos");
    setIsAdmin(false);
    setIsCandidate(false);
    setIsLoggedIn(false);
    setDepartment("");
  };

  const handleTargetDate = (date) => {
    setTargetDate(date);
  };

  const calculateCountdown = () => {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
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
  };

  const handleCandidate = () => {
    setIsCandidate(true);
  };

  const finishElection = () => {
    setIsElectionFinished((prevState) => !prevState);
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
        isElectionStarted: isElectionStarted,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        handleLogin: handleLogin,
        handleCandidate: handleCandidate,
        handleAdmin: handleAdmin,
        withdrawCand: withdrawCand,
        handleElection: handleElection,
        calculateCountdown: calculateCountdown,
        handleTargetDate: handleTargetDate,
        finishElection: finishElection,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
