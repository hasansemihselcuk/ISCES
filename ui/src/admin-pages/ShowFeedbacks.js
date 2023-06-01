import React, { useEffect, useState } from "react";
import classes from "./ShowFeedback.module.css";
import TicketCard from "../components/TicketCard";
const FeedBack = () => {
  const [feedbacks, setFeedbacks] = useState([]);


  async function getFeedbacksHandler() {
    const responseFeedback = await fetch(
      "http://localhost:3001/api/v1/admin/tickets"
    );
    console.log(responseFeedback)
    const feedbackDatas = await responseFeedback.json();
    setFeedbacks(feedbackDatas);
    console.log(feedbackDatas);
  }
  useEffect(() => {
    getFeedbacksHandler();
  }, []);

  return (
    <React.Fragment>
      {" "}
      <p className={classes.header}>GERİ BİLDİRİM</p>
      <div className={classes.card}>
        {feedbacks.map((ticket) => (
          <TicketCard
            key={Math.random()}
            name="İnan Deniz Bal"
            title={ticket.ticketTitle}
            ticketText={ticket.ticketDescription}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default FeedBack;
