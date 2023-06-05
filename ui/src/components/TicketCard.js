import React from "react";
import classes from "./TicketCard.module.css";

const TicketCard = (props) => {
  const handleDeleteClick = (event) => {
    event.preventDefault();
    props.onDelete(props.ticket_id);
  };

  return (
    <form className={classes.form}>
      <label>{props.name}</label>
      <div className={classes.ticket}>
        <h1>{props.title}</h1>
        <p className={classes.white}>{props.ticketText}</p>
      </div>
      <button className={classes.button} onClick={handleDeleteClick}>
        Delete
      </button>
    </form>
  );
};

export default TicketCard;
