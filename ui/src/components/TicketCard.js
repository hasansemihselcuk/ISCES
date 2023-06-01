import classes from "./TicketCard.module.css";
const TicketCard = props =>{
    
    return<>
    <form className={classes.form}>
        <label>{props.name}</label>
        <div className={classes.ticket}>
            <p>{props.title}</p>
            <p className={classes.white}>{props.ticketText}</p>
        </div>
    </form>
    </>
}
export default TicketCard;