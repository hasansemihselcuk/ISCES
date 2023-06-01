import React, { useEffect, useState } from "react";
import classes from "./ShowFeedback.module.css";
import TicketCard from "../components/TicketCard";
import axios from "axios";
const FeedBack = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/admin/tickets")
      .then((res) => {
        setFeedbacks(res.data.data.tickets);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <p className={classes.header}>GERİ BİLDİRİM</p>
      <div className={classes.card}>
        {feedbacks.map((ticket) => (
          <TicketCard
            key={Math.random()}
            name={ticket.studentNameSurname}
            title={ticket.ticketTitle}
            ticketText={ticket.ticketDescription}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedBack;
