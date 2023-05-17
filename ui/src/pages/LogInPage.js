import { useState, useEffect } from "react";
import iyteLogo from "../components/nav-bar-pictures/iytelogo.png";
import axios from "axios";
const LogInPage = () => {
  const [isRememberUser, setIsRememberUser] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

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
      const res = await axios.post(
        "http://localhost:3001/api/v1/student/login",
        JSON.stringify(signInInfo)
      );
      if (res.data.status === "success") {
        /*localStorage.setItem("uid", res.data.uid);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ email: signInInfo.email })
        );*/
        //authCtx.setUserData(userRole, chefId)
        /*authCtx.setUserData(userRole)
        authCtx.onLogin({
          email: enteredEmail,
          password: enteredPassword,
        })*/
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
        <form className="mb-72" onSubmit={submitHandler}>
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
            className="mt-8 ml-16 mb-12 w-40 h-10 border-rose-700 border-2 hover:bg-red-700 rounded-lg"
            disabled={!formIsValid}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
