import * as React from "react";
import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { GanyContext } from "../../Contexts/GanyContext";

export default function StickyHeadTable({
  loginInStudentTasks,
  renderShowItem,
  changeTaskStateTrue,
  changeTaskStateFalse,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { mentorStudents, tasks, deleteTask } = useContext(GanyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{ width: "90%", overflow: "hidden" }}
      className="mb-3 m-auto mui-mentor-student-task student-task-list"
    >
      {/* <h5 className="ms-3 mt-1">{`${student.first_name} ${student.last_name}`}</h5> */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Ödev Adı</TableCell>
              <TableCell>Veriliş Tarihi</TableCell>
              <TableCell>Bitiş Tarihi</TableCell>
              <TableCell>Test (D/Y)</TableCell>
              <TableCell>Ödev Durumu</TableCell>
              <TableCell className="text-cente">
                Ödev Yapildi mi?<i className="ps-2 fa-solid fa-screwdriver-wrench"></i>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loginInStudentTasks &&
              loginInStudentTasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task, index) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1} key={task.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          onClick={() => renderShowItem(task.materialId)}
                          className="align-items-center px-2 name-td"
                        >
                          <i className="fa-solid fa-angles-right me-2"></i>{" "}
                          <span>{`${task.task_name}`}</span>
                        </TableCell>
                        <TableCell>{`${new Date(task.add_date).getDate()} . ${new Date(
                          task.add_date
                        ).getMonth()} . ${new Date(task.add_date).getFullYear()}`}</TableCell>
                        <TableCell>{`${new Date(task.add_date).getDate()} . ${new Date(
                          task.add_date
                        ).getMonth()} . ${new Date(task.add_date).getFullYear()}`}</TableCell>
                        <TableCell>{`5/6`}</TableCell>

                        <TableCell>
                          {task.task_state && (
                            <i className="fa-solid fa-circle-check fs-4 task-done-state text-success"></i>
                          )}
                          {!task.task_state && (
                            <i className="fa-solid fa-circle-xmark  fs-4 task-done-state text-danger"></i>
                          )}
                        </TableCell>
                        <TableCell>
                          {" "}
                          <button
                            onClick={() => changeTaskStateTrue(task.id)}
                            type="button"
                            className="btn btn-success text-light p-1 px-2 me-2"
                          >
                            Yapildi
                          </button>
                          <button
                            onClick={() => changeTaskStateFalse(task.id)}
                            type="button"
                            className="btn btn-danger text-light p-1"
                          >
                            Yapilmadi
                          </button>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={loginInStudentTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
