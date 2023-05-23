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
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          {authCtx.isAdmin && (
            <Route path="/admin/announcement" element={<Announcement />} />
          )}
          {authCtx.isAdmin && <Route path="/admin/date" element={<Date />} />}
          {authCtx.isAdmin && (
            <Route path="/admin/authority" element={<Authority />} />
          )}
          {authCtx.isAdmin && (
            <Route path="/admin/result" element={<Result />} />
          )}
          {authCtx.isAdmin && (
            <Route path="/admin/candidate" element={<AnnounceCandidate />} />
          )}
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/apply" element={<ApplyCandidacy />} />
          {authCtx.isCandidate && (
            <Route path="/withdraw" element={<CandidateWithdraw />} />
          )}
          <Route path="/result" element={<ElectionResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
