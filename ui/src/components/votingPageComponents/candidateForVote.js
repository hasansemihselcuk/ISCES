import React, { useState } from "react";

const CandidateForVote = (props) => {
  return (
    <div>
      <img src={props.candidate.image} className="w-40 h-40 ml-12 mr-12"></img>
      <div className="flex justify-center p-8 mb-8 rounded-lg relative text-3xl ">
        <h1>student.department Bölüm Temsilciliği Seçimi</h1>
      </div>
    </div>
  );
};

export default CandidateForVote;
