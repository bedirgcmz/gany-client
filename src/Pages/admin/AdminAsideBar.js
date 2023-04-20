import React, { useContext, useEffect, useState } from "react";
import { GanyContext } from "../../Contexts/GanyContext";

const AdminAsideBar = ({
  setMentorList,
  setStudentList,
  setProfile,
  setCreateRegester,
  setFeedbackList,
  profile,
  studentList,
  mentorList,
  createRegester,
  feedbackList,
}) => {
  const { getAdminsAllMentor, getAdminsAllStudents, getFeedbacks, getAdminsGroups } =
    useContext(GanyContext);

  useEffect(() => {
    getAdminsAllMentor();
    getAdminsAllStudents();
  }, []);

  // Bu fonksiyonlar asida barda tiklanan icerigin sag tarafa render adilmesini saglar
  const renderProfil = () => {
    getAdminsAllMentor();
    getAdminsAllStudents();
    setMentorList(false);
    setStudentList(false);
    setProfile(true);
    setCreateRegester(false);
    setFeedbackList(false);
  };
  const renderCreateRegester = () => {
    getAdminsAllMentor();
    getAdminsGroups();
    setMentorList(false);
    setStudentList(false);
    setProfile(false);
    setCreateRegester(true);
    setFeedbackList(false);
  };
  const renderStudentList = () => {
    getAdminsAllStudents();
    setMentorList(false);
    setStudentList(true);
    setProfile(false);
    setCreateRegester(false);
    setFeedbackList(false);
  };
  const renderMentorList = () => {
    getAdminsAllMentor();
    setMentorList(true);
    setStudentList(false);
    setProfile(false);
    setCreateRegester(false);
    setFeedbackList(false);
  };
  const renderFeedbackList = () => {
    getFeedbacks();
    setMentorList(false);
    setStudentList(false);
    setProfile(false);
    setCreateRegester(false);
    setFeedbackList(true);
  };

  return (
    <div className="admin-aside-container mt-2">
      <button
        onClick={renderProfil}
        className={`text-icon-container d-flex justify-content-between px-2 py-2 mb-2 rounded ${profile}`}
      >
        <span>Profil Bilgilerim</span>
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <button
        onClick={renderCreateRegester}
        className={`text-icon-container d-flex justify-content-between px-2 py-2 mb-2 rounded ${createRegester}`}
      >
        <span>Yeni Kayıt Oluştur</span>
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <button
        onClick={renderStudentList}
        className={`text-icon-container d-flex justify-content-between px-2 py-2 mb-2 rounded ${studentList}`}
      >
        <span>Öğrenci Listesi</span>
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <button
        onClick={renderMentorList}
        className={`text-icon-container d-flex justify-content-between px-2 py-2 mb-2 rounded ${mentorList}`}
      >
        <span>Mentör Listesi</span>
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <button
        onClick={renderFeedbackList}
        className={`text-icon-container d-flex justify-content-between px-2 py-2 mb-2 rounded ${feedbackList}`}
      >
        <span>Geri Bildirim Listesi</span>
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default AdminAsideBar;
