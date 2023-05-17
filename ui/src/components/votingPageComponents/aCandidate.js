import React, { useState } from "react";

const ACandidate = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(true);
  };
  console.log("aCandidate");
  return (
    <div className="candidate">
      <img
        src={props.candidate.photo}
        alt={props.candidate.name}
        className={` rounded-full h-44 w-44 ${isSelected ? "selected" : ""}`}
      />

      <div className="flex justify-center mr-4">
        <input
          name="selectedCandidate"
          type="radio"
          className="form-radio h-4 w-4 border-red-500  text-red-500 focus:ring-red-500"
          checked
        />
      </div>
      <div className="name flex justify-center">{props.candidate.name}</div>
    </div>
  );
};

export default ACandidate;
