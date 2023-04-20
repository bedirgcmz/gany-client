import React, { useContext, useState } from "react";
import { GanyContext } from "../../Contexts/GanyContext";
import { Col, Form, Row, Button, Card, ListGroup, Modal } from "react-bootstrap";
import "./ShowItem.css";

const ShowItem = ({ setSubCategoryText, setMainCategoryText }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groupNames, setGroupNames] = useState("");

  const {
    anMaterial,
    postAddTask,
    loginInMentor,
    groups,
    mentorsGroups,
    getMentorsGroups,
    getMentorStudents,
    mentorStudents,
    categories,
    subCategories,
    getSubCategoriesMaterials,
  } = useContext(GanyContext);

  //secilen gruba ait ogrenci listesini getirmek icin kullanilan ogrenci group id
  const studentGroupId = groupNames && groups.find((group) => group.name === groupNames).id;

  // Ogrenciye odev verilince calisir
  const addTask = (pStudentId) => {
    document.getElementById(`clicked-icon-${pStudentId}`).style.backgroundColor = "#2a9d35";
    document.getElementById(`clicked-icon-${pStudentId}`).disabled = true;
    document.getElementById(`task-gived-${pStudentId}`).innerText = "Ödev verildi";
    const groupId = groups.find((group) => group.name === groupNames).id;
    const taskMaterial = {
      task_name: anMaterial.name,
      materialId: anMaterial.id,
      added_mentor: loginInMentor.user_name,
    };
    postAddTask(taskMaterial, groupId, pStudentId);
  };
  //Odev olarak ata butonunda calisir
  const AssignTaskToStudent = () => {
    getMentorsGroups();
    getMentorStudents();
    handleShow();
  };

  const selectSubCategory = (e, pSubCategoryId) => {
    setSubCategoryText(e.target.innerText);
    setMainCategoryText(e.target.parentElement.parentElement.previousElementSibling.innerText);
    getSubCategoriesMaterials(pSubCategoryId);
  };

  return (
    <div className="container">
      <h3>{anMaterial.name}</h3>
      <div className="row">
        <div className="col-sm-12 col-md-9">
          <div className="item-descreption">{anMaterial.descreption}</div>
          <div className="item-button-group">
            {loginInMentor && (
              <button className="solve-test btn btn-outline-success btn-sm">Testi Gör</button>
            )}
            {loginInMentor && (
              <button
                onClick={AssignTaskToStudent}
                className="give-homework btn btn-outline-warning btn-sm"
              >
                Odev Olarak Ata
              </button>
            )}
          </div>
        </div>
        <div className="col-sm-12 col-md-3 image-small-menu">
          <img src={`${anMaterial.image}`} alt="Vefa ile ilgili resim" />
          <div className="small-menu">
            {categories
              .filter((category) => category.name === anMaterial.mainCategory)
              .map((category) => (
                <>
                  <p key={category.id} className="text-secondary text-center fw-bold">
                    {category.name}
                  </p>
                  <div className="list-group-container">
                    <ul className="list text-secondary">
                      {subCategories
                        .filter((subCategory) => subCategory.categoryId === category.id)
                        .map((subCategory, index) => (
                          <li
                            onClick={(e) => selectSubCategory(e, subCategory.id)}
                            key={index}
                            className="subcategories-in-showitem"
                            aria-current="true"
                          >
                            {subCategory.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Modal.Header closeButton className="text-center">
            <Modal.Title>Ödev Veriyorsunuz</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="admin-create-mentor-profil-form mt-4 form-admin ">
              <Form.Group className="mb-2 text-center">
                <Form.Label className="text-white mb-1 fs-5">
                  Hangi Gruba Ödev Veriyorsunuz{" "}
                </Form.Label>
                <Form.Select
                  name="groupnames"
                  type="text"
                  value={groupNames}
                  onChange={(e) => setGroupNames(e.target.value)}
                >
                  <option>Ödev verilecek grup adını seçiniz..</option>
                  {mentorsGroups &&
                    mentorsGroups.map((group) => <option key={group.id}>{group.name}</option>)}
                </Form.Select>
              </Form.Group>
              {/* ogrencilere tek tek odev vermekmicin */}
              <p className="text-center text-white">
                Ödev vermek istediğiniz öğrenci için sağ tarftaki + iconunu kullanınız
              </p>
              <ListGroup>
                {groupNames &&
                  mentorStudents
                    .filter((student) => student.groupId === studentGroupId)
                    .map((student) => (
                      <ListGroup.Item
                        key={student.id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="student-name">{student.first_name}</span>{" "}
                        <span id={`task-gived-${student.id}`} className="task-gived">
                          {}
                        </span>
                        <button
                          type="button"
                          className="btn add-task-icon"
                          id={`clicked-icon-${student.id}`}
                          onClick={() => addTask(student.id)}
                        >
                          {" "}
                          +
                        </button>
                      </ListGroup.Item>
                    ))}
              </ListGroup>
              <div className="d-grid gap-2 mb-2 mt-3">
                <Button variant="danger" onClick={handleClose}>
                  Kapat
                </Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShowItem;
