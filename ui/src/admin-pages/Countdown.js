import React, { useState } from 'react';
import './Countdown.css';

const Countdown = () => {
  const [targetDate, setTargetDate] = useState(null);

  const handleDateChange = (event) => {
    setTargetDate(event.target.value);
  };

  const calculateCountdown = () => {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const remainingTime = targetTime - now;

    // Calculate days, hours, and minutes
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

    return {
      days,
      hours,
      minutes,
    };
  };

  const { days, hours, minutes } = calculateCountdown();

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
      <input type="date" onChange={handleDateChange} className="countdown-input" />
    </div>
  );
};

export default Countdown;
