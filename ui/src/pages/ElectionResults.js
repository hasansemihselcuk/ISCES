import React, { useState } from "react";
import DepartmentResults from "../components/resultPageComponents/departmentResults";
import resim from "../components/votingPageComponents/defaultUser.png";

const ElectionResult = ({ candidates, candidatesVote }) => {
  const results = [
    {
      name: "Gökhan Türkmen",
      photo: resim,
      voteCount: 10,
      id: 1,
    },
    {
      name: "Gökhan Türk",
      photo: resim,
      voteCount: 5,
      id: 2,
    },
  ];

  return (
    <div>
      <div className="flex justify-center  mb-8 mt-16 text-3xl">
        <h1>candidate.department Bölüm Temsilciliği Seçimi</h1>
      </div>
      <div className="p-8 mb-8 rounded-lg relative text-3xl ">
        <DepartmentResults candidates={results} />
      </div>
    </div>
  );
};

export default ElectionResult;
