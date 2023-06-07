import React, { useState } from "react";
import ACandidate from "./aCandidate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ballot = (props) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDeclined, setIsDeclined] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const navigate = useNavigate();

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
    setIsSubmitted(true);
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
  const sendVote = async () => {
    const id = await localStorage.getItem("sid");
    console.log(selectedCandidate);
    const res = await axios.put(
      `https://isces.onrender.com/api/v1/student/${id}/${selectedCandidate.id}`
    );
    if (res.data.status === "success") {
      console.log("Oy gönderildi");
      // Önce localStorage'dan studentInfo'yu alın
      const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

      // isVoted değerini güncelleyin
      studentInfo.isVoted = true;

      // Güncellenen studentInfo'yu localStorage'a geri kaydedin
      localStorage.setItem("studentInfo", JSON.stringify(studentInfo));

      navigate("/");
    } else {
      console.log("Oy gönderilemedi");
    }
    setIsSubmitted(false);
  };

  const remainder = props.candidates.length % 3;
  const isLastRowCentered = remainder !== 0 && remainder !== 1;

  return (
    <div className="relative">
      <div
        className={`grid grid-cols-3 gap-4 ${
          isLastRowCentered ? "justify-center " : " "
        } ${isSubmitted ? "blur" : " "}`}
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
      <div
        className={
          isSubmitted
            ? "fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-500"
            : "hidden"
        }
      >
        {isSubmitted && !isDeclined && (
          <div className="bg-white p-4 rounded shadow">
            <p>Oyunuzu bu kişiye kullanmak istiyor musunuz?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={sendVote}
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
              >
                Evet
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsSubmitted(false);
                }}
              >
                Hayır
              </button>
            </div>
          </div>
        )}
        {isSubmitted && isDeclined && (
          <div className="bg-white p-4 rounded shadow">
            <p>Oyunuzu kimseye vermek istemediğinizden emin misiniz?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={sendVote}
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
              >
                Evet
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsSubmitted(false);
                }}
              >
                Hayır
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <div
          className={`decline-option flex justify-center ${
            isDeclined ? "selected" : ""
          } ${isSubmitted ? "blur" : " "} `}
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
      <div
        className={
          isSubmitted ? "flex justify-center blur" : "flex justify-center"
        }
      >
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
