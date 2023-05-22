import axios from "axios";
import React, { useEffect, useState } from "react";
import myImage from "./iyte.jpg";

const MyComponent = () => {
  const [texts, setTexts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    let announceDatas;
    // Simulating data received from the backend
    axios
      .get("http://localhost:3001/api/v1/admin/announcements")
      .then((res) => {
        console.log(res.data.data.announces);
        announceDatas = res.data.data.announces;
        const backendData = announceDatas.map((announce) => {
          return `${announce.title}\n${announce.description}`;
        });
        setTexts(
          backendData.map((text) => ({
            content: text,
            showMore: false,
          }))
        );
      });

    // Update the state with the backend data
  }, []);

  const handleShowMore = (index) => {
    setTexts((prevTexts) => {
      const updatedTexts = [...prevTexts];
      const currentText = { ...updatedTexts[index] };
      currentText.showMore = !currentText.showMore;
      updatedTexts[index] = currentText;
      return updatedTexts;
    });
  };
  console.log(localStorage.getItem("studentInfo"));

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
          marginTop: "100px",
          marginLeft: "10%",
        }}
      >
        {texts.map((text, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              backgroundColor: "lightgray",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {text.content
              .split("\n")
              .slice(0, 3)
              .map((line, lineIndex) => (
                <div key={lineIndex}>{line}</div>
              ))}
            {text.content.split("\n").length > 3 && !text.showMore && (
              <button
                onClick={() => handleShowMore(index)}
                style={{ fontWeight: "bold" }}
              >
                Daha fazla göster
              </button>
            )}
            {text.showMore &&
              text.content
                .split("\n")
                .map((line, lineIndex) => <div key={lineIndex}>{line}</div>)}
            {text.content.split("\n").length > 3 && text.showMore && (
              <button
                onClick={() => handleShowMore(index)}
                style={{ fontWeight: "bold" }}
              >
                Daha az göster
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
