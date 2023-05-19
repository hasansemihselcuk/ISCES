import React from "react";

const ResultCard = (props) => {
  return (
    <div className="candidate ">
      <img
        src={props.candidate.photo}
        alt={props.candidate.name}
        className={`flex justify-center rounded-full h-52 w-52 `}
      />

      <div className=" mr-4">
        <div className="name flex justify-center">{props.candidate.name}</div>
        <div className="count flex justify-center text-red-500">
          {props.candidate.voteCount}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
