import React, { useState } from "react";
import ResultCard from "./resultCard";

const DepartmentResults = (props) => {
  return (
    <div className="flex justify-center mb-2">
      <div className="flex justify-center ">
        {props.candidates.map((candidate, index) => (
          <div key={index} className="bg-gray-200 p-8">
            <ResultCard candidate={candidate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentResults;
