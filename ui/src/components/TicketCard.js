import React from "react";
import classes from "./TicketCard.module.css";

const TicketCard = (props) => {
  const handleDeleteClick = (event) => {
    event.preventDefault();
    props.onDelete();
  };

  return (
    <form className={classes.form}>
      <label>{props.name}</label>
      <div className={classes.ticket}>
        <p>{props.title}</p>
        <p className={classes.white}>{props.ticketText}</p>
      </div>
      <button className={classes.button}onClick={handleDeleteClick}>Delete</button>
    </form>
  );
};

export default TicketCard;
