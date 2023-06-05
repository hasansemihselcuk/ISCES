import axios from "axios";
import { useState } from "react";

const Date = () => {
  const [electionStarted, setElectionStarted] = useState(false);

  const startElection = async () => {
    await axios
      .post("http://localhost:3001/api/v1/admin/electionStart")
      .then((res) => {
        setElectionStarted(true);
      })
      .catch((err) => console.log(err));
  };

  const finishElection = async () => {
    await axios
      .put("http://localhost:3001/api/v1/admin/electionEnd")
      .then((res) => {
        setElectionStarted(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="items-center py-60">
      {electionStarted && (
        <p className="ml-80">Seçim başladı. Seçimi bitirmek için:</p>
      )}
      {!electionStarted && (
        <p className="ml-80">Seçim Henüz başlamadı veya sona erdi.</p>
      )}
      {!electionStarted && (
        <button
          className="w-60 ml-80  h-20 border-rose-700 border-2 hover:bg-red-700 rounded-lg"
          onClick={startElection}
        >
          Seçimi Başlat
        </button>
      )}
      {electionStarted && (
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
