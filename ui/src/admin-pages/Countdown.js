import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./Countdown.css";

const Countdown = (props) => {
  const authCtx = useContext(AuthContext);

  const handleDateChange = (event) => {
    authCtx.handleTargetDate(event.target.value);
  };
  const { days, hours, minutes } = authCtx.calculateCountdown();

  return (
    <div className="countdown-container">
      <div className="countdown-label">Countdown Timer</div>
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
      {props.isInSetDate && (
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
