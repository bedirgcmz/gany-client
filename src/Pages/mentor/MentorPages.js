import React, { useState } from "react";
import "./MentorPages.css";
import { Row, Col } from "react-bootstrap";
import MentorProfile from "./MentorProfile";
import MentorMyStudents from "./MentorMyStudents";
import MentorAsideBar from "./MentorAsideBar";
import MentorTaskList from "./MentorTaskList";

const MentorPages = () => {
  // Asida bar menu butonlari icin
  const [myStudents, setMyStudents] = useState(false);
  const [profile, setProfile] = useState(true);
  const [myTasks, setMyTasks] = useState(false);

  return (
    <div>
      <Row className="mentor-asidebar-container">
        <Col className="px-0">
          <div className="side-bar mb-3 rounded shadow border">
            <MentorAsideBar
              setMyStudents={setMyStudents}
              setProfile={setProfile}
              myStudents={myStudents}
              profile={profile}
              myTasks={myTasks}
              setMyTasks={setMyTasks}
            />
          </div>
        </Col>
      </Row>
      <Row className="mentor-content-area">
        <Col className="m-auto col-11">
          <div className="item-list-area-mentor ">
            {profile && <MentorProfile />}
            {myStudents && <MentorMyStudents />}
            {myTasks && <MentorTaskList />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MentorPages;
