import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./ApplyCandidacy.css";
const ApplyCandidacy = (props) => {
  const [markOne, setMarkOne] = useState(false);
  const [markTwo, setMarkTwo] = useState(false);
  const [markThree, setMarkThree] = useState(false);
  const [markFour, setMarkFour] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [canBeCandidate, setCanBeCandidate] = useState(true);
  const authCtx = useContext(AuthContext);

  const handleOptionChange = (event) => {
    if (event.target.value === "op1") {
      setMarkOne(!markOne);
    } else if (event.target.value === "op2") {
      setMarkTwo(!markTwo);
    } else if (event.target.value === "op3") {
      setMarkThree(!markThree);
    } else if (event.target.value === "op4") {
      setMarkFour(!markFour);
    }
  };

  useEffect(() => {
    setIsValid(markOne && markTwo && markThree && markFour);
  }, [markOne, markTwo, markThree, markFour]);

  useEffect(() => {
    const isUserApplied = true; //CENK BURAYA VERİ TABANINDAN DOSYAYI ÇEKECEKSİN
    if (isUserApplied) {
      setCanBeCandidate(true);
    }
  }, []);

  const sendHandler = async (event) => {
    event.preventDefault();
    setCanBeCandidate(false);
    const studentId = localStorage.getItem("sid");
    //BURADAN DA VERİTABANINA BAŞVURUSU AKTARILACAK
    const res = await axios.post(
      `http://localhost:3001/api/v1/candidate/${studentId}`
    );
    if (res.data.status === "success") {
      const studentInfos = await localStorage.getItem("studentInfo");
      const newStudentInfo = { ...JSON.parse(studentInfos), isCandidate: true };
      await localStorage.setItem("studentInfo", JSON.stringify(newStudentInfo));
      authCtx.handleCandidate();
      console.log("You are candidate");
    } else {
      console.log("You can not be candidate.");
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
    <>
      {canBeCandidate && (
        <form className="candidate-app mt-20 border-2 border-rose-900 p-8">
          <p className="head">Adaylık Başvurusu</p>{" "}
          {requirements.map((option) => (
            <p key={option.value}>
              <input
                className="req-op mr-4 mb-4"
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
          <button
            onClick={sendHandler}
            className={`apply-button ${isValid ? "" : "not-valid"}`}
            disabled={!isValid}
          >
            Başvuruyu Gönder
          </button>
        </form>
      )}
      {!canBeCandidate && (
        <div className="error">
          <label>Adaylık başvurunuz yapılmıştır</label>
          <br></br>
          <label>Birden fazla defa aday olamazsınız!</label>
        </div>
      )}
    </>
  );
};

export default ApplyCandidacy;
