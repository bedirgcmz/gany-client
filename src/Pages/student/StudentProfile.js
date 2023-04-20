import React, { useContext, useState } from "react";
import "./StudentPages.css";
import { Col, Form, Row, Button, Card, ListGroup, Modal } from "react-bootstrap";
import { GanyContext } from "../../Contexts/GanyContext";

const StudentProfile = ({ studentTasks }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user, students, putStudentProfileInfo, loginInStudent, loginInStudentTasks } =
    useContext(GanyContext);

  const selectStudent = students.find((student) => student.id === loginInStudent.id);

  /* student bilgilerini state atma */
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

  const setInfoModal = () => {
    handleShow();
    setFirstName(selectStudent.first_name);
    setLastName(selectStudent.last_name);
    setUserName(selectStudent.user_name);
    setCity(selectStudent.city);
    setEmail(selectStudent.email);
    setPassword(selectStudent.password);
    setPhone(selectStudent.phone);
    setGenre(selectStudent.genre);
    setClasss(selectStudent.class);
    setAge(selectStudent.age);
  };

  //*Model ile  ogrenci profil guncelleme submit fonksiyonu
  const handleSubmitStudent = (e, pStudentId) => {
    e.preventDefault();
    const studentNewInfo = {
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
      city: city,
      email: email,
      password: password,
      phone: phone,
      genre: genre,
      class: classs,
      age: age,
    };
    putStudentProfileInfo(studentNewInfo, pStudentId);
    studentFormClearValue();
  };
  //ogrenci ekleme formu vlue leri temizleme
  const studentFormClearValue = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setCity("");
    setEmail("");
    setPassword("");
    setPhone("");
    setGenre("");
    setClasss("");
    setAge("");
  };

  return (
    <>
      <div className="mt-2 student-profile container">
        <h4 className="mb-3 ps-2">Profil Bilgilerim</h4>
        <div className="student-profile-radius bg-light px-3">
          <Row className="py-3">
            <Col sm="12" md="4">
              <div className="student-profile-img-container text-center">
                <img
                  className="w-75"
                  src={
                    user
                      ? user.picture
                      : "https://cdn0.iconfinder.com/data/icons/education-240/64/student-people-profile-avatar-school-boy-512.png"
                  }
                  alt="Profil resmi"
                />
              </div>
              <p className="student-profile-img-text text-center border-bottom">
                <span className="fw-bold">Profil:</span> Ogrenci
                {` ${selectStudent && selectStudent.first_name} ${
                  selectStudent && selectStudent.last_name
                }`}{" "}
              </p>
            </Col>
            <Col sm="12" md="8">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <span className="left-span">Adi:</span>{" "}
                    <span className="right-span">{selectStudent && selectStudent.first_name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Soyadi:</span>{" "}
                    <span className="right-span">{selectStudent && selectStudent.last_name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Kullanici Adi:</span>{" "}
                    <span className="right-span">{selectStudent && selectStudent.user_name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Mentor Adi:</span>{" "}
                    <span className="right-span">{selectStudent && selectStudent.mentor}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Yasi:</span>{" "}
                    <span className="right-span">{selectStudent && selectStudent.age}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Sinifi:</span>{" "}
                    <span className="right-span">{selectStudent && selectStudent.class}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Cinsiyeti:</span>{" "}
                    <span className="right-span">{selectStudent && selectStudent.genre}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Yasadigi Il:</span>{" "}
                    <span className="right-span">{selectStudent && selectStudent.city}</span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span className="left-span">Email:</span>{" "}
                    <span className="right-span">{selectStudent && selectStudent.email}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Telefon:</span>{" "}
                    <span className="right-span">{selectStudent && selectStudent.phone}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center circles my-3">
              <i className="fa-solid fa-circle left"></i>
              <i className="fa-solid fa-circle middle"></i>
              <i className="fa-solid fa-circle right"></i>
            </Col>
          </Row>
          <Row className="py-3">
            <Col sm="12" md="6">
              <div className="student-info-container">
                <p className="student-profile-img-text border-bottom fs-6">
                  <span className="fw-bold  w-75 d-inline-block fs-6">Toplam Odev Sayisi:</span>{" "}
                  {loginInStudentTasks.length}
                </p>
                <div>
                  <p className="student-profile-img-text border-bottom fs-6">
                    <span className="fw-bold  w-75 d-inline-block fs-6">Yapilan Odev sayisi:</span>{" "}
                    {loginInStudentTasks.filter((task) => task.task_state === true).length}
                  </p>
                  <p className="student-profile-img-text border-bottom fs-6">
                    <span className="fw-bold w-75 d-inline-block fs-6">Kalan Odev Sayisi:</span>{" "}
                    {loginInStudentTasks.filter((task) => task.task_state === false).length}
                  </p>
                </div>
              </div>
            </Col>
            <Col sm="12" md="6">
              <div className="student-info-container">
                <p className="student-profile-img-text fs-6 text-center">
                  Vincent Van Gogh der ki{" "}
                  <span className="fw-bold  w-75 d-inline-block fs-6">
                    "Önemli şeyler bir anda yapılamaz; ufak şeylerin bir araya getirilmesiyle
                    oluşur."{" "}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <Row className="px-2 d-flex justify-content-end">
          <Button className="student-update-profil-button" variant="warning" onClick={setInfoModal}>
            Profil Bilgilerini Guncelle
          </Button>
        </Row>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>
              {" "}
              {selectStudent && selectStudent.first_name} {selectStudent && selectStudent.last_name}
            </b>{" "}
            Profil Guncelleme Formu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="student-create-student-form mt-4 form-student student-profile-form"
            onSubmit={(e) => handleSubmitStudent(e, loginInStudent.id)}
          >
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Adi</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Adi.."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Soyadi</Form.Label>
              <Form.Control
                name="lastname"
                type="text"
                placeholder="Soyadi.."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Kullanici Adi</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Kullanici adi.."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Ili</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="Ulkesi.."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Sifresi</Form.Label>
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
                <Form.Label className="text-white mb-1">Yasi</Form.Label>
                <Form.Control
                  name="age"
                  type="number"
                  placeholder="Yasi.."
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="text-white mb-1">Sinifi</Form.Label>
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
                  <option>Cinsiyeti?</option>
                  <option>Erkek</option>
                  <option>Kız</option>
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
            <div className="d-flex justify-content-between align-items-center mb-2 mt-3">
              <Button className="save" type="submit" onClick={handleClose}>
                Kaydet
              </Button>
              <Button className="close" onClick={handleClose}>
                Vazgec
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="student-modal-text">
          <p className="student-modal-text px-2">
            "Dikkat: Profil bilgilerinizi degistiriyorsunuz!"
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentProfile;
