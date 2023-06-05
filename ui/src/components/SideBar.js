import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./SideBar.css";

const SideBar = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  return (
    <ul className="bg-zinc-800 absolute  mt-28 -ml-12  shadow-lg rounded-md  text-black  scale-125 z-10 text-sm side-bar p-2">
      <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mb-4 mt-4">
        <Link to="/">
          <button className="w-full text-left p-2 ">Ana Sayfa</button>
        </Link>
      </li>
      {authCtx.isAdmin && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/admin/announcement">
            <button className="w-full text-left p-2 ">Duyuru Yap</button>
          </Link>
        </li>
      )}
      {authCtx.isAdmin && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/admin/date">
            <button className="w-full text-left p-2 ">
              Seçim Tarih Ayarları
            </button>
          </Link>
        </li>
      )}
      {authCtx.isAdmin && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/admin/candidatecontrol">
            <button className="w-full text-left p-2 ">Aday Onayı</button>
          </Link>
        </li>
      )}
      {authCtx.isAdmin && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/admin/candidate">
            <button className="w-full text-left p-2 ">Kişileri Duyur</button>
          </Link>
        </li>
      )}
      {authCtx.isAdmin && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/admin/result">
            <button className="w-full text-left p-2 ">Sonuç Göster</button>
          </Link>
        </li>
      )}
      {authCtx.isAdmin && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/admin/authority">
            <button className="w-full text-left p-2 ">Yetki Al</button>
          </Link>
        </li>
      )}

      {authCtx.isAdmin && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/admin/feedback">
            <button className="w-full text-left p-2 ">Geri Bildirimler</button>
          </Link>
        </li>
      )}
      {!authCtx.isAdmin && !authCtx.isCandidate && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/apply">
            <button className="w-full text-left p-2 ">Adaylık Başvurusu</button>
          </Link>
        </li>
      )}
      {!authCtx.isAdmin && authCtx.isCandidate && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/withdraw">
            <button className="w-full text-left p-2 ">Adaylıktan Çekil</button>
          </Link>
        </li>
      )}
      {!authCtx.isAdmin && (
        <li className="mb-2 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/vote">
            <button className="w-full text-left p-2 ">Oy Ver</button>
          </Link>
        </li>
      )}
      {!authCtx.isAdmin && (
        <li className="mb-5 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/result">
            <button className="w-full text-left p-2 ">Seçim Sonuçları</button>
          </Link>
        </li>
      )}
      {!authCtx.isAdmin && (
        <li className="mb-5 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
          <Link to="/feedback">
            <button className="w-full text-left p-2 ">Geri Bildirim</button>
          </Link>
        </li>
      )}

      <li className="mb-5 bg-gray-100 hover:bg-gray-300 ml-4 mr-4 mt-4">
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
