import React, { useState } from "react";
import Ballot from "./ballot";

const CandidateForVote = (props) => {
  return (
    <div className="flex justify-center mb-2">
      <Ballot candidates={props.candidates} />
    </div>
  );
};

export default CandidateForVote;
