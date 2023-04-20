import React, { useContext, useState } from "react";
import "./AdminPages.css";
import { GanyContext } from "../../Contexts/GanyContext";
import { Button, Form, Modal, Table } from "react-bootstrap";
import EnhancedTableMyStudent from "./EnhancedTableMyMentort";

const AdminStudentList = () => {
  const { adminDeleteStudent, adminUpdateStudent, adminsAllStudents } = useContext(GanyContext);
  //Admin ogrenciler bilgi guncellemesi icin kullanilan modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectStudent, setSelectStudent] = useState("");

  /* student bilgilerini Modele atma state leri*/
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [genre, setGenre] = useState("");
  const [classs, setClasss] = useState("");
  const [age, setAge] = useState("");
  const [mentor, setMentor] = useState("");

  //Guncelleme icin Modal acildiginda secilen orenci bilgilerini modele atma
  const updateStudentOpenModal = (pId) => {
    const selectedStudent = adminsAllStudents.find((student) => student.id === pId);
    setSelectStudent(selectedStudent);
    handleShow();
    setFirstName(selectedStudent.first_name);
    setLastName(selectedStudent.last_name);
    setUserName(selectedStudent.user_name);
    setCity(selectedStudent.city);
    setEmail(selectedStudent.email);
    setPassword(selectedStudent.password);
    setPhone(selectedStudent.phone);
    setGenre(selectedStudent.genre);
    setClasss(selectedStudent.class);
    setAge(selectedStudent.age);
    setMentor(selectedStudent.mentor);
  };

  //Guncelleme modeliindeki form submit oldugunda calisan fonk
  const UpdateStudent = (e, pId) => {
    e.preventDefault();
    const studentNewInfo = {
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
      email: email,
      password: password,
      phone: phone,
      city: city,
      age: age,
      genre: genre,
      class: classs,
      mentor: mentor,
    };
    adminUpdateStudent(pId, studentNewInfo);
    handleClose();
  };

  return (
    <>
      <h3 className="text-center student-list-header">Sistemde Kayıtlı Olan Öğrenciler</h3>
      <EnhancedTableMyStudent updateStudentOpenModal={updateStudentOpenModal} />
      {/* <div className="admin-all-student-list-table mt-4">
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th colSpan={2}>Adı Soyadı</th>
              <th>Yaşı</th>
              <th>Sınıfı</th>
              <th>Kullanıcı Adı</th>
              <th>Yasadığı İl</th>
              <th>Mentör Adı</th>
              <th>Cinsiyet</th>
              <th>Telefon</th>
              <th>Email</th>
              <th className="text-center">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {adminsAllStudents &&
              adminsAllStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td colSpan={2}>{`${student.first_name} ${student.last_name}`}</td>
                  <td>{student.age}</td>
                  <td>{student.class}</td>
                  <td>{student.user_name}</td>
                  <td>{student.city}</td>
                  <td>{student.mentor}</td>
                  <td>{student.genre}</td>
                  <td>{student.phone}</td>
                  <td>{student.email}</td>
                  <td className="d-flex justify-content-between">
                    <i
                      onClick={(e) => adminDeleteStudent(student.id)}
                      className="fa-solid fa-trash-can px-2"
                    ></i>
                    <i
                      className="fa-solid fa-pen-to-square px-2"
                      onClick={(e) => updateStudentOpenModal(student.id)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>
              {`${selectStudent && selectStudent.first_name} ${
                selectStudent && selectStudent.last_name
              }`}
            </b>{" "}
            isimli <b>öğrenci</b>nin bilgilerini güncelliyorsunuz!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="admin-create-student-form mt-4 form-admin "
            onSubmit={(e) => UpdateStudent(e, selectStudent.id)}
          >
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Adı</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Adı.."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Adı</Form.Label>
              <Form.Control
                name="lastname"
                type="text"
                placeholder="Adı.."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Kullanici Adı</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Kullanici adi.."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">İli</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="İlı.."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Mentör Adı</Form.Label>
              <Form.Control
                name="mentor"
                type="text"
                placeholder="Mentöru.."
                value={mentor}
                onChange={(e) => setMentor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Şifresi</Form.Label>
              <Form.Control
                name="password"
                type="text"
                placeholder="Sifresi.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Form.Group className="mb-2">
                <Form.Label className="text-white mb-1">Yaşı</Form.Label>
                <Form.Control
                  name="age"
                  type="number"
                  placeholder="Yasi.."
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="text-white mb-1">Sınıfıi</Form.Label>
                <Form.Control
                  name="class"
                  type="number"
                  placeholder="Sinifi.."
                  value={classs}
                  onChange={(e) => setClasss(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Group className="mb-2">
                <Form.Label className="text-white mb-1">Cinsiyet</Form.Label>
                <Form.Select
                  aria-label="select"
                  name="genre"
                  type="select"
                  placeholder="Cinsiyet.."
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option>Cinsiyet Sec</option>
                  <option value="male">Erkek</option>
                  <option value="female">Kız</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="text-white mb-1">Telefon No</Form.Label>
                <Form.Control
                  name="phone"
                  type="number"
                  placeholder="Telefon no.."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Button type="submit" variant="success">
                Kaydet
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Vazgec
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="admin-modal-text">
          <p className="admin-modal-text px-2">"Dikkat: Öğrenci bilgilerini değiştiriyorsunuz!"</p>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminStudentList;
