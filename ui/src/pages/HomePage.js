import axios from "axios";
import React, { useEffect, useState } from "react";
import myImage from "./iyte.jpg";
import Map from "../components/map";

const MyComponent = () => {
  const [texts, setTexts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    let announceDatas;
    axios
      .get("http://localhost:3001/api/v1/admin/announcements")
      .then((res) => {
        console.log(res.data.data.announces);
        announceDatas = res.data.data.announces;
        const backendData = announceDatas.map((announce) => {
          const date = new Date(announce.date);
          console.log(date);

          // Tarih değerlerini alın
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();

          // Saat ve dakika değerlerini alın
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");

          // Biçimlendirilmiş tarih ve saat değerini oluşturun
          const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

          // verilen saate 3 saat eklendi

          announce.date = formattedDate;
          return `${announce.title}\n${announce.date}\n${announce.description}`;
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

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        <header style={{ height: "1px" }}></header>
        <div style={{ position: "relative" }}>
          <Map myImage={myImage} />
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
              paddingRight: "20px",
              marginRight: "50px",
            }}
          >
            <div className="flex justify-between">
              <div className="font-bold">{text.content.split("\n")[0]}</div>
              <div className="italic">{text.content.split("\n")[1]}</div>
            </div>
            {text.content
              .split("\n")
              .slice(2, 5)
              .map((line, lineIndex) => (
                <div key={lineIndex}> {line}</div>
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
                .slice(5)
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
