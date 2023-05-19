import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import VotingPage from "./pages/VotingPage";
import MakeApplication from "./pages/MakeApplication";
import ElectionResult from "./pages/ElectionResults";
import CandidateWithdraw from "./pages/CandidateWithdraw";
import Announcement from "./admin-pages/Announcement";
import Date from "./admin-pages/Date";
import Authority from "./admin-pages/Authority";
import Result from "./admin-pages/Result";
import AnnounceCandidate from "./admin-pages/AnnounceCandidate";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/admin/announcement" element={<Announcement />} />
          <Route path="/admin/date" element={<Date />} />
          <Route path="/admin/authority" element={<Authority />} />
          <Route path="/admin/result" element={<Result />} />
          <Route path="/admin/candidate" element={<AnnounceCandidate />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/apply" element={<MakeApplication />} />
          <Route path="/withdraw" element={<CandidateWithdraw />} />
          <Route path="/result" element={<ElectionResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
