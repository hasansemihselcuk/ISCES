import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import VotingPage from "./pages/VotingPage";
import ApplyCandidacy from "./pages/ApplyCandidacy";
import ElectionResult from "./pages/ElectionResults";
import CandidateWithdraw from "./pages/CandidateWithdraw";
import Announcement from "./admin-pages/Announcement";
import Date from "./admin-pages/Date";
import Authority from "./admin-pages/Authority";
import Result from "./admin-pages/Result";
import AnnounceCandidate from "./admin-pages/AnnounceCandidate";
import { useContext, useEffect } from "react";
import AuthContext from "./context/AuthContext";
import Feedback from "./pages/Feedback";
import ShowFeedbacks from "./admin-pages/ShowFeedbacks";
import CandidateControl from "./admin-pages/CandidateControl";
import Countdown from "./admin-pages/Countdown";
import axios from "axios";

function App() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/admin/election").then((res) => {
      if (!authCtx.isElectionStarted) {
        authCtx.handleElection();
      }
      localStorage.setItem(
        "electionInfos",
        JSON.stringify({
          isActive: true,
          endDate: res.data.data.election[0].endDate,
        })
      );
    });
  }, [authCtx]);

  return (
    <div className="">
      <BrowserRouter>
        <NavBar></NavBar>
        {authCtx.isElectionStarted && authCtx.isLoggedIn && (
          <Countdown isInSetDate={false}></Countdown>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!authCtx.isLoggedIn && (
            <Route path="/login" element={<LogInPage />} />
          )}

          {authCtx.isAdmin && (
            <Route path="/admin/feedback" element={<ShowFeedbacks />} />
          )}
          {authCtx.isAdmin && <Route path="/admin/date" element={<Date />} />}
          {authCtx.isAdmin && (
            <Route path="/admin/authority" element={<Authority />} />
          )}
          {authCtx.isAdmin && (
            <Route path="/admin/announcement" element={<Announcement />} />
          )}
          {authCtx.isAdmin && (
            <Route
              path="/admin/candidatecontrol"
              element={<CandidateControl />}
            />
          )}
          {authCtx.isAdmin && (
            <Route path="/admin/result" element={<Result />} />
          )}
          {authCtx.isAdmin && (
            <Route path="/admin/candidate" element={<AnnounceCandidate />} />
          )}
          {authCtx.isElectionStarted && (
            <Route path="/vote" element={<VotingPage />} />
          )}
          {!authCtx.isCandidate && (
            <Route path="/apply" element={<ApplyCandidacy />} />
          )}
          <Route path="/feedback" element={<Feedback />} />
          {authCtx.isCandidate && (
            <Route path="/withdraw" element={<CandidateWithdraw />} />
          )}
          {authCtx.isElectionFinished && (
            <Route path="/result" element={<ElectionResult />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
