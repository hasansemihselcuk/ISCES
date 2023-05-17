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

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const rememberMe = () => {
    setIsRememberUser((prevState) => !prevState);
  };

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
    const signInInfo = { email: enteredEmail, password: enteredPassword };
    event.preventDefault();
    try {
      //"http://localhost:3001/api/v1/student/login",
      const res = await axios.post(
        "http://localhost:3001/api/v1/student/login",
        JSON.stringify(signInInfo)
      );
      console.log(res.data);
      if (res.data.status === "success") {
        console.log(res.data);
        localStorage.setItem("sid", res.data.sid);
        localStorage.setItem(
          "studentInfo",
          JSON.stringify({ email: signInInfo.iztechMail })
        );
        console.log(authCtx.isLoggedIn);
        authCtx.onLogin();
        navigate("/");
      } else {
        console.log("Wrong password or email");
      }
      // assump log in is successful
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
            type="text"
            placeholder="Enter a password"
            className="mt-4 ml-12 w-48 px-4 h-8"
          />
          <div className="flex mt-4">
            <div
              onClick={rememberMe}
              className={
                isRememberUser
                  ? "w-5 h-5 bg-rose-700 border-2 ml-16 mt-1"
                  : "w-5 h-5 border-rose-700 border-2 ml-16 mt-1"
              }
            ></div>
            <p className="ml-5">Beni Hatırla</p>
          </div>
          <button
            onClick={submitHandler}
            className="mt-8 ml-16 mb-12 w-40 h-10 border-rose-700 border-2 hover:bg-red-700 rounded-lg"
            disabled={!formIsValid}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
