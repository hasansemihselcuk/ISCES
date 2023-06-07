import axios from "axios";
import React, { useState } from "react";
import image from "./../image.jpg";

const AnounceACandidate = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const handleDuyurClick = async () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmation = async (confirmation) => {
    setIsConfirmationOpen(false);
    if (confirmation === "Evet") {
      await axios.post(
        `https://isces.onrender.com/api/v1/rep/announceRep/${props.data.id}`
      );
      props.onUpdate(props.data.id);
      setIsSubmitted(false);
      // Backend'e gönderme işlemleri burada yapılabilir
    }
  };

  if (isSubmitted) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
      <div className="rounded-full overflow-hidden h-16 w-16 m-2">
        <img src={image} alt="Profile" className="h-full w-full object-cover" />
      </div>
      <div className="text-center sm:text-left">
        <p className="font-bold">
          {props.data.name} {props.data.surname}
        </p>
        <p className="text-sm text-gray-500">{props.data.department}</p>
      </div>
      <div className="flex justify-center sm:justify-end w-full sm:w-auto">
        <button
          className="bg-red-500 hover:bg-red-700 text-white px-8 py-2 rounded"
          onClick={handleDuyurClick}
        >
          Duyur
        </button>
      </div>
      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-500">
          <div className="bg-white p-4 rounded shadow">
            <p>İşlemi onaylıyor musunuz?</p>
            <div className="flex justify-end mt-4 mr-8 ml-8 mb-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
                onClick={async () => await handleConfirmation("Evet")}
              >
                Evet
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={() => handleConfirmation("Hayır")}
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnounceACandidate;
