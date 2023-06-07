import React, { useContext, useEffect, useState } from "react";
import DepartmentResults from "../components/resultPageComponents/departmentResults";
import resim from "../image.jpg";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const ElectionResult = ({ candidates, candidatesVote }) => {
  const authCtx = useContext(AuthContext);
  const [candidateList, setCandidates] = useState([]);

  const studentId = localStorage.getItem("sid");

  useEffect(() => {
    axios
      .get(`https://isces.onrender.com/api/v1/student/${studentId}`)
      .then((res) => {
        setCandidates(
          res.data.data.candidatesFromStudentsDepartment.map((student) => {
            return {
              id: student._id,
              name: `${student.studentInfos.name} ${student.studentInfos.surname}`,
              photo: resim,
              voteCount: student.voteCount,
            };
          })
        );
      });
  });
  return (
    <div>
      <div className="flex justify-center  mb-8 mt-16 text-3xl">
        <h1>{authCtx.department} Bölüm Temsilciliği Seçimi</h1>
      </div>
      <div className="p-8 mb-8 rounded-lg relative text-3xl ">
        <DepartmentResults candidates={candidateList} />
      </div>
    </div>
  );
};

export default ElectionResult;
