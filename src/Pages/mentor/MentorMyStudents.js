import React, { useContext, useState } from "react";
import "./MentorPages.css";
import { GanyContext } from "../../Contexts/GanyContext";
import { Button, Form, Modal, Table } from "react-bootstrap";
import MyStudentsEnhancedTable from "./MyStudentsEnhancedTable";

const MentorMyStudents = () => {
  const {
    adminDeleteStudent,
    adminUpdateStudent,
    mentorStudents,
    mentorsGroups,
    loginInStudentTasks,
  } = useContext(GanyContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //guncellenecek ogrenciyi tutan state
  const [selectStudent, setSelectStudent] = useState({});

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

  //Mentor için guncellenecek ogrencinin seçilmesi
  const getStudentById = async (pStudentId) => {
    const MY_URL = `http://localhost:3001/api/v1/gany/students/${pStudentId}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setUserName(data.user_name);
    setCity(data.city);
    setEmail(data.email);
    setPassword(data.password);
    setPhone(data.phone);
    setGenre(data.genre);
    setClasss(data.class);
    setAge(data.age);
    setMentor(data.mentor);
    setSelectStudent(data);
    return data;
  };
  //Guncelleme icin Modal acildiginda secilen orenci bilgilerini modele atma
  const updateStudentOpenModal = (pId) => {
    getStudentById(pId);
    handleShow();
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
      <h3 className="text-center">Ögrencilerim</h3>
      <MyStudentsEnhancedTable updateStudentOpenModal={updateStudentOpenModal} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>
              {`${selectStudent && selectStudent.first_name} ${
                selectStudent && selectStudent.last_name
              }`}
            </b>{" "}
            isimli <b>ögrenci</b>nin bilgilerini güncelliyorsunuz!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="admin-create-student-form mt-4 form-mentor mentor-update-student-form"
            onSubmit={(e) => UpdateStudent(e, selectStudent.id)}
          >
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Adı</Form.Label>
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
              <Form.Label className="text-white mb-1">Kullanıcı Adı</Form.Label>
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
              <Form.Label className="text-white mb-1">Mentor Adi</Form.Label>
              <Form.Control
                name="mentor"
                type="text"
                placeholder="Mentoru.."
                value={mentor}
                onChange={(e) => setMentor(e.target.value)}
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
                  <option>Cinsiyet Sec</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
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
              <Button type="submit" className="save">
                Kaydet
              </Button>
              <Button className="close" onClick={handleClose}>
                Vazgec
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="admin-modal-text">
          <p className="admin-modal-text px-2">"Dikkat: Ogrenci bilgilerini degistiriyorsunuz!"</p>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MentorMyStudents;
