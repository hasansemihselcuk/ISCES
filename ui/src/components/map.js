import React, { useState } from "react";
import Mapper from "./Mapper";
import myImage from "./iyte.png";

const Map = (props) => {
  return (
    <div className="flex">
      <Mapper image={myImage} />
    </div>
  );
};

export default Map;
