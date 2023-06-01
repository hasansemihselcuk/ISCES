import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const CandidateWithdraw = () => {
  const [withdraw, setWithdraw] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const withdrawCand = async () => {
    const sid = localStorage.getItem("sid");
    const res = await axios.delete(
      `http://localhost:3001/api/v1/candidate/${sid}`
    );
    if (res.data.status === "success") {
      setWithdraw(true);
      const studentInfos = await localStorage.getItem("studentInfo");
      const newStudentInfo = {
        ...JSON.parse(studentInfos),
        isCandidate: false,
      };
      await localStorage.setItem("studentInfo", JSON.stringify(newStudentInfo));
      authCtx.withdrawCand();
      navigate("/");
    }
  };
  return (
    <div className="mt-80  text-center">
      {!withdraw && (
        <button
          className="border-2 border-rose-500 px-8 py-4 text-4xl hover:bg-red-900 bg-red-600 text-white"
          onClick={withdrawCand}
        >
          Adaylıktan çekil
        </button>
      )}
      {withdraw && <p className="text-4xl">Adaylıktan Çekildiniz</p>}
    </div>
  );
};

export default CandidateWithdraw;
