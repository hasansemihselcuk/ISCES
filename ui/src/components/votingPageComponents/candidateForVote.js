import React, { useState } from "react";
import Ballot from "./ballot";

const CandidateForVote = (props) => {
  return (
    <div>
      <div className=" p-8 mb-8 rounded-lg relative text-3xl ">
        <div className=" flex justify-center mb-2">
          <h1>student.department Bölüm Temsilciliği Seçimi</h1>
        </div>
        <Ballot candidates={props.candidates} />
      </div>
    </div>
  );
};

export default CandidateForVote;
