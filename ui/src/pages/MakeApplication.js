import { useState } from "react";
import "./MakeApplication.css";
const MakeApplication = (props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const requirements = [
    {
      label: "Herhangi bir siyasi parti üyesi değilim",
      value: "op1",
    },
    {
      label: "Herhangi bir terör örgütüne üye değilim",
      value: "op2",
    },
    {
      label: "Not ortalamam 2.75 veya üzeri",
      value: "op3",
    },
    {
      label: "2. sınıf ve üstüyüm",
      value: "op4",
    },
  ];

  return (
    <form className="candidate-app">
      <p className="head">Adaylık Başvurusu</p>{" "}
      {requirements.map((option) => (
        <p key={option.value}>
          <input
            className="req-op"
            type="checkbox"
            value={option.value}
            onChange={handleOptionChange}
          />
          {option.label}{" "}
        </p>
      ))}
      <div className="in">
        {" "}
        <label>Fotoğraf(isteğe bağlı) </label>
        <input type="file" id="photo" />
      </div>
      <button>Başvuruyu Gönder</button>
    </form>
  );
};

export default MakeApplication;
