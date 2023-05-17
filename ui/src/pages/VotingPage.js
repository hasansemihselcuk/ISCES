import React, { useState } from "react";

const VotingPage = ({
  isVoted,
  getCandidatesFromStudentsDepartment,
  voteDepartmentCandidate,
  student,
}) => {
  return (
    <div>
      <div className="flex justify-center p-8 mb-8 rounded-lg relative text-3xl ">
        <h1>student.department Bölüm Temsilciliği Seçimi</h1>
      </div>
    </div>
  );
};

export default VotingPage;
