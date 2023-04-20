import React, { useState } from "react";
import "./AdminPages.css";
import { Row, Col } from "react-bootstrap";
import AdminAsideBar from "./AdminAsideBar";
import AdminStudentList from "./AdminStudentList";
import AdminProfile from "./AdminProfile";
import AdminCreateUser from "./AdminCreateUser";
import AdminMentorList from "./AdminMentorList";
import FeedbackList from "./FeedbackList";
import MiniDrawer from "./MiniDrawer";

const AdminPages = () => {
  // Asida bar menu butonlari icin
  const [createRegester, setCreateRegester] = useState(false);
  const [profile, setProfile] = useState(true);
  const [studentList, setStudentList] = useState(false);
  const [mentorList, setMentorList] = useState(false);
  const [feedbackList, setFeedbackList] = useState(false);

  return (
    <div>
      <div className="home-page-top-area">
        <MiniDrawer
          setCreateRegester={setCreateRegester}
          setProfile={setProfile}
          setStudentList={setStudentList}
          setMentorList={setMentorList}
          createRegester={createRegester}
          profile={profile}
          studentList={studentList}
          mentorList={mentorList}
          feedbackList={feedbackList}
          setFeedbackList={setFeedbackList}
        />
      </div>
      <Row>
        <Col xs="12" sm="4" lg="3" className="d-none">
          <div className="side-bar ms-3 me-1 mb-3 p-3 rounded shadow border">
            <AdminAsideBar
              setCreateRegester={setCreateRegester}
              setProfile={setProfile}
              setStudentList={setStudentList}
              setMentorList={setMentorList}
              createRegester={createRegester}
              profile={profile}
              studentList={studentList}
              mentorList={mentorList}
              feedbackList={feedbackList}
              setFeedbackList={setFeedbackList}
            />
          </div>
        </Col>
        <Col className="col-9 m-auto mt-3">
          <div className="item-list-area ">
            {profile && <AdminProfile />}
            {createRegester && <AdminCreateUser />}
            {studentList && <AdminStudentList />}
            {mentorList && <AdminMentorList />}
            {feedbackList && <FeedbackList />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPages;
