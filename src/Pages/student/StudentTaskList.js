import React, { useContext, useState } from "react";
import "./StudentPages.css";
import { GanyContext } from "../../Contexts/GanyContext";
import { Button, Form, Modal, Table } from "react-bootstrap";
import MyTasksEnhancedTable from "./MyTasksEnhancedTable";

const StudentTaskList = ({
  setShowItem,
  showItem,
  setProfile,
  setMyStudents,
  setMyTasks,
  studentTasks,
  setShowItemName,
}) => {
  const {
    getLoginInStudentTasks,
    loginInStudentTasks,
    updateTask,
    loginInStudent,
    getMaterialsById,
  } = useContext(GanyContext);

  const renderShowItem = (pMaterialId) => {
    getMaterialsById(pMaterialId);
    setProfile(false);
    setMyStudents(false);
    setMyTasks(false);
    setShowItem(true);
  };

  const changeTaskStateTrue = (pTaskId) => {
    const newTaskState = {
      task_state: true,
    };
    updateTask(newTaskState, pTaskId);
    getLoginInStudentTasks(loginInStudent.id);
    getLoginInStudentTasks(loginInStudent.id);
  };

  const changeTaskStateFalse = (pTaskId) => {
    const newTaskState = {
      task_state: false,
    };
    updateTask(newTaskState, pTaskId);
    getLoginInStudentTasks(loginInStudent.id);
    getLoginInStudentTasks(loginInStudent.id);
  };
  return (
    <>
      <h3 className="text-center">Ödevlerim</h3>
      <>
        <MyTasksEnhancedTable
          loginInStudentTasks={loginInStudentTasks}
          renderShowItem={renderShowItem}
          changeTaskStateTrue={changeTaskStateTrue}
          changeTaskStateFalse={changeTaskStateFalse}
        />
      </>
      {/* <div className="mentor-all-student-list-table mt-4">
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th colSpan={3}>Ödev Adı</th>
              <th>Veriliş Tarihi</th>
              <th>Bitiş Tarihi</th>
              <th>Test(D/Y)</th>
              <th className="text-center">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </th>
              <th>Ödev Yapıldı mı?</th>
            </tr>
          </thead>
          <tbody>
            {loginInStudentTasks &&
              loginInStudentTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td
                    colSpan={3}
                    onClick={() => renderShowItem(task.materialId)}
                    className="align-items-center px-2 name-td"
                  >
                    <i className="fa-solid fa-angles-right me-2"></i>{" "}
                    <span>{`${task.task_name}`}</span>
                  </td>
                  <td>
                    {`${new Date(task.add_date).getDate()}-${new Date(
                      task.add_date
                    ).getMonth()}-${new Date(task.add_date).getFullYear()}`}
                  </td>
                  <td>{`${new Date(task.add_date).getDate()}-${new Date(
                    task.add_date
                  ).getMonth()}-${new Date(task.add_date).getFullYear()}`}</td>

                  <td>{`5/6`}</td>
                  <td className="text-center">
                    {task.task_state && (
                      <i className="fa-solid fa-circle-check fs-4 task-done-state"></i>
                    )}
                    {!task.task_state && (
                      <i className="fa-solid fa-circle-xmark  fs-4 task-done-state"></i>
                    )}
                  </td>
                  <td className="text-center d-flex justify-content-around align-items-center">
                    <button
                      onClick={() => changeTaskStateTrue(task.id)}
                      type="button"
                      className="btn btn-success text-light p-1 px-2 me-2"
                    >
                      Evet
                    </button>

                    <button
                      onClick={() => changeTaskStateFalse(task.id)}
                      type="button"
                      className="btn btn-danger text-light p-1"
                    >
                      Hayır
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div> */}
    </>
  );
};

export default StudentTaskList;
