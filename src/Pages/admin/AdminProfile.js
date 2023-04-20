import React, { useContext, useState } from "react";
import "./AdminPages.css";
import { Col, Form, Row, Button, Card, ListGroup, Modal } from "react-bootstrap";
import { GanyContext } from "../../Contexts/GanyContext";

const AdminProfile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user, putAdminProfileInfo, loginInAdmin, adminsAllStudents, adminsAllMentors } =
    useContext(GanyContext);

  const maleMentors =
    adminsAllMentors && adminsAllMentors.filter((mentor) => mentor.genre === "Erkek");
  const femaleMentors =
    adminsAllMentors && adminsAllMentors.filter((mentor) => mentor.genre === "Kız");
  const maleStudents =
    adminsAllStudents && adminsAllStudents.filter((student) => student.genre === "Erkek");
  const femaleStudents =
    adminsAllStudents && adminsAllStudents.filter((student) => student.genre === "Kız");

  /* admin bilgilerini state atma */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("aaa");
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const setInfoModal = () => {
    handleShow();
    setFirstName(loginInAdmin.first_name);
    setLastName(loginInAdmin.last_name);
    setUserName(loginInAdmin.user_name);
    setCountry(loginInAdmin.country);
    setEmail(loginInAdmin.email);
    setPassword(loginInAdmin.password);
    setPhone(loginInAdmin.phone);
  };

  const handleSubmitProfileInfo = (e, pAdminId) => {
    e.preventDefault();
    const newAdminInfo = {
      first_name: e.target.name.value,
      last_name: e.target.lastname.value,
      user_name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
      country: e.target.country.value,
    };
    putAdminProfileInfo(newAdminInfo, pAdminId);
  };

  return (
    <>
      <div className="mt-2 admin-profile container">
        <h4 className=" mb-3 ps-2">Profil Bilgilerim</h4>
        <div className="admin-profile-radius bg-light px-3">
          <Row className="py-3">
            <Col sm="12" md="4">
              <div className="admin-profile-img-container text-center">
                <img
                  className="w-75"
                  src={
                    user
                      ? user.picture
                      : "https://i.pinimg.com/736x/ea/00/03/ea000393475e1ee5eb7bb80c5d3d79dc.jpg"
                  }
                  alt=""
                />
              </div>
              <p className="admin-profile-img-text text-center border-bottom">
                <span className="fw-bold">Profil:</span> {`${loginInAdmin && loginInAdmin.country}`}{" "}
                Yönetimi{" "}
              </p>
            </Col>
            <Col sm="12" md="8">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <span className="left-span">Adı:</span>{" "}
                    <span className="right-span">{loginInAdmin && loginInAdmin.first_name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Soyadı:</span>{" "}
                    <span className="right-span">{loginInAdmin && loginInAdmin.last_name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Ülkesi:</span>{" "}
                    <span className="right-span">{loginInAdmin && loginInAdmin.country}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Kullanıcı Adı:</span>{" "}
                    <span className="right-span">{loginInAdmin && loginInAdmin.user_name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Email:</span>{" "}
                    <span className="right-span">{loginInAdmin && loginInAdmin.email}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="left-span">Telefon:</span>{" "}
                    <span className="right-span">{loginInAdmin && loginInAdmin.phone}</span>
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
              <div className="mentor-info-container">
                <p className="admin-profile-bottom-text border-bottom fs-6">
                  <span className="fw-bold w-75 d-inline-block fs-6">Toplam Mentör:</span>{" "}
                  <span className="lenght">
                    {
                      // mentors.filter(
                      //   (mentor) => mentor.organisationId === loginInAdmin.organisationId
                      // ).length
                      adminsAllMentors && adminsAllMentors.length
                    }
                  </span>
                </p>
                <div>
                  <p className="admin-profile-bottom-text border-bottom fs-6">
                    <span className="fw-bold  w-75 d-inline-block fs-6">Erkek Mentör:</span>{" "}
                    <span className="lenght">{maleMentors && maleMentors.length}</span>
                  </p>
                  <p className="admin-profile-bottom-text border-bottom fs-6">
                    <span className="fw-bold s w-75 d-inline-block fs-6">Kız Mentör:</span>{" "}
                    <span className="lenght">{femaleMentors && femaleMentors.length}</span>
                  </p>
                </div>
              </div>
            </Col>
            <Col sm="12" md="6">
              <div className="student-info-container">
                <p className="admin-profile-bottom-text border-bottom fs-6">
                  <span className="fw-bold  w-75 d-inline-block fs-6">Toplam Öğrenci:</span>{" "}
                  <span className="lenght">{adminsAllStudents && adminsAllStudents.length}</span>
                </p>
                <div>
                  <p className="admin-profile-bottom-text border-bottom fs-6">
                    <span className="fw-bold  w-75 d-inline-block fs-6">Erkek Öğrenci:</span>{" "}
                    <span className="lenght">{maleStudents && maleStudents.length}</span>
                  </p>
                  <p className="admin-profile-bottom-text border-bottom fs-6">
                    <span className="fw-bold  w-75 d-inline-block fs-6">Kız Öğrenci:</span>{" "}
                    <span className="lenght">{femaleStudents && femaleStudents.length}</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Button className="admin-update-profil-button" onClick={setInfoModal}>
        Profil Bilgilerini Güncelle
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Admin{" "}
            <b>
              {`${loginInAdmin && loginInAdmin.first_name} ${
                loginInAdmin && loginInAdmin.last_name
              }`}
            </b>{" "}
            Profil Güncelleme Formu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="admin-profil-form mt-4"
            onSubmit={(e) => handleSubmitProfileInfo(e, loginInAdmin.id)}
          >
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Ad</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Adı.."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Soyadı</Form.Label>
              <Form.Control
                name="lastname"
                type="text"
                placeholder="Soyadı.."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Kullanıcı Adı</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Kullanıcı adı.."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-1">Ülke</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="Ülkesi.."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
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
              <Form.Label className="text-white mb-1">Şifre</Form.Label>
              <Form.Control
                name="password"
                type="text"
                placeholder="Şifresi.."
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
        <Modal.Footer className="admin-modal-text">
          <p className="admin-modal-text px-2">"Dikkat: Profil bilgilerinizi değiştiriyorsunuz!"</p>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminProfile;
