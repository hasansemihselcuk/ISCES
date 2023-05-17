import React, { useState } from "react";
import CandidateForVote from "../components/votingPageComponents/candidateForVote";
import resim from "../components/votingPageComponents/defaultUser.png";

const VotingPage = ({
  isVoted,
  getCandidatesFromStudentsDepartment,
  voteDepartmentCandidate,
  student,
}) => {
  const candidates = [
    {
      name: "Gökhan Türkmen",
      photo: resim,
      id: 1,
    },
    {
      name: "Gökhan Türk",
      photo: resim,
      id: 2,
    },
  ];
  return (
    <div>
      <div className=" justify-center p-8 mb-8 rounded-lg relative text-3xl ">
        <CandidateForVote candidates={candidates} />
      </div>
    </div>
  );
};

export default VotingPage;
