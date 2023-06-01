import iztechLogo from "./nav-bar-pictures/iytelogo.png";
import turkishFlag from "./nav-bar-pictures/turk_bayragi.png";
import darkMode from "./nav-bar-pictures/dark_mode.png";
import bellIcon from "./nav-bar-pictures/bell_icon.png";
import SideBar from "./SideBar";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import menu from "./nav-bar-pictures/menu.png";
import Announcements from "./Announcements";

const NavBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const authCtx = useContext(AuthContext);

  const toggleSideBar = () => {
    setShowSideBar((prevState) => !prevState);
  };

  const toggleAnnounceBar = () => {
    setShowAnnouncements((prevState) => !prevState);
  };

  return (
    <div className="">
      <nav className="bg-red-700 ">
        <div className="flex ml-16 grid grid-cols-3 gap-4">
          <div>
            {authCtx.isLoggedIn && (
              <div>
                <img src={iztechLogo} className="w-40 h-40 mt-4" />
                <button
                  onClick={toggleSideBar}
                  className="relative w-10 h-10 mt-8 mr-2"
                >
                  <img
                    src={menu}
                    className="w-10 h-10 rounded-full overflow-hidden"
                  />
                  <div className="">{showSideBar && <SideBar />}</div>
                </button>
              </div>
            )}
          </div>

          <p className="ml-20 text-white text-4xl ml-40 mt-16">ISCES</p>
          <div
            className={
              authCtx.isLoggedIn
                ? "flex place-self-end mb-28 mr-12"
                : "flex place-self-end mb-28 mr-12 mt-12"
            }
          >
            <button className="mr-12" onClick={toggleAnnounceBar}>
              <img src={bellIcon} className="w-8 h-8" />
            </button>
            <div>{showAnnouncements && <Announcements />}</div>
            <button className="mr-12">
              <img src={darkMode} className="w-8 h-8" />
            </button>
            <button className="">
              <img
                src={turkishFlag}
                className="w-14 h-14 rounded-full overflow-hidden"
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
