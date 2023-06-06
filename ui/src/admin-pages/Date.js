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
        authCtx.handleElection();
      })
      .catch((err) => console.log(err));
  };

  const finishElection = async () => {
    await axios
      .put("http://localhost:3001/api/v1/admin/electionEnd")
      .then((res) => {
        authCtx.handleElection();
        authCtx.finishElection();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="items-center py-60">
      <Countdown isInSetDate={true} />;
      {authCtx.isElectionStarted && (
        <p className="ml-80">Seçim başladı. Seçimi bitirmek için:</p>
      )}
      {!authCtx.isElectionStarted && (
        <p className="ml-80">Seçim Henüz başlamadı veya sona erdi.</p>
      )}
      {!authCtx.isElectionStarted && (
        <button
          className="w-60 ml-80  h-20 border-rose-700 border-2 hover:bg-red-700 rounded-lg"
          onClick={startElection}
        >
          Seçimi Başlat
        </button>
      )}
      {authCtx.isElectionStarted && (
        <button
          className="w-60 h-20 ml-80 border-rose-700 border-2 hover:bg-red-700 rounded-lg"
          onClick={finishElection}
        >
          Seçimi Bitir
        </button>
      )}
    </div>
  ); // set dates
};

export default Date;
