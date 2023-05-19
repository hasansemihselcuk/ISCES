import React, { useState } from "react";
import ACandidate from "./aCandidate";

const Ballot = (props) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDeclined, setIsDeclined] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsSubmitDisabled(true);
  };

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
      alert(`Oy verilen aday: ${selectedCandidate.name}`);
    } else if (isDeclined) {
      console.log("Oy kullanmak istemiyorum seçildi.");
      alert("Oy kullanmak istemiyorum seçildi.");
    } else {
      console.log(
        "Lütfen bir aday seçin veya oy kullanmak istemiyorum seçeneğini işaretleyin."
      );
      alert("asan");
    }
  };
  const remainder = props.candidates.length % 3;
  const isLastRowCentered = remainder !== 0 && remainder !== 1;

  return (
    <div>
      <div
        className={`grid grid-cols-3 gap-4 ${
          isLastRowCentered ? "justify-center" : ""
        }`}
      >
        {props.candidates.map((candidate, index) => (
          <div key={index} className="bg-gray-200 p-4">
            <ACandidate
              selectCandidate={handleCandidateSelect}
              changeOption={handleOptionChange}
              candidate={candidate}
            />
          </div>
        ))}
        {isLastRowCentered && (
          <div className="col-span-3 sm:col-start-2 sm:col-end-3 flex justify-center">
            {/* İçerik ekleme */}
          </div>
        )}
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
            onChange={handleOptionChange}
          />
          Oy kullanmak istemiyorum
        </div>
      </div>
      <div className=" flex justify-center">
        <button
          className="text-black bg-red-700  px-4 py-1"
          onClick={handleVote}
          disabled={isSubmitDisabled}
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default Ballot;
