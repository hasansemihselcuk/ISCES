import React, { useState, useEffect } from "react";
import AnnounceACandidate from "./announceACandidate";
import axios from "axios";

const AnnounceCandidate = () => {
  const [nominees, setNominees] = useState([]);

  const fetchRepresantatives = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/rep/");
      const representatives = res.data.data.representatives.map((rep) => {
        return {
          id: rep.studentInfos._id,
          name: rep.studentInfos.name,
          surname: rep.studentInfos.surname,
          department: rep.studentInfos.department,
        };
      });
      setNominees(representatives);
    } catch (error) {
      console.log("Error fetching representatives:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchRepresantatives();
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
        Seçilen Kişileri Duyur
      </h1>
      <div className="justify-center m-16">
        {nominees.map((data, index) => (
          <div
            key={index}
            className="flex justify-center m-16 bg-gray-200 h-32 rounded-xl"
          >
            <AnnounceACandidate
              data={data}
              onUpdate={(id) => updateNominees(id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnounceCandidate;
