import axios from "axios";
import React, { useEffect, useState } from "react";
import CandidateForVote from "../components/votingPageComponents/candidateForVote";
import resim from "../components/votingPageComponents/defaultUser.png";

const VotingPage = ({
  isVoted,
  getCandidatesFromStudentsDepartment,
  voteDepartmentCandidate,
  student,
}) => {
  const [candidateList, setCandidates] = useState([]);

  useEffect(() => {
    // Simulating data received from the backend
    const studentId = localStorage.getItem("sid");
    axios
      .get(`http://localhost:3001/api/v1/student/${studentId}`)
      .then((res) => {
        console.log(res.data.data.candidatesFromStudentsDepartment);
        setCandidates(
          res.data.data.candidatesFromStudentsDepartment.map((student) => {
            return { ...student.studentInfos, photo: resim };
          })
        );
      });
  }, []);

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
    {
      name: "Gökhan Türkmens",
      photo: resim,
      id: 3,
    },
    {
      name: "Gökhan Türkss",
      photo: resim,
      id: 4,
    },
    {
      name: "Gökhan Türkmensss",
      photo: resim,
      id: 5,
    },
  ];
  return (
    <div>
      <div className="flex justify-center mb-8 text-3xl">
        <h1>student.department Bölüm Temsilciliği Seçimi</h1>
      </div>
      <div className="p-8 mb-8 rounded-lg relative text-3xl ">
        <CandidateForVote candidates={candidateList} />
      </div>
    </div>
  );
};

export default VotingPage;
