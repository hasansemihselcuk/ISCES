import { useState } from "react";
import "./MakeApplication.css";
const MakeApplication = (props) => {
  const [isSend, setIsSend] = useState(true);

  let selected = [];
  const handleOptionChange = (event) => {
    console.log(selected.length);
    console.log(selected);
    if (selected.includes(event.target.value)) {
      const index = selected.indexOf(event.target.value);
      selected.splice(index, 1);
    } else {
      selected.push(event.target.value);
    }
  };
  const sendHandler = (event) => {

    if (selected.length === 4) {
      setIsSend(true);
      console.log("deneme");
    } else {
      setIsSend(false);
      event.preventDefault();
    }
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
      <button onClick={sendHandler}>Başvuruyu Gönder</button>
      {!isSend && <p>Aday olmak için yeterli şartları taşımıyorsunuz!</p>}
    </form>
  );
};

export default MakeApplication;
