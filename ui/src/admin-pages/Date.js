import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Countdown from "./Countdown";

const Date = () => {
  const [isReset, setIsReset] = useState(false);
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

  const reset = async () => {
    const res = await axios.delete(
      "http://localhost:3001/api/v1/admin/election"
    );
    console.log(res);
    if (res.data.status === "success") {
      setIsReset(true);
    }
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
      {authCtx.isElectionFinished && !isReset && (
        <button
          className="w-60 h-20 px-auto mt-50 mb-4 border-rose-700 border-2 hover:bg-red-700 rounded-lg"
          onClick={reset}
        >
          Yeni seçim için her şeyi sıfırlayın.
        </button>
      )}
      {authCtx.isElectionFinished && isReset && (
        <p className="w-60 h-20 px-auto mt-50 mb-4 ">Seçim sıfırlandı.</p>
      )}
    </div>
  ); // set dates
};

export default Date;
