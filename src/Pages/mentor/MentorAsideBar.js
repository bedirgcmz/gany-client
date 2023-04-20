import React, { useContext } from "react";
import { GanyContext } from "../../Contexts/GanyContext";
import Button from "@mui/material/Button";

const MentorAsideBar = ({
  setProfile,
  profile,
  setMyStudents,
  myStudents,
  myTasks,
  setMyTasks,
}) => {
  const { getMentorStudents, getMentorsGroups, getTasks } = useContext(GanyContext);

  const renderProfil = () => {
    setProfile(true);
    setMyStudents(false);
    setMyTasks(false);
  };
  const renderMyStudent = () => {
    getMentorsGroups();
    getMentorStudents();
    setProfile(false);
    setMyStudents(true);
    setMyTasks(false);
  };
  const renderTaskList = () => {
    getTasks();
    getMentorsGroups();
    getMentorStudents();
    setProfile(false);
    setMyStudents(false);
    setMyTasks(true);
  };

  return (
    <div className="mentor-aside-container mt-2 d-flex justify-content-center">
      <button
        id="profile"
        onClick={renderProfil}
        className={`text-icon-button  px-2  mb-2 me-2 rounded ${profile}`}
      >
        <i className="fa-solid fa-address-card"></i>
        <span className="">Profil Bilgilerim</span>
      </button>
      <button
        id="my-student"
        onClick={renderMyStudent}
        className={`text-icon-button  px-2  mb-2 me-2 rounded ${myStudents}`}
      >
        <i className="fa-solid fa-users"></i>
        <span className="">Ögrencilerim</span>
      </button>
      <button
        id="my-student"
        onClick={renderTaskList}
        className={`text-icon-button  px-2  mb-2 me-2 rounded ${myTasks}`}
      >
        <i className="fa-solid fa-list-check"></i>
        <span className="">Verdiğim Ödevler</span>
      </button>
    </div>
  );
};

export default MentorAsideBar;
