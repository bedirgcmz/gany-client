import React, { useContext, useState } from "react";
import "./HomePage.css";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";
import { GanyContext } from "../../Contexts/GanyContext";
import SideBarMenu from "./SideBarMenu";
import MaterialCard from "./MaterialCard";
import ShowItem from "./ShowItem";
import Footer from "../../layout/Footer";
import NavbarMenu from "./NavbarMenu";
//import ShowItem from "./ShowItem";

const HomePage = () => {
  const {
    materials,
    anMaterial,
    selectedSubCategoryName,
    selectedSubCategory,
    getMaterialsById,
    isActiveMaterialCard,
    isActiveShowItem,
    subCategoryMaterials,
  } = useContext(GanyContext);

  const [subCategoryText, setSubCategoryText] = useState("");
  const [mainCategoryText, setMainCategoryText] = useState("");

  // // Ana sayfada acilan icerigin ana kategori ve aly kategori adini tasiyan material listesi
  // const topCategoriText = materials.find(
  //   (material) => material.subCategory === selectedSubCategoryName
  // );

  return (
    <div>
      <Row>
        <Col>
          <NavbarMenu
            setSubCategoryText={setSubCategoryText}
            setMainCategoryText={setMainCategoryText}
          />
        </Col>
      </Row>
      <Row className="my mx-auto w-75 search-and-rotasion-text">
        <Col xs="12" sm="6" md="8" className="ps-0">
          <div className="home-page-top-area">
            {subCategoryText && (
              <p>
                <i className="fa-solid fa-location-dot pe-2"></i>
                {`  ${mainCategoryText} > ${subCategoryText}`}{" "}
                {isActiveShowItem ? `> ${anMaterial.name}` : ""}
              </p>
            )}
          </div>
        </Col>
        <Col xs="12" sm="6" md="4" className="pe-0">
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button
              className="d-flex justify-content-center align-items-center"
              variant="outline-primary"
            >
              <i className="fa-solid fa-magnifying-glass pe-2"></i> Ara
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {/* <Col xs="12" sm="4" lg="3" className="bg-light">
          <div className="side-bar ms-3 me-1 mb-3 p-3 rounded shadow border">
            <SideBarMenu materials={materials} selectedSubCategory={selectedSubCategory} /> xs="12" sm="8" lg="9"
          </div>
        </Col> */}
        <Col className="">
          <div className="item-list-are mx-5 mb-2 p-3 ">
            {isActiveMaterialCard && (
              <MaterialCard
                getMaterialsById={getMaterialsById}
                materials={materials}
                selectedSubCategoryName={selectedSubCategoryName}
              />
            )}
            {isActiveShowItem && (
              <ShowItem
                setSubCategoryText={setSubCategoryText}
                setMainCategoryText={setMainCategoryText}
                materials={materials}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
