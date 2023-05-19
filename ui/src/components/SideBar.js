import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./SideBar.css";

const SideBar = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  return (
    <ul className="bg-zinc-800 absolute  mt-12 -ml-9  shadow-lg rounded-md  text-black  scale-125 z-10 text-sm side-bar p-2">
      <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mb-8 mt-4">
        <Link to="/">
          <button
            onClick={() => console.log("Settings")}
            className="w-full text-left p-2 "
          >
            Ana Sayfa
          </button>
        </Link>
      </li>
      <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
        <Link to="/apply">
          <button
            onClick={() => console.log("Settings")}
            className="w-full text-left p-2 "
          >
            Aday Ol.
          </button>
        </Link>
      </li>

      {authCtx.isCandidate && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/withdraw">
            <button className="w-full text-left p-2 ">Aday Ol.</button>
          </Link>
        </li>
      )}

      <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-8">
        <Link to="/vote">
          <button className="w-full text-left p-2 ">Oy Ver</button>
        </Link>
      </li>
      <li className="mb-5 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-8">
        <Link to="/result">
          <button
            onClick={() => console.log("Settings")}
            className="w-full text-left p-2 "
          >
            Seçim Sonuçları
          </button>
        </Link>
      </li>
      <li className="mb-5 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-8">
        <button
          onClick={() => {
            authCtx.onLogout();
            navigate("/login");
          }}
          className="w-full text-left p-2 "
        >
          Çıkış yap
        </button>
      </li>
    </ul>
  );
};

export default SideBar;
