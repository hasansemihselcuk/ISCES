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

  const handleDeleteTicket = (ticketId) => {
    axios
      .delete(`http://localhost:3001/api/v1/admin/tickets/${ticketId}`)
      .then(() => {
        // Remove the deleted ticket from the feedbacks state
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.filter((ticket) => ticket._id !== ticketId)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p className={classes.header}>GERİ BİLDİRİM</p>
      <div className={classes.card}>
        {feedbacks.map((ticket) => (
          <TicketCard
            key={ticket._id}
            name={ticket.studentNameSurname}
            title={ticket.ticketTitle}
            ticketText={ticket.ticketDescription}
            onDelete={() => handleDeleteTicket(ticket._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedBack;
