import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSendData = async () => {
    const sid = localStorage.getItem("sid");
    // Simulating sending data to the backend
    const data = {
      ticketTitle: title,
      ticketDescription: content,
    };
    console.log(data.ticketDescription.length);
    const res = await axios
      .post(
        `http://localhost:3001/api/v1/student/sendTicket/${sid}`,
        JSON.stringify(data)
      )
      .then(data.ticketDescription.length ? navigate("/") : "");

    if (res.data.status === "success") {
      console.log("Posted");
    } else {
      console.log("Can not posted.");
    }

  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        Geri Bildirim Yap
      </h2>
      <div
        className="bg-red-700"
        style={{
          padding: "20px",
          width: "500px",
          margin: "0 auto",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Geri Bildirim Başlığı"
            style={{
              marginBottom: "20px",
              width: "400px",
              paddingTop: "5px",
              paddingBottom: "5px",
              textAlign: "center",
            }}
            onChange={handleTitleChange}
          />
          <textarea
            rows={7}
            placeholder="Geri Bildirim İçeriği"
            style={{
              marginBottom: "20px",
              width: "400px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            onChange={handleContentChange}
          />
          <button
            style={{
              backgroundColor: "gray",
              color: "white",
              width: "100px",
              height: "30px",
              alignSelf: "center",
            }}
            onClick={handleSendData}
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
