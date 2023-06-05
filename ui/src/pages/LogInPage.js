import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import iyteLogo from "../components/nav-bar-pictures/iytelogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LogInPage = () => {
  const [isRememberUser, setIsRememberUser] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [incorrectData, setIncorrectData] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 3
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setEnteredPassword(event.target.value);
    setFormIsValid(
      enteredEmail.includes("@") && event.target.value.trim().length > 6
    );
  };

  const submitHandler = async (event) => {
    const signInInfo = {
      email: enteredEmail,
      retrievedPassword: enteredPassword,
    };

    event.preventDefault();
    if (formIsValid) {
      try {
        //"http://localhost:3001/api/v1/student/login",
        const res = await axios.post(
          "http://localhost:3001/api/v1/student/login",
          JSON.stringify(signInInfo)
        );

        if (res.data.status === "success") {
          console.log(res.data);
          if (res.data.isCandidate) {
            authCtx.handleCandidate();
          }
          if (res.data.isAdmin) {
            authCtx.handleAdmin();
            localStorage.setItem("aid", res.data.aid);
            localStorage.setItem("adminInfo", JSON.stringify(res.data));
          } else {
            localStorage.setItem("sid", res.data.sid);
            localStorage.setItem("studentInfo", JSON.stringify(res.data));
          }

          authCtx.onLogin();
          navigate("/");
        } else {
          setIncorrectData(true);
        }
        // assump log in is successful
      } catch (err) {
        setIncorrectData(true);
      }
    } else {
      setIncorrectData(true);
    }
  };
  return (
    <div>
      {incorrectData && (
        <div className="bg-gray-100 border-gray-100 border-3 p-8 text-center">
          <p className="text-3xl">Incorrect email or password</p>
          <button
            className="w-40 h-10 border-rose-700 border-2 hover:bg-red-700 rounded-lg mt-8"
            onClick={() => {
              setIncorrectData(false);
            }}
          >
            Okay
          </button>
        </div>
      )}
      {!incorrectData && (
        <div className="grid grid-cols-2 gap-4 ">
          <div></div>
          <div className="place-self-end bg-gray-100 w-80 py-20 ml-16">
            <img src={iyteLogo} className="w-40 h-40 ml-16 mb-8"></img>

            <div className="mb-72">
              <input
                onChange={emailChangeHandler}
                type="text"
                placeholder="Enter a email"
                className="mt-12 ml-12 w-48 h-8 px-4"
              />
              <input
                onChange={passwordChangeHandler}
                type="password"
                placeholder="Enter a password"
                className="mt-4 ml-12 w-48 px-4 h-8"
              />

              <button
                onClick={submitHandler}
                className="mt-8 ml-16 mb-12 w-40 h-10 border-rose-700 border-2 hover:bg-red-700 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogInPage;
