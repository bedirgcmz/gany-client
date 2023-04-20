import React, { useContext, useState, useEffect } from "react";
import "./AdminPages.css";
import { GanyContext } from "../../Contexts/GanyContext";
import { Button, Form, Modal, Table } from "react-bootstrap";
import EnhancedTableMyMentor from "./EnhancedTableMyMentort";
const AdminMentorList = () => {
  const { loginInAdmin, adminDeleteMentor, adminUpdateMentor, adminsAllMentors } =
    useContext(GanyContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //guncellenecek mentoru tutan state
  const [selectMentor, setSelectMentor] = useState("");
  // mentorlere ait ogrenci sayisini belirlemek icin tum ogrenci listesini tutan state
  const [allStudents, setAllStudents] = useState("");

  /* student bilgilerini Modele atma state leri*/
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [genre, setGenre] = useState("");
  const [organisation, setOrganisation] = useState("");

  //Guncelleme icin Modal acildiginda secilen orenci bilgilerini modele atma
  const updateMentorOpenModal = (pId) => {
    const selectedMentor = adminsAllMentors.find((mentor) => mentor.id === pId);
    setSelectMentor(selectedMentor);
    handleShow();
    setFirstName(selectedMentor.first_name);
    setLastName(selectedMentor.last_name);
    setUserName(selectedMentor.user_name);
    setCity(selectedMentor.city);
    setEmail(selectedMentor.email);
    setPassword(selectedMentor.password);
    setPhone(selectedMentor.phone);
    setGenre(selectedMentor.genre);
    setOrganisation(selectedMentor.organisation);
  };

  //Guncelleme modeliindeki form submit oldugunda calisan fonk
  const UpdateMentor = (e, pId) => {
    e.preventDefault();
    const mentorNewInfo = {
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
      email: email,
      password: password,
      phone: phone,
      city: city,
      genre: genre,
      organisation: organisation,
    };
    adminUpdateMentor(pId, mentorNewInfo);
    handleClose();
  };

  // tum ogrenci listesini getirme
  const getAllStudents = async () => {
    const MY_URL = "http://localhost:3001/api/v1/gany/students";
    const response = await fetch(MY_URL);
    const data = await response.json();
    setAllStudents(data);
  };
  useEffect(() => {
    getAllStudents();
  }, [allStudents]);

  return (
    <>
      <h3 className="text-center mentor-list-header">Sistemde Kayitli Olan Mentörler</h3>
      <EnhancedTableMyMentor allStudents={allStudents} />
      {/* <div className="admin-all-student-list-table mt-4">
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th colSpan={2}>Adı Soyadı</th>
              <th>Kullanıcı Adı</th>
              <th>Yasadığı İl</th>
              <th>Cinsiyet</th>
              <th>Ögrenci Sayısı</th>
              <th>Telefon</th>
              <th>Email</th>
              <th className="text-center">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {adminsAllMentors &&
              adminsAllMentors.map((mentor, index) => (
                <tr key={mentor.id}>
                  <td>{index + 1}</td>
                  <td colSpan={2}>{`${mentor.first_name} ${mentor.last_name}`}</td>
                  <td>{mentor.user_name}</td>
                  <td>{mentor.city}</td>
                  <td>{mentor.genre}</td>
                  <td>
                    {allStudents &&
                      allStudents.filter(
                        (student) =>
                          student.mentor === `${mentor.user_name}` &&
                          student.organisationId === loginInAdmin.organisationId
                      ).length}
                  </td>
                  <td>{mentor.phone}</td>
                  <td>{mentor.email}</td>
                  <td className="d-flex justify-content-between">
                    <i
                      onClick={(e) => adminDeleteMentor(mentor.id)}
                      className="fa-solid fa-trash-can px-2"
                    ></i>
                    <i
                      className="fa-solid fa-pen-to-square px-2"
                      onClick={(e) => updateMentorOpenModal(mentor.id)}
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
              {`${selectMentor && selectMentor.first_name} ${
                selectMentor && selectMentor.last_name
              }`}
            </b>{" "}
            isimli <b>mentor</b>ün bilgilerini güncelliyorsunuz!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="admin-create-student-form mt-4 form-admin "
            onSubmit={(e) => UpdateMentor(e, selectMentor.id)}
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
              <Form.Label className="text-white mb-1">Soyadı</Form.Label>
              <Form.Control
                name="lastname"
                type="text"
                placeholder="Soyadı.."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Kullanıcı Adı</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Kullanıcı adı.."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">İli</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="Ülkesi.."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Şifresi</Form.Label>
              <Form.Control
                name="password"
                type="text"
                placeholder="Şifresi.."
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
          <p className="admin-modal-text px-2">"Dikkat: Mentor bilgilerinizi değiştiriyorsunuz!"</p>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminMentorList;
