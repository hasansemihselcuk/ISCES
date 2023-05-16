import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import VotingPage from "./pages/VotingPage";
function App() {
  return (
    <div className="">
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />}></Route>
          <Route path="/vote" element={<VotingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
