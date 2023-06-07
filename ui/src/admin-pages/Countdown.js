import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./Countdown.css";

const Countdown = (props) => {
  const authCtx = useContext(AuthContext);

  const handleDateChange = async (event) => {
    authCtx.handleTargetDate(event.target.value);
    // BACKEND PUT REQUEST FOR SET FINISH DATE
    await axios.put(
      "http://localhost:3001/api/v1/admin/election",
      JSON.stringify({ endDate: event.target.value })
    );
    localStorage.setItem(
      "electionInfos",
      JSON.stringify({
        isActive: true,
        endDate: event.target.value,
      })
    );
  };
  const { days, hours, minutes } = authCtx.calculateCountdown();

  return (
    <div className="flex flex-col items-center justify-center mt-10 ml-100">
      {!props.isInSetDate && (
        <div className="text-2xl font-bold mb-8 ml-500">
          Oy Kullanmak İçin Kalan Süre
        </div>
      )}
      {!props.isInSetDate && (
        <div className="flex items-center justify-center gap-5 text-lg">
          <div className="flex flex-col items-center justify-center py-3 px-3 bg-gray-200 rounded">
            {days}
            <div className="text-xs mt-5">Gün</div>
          </div>
          <div className="flex flex-col items-center justify-center py-3 px-3 bg-gray-200 rounded">
            {hours}
            <div className="text-xs mt-5">Saat</div>
          </div>
          <div className="flex flex-col items-center justify-center py-3 px-3 bg-gray-200 rounded">
            {minutes}
            <div className="text-xs mt-5">Dakika</div>
          </div>
        </div>
      )}
      {props.isInSetDate && authCtx.isElectionStarted && (
        <input
          type="date"
          onChange={handleDateChange}
          className=" px-auto mt-50"
        />
      )}
    </div>
  );
};

export default Countdown;
