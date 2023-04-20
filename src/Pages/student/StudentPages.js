import React, { useState, useContext } from "react";
import "./StudentPages.css";
import { GanyContext } from "../../Contexts/GanyContext";
import { Row, Col } from "react-bootstrap";
import StudentProfile from "./StudentProfile";
import StudentTaskList from "./StudentTaskList";
import StudentAsideBar from "./StudentAsideBar";
import ShowItem from "./ShowItem";
//import MentorTaskList from "./MentorTaskList";

const StudentPages = () => {
  const { tasks, loginInStudent } = useContext(GanyContext);
  const [studentTasksList, setStudentTasksList] = useState("");

  // Asida bar menu butonlari icin
  const [myStudents, setMyStudents] = useState(false);
  const [profile, setProfile] = useState(true);
  const [myTasks, setMyTasks] = useState(false);
  const [showItem, setShowItem] = useState(false);
  // gosterilecek materyalin adini tutan state
  const [showItemName, setShowItemName] = useState(false);
  // odevin yaipilip yapilmadigini gosterecek olan state
  const [isTaskDone, setIsTaskDone] = useState(false);

  //Login olan ogrenciye ait task listesi
  const studentTasks = tasks.filter((task) => task.groupId === loginInStudent.groupId);

  return (
    <div>
      <Row className="student-asidebar-container">
        <Col className="px-0">
          <div className="side-bar pb-2 rounded shadow border">
            <StudentAsideBar
              setMyStudents={setMyStudents}
              setProfile={setProfile}
              setMyTasks={setMyTasks}
              setShowItem={setShowItem}
              myStudents={myStudents}
              profile={profile}
              myTasks={myTasks}
              showItem={showItem}
              setStudentTasksList={setStudentTasksList}
            />
          </div>
        </Col>
      </Row>
      <Row className="student-content-area">
        <Col className="mx-auto col-11">
          <div className="item-list-area me-3 ms-1 mb-3 p-3">
            {profile && <StudentProfile studentTasks={studentTasks} />}
            {myTasks && (
              <StudentTaskList
                setMyStudents={setMyStudents}
                setProfile={setProfile}
                setMyTasks={setMyTasks}
                setShowItem={setShowItem}
                showItem={showItem}
                setShowItemName={setShowItemName}
                isTaskDone={isTaskDone}
                studentTasks={studentTasks} //Tabloda gosterilecek ogrenci odevleri
                setStudentTasksList={setStudentTasksList}
                studentTasksList={studentTasksList}
              />
            )}
            {showItem && (
              <ShowItem
                showItemName={showItemName}
                setMyStudents={setMyStudents}
                setProfile={setProfile}
                setMyTasks={setMyTasks}
                setShowItem={setShowItem}
                setIsTaskDone={setIsTaskDone}
                isTaskDone={isTaskDone}
                studentTasks={studentTasks} //Tabloda gosterilecek ogrenci odevleri
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentPages;
