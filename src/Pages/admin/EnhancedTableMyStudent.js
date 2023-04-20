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

export default function StickyHeadTable({ updateStudentOpenModal }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {
    mentorStudents,
    tasks,
    deleteTask,
    adminsAllStudents,
    adminDeleteStudent,
    adminUpdateStudent,
  } = useContext(GanyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{ width: "95%", overflow: "hidden" }}
      className="mb-3 m-auto mui-mentor-student-task"
    >
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell colspan={2}>Adı Soyadı</TableCell>
              <TableCell>Yaşı</TableCell>
              <TableCell>Sınıfı</TableCell>
              <TableCell>Kullanıcı Adı</TableCell>
              <TableCell>Yasadığı İl</TableCell>
              <TableCell>Mentör Adı</TableCell>
              <TableCell>Cinsiyet</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Email</TableCell>
              <TableCell className="text-center">
                {" "}
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminsAllStudents &&
              adminsAllStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1} key={student.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          colspan={2}
                        >{`${student.first_name} ${student.last_name}`}</TableCell>
                        <TableCell>{student.age}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.user_name}</TableCell>
                        <TableCell>{student.city}</TableCell>
                        <TableCell>{student.mentor}</TableCell>
                        <TableCell>{student.genre}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell className="d-flex justify-content-between">
                          <i
                            onClick={(e) => adminDeleteStudent(student.id)}
                            className="fa-solid fa-trash-can px-2"
                          ></i>
                          <i
                            className="fa-solid fa-pen-to-square px-2"
                            onClick={(e) => updateStudentOpenModal(student.id)}
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
        count={adminsAllStudents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
