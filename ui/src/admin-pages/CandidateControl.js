import React, { useState, useEffect } from "react";
import ControlACandidate from "./controlACandidate";
import axios from "axios";
const CandidateControl = () => {
  const [nominees, setNominees] = useState([]);

  const fetchNominations = async () => {
    try {
      const res = await axios.get(
        "https://isces.onrender.com/api/v1/admin/nominations"
      );
      const nominations = res.data.data.nominations.map((nom) => {
        return {
          id: nom._id,
          name: nom.name,
          surname: nom.surname,
          department: nom.department.name,
          year: nom.year,
          GPA: nom.GPA,
        };
      });
      setNominees(nominations);
    } catch (error) {
      console.log("Error fetching nominations:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchNominations();
    };
    fetchData();
  }, []);

  const updateNominees = (id) => {
    const updatedNominees = nominees.filter((nominee) => nominee.id !== id);
    setNominees(updatedNominees);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold flex justify-center mt-4">
        Aday Kontrol
      </h1>
      <div className="justify-center m-16">
        {nominees.map((data, index) => (
          <div
            key={index}
            className="flex justify-center m-16 bg-gray-200 h-32 rounded-xl"
          >
            <ControlACandidate
              data={data}
              onUpdate={(id) => updateNominees(id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateControl;
