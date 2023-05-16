import iztechLogo from "./nav-bar-pictures/iytelogo.png";
import turkishFlag from "./nav-bar-pictures/turk_bayragi.png";
import darkModeIcon from "./nav-bar-pictures/dark_mode_icon.png";
import darkMode from "./nav-bar-pictures/dark_mode.png";
import bellIcon from "./nav-bar-pictures/bell_icon.png";
const NavBar = () => {
  return (
    <div className="">
      <nav className="bg-red-700 py-4">
        <div className="flex ml-16 grid grid-cols-3 gap-4">
          <img src={iztechLogo} className="w-40 h-40"></img>
          <p className="ml-20 text-white text-4xl ml-40 mt-16">ISCES</p>
          <div className="flex place-self-end mb-20 mr-12">
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
