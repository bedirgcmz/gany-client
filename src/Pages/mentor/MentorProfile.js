import React, { useContext, useState } from "react";
import "./MentorPages.css";
import { Col, Form, Row, Button, Card, ListGroup, Modal } from "react-bootstrap";
import { GanyContext } from "../../Contexts/GanyContext";

const AdminProfile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user, students, putMentorProfileInfo, loginInMentor, organisations } =
    useContext(GanyContext);

  //const [mentorId, setMentorId] = useState(4);
  //const loginInMentor = mentors.find((mentor) => mentor.id === 1);
  const mentorsOrganisation = organisations.find(
    (organisation) => organisation.id === loginInMentor.organisationId
  );
  const allStudentsMentor = students.filter(
    (student) =>
      student.mentor === loginInMentor.user_name &&
      student.organisationId === loginInMentor.organisationId
  );
  const maleStudents = allStudentsMentor.filter((student) => student.genre === "Erkek");
  const femaleStudents = allStudentsMentor.filter((student) => student.genre === "Kız");

  /* mentor bilgilerini state atma */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("aaa");
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const setInfoModal = () => {
    handleShow();
    setFirstName(loginInMentor.first_name);
    setLastName(loginInMentor.last_name);
    setUserName(loginInMentor.user_name);
    setCity(loginInMentor.city);
    setEmail(loginInMentor.email);
    setPassword(loginInMentor.password);
    setPhone(loginInMentor.phone);
  };

  const handleSubmitProfileInfo = (e, pMentorId) => {
    e.preventDefault();
    const newMentorInfo = {
      first_name: e.target.name.value,
      last_name: e.target.lastname.value,
      user_name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
      city: e.target.city.value,
      organisation: e.target.organisation.value,
    };
    putMentorProfileInfo(newMentorInfo, pMentorId);
  };
  return (
    <>
      <div className="mt-2 mentor-profile container">
        <h4 className="mb-3 ps-2">Profil Bilgilerim</h4>
        <div className="mentor-profile-radius bg-light px-3">
          <Row className="py-3">
            <Col sm="12" md="4">
              <div className="admin-profile-img-container text-center">
                <img
                  className="w-75"
                  src={
                    user
                      ? user.picture
                      : "https://thumbs.dreamstime.com/b/profile-image-avatar-picture-businessman-manager-vector-illustration-flat-style-isolated-103043631.jpg"
                  }
                  alt="Profil resmi"
                />
              </div>
              <p className="mentor-profile-img-text text-center border-bottom">
                <span className="fw-bold">Profil:</span> Mentor
                {` ${loginInMentor && loginInMentor.first_name} ${
                  loginInMentor && loginInMentor.last_name
                }`}{" "}
              </p>
            </Col>
            <Col sm="12" md="8">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <span className="left-span">Adi:</span>{" "}
                    <span className="right-span">{loginInMentor && loginInMentor.first_name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Soyadi:</span>{" "}
                    <span className="right-span">{loginInMentor && loginInMentor.last_name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Organizasyon:</span>{" "}
                    <span className="right-span">{loginInMentor && mentorsOrganisation.name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Yasadigi Il:</span>{" "}
                    <span className="right-span">{loginInMentor && loginInMentor.city}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Kullanici Adi:</span>{" "}
                    <span className="right-span">{loginInMentor && loginInMentor.user_name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Email:</span>{" "}
                    <span className="right-span">{loginInMentor && loginInMentor.email}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Telefon:</span>{" "}
                    <span className="right-span">{loginInMentor && loginInMentor.phone}</span>
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
                <p className="mentor-profile-img-text border-bottom fs-6">
                  <span className="fw-bold  w-75 d-inline-block fs-6">Toplam Ogrenci:</span>{" "}
                  {allStudentsMentor.length}{" "}
                </p>
                <div>
                  <p className="mentor-profile-img-text border-bottom fs-6">
                    <span className="fw-bold  w-75 d-inline-block fs-6">Erkek Ogrenci:</span>{" "}
                    {maleStudents.length}{" "}
                  </p>
                  <p className="mentor-profile-img-text border-bottom fs-6">
                    <span className="fw-bold  w-75 d-inline-block fs-6">Kiz Ogrenci:</span>{" "}
                    {femaleStudents.length}{" "}
                  </p>
                </div>
              </div>
            </Col>
            <Col sm="12" md="6">
              <div className="student-info-container">
                <p className="mentor-profile-img-text fs-6 text-center">
                  Bir Çin atasözü der ki{" "}
                  <span className="fw-bold  w-75 d-inline-block fs-6">
                    "Bir yıl sonrasını düşünüyorsan tohum ek, on yıl sonrası için ağaç dik, yüz yıl
                    sonrayı düşünüyorsan, insan yetiştir."{" "}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Button className="mentor-update-profil-button" onClick={setInfoModal}>
        Profil Bilgilerini Guncelle
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>
              {" "}
              {loginInMentor && loginInMentor.first_name} {loginInMentor && loginInMentor.last_name}
            </b>{" "}
            Profil Guncelleme Formu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="mentor-profil-form mt-4"
            onSubmit={(e) => handleSubmitProfileInfo(e, loginInMentor.id)}
          >
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Ad</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Adi.."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Soyad</Form.Label>
              <Form.Control
                name="lastname"
                type="text"
                placeholder="Soyadi.."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Kullanıcı Adı</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Kullanici adi.."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">İl</Form.Label>
              <Form.Control
                name="city"
                type="text"
                placeholder="İli.."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Organizasyon</Form.Label>
              <Form.Control
                name="organisation"
                type="text"
                placeholder="Ulkesi.."
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Sifre</Form.Label>
              <Form.Control
                name="password"
                type="text"
                placeholder="Sifresi.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Telefon No</Form.Label>
              <Form.Control
                name="phone"
                type="number"
                placeholder="Telefon no.."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
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
        <Modal.Footer className="mentor-modal-text">
          <p className="mentor-modal-text px-2">
            "Dikkat: Profil bilgilerinizi degistiriyorsunuz!"
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminProfile;
