import React, { useState, useContext, useEffect } from "react";
import "./AdminPages.css";
import { Button, Col, Form, Row, ListGroup, Badge, FormSelect } from "react-bootstrap";
import { GanyContext } from "../../Contexts/GanyContext";

const AdminCreateUser = () => {
  const {
    mentors,
    groups,
    adminPostStudent,
    adminPostMentor,
    adminPostGroup,
    loginInAdmin,
    adminsAllMentors,
    adminsGroups,
    getMentors,
  } = useContext(GanyContext);

  /*Yeni student bilgilerini state atma */
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
  const [studentFormGroupName, setStudentFormGroupName] = useState("");

  /*Yeni Mentor bilgilerini state atma */
  const [firstNameMentor, setFirstNameMentor] = useState("");
  const [lastNameMentor, setLastNameMentor] = useState("");
  const [userNameMentor, setUserNameMentor] = useState("");
  const [cityMentor, setCityMentor] = useState("");
  const [emailMentor, setEmailMentor] = useState("");
  const [passwordMentor, setPasswordMentor] = useState("");
  const [phoneMentor, setPhoneMentor] = useState("");
  const [genreMentor, setGenreMentor] = useState("");

  /* Yeni Grup Olusturma form state'leri */
  const [groupName, setGroupName] = useState("");
  const [groupLevel, setGroupLevel] = useState("");
  const [groupsMentor, setGroupsMentor] = useState("");

  // istenen formu secmek icin kullanilacak state
  const [selectedForm, setSelectedForm] = useState("Öğrenci");

  const primarySchool = ["abc", "bdd", "hg", "kk"];
  const secondarySchool = ["22abc", "22bdd", "22hg", "22kk"];
  const highSchool = ["33abc", "3bdd", "33hg", "3kk"];

  //*Form ile bir ogrenci ekleme submit fonksiyonu
  const handleSubmitStudent = (e) => {
    e.preventDefault();
    const gruopId = groups.find((group) => group.name === studentFormGroupName).id;

    const newStudent = {
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
    adminPostStudent(newStudent, gruopId);
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
    setMentor("");
    setStudentFormGroupName("");
  };

  //*Form ile bir Mentor ekleme submit fonksiyonu
  const handleSubmitMentor = (e) => {
    e.preventDefault();
    const organisationId = loginInAdmin.organisationId;
    const newMentor = {
      first_name: firstNameMentor,
      last_name: lastNameMentor,
      user_name: userNameMentor,
      email: emailMentor,
      password: passwordMentor,
      phone: phoneMentor,
      city: cityMentor,
      genre: genreMentor,
    };
    adminPostMentor(newMentor, organisationId);
    mentorFormClearValue();
  };
  //ogrenci ekleme formu value leri temizleme
  const mentorFormClearValue = () => {
    setFirstNameMentor("");
    setLastNameMentor("");
    setUserNameMentor("");
    setCityMentor("");
    setEmailMentor("");
    setPasswordMentor("");
    setPhoneMentor("");
    setGenreMentor("");
    setMentor("");
  };

  // yeni bir grup olusturma
  const handleSubmitGroup = (e) => {
    getMentors();
    e.preventDefault();
    const organisationId = loginInAdmin.organisationId;
    const mentorId = mentors.find((mentor) => mentor.user_name === groupsMentor).id;
    const newGroup = {
      name: groupName,
      level: groupLevel,
    };
    adminPostGroup(newGroup, organisationId, mentorId);
    groupFormClearValue();
  };

  //ogrenci ekleme formu vlue leri temizleme
  const groupFormClearValue = () => {
    setGroupName("");
    setGroupLevel("");
    setGroupsMentor("");
  };

  // useEffect(() => {
  //   getMentorId("Ibrahim");
  // }, [mentor]);
  // // Secilen mentore ait gruplari getirmek icin mentorun id sini getiren fonskiyon
  // const [selectedMentor, setSelectedMentor] = useState("");
  // const getMentorId = async () => {
  //   const MY_URL = `http://localhost:3001/api/v1/gany/mentorsid?mentorUserName=${mentor}&organisationId=${loginInAdmin.organisationId}`;
  //   const response = await fetch(MY_URL);
  //   const data = await response.json();
  //   setSelectedMentor(data);
  // };

  useEffect(() => {
    if (selectedForm === "Öğrenci") {
      document.getElementById("add-student-form").style.display = "block";
      document.getElementById("add-mentor-form").style.display = "none";
      document.getElementById("add-grup-form").style.display = "none";
    } else if (selectedForm === "Mentör") {
      document.getElementById("add-student-form").style.display = "none";
      document.getElementById("add-mentor-form").style.display = "block";
      document.getElementById("add-grup-form").style.display = "none";
    } else if (selectedForm === "Grup") {
      document.getElementById("add-student-form").style.display = "none";
      document.getElementById("add-mentor-form").style.display = "none";
      document.getElementById("add-grup-form").style.display = "block";
    }
  }, [selectedForm]);

  return (
    <div className=" container">
      <h3 className=" text-center">Öğrenci ve Mentör Kaydı Oluşturma</h3>
      <p className=" text-center mb-0">Lütfen bilgileri eksiksiz giriniz.</p>
      <Form>
        <Form.Group id="select-form" className="mb-2">
          <Form.Label className="mb-1">Lütfen oluşturmak istediğiniz alanı seçiniz</Form.Label>
          <Form.Select
            aria-label="select"
            name="genre"
            type="select"
            placeholder="Cinsiyet.."
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
          >
            <option>Seçilmedi?</option>
            <option>Öğrenci</option>
            <option>Mentör</option>
            <option>Grup</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <Row className="w-100 mx-auto">
        <Col xs="12" sm="8" lg="8" className="m-auto">
          <Form
            id="add-student-form"
            className="admin-create-student-form mt-4 form-admin "
            onSubmit={(e) => handleSubmitStudent(e)}
          >
            <h4 className="text-white text-center">
              Yeni <span>öğrenci</span> oluştur
            </h4>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Adı</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Adını yazınız.."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Soyadı</Form.Label>
              <Form.Control
                name="lastname"
                type="text"
                placeholder="Soyadını yazınız.."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Kullanıcı Adı</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Kullanını adını yazınız.."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">İli</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="İli yazınız.."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Mentör Kullanıcı Adı</Form.Label>
              <Form.Select
                name="grouplevel"
                type="text"
                placeholder="Yeni bir grup ismi yazınız.."
                value={mentor}
                onChange={(e) => setMentor(e.target.value)}
              >
                <option>Mentör kullanıcı adını seçiniz..</option>
                {adminsAllMentors &&
                  adminsAllMentors.map((mentor) => (
                    <option key={mentor.id}>{mentor.user_name}</option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Dahil Olacaği Grup Adı</Form.Label>
              <Form.Select
                aria-label="select"
                name="genre"
                type="select"
                placeholder="Cinsiyetni yazınız.."
                value={studentFormGroupName}
                onChange={(e) => setStudentFormGroupName(e.target.value)}
              >
                <option>Lütfen Grubu Seçiniz !</option>
                {adminsGroups &&
                  adminsGroups
                    //.filter((group) => group.mentorId === selectedMentor[0].id)
                    .map((group) => <option key={group.id}>{group.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Şifresi</Form.Label>
              <Form.Control
                name="password"
                type="text"
                placeholder="Sifresini yazınız.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Emailini yazınız.."
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
                  placeholder="Yasını yazınız.."
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="text-white mb-1">Sınıfı</Form.Label>
                <Form.Control
                  name="class"
                  type="number"
                  placeholder="Sınıfını yazınız.."
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
                  placeholder="Cinsiyetni yazınız.."
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
                  placeholder="Telefon nosunu yazınız.."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Button className="save-all">Toplu Öğrenci Kaydet</Button>
              <Button type="submit" className="kaydet-button">
                Kaydet
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="8" lg="8" className="m-auto">
          <Form
            id="add-mentor-form"
            className="admin-create-student-form mt-4 form-admin "
            onSubmit={(e) => handleSubmitMentor(e)}
          >
            <h4 className="text-white text-center">
              Yeni <span>mentör</span> oluştur
            </h4>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Adı</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Adı.."
                value={firstNameMentor}
                onChange={(e) => setFirstNameMentor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Soyadı</Form.Label>
              <Form.Control
                name="lastname"
                type="text"
                placeholder="Soyadı.."
                value={lastNameMentor}
                onChange={(e) => setLastNameMentor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Kullanıcı Adı</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Kullanıcı adı.."
                value={userNameMentor}
                onChange={(e) => setUserNameMentor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">İli</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="Ülkesi.."
                value={cityMentor}
                onChange={(e) => setCityMentor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Şifresi</Form.Label>
              <Form.Control
                name="password"
                type="text"
                placeholder="Sifresi.."
                value={passwordMentor}
                onChange={(e) => setPasswordMentor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email.."
                value={emailMentor}
                onChange={(e) => setEmailMentor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Cinsiyet</Form.Label>
              <Form.Select
                aria-label="select"
                name="genre"
                type="select"
                placeholder="Cinsiyet.."
                value={genreMentor}
                onChange={(e) => setGenreMentor(e.target.value)}
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
                value={phoneMentor}
                onChange={(e) => setPhoneMentor(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Button className="save-all">Toplu Mentör Kaydet</Button>
              <Button type="submit" className="kaydet-button">
                Kaydet
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="8" lg="8" className="m-auto">
          <Form
            id="add-grup-form"
            className="admin-create-mentor-profil-form mt-4 form-admin "
            onSubmit={(e) => handleSubmitGroup(e)}
          >
            <h4 className="text-white text-center">
              Yeni <span>Grup</span> Oluştur
            </h4>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Grup Adı</Form.Label>
              <Form.Control
                name="newgroup"
                type="text"
                placeholder="Yeni bir grup ismi yazınız.."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">Grup Düzeyi</Form.Label>
              <Form.Select
                name="grouplevel"
                type="text"
                placeholder="Yeni bir grup ismi yazınız.."
                value={groupLevel}
                onChange={(e) => setGroupLevel(e.target.value)}
              >
                <option>Sınıf Düzeyini Seçiniz..</option>
                <option>İlkokul 3. Sınıf</option>
                <option>İlkokul 4. Sınıf</option>
                <option>İlkokul 5. Sınıf</option>
                <option>Ortaokul 6. Sınıf</option>
                <option>Ortaokul 7. Sınıf</option>
                <option>Ortaokul 8. Sınıf</option>
                <option>Lise 9. Sınıf</option>
                <option>Lise 10. Sınıf</option>
                <option>Lise 11. Sınıf</option>
                <option>Lise 12. Sınıf</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-white mb-1">
                Grup Hangi Mentöre Bağlı(Kullanıcı Adı)
              </Form.Label>
              <Form.Select
                name="grouplevel"
                type="text"
                placeholder="Yeni bir grup ismi yazınız.."
                value={groupsMentor}
                onChange={(e) => setGroupsMentor(e.target.value)}
              >
                <option>Mentör kullanıcı adını seçiniz..</option>
                {adminsAllMentors &&
                  adminsAllMentors.map((mentor) => (
                    <option key={mentor.id}>{mentor.user_name}</option>
                  ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end align-items-center mb-2">
              <Button type="submit" className="float-left kaydet-button">
                Kaydet
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col xs="12" sm="6" lg="6">
          <div className="admin-all-group-list mt-4">
            <ListGroup as="ol" numbered>
              <ListGroup.Item as="li" className="text-white pt-0 mt-0 groups-list">
                <h3 className="text-center text-dark mb-2">Gruplarim</h3>
                <div className="ms-2 me-auto">
                  <div className="fw-bold task-name pb-2">
                    <i className="fa-solid fa-angle-down mx-3"></i> İlkokul Gruplari{" "}
                    {primarySchool.map((group, index) => (
                      <div
                        key={index}
                        className="task-category-name d-flex justify-content-between align-items-start border-bottom py-1"
                      >
                        {" "}
                        <span>{group}</span> <i className="fa-solid fa-trash-can"></i>
                      </div>
                    ))}
                  </div>
                  <div className="fw-bold task-name pb-2">
                    <i className="fa-solid fa-angle-down mx-3"></i> Ortaokul Gruplari{" "}
                    {secondarySchool.map((group, index) => (
                      <div
                        key={index}
                        className="task-category-name d-flex justify-content-between align-items-start border-bottom py-1"
                      >
                        {" "}
                        <span>{group}</span> <i className="fa-solid fa-trash-can"></i>
                      </div>
                    ))}
                  </div>
                  <div className="fw-bold task-name pb-2">
                    <i className="fa-solid fa-angle-down mx-3"></i> Lise Gruplari{" "}
                    {highSchool.map((group, index) => (
                      <div
                        key={index}
                        className="task-category-name d-flex justify-content-between align-items-start border-bottom py-1"
                      >
                        {" "}
                        <span>{group}</span> <i className="fa-solid fa-trash-can"></i>
                      </div>
                    ))}
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center circles my-3">
          <i className="fa-solid fa-circle left"></i>
          <i className="fa-solid fa-circle middle"></i>
          <i className="fa-solid fa-circle right"></i>
        </Col>
      </Row>
    </div>
    // <div className=" container">
    //   <h3 className=" text-center">Öğrenci ve Mentör Kaydı Oluşturma</h3>
    //   <p className=" text-center mb-0">Lütfen bilgileri eksiksiz giriniz.</p>
    //   <Form>
    //     <Form.Group id="select-form" className="mb-2">
    //       <Form.Label className="mb-1">Ne olusturmak istersiniz</Form.Label>
    //       <Form.Select
    //         aria-label="select"
    //         name="genre"
    //         type="select"
    //         placeholder="Cinsiyet.."
    //         value={selectedForm}
    //         onChange={(e) => setSelectedForm(e.target.value)}
    //       >
    //         <option>Hangisi?</option>
    //         <option>Öğrenci</option>
    //         <option>Mentör</option>
    //         <option>Grup</option>
    //       </Form.Select>
    //     </Form.Group>
    //   </Form>
    //   <Row className="w-100 mx-auto">
    //     <Col xs="12" sm="6" lg="6">
    //       <Form
    //         id="add-student-form"
    //         className="admin-create-student-form mt-4 form-admin "
    //         onSubmit={(e) => handleSubmitStudent(e)}
    //       >
    //         <h4 className="text-white text-center">
    //           Yeni <span>öğrenci</span> oluştur
    //         </h4>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Adı</Form.Label>
    //           <Form.Control
    //             name="name"
    //             type="text"
    //             placeholder="Adını yazınız.."
    //             value={firstName}
    //             onChange={(e) => setFirstName(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Soyadı</Form.Label>
    //           <Form.Control
    //             name="lastname"
    //             type="text"
    //             placeholder="Soyadını yazınız.."
    //             value={lastName}
    //             onChange={(e) => setLastName(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Kullanıcı Adı</Form.Label>
    //           <Form.Control
    //             name="username"
    //             type="text"
    //             placeholder="Kullanını adını yazınız.."
    //             value={userName}
    //             onChange={(e) => setUserName(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">İli</Form.Label>
    //           <Form.Control
    //             name="country"
    //             type="text"
    //             placeholder="İli yazınız.."
    //             value={city}
    //             onChange={(e) => setCity(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Mentör Kullanıcı Adı</Form.Label>
    //           <Form.Select
    //             name="grouplevel"
    //             type="text"
    //             placeholder="Yeni bir grup ismi yazınız.."
    //             value={mentor}
    //             onChange={(e) => setMentor(e.target.value)}
    //           >
    //             <option>Mentör kullanıcı adını seçiniz..</option>
    //             {adminsAllMentors &&
    //               adminsAllMentors.map((mentor) => (
    //                 <option key={mentor.id}>{mentor.user_name}</option>
    //               ))}
    //           </Form.Select>
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Dahil Olacaği Grup Adı</Form.Label>
    //           <Form.Select
    //             aria-label="select"
    //             name="genre"
    //             type="select"
    //             placeholder="Cinsiyetni yazınız.."
    //             value={studentFormGroupName}
    //             onChange={(e) => setStudentFormGroupName(e.target.value)}
    //           >
    //             <option>Lütfen Grubu Seçiniz !</option>
    //             {adminsGroups &&
    //               adminsGroups
    //                 //.filter((group) => group.mentorId === selectedMentor[0].id)
    //                 .map((group) => <option key={group.id}>{group.name}</option>)}
    //           </Form.Select>
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Şifresi</Form.Label>
    //           <Form.Control
    //             name="password"
    //             type="text"
    //             placeholder="Sifresini yazınız.."
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </Form.Group>

    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Email</Form.Label>
    //           <Form.Control
    //             name="email"
    //             type="email"
    //             placeholder="Emailini yazınız.."
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //         </Form.Group>

    //         <div className="d-flex justify-content-between">
    //           <Form.Group className="mb-2">
    //             <Form.Label className="text-white mb-1">Yaşı</Form.Label>
    //             <Form.Control
    //               name="age"
    //               type="number"
    //               placeholder="Yasını yazınız.."
    //               value={age}
    //               onChange={(e) => setAge(e.target.value)}
    //             />
    //           </Form.Group>
    //           <Form.Group className="mb-2">
    //             <Form.Label className="text-white mb-1">Sınıfı</Form.Label>
    //             <Form.Control
    //               name="class"
    //               type="number"
    //               placeholder="Sınıfını yazınız.."
    //               value={classs}
    //               onChange={(e) => setClasss(e.target.value)}
    //             />
    //           </Form.Group>
    //         </div>
    //         <div className="d-flex justify-content-between">
    //           <Form.Group className="mb-2">
    //             <Form.Label className="text-white mb-1">Cinsiyet</Form.Label>
    //             <Form.Select
    //               aria-label="select"
    //               name="genre"
    //               type="select"
    //               placeholder="Cinsiyetni yazınız.."
    //               value={genre}
    //               onChange={(e) => setGenre(e.target.value)}
    //             >
    //               <option>Cinsiyeti?</option>
    //               <option>Erkek</option>
    //               <option>Kız</option>
    //             </Form.Select>
    //           </Form.Group>
    //           <Form.Group className="mb-2">
    //             <Form.Label className="text-white mb-1">Telefon No</Form.Label>
    //             <Form.Control
    //               name="phone"
    //               type="number"
    //               placeholder="Telefon nosunu yazınız.."
    //               value={phone}
    //               onChange={(e) => setPhone(e.target.value)}
    //             />
    //           </Form.Group>
    //         </div>
    //         <div className="d-flex justify-content-between align-items-center mb-2">
    //           <Button className="save-all">Toplu Öğrenci Kaydet</Button>
    //           <Button type="submit" className="kaydet-button">
    //             Kaydet
    //           </Button>
    //         </div>
    //       </Form>
    //     </Col>
    //     <Col xs="12" sm="6" lg="6">
    //       <Form
    //         id="add-mentor-form"
    //         className="admin-create-student-form mt-4 form-admin "
    //         onSubmit={(e) => handleSubmitMentor(e)}
    //       >
    //         <h4 className="text-white text-center">
    //           Yeni <span>mentör</span> oluştur
    //         </h4>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Adı</Form.Label>
    //           <Form.Control
    //             name="name"
    //             type="text"
    //             placeholder="Adı.."
    //             value={firstNameMentor}
    //             onChange={(e) => setFirstNameMentor(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Soyadı</Form.Label>
    //           <Form.Control
    //             name="lastname"
    //             type="text"
    //             placeholder="Soyadı.."
    //             value={lastNameMentor}
    //             onChange={(e) => setLastNameMentor(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Kullanıcı Adı</Form.Label>
    //           <Form.Control
    //             name="username"
    //             type="text"
    //             placeholder="Kullanıcı adı.."
    //             value={userNameMentor}
    //             onChange={(e) => setUserNameMentor(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">İli</Form.Label>
    //           <Form.Control
    //             name="country"
    //             type="text"
    //             placeholder="Ülkesi.."
    //             value={cityMentor}
    //             onChange={(e) => setCityMentor(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Şifresi</Form.Label>
    //           <Form.Control
    //             name="password"
    //             type="text"
    //             placeholder="Sifresi.."
    //             value={passwordMentor}
    //             onChange={(e) => setPasswordMentor(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Email</Form.Label>
    //           <Form.Control
    //             name="email"
    //             type="email"
    //             placeholder="Email.."
    //             value={emailMentor}
    //             onChange={(e) => setEmailMentor(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Cinsiyet</Form.Label>
    //           <Form.Select
    //             aria-label="select"
    //             name="genre"
    //             type="select"
    //             placeholder="Cinsiyet.."
    //             value={genreMentor}
    //             onChange={(e) => setGenreMentor(e.target.value)}
    //           >
    //             <option>Cinsiyeti?</option>
    //             <option>Erkek</option>
    //             <option>Kız</option>
    //           </Form.Select>
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Telefon No</Form.Label>
    //           <Form.Control
    //             name="phone"
    //             type="number"
    //             placeholder="Telefon no.."
    //             value={phoneMentor}
    //             onChange={(e) => setPhoneMentor(e.target.value)}
    //           />
    //         </Form.Group>
    //         <div className="d-flex justify-content-between align-items-center mb-2">
    //           <Button className="save-all">Toplu Mentör Kaydet</Button>
    //           <Button type="submit" className="kaydet-button">
    //             Kaydet
    //           </Button>
    //         </div>
    //       </Form>
    //     </Col>
    //   </Row>
    //   <Row className="mt-4">
    //     <Col className="d-flex justify-content-center circles my-3">
    //       <i className="fa-solid fa-circle left"></i>
    //       <i className="fa-solid fa-circle middle text-white"></i>
    //       <i className="fa-solid fa-circle right"></i>
    //     </Col>
    //   </Row>
    //   <Row className="mt-1">
    //     <Col xs="12" sm="6" lg="6">
    //       <Form
    //         id="add-grup-form"
    //         className="admin-create-mentor-profil-form mt-4 form-admin "
    //         onSubmit={(e) => handleSubmitGroup(e)}
    //       >
    //         <h4 className="text-white text-center">
    //           Yeni <span>Grup</span> Oluştur
    //         </h4>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Grup Adı</Form.Label>
    //           <Form.Control
    //             name="newgroup"
    //             type="text"
    //             placeholder="Yeni bir grup ismi yazınız.."
    //             value={groupName}
    //             onChange={(e) => setGroupName(e.target.value)}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">Grup Düzeyi</Form.Label>
    //           <Form.Select
    //             name="grouplevel"
    //             type="text"
    //             placeholder="Yeni bir grup ismi yazınız.."
    //             value={groupLevel}
    //             onChange={(e) => setGroupLevel(e.target.value)}
    //           >
    //             <option>Sınıf Düzeyini Seçiniz..</option>
    //             <option>İlkokul 3. Sınıf</option>
    //             <option>İlkokul 4. Sınıf</option>
    //             <option>İlkokul 5. Sınıf</option>
    //             <option>Ortaokul 6. Sınıf</option>
    //             <option>Ortaokul 7. Sınıf</option>
    //             <option>Ortaokul 8. Sınıf</option>
    //             <option>Lise 9. Sınıf</option>
    //             <option>Lise 10. Sınıf</option>
    //             <option>Lise 11. Sınıf</option>
    //             <option>Lise 12. Sınıf</option>
    //           </Form.Select>
    //         </Form.Group>
    //         <Form.Group className="mb-2">
    //           <Form.Label className="text-white mb-1">
    //             Grup Hangi Mentöre Bağlı(Kullanıcı Adı)
    //           </Form.Label>
    //           <Form.Select
    //             name="grouplevel"
    //             type="text"
    //             placeholder="Yeni bir grup ismi yazınız.."
    //             value={groupsMentor}
    //             onChange={(e) => setGroupsMentor(e.target.value)}
    //           >
    //             <option>Mentör kullanıcı adını seçiniz..</option>
    //             {adminsAllMentors &&
    //               adminsAllMentors.map((mentor) => (
    //                 <option key={mentor.id}>{mentor.user_name}</option>
    //               ))}
    //           </Form.Select>
    //         </Form.Group>
    //         <div className="d-flex justify-content-end align-items-center mb-2">
    //           <Button type="submit" className="float-left kaydet-button">
    //             Kaydet
    //           </Button>
    //         </div>
    //       </Form>
    //     </Col>
    //     <Col xs="12" sm="6" lg="6">
    //       <div className="admin-all-group-list mt-4">
    //         <ListGroup as="ol" numbered>
    //           <ListGroup.Item as="li" className="text-white pt-0 mt-0 groups-list">
    //             <h3 className="text-center text-dark mb-2">Gruplarim</h3>
    //             <div className="ms-2 me-auto">
    //               <div className="fw-bold task-name pb-2">
    //                 <i className="fa-solid fa-angle-down mx-3"></i> İlkokul Gruplari{" "}
    //                 {primarySchool.map((group, index) => (
    //                   <div
    //                     key={index}
    //                     className="task-category-name d-flex justify-content-between align-items-start border-bottom py-1"
    //                   >
    //                     {" "}
    //                     <span>{group}</span> <i className="fa-solid fa-trash-can"></i>
    //                   </div>
    //                 ))}
    //               </div>
    //               <div className="fw-bold task-name pb-2">
    //                 <i className="fa-solid fa-angle-down mx-3"></i> Ortaokul Gruplari{" "}
    //                 {secondarySchool.map((group, index) => (
    //                   <div
    //                     key={index}
    //                     className="task-category-name d-flex justify-content-between align-items-start border-bottom py-1"
    //                   >
    //                     {" "}
    //                     <span>{group}</span> <i className="fa-solid fa-trash-can"></i>
    //                   </div>
    //                 ))}
    //               </div>
    //               <div className="fw-bold task-name pb-2">
    //                 <i className="fa-solid fa-angle-down mx-3"></i> Lise Gruplari{" "}
    //                 {highSchool.map((group, index) => (
    //                   <div
    //                     key={index}
    //                     className="task-category-name d-flex justify-content-between align-items-start border-bottom py-1"
    //                   >
    //                     {" "}
    //                     <span>{group}</span> <i className="fa-solid fa-trash-can"></i>
    //                   </div>
    //                 ))}
    //               </div>
    //             </div>
    //           </ListGroup.Item>
    //         </ListGroup>
    //       </div>
    //     </Col>
    //   </Row>
    // </div>
  );
};

export default AdminCreateUser;
