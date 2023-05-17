import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import VotingPage from "./pages/VotingPage";
import MakeApplication from "./pages/MakeApplication";
import ElectionResult from "./pages/ElectionResults";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />}></Route>
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/apply" element={<MakeApplication />} />
          <Route path="/result" element={<ElectionResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
