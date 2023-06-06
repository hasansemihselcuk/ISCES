import React, { useEffect, useState } from "react";
import axios from "axios";
import faviconImage from "./../image.jpg";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
  const makeRepresentative = async (id) => {
    console.log(id);
    try {
      await axios.post(`http://localhost:3001/api/v1/rep/makeRep/${id}`);
      // Handle success or update the UI accordingly
      console.log(`Representative assigned for student with ID ${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
        width: "200px",
        height: "300px",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        margin: "0.5rem",
      }}
    >
      <img
        src={faviconImage}
        alt="Student"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <div style={{ textAlign: "center" }}>
        <p style={{ margin: 0, fontWeight: "bold" }}>
          {student.department || "Department"}
        </p>
        <p style={{ margin: 0 }}>
          {student.name || "Name"} {student.surname || "Surname"}
        </p>
        <p style={{ margin: 0 }}>Number of Votes: {student.numberOfVotes}</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md text-lg font-bold cursor-pointer"
          style={{ marginBottom: "4px", marginTop: "auto" }}
          onClick={() => makeRepresentative(student._id)}
        >
          Temsilci Ata
        </button>
      </div>
    </div>
  );
};

const Result = () => {
  const [students, setStudents] = useState([]);
  const [showOnMap, setShowOnMap] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/admin/candidates"
        );
        const apiStudents = response.data.data.candidates.map((candidate) => ({
          _id: candidate.studentInfos._id,
          name: candidate.studentInfos.name,
          surname: candidate.studentInfos.surname,
          department: candidate.studentInfos.department.name,
          numberOfVotes: candidate.voteCount,
        }));

        setStudents(apiStudents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleShowOnMap = () => {
    navigate("/");
    setShowOnMap(!showOnMap);
  };

  return (
    <div>
      <p
        style={{
          textAlign: "center",
          marginTop: "36px",
          marginBottom: "20px",
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        Sonuçlar
      </p>
      <div
        style={{
          padding: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {students.map((student, index) => (
          <StudentCard key={index} student={student} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={handleShowOnMap}
        >
          Haritada Göster
        </button>
      </div>
    </div>
  );
};

export default Result;
