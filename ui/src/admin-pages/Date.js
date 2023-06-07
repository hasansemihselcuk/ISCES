import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Countdown from "./Countdown";

const Date = () => {
  const authCtx = useContext(AuthContext);
  const startElection = async () => {
    await axios
      .post("http://localhost:3001/api/v1/admin/electionStart")
      .then((res) => {
        authCtx.startElection();
        localStorage.setItem(
          "electionInfos",
          JSON.stringify({ isActive: true })
        );
      })
      .catch((err) => console.log(err));
  };

  const finishElection = async () => {
    await axios
      .put("http://localhost:3001/api/v1/admin/electionEnd")
      .then((res) => {
        authCtx.finishElection();
        localStorage.removeItem("electionInfos");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="items-center  flex flex-col items-center justify-center py-20">
      <Countdown isInSetDate={true} />;
      {authCtx.isElectionStarted && (
        <p className="mb-4">Seçim başladı. Seçimi bitirmek için:</p>
      )}
      {!authCtx.isElectionStarted && (
        <p className="mb-4">Seçim Henüz başlamadı veya sona erdi.</p>
      )}
      {!authCtx.isElectionStarted && (
        <button
          className="w-60 px-auto mt-50 mb-4  h-20 border-rose-700 border-2 hover:bg-red-700 rounded-lg"
          onClick={startElection}
        >
          Seçimi Başlat
        </button>
      )}
      {authCtx.isElectionStarted && (
        <button
          className="w-60 h-20 px-auto mt-50 mb-4 border-rose-700 border-2 hover:bg-red-700 rounded-lg"
          onClick={finishElection}
        >
          Seçimi Bitir
        </button>
      )}
    </div>
  ); // set dates
};

export default Date;
