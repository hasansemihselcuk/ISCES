import React, { useState } from "react";

const Map = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div className="absolute top-10 left-20">
          <span className="text-red-500 text-lg">Yazı 1</span>
        </div>
      )}
      {isHovered && (
        <div className="absolute top-40 left-50">
          <span className="text-blue-500 text-lg">Yazı 2</span>
        </div>
      )}
      {isHovered && (
        <div className="absolute top-70 left-80">
          <span className="text-green-500 text-lg">Yazı 3</span>
        </div>
      )}
      <img
        src={props.myImage}
        alt="My Image"
        className="flex justify-center mt-20 ml-20 w-full max-w-full h-auto"
      />
    </div>
  );
};

export default Map;
