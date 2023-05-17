import React from "react";
import myImage from "./iyte.jpg";

const MyComponent = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        <header style={{ height: "1px" }}></header>
        <div style={{ position: "relative" }}>
          <img
            src={myImage}
            alt="My Image"
            style={{
              position: "absolute",
              top: "100px",
              left: "20%",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          marginTop: "200px",
          marginLeft: "10%",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          Tüm öğrenciler sadece bir kullanabilir.
        </div>
        <div style={{ marginBottom: "10px" }}>
          Lütfen iki adayı aynı anda seçmeyin.
        </div>
        <div style={{ marginBottom: "10px" }}>Seneye görüşürüz!</div>
        <div>İyte süper!</div>
      </div>
    </div>
  );
};

export default MyComponent;
