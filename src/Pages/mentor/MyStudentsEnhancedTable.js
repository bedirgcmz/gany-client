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

export default function StickyHeadTable({ updateStudentOpenModal, group }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {
    adminDeleteStudent,
    adminUpdateStudent,
    mentorStudents,
    mentorsGroups,
    loginInStudentTasks,
  } = useContext(GanyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    mentorsGroups &&
    mentorsGroups.map((group, index) => (
      <Paper
        sx={{ width: "90%", overflow: "hidden" }}
        className="mb-4 m-auto mui-mentor-student-task"
      >
        <h5 className="ms-3 mt-1">{`${group.name}`}</h5>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Adı Soyadı</TableCell>
                <TableCell>Yası</TableCell>
                <TableCell>Sınıfı</TableCell>
                <TableCell>Kullanıcı Adı</TableCell>
                <TableCell>Yasadığı İl</TableCell>
                <TableCell>Mentor Ad</TableCell>
                <TableCell>Cinsiyet</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>
                  <i className="fa-solid fa-screwdriver-wrench"></i>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mentorStudents &&
                mentorStudents
                  .filter((student) => student.groupId === group.id)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student, index) => {
                    return (
                      <>
                        <TableRow hover role="checkbox" tabIndex={-1} key={student.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
                          <TableCell>{student.age}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>{student.user_name}</TableCell>
                          <TableCell>{student.city}</TableCell>
                          <TableCell>{student.mentor}</TableCell>
                          <TableCell>{student.genre}</TableCell>
                          <TableCell>{student.phone}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell className="d-flex justify-content-center">
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
          count={mentorStudents.filter((s) => s.groupId === group.id).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    ))
  );
}
