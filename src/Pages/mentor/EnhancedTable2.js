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

export default function StickyHeadTable({ student }) {
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
      className="mb-3 m-auto mui-mentor-student-task"
    >
      <h5 className="ms-3 mt-1">{`${student.first_name} ${student.last_name}`}</h5>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Ödev Adı</TableCell>
              <TableCell>Veriliş Tarihi</TableCell>
              <TableCell>Bitiş Tarihi</TableCell>
              <TableCell>Ödev Durumu</TableCell>
              <TableCell>Ödevi Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks &&
              tasks
                .filter((task) => task.studentId === student.id)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1} key={task.id}>
                        <TableCell>{task.task_name}</TableCell>
                        <TableCell>{`${new Date(task.add_date).getDate()} . ${new Date(
                          task.add_date
                        ).getMonth()} . ${new Date(task.add_date).getFullYear()}`}</TableCell>
                        <TableCell>{`${new Date(task.add_date).getDate()} . ${new Date(
                          task.add_date
                        ).getMonth()} . ${new Date(task.add_date).getFullYear()}`}</TableCell>
                        <TableCell>
                          {task.task_state ? (
                            <span className=" text-success">
                              <i className="fa-solid fa-thumbs-up me-3"></i>Yapıldı
                            </span>
                          ) : (
                            <span className="text-danger">
                              <i className="fa-solid fa-hourglass me-3"></i>Beklemede
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <i
                            onClick={(e) => deleteTask(task.id)}
                            className="fa-solid fa-trash-can px-2"
                          ></i>
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
        count={mentorStudents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
