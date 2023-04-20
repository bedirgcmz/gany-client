import React, { useContext, useState } from "react";
import { GanyContext } from "../../Contexts/GanyContext";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "./NavbarMenu.css";

const NavbarMenu = ({ setSubCategoryText, setMainCategoryText }) => {
  const {
    subCategories,
    categories,
    getSubCategoriesMaterials,
    setSubCategoryMaterials,
    setIsActiveShowItem,
    setIsActiveMaterialCard,
    subCategoryMaterials,
    setSelectedSubCategoryName,
  } = useContext(GanyContext);

  const getOfAgeMaterial = async (e, pMinAge) => {
    const MY_URL = `http://localhost:3001/api/v1/gany/materialsage?minAge=${pMinAge}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setSubCategoryMaterials(data);
    setIsActiveMaterialCard(true);
    setIsActiveShowItem(false);
    setSubCategoryText(e.target.innerText);
    setMainCategoryText(e.target.parentElement.previousElementSibling.innerText);
  };

  const selectSubCategory = (e, pSubCategoryId) => {
    setSubCategoryText(e.target.innerText);
    setMainCategoryText(e.target.parentElement.previousElementSibling.innerText);
    getSubCategoriesMaterials(pSubCategoryId);
  };
  const categoryIcons = [
    "fa-solid fa-book",
    "fa-solid fa-gamepad",
    "fa-solid fa-mosque",
    "fa-solid fa-microscope",
  ];
  return (
    <div className="mb-3 category-navbar">
      <Navbar className="category-area" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Nav className="m-auto ">
              {categories &&
                categories.map((category, index) => (
                  <div className="me-2 d-flex align-items-center">
                    <i className={`${categoryIcons[index]} category-icon`}></i>
                    <NavDropdown title={`${category.name}`} id="basic-nav-dropdown">
                      {subCategories &&
                        subCategories
                          .filter((subCategory) => subCategory.categoryId === category.id)
                          .map((subCategory) => (
                            <NavDropdown.Item
                              onClick={(e) => selectSubCategory(e, subCategory.id)}
                              className="sidebar-subcategory"
                              href="#action/3.1"
                            >
                              <i className="fa-solid fa-eye pe-2"></i>
                              {subCategory.name}
                            </NavDropdown.Item>
                          ))}
                    </NavDropdown>
                  </div>
                ))}
              {categories && (
                <div className="me-2 d-flex align-items-center">
                  <i className="fa-solid fa-arrow-down-1-9 category-icon"></i>
                  <NavDropdown title="YAŞA GÖRE İÇERİKLER" id="basic-nav-dropdown">
                    <NavDropdown.Item
                      onClick={(e) => getOfAgeMaterial(e, 7)}
                      className="sidebar-subcategory"
                      href="#action/3.1"
                    >
                      <i className="fa-solid fa-eye pe-2"></i>7 Yaş ve Üstü içerikler
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={(e) => getOfAgeMaterial(e, 9)}
                      className="sidebar-subcategory"
                      href="#action/3.1"
                    >
                      <i className="fa-solid fa-eye pe-2"></i>9 Yaş ve Üstü içerikler
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={(e) => getOfAgeMaterial(e, 11)}
                      className="sidebar-subcategory"
                      href="#action/3.1"
                    >
                      <i className="fa-solid fa-eye pe-2"></i>11 Yaş ve Üstü içerikler
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={(e) => getOfAgeMaterial(e, 13)}
                      className="sidebar-subcategory"
                      href="#action/3.1"
                    >
                      <i className="fa-solid fa-eye pe-2"></i>13 Yaş ve Üstü içerikler
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={(e) => getOfAgeMaterial(e, 15)}
                      className="sidebar-subcategory"
                      href="#action/3.1"
                    >
                      <i className="fa-solid fa-eye pe-2"></i>15 Yaş ve Üstü içerikler
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarMenu;
