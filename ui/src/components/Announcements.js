import axios from "axios";
import { useEffect, useState } from "react";

const Announcements = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const sid = localStorage.getItem("sid");
    axios
      .get(`https://isces.onrender.com/api/v1/student/notifications/${sid}`)
      .then((res) => {
        setNotifications(res.data.data.notifications);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateAnnouncement = async (id) => {
    const updatedNotifications = notifications.filter((not) => not._id !== id);
    setNotifications(updatedNotifications);

    await axios.delete(
      `https://isces.onrender.com/api/v1/student/notifications/${id}`
    );
  };

  return (
    <ul className="bg-gray-100 absolute  mt-20 -ml-20 mr-12  shadow-lg rounded-md  text-black  scale-125 z-20 text-sm side-bar ">
      {notifications.map((announcement) => {
        return (
          <li className=" bg-gray-100 hover:bg-gray-300 p-2 flex grid grid-cols-2">
            <p>{announcement.message}</p>
            <button
              className="border-rose-700 border-2 hover:bg-red-700 rounded-lg w-16 h-8"
              onClick={() => updateAnnouncement(announcement._id)}
            >
              Sil
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Announcements;
