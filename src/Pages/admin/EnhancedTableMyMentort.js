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

export default function StickyHeadTable({ updateStudentOpenModal, allStudents }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { adminsAllMentors, adminDeleteStudent, loginInAdmin } = useContext(GanyContext);

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
              <TableCell>Kullanıcı Adı</TableCell>
              <TableCell>Yasadığı İl</TableCell>
              <TableCell>Cinsiyet</TableCell>
              <TableCell>Öğrenci Sayısı</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Email</TableCell>
              <TableCell className="text-center">
                {" "}
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminsAllMentors &&
              adminsAllMentors
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((mentor, index) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1} key={mentor.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          colspan={2}
                        >{`${mentor.first_name} ${mentor.last_name}`}</TableCell>
                        <TableCell>{mentor.user_name}</TableCell>
                        <TableCell>{mentor.city}</TableCell>
                        <TableCell>{mentor.genre}</TableCell>
                        <TableCell>
                          {allStudents &&
                            allStudents.filter(
                              (student) =>
                                student.mentor === `${mentor.user_name}` &&
                                student.organisationId === loginInAdmin.organisationId
                            ).length}
                        </TableCell>
                        <TableCell>{mentor.phone}</TableCell>
                        <TableCell>{mentor.email}</TableCell>
                        <TableCell className="d-flex justify-content-between">
                          <i
                            onClick={(e) => adminDeleteStudent(mentor.id)}
                            className="fa-solid fa-trash-can px-2"
                          ></i>
                          <i
                            className="fa-solid fa-pen-to-square px-2"
                            onClick={(e) => updateStudentOpenModal(mentor.id)}
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
        count={adminsAllMentors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
