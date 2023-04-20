import React, { useContext, useState } from "react";
import "./MentorPages.css";
import { GanyContext } from "../../Contexts/GanyContext";
import EnhancedTable2 from "./EnhancedTable2";

const MentorTaskList = () => {
  const { mentorStudents } = useContext(GanyContext);

  return (
    <>
      {mentorStudents.map((student) => (
        <EnhancedTable2 student={student} />
      ))}
    </>
  );
};

export default MentorTaskList;

// bootstrap tablosu
/* <div className="container">
        <h3 className="text-center p-2 text-white">Verdiğim Ödevler</h3>
        {mentorStudents &&
          mentorStudents.map((student) => (
            <div className="student-task-container" key={student.id}>
              <h5>{`${student.first_name} ${student.last_name}`}</h5>
              <table border="2px" className="student-task-table table">
                <thead>
                  <tr>
                    <th>Ödev Adı</th>
                    <th>Veriliş Tarihi</th>
                    <th>Bitiş Tarihi</th>
                    <th className="text-primary">Ödev Durumu</th>
                    <th className="text-primary text-center">Ödevi Kaldır</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks &&
                    tasks
                      .filter((task) => task.studentId === student.id)
                      .map((task) => (
                        <tr key={task.id}>
                          <td>{task.task_name}</td>
                          <td>{`${new Date(task.add_date).getDate()} . ${new Date(
                            task.add_date
                          ).getMonth()} . ${new Date(task.add_date).getFullYear()}`}</td>
                          <td>{`${new Date(task.add_date).getDate()} . ${new Date(
                            task.add_date
                          ).getMonth()} . ${new Date(task.add_date).getFullYear()}`}</td>
                          <td>
                            {task.task_state ? (
                              <span className=" text-success">
                                <i className="fa-solid fa-check-double me-3"></i>Yaptı
                              </span>
                            ) : (
                              <span className="text-danger">
                                <i class="fa-solid fa-xmark me-3"></i>Yapmadı
                              </span>
                            )}
                          </td>
                          <td className="text-center">
                            <i
                              onClick={(e) => deleteTask(task.id)}
                              className="fa-solid fa-trash-can px-2"
                            ></i>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          ))}
      </div> */
