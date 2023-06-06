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
    <div className="countdown-container">
      {!props.isInSetDate && (
        <div className="countdown-label">Countdown Timer</div>
      )}
      {!props.isInSetDate && (
        <div className="countdown-timer">
          <div className="countdown-value">
            {days}
            <div className="countdown-unit">Days</div>
          </div>
          <div className="countdown-value">
            {hours}
            <div className="countdown-unit">Hours</div>
          </div>
          <div className="countdown-value">
            {minutes}
            <div className="countdown-unit">Minutes</div>
          </div>
        </div>
      )}
      {props.isInSetDate && authCtx.isElectionStarted && (
        <input
          type="date"
          onChange={handleDateChange}
          className="countdown-input"
        />
      )}
    </div>
  );
};

export default Countdown;
