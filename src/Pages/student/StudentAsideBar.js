import React, { useContext } from "react";
import { GanyContext } from "../../Contexts/GanyContext";

const StudentAsideBar = ({
  setProfile,
  profile,
  setMyStudents, //yedek state
  myStudents, // yedek state
  myTasks,
  setMyTasks,
  setShowItem,
}) => {
  const { getLoginInStudentTasks, loginInStudent } = useContext(GanyContext);

  const renderProfil = () => {
    getLoginInStudentTasks(loginInStudent.id);
    setProfile(true);
    setMyStudents(false);
    setShowItem(false);
    setMyTasks(false);
  };
  // const renderMyStudent = () => {
  //   setProfile(false);
  //   setMyStudents(true);
  //   setMyTasks(false);
  //   setShowItem(false);
  // };
  const renderTaskList = () => {
    getLoginInStudentTasks(loginInStudent.id);
    setProfile(false);
    setShowItem(false);
    setMyStudents(false);
    setMyTasks(true);
  };

  return (
    <div className="mentor-aside-container mt-2  d-flex justify-content-center">
      <button
        id="profile"
        onClick={renderProfil}
        className={`text-icon-button px-2 me-3 rounded ${profile}`}
      >
        <i className="fa-solid fa-address-card"></i>
        <span>Profil Bilgilerim</span>
      </button>
      <button
        id="my-student"
        onClick={renderTaskList}
        className={`text-icon-button px-2 rounded ${myTasks}`}
      >
        <i className="fa-solid fa-list-check"></i>
        <span>Odevlerim</span>
      </button>
      {/* <button
        id="my-student"
        onClick={renderMyStudent}
        className={`text-icon-container px-2 py-2 mb-2 rounded ${myStudents}`}
      >
        <span>Ogrencilerim</span>
        <i className="fa-solid fa-angle-right"></i>
      </button> */}
    </div>
  );
};

export default StudentAsideBar;
