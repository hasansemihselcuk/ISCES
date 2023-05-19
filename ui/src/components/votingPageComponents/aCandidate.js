import React, { useState } from "react";

const ACandidate = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(true);
    props.selectCandidate(props.candidate);
  };
  return (
    <div className="candidate ">
      <img
        src={props.candidate.photo}
        alt={props.candidate.name}
        className={`flex justify-center rounded-full h-44 w-44 ${
          isSelected ? "selected" : ""
        }`}
      />

      <div className="flex justify-center mr-4">
        <input
          name="selectedCandidate"
          type="radio"
          className="form-radio h-4 w-4 border-red-500  text-red-500 focus:ring-red-500"
          onClick={handleSelect}
          checked
          // checked={props.selectedCandidate === props.candidate}
          onChange={() => props.selectCandidate(props.candidate)}
        />
      </div>
      <div className="name flex justify-center">{props.candidate.name}</div>
    </div>
  );
};

export default ACandidate;
