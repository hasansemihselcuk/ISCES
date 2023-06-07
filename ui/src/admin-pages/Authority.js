import axios from "axios";
import React, { useEffect, useState } from "react";
import faviconImage from "./../image.jpg";

const Authority = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://isces.onrender.com/api/v1/rep/");
        const representatives = res.data.data.representatives;
        const candidateRes = await axios.get(
          "https://isces.onrender.com/api/v1/admin/candidates"
        );
        const candidates = candidateRes.data.data.candidates;
        const allStudents = [...representatives, ...candidates];

        setStudents(allStudents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveAuthority = async (student) => {
    const updatedStudents = students.filter(
      (std) => student.studentInfos._id !== std.studentInfos._id
    );
    setStudents(updatedStudents);
    if (student.studentInfos.isRepresentative) {
      await axios.delete(
        `https://isces.onrender.com/api/v1/rep/cancelRep/${student.studentInfos._id}`
      );
    } else if (student.studentInfos.isCandidate) {
      await axios.delete(
        `https://isces.onrender.com/api/v1/candidate/${student.studentInfos._id}`
      );
    }
  };

  return (
    <div>
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
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
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
                {student.studentInfos.department.name || "Departman"}
              </p>
              <p style={{ margin: 0 }}>
                {student.studentInfos.name || "İsim"}{" "}
                {student.studentInfos.surname || "Soysim"}
              </p>
              <p style={{ margin: 0 }}>
                {student.studentInfos.isCandidate ? "Aday" : "Temsilci"}
              </p>
            </div>

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
              onClick={() => handleRemoveAuthority(student)}
            >
              Yetki Kaldır
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authority;
