import React, { useState } from "react";
import ACandidate from "./aCandidate";

const Ballot = (props) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDeclined, setIsDeclined] = useState(false);

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDeclined(false);
  };

  const handleDecline = () => {
    setSelectedCandidate(null);
    setIsDeclined(true);
  };

  const handleVote = () => {
    if (selectedCandidate) {
      console.log(`Oy verilen aday: ${selectedCandidate.name}`);
    } else if (isDeclined) {
      console.log("Oy kullanmak istemiyorum seçildi.");
    } else {
      console.log(
        "Lütfen bir aday seçin veya oy kullanmak istemiyorum seçeneğini işaretleyin."
      );
    }
  };

  return (
    <div>
      <div className="ballot flex justify-center">
        {console.log(props.candidates)}
        {props.candidates.map((candidate) => (
          <ACandidate candidate={candidate} />
        ))}
      </div>
      <div>
        <div
          className={`decline-option flex justify-center ${
            isDeclined ? "selected" : ""
          }`}
          onClick={handleDecline}
        >
          <input
            name="selectedCandidate"
            type="radio"
            className="form-radio mt-3 mr-2 h-4 w-4 border-red-500  text-red-500 focus:ring-red-500"
            checked
          />
          Oy kullanmak istemiyorum
        </div>
      </div>
      <div className=" flex justify-center">
        <button
          className="text-black bg-red-700  px-4 py-1"
          onClick={handleVote}
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default Ballot;
