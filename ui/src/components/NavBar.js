import iztechLogo from "./nav-bar-pictures/iytelogo.png";
import turkishFlag from "./nav-bar-pictures/turk_bayragi.png";
import darkMode from "./nav-bar-pictures/dark_mode.png";
import bellIcon from "./nav-bar-pictures/bell_icon.png";
import SideBar from "./SideBar";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const authCtx = useContext(AuthContext);

  const toggleSideBar = () => {
    setShowSideBar((prevState) => !prevState);
  };

  return (
    <div className="">
      <nav className="bg-red-700 ">
        <div className="flex ml-16 grid grid-cols-3 gap-4">
          {authCtx.isLoggedIn && (
            <div>
              <img src={iztechLogo} className="w-40 h-40 mt-4"></img>
              <button
                onClick={toggleSideBar}
                className="relative w-10 h-10 mt-8 mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="">{showSideBar && <SideBar />}</div>
              </button>
            </div>
          )}

          <p className="ml-20 text-white text-4xl ml-40 mt-16">ISCES</p>
          <div className="flex place-self-end mb-28 mr-12">
            <button className="mr-12">
              <img src={bellIcon} className="w-8 h-8"></img>
            </button>
            <button className="mr-12">
              <img src={darkMode} className="w-8 h-8"></img>
            </button>
            <button className="">
              <img src={turkishFlag} className="w-16 h-16"></img>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
