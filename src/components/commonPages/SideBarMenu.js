import React, { useContext } from "react";
import "./SideBarMenu.css";
import { GanyContext } from "../../Contexts/GanyContext";

const Main = ({ selectedSubCategory }) => {
  const {
    subCategories,
    categories,
    getSubCategoriesMaterials,
    setSubCategoryMaterials,
    setIsActiveShowItem,
    setIsActiveMaterialCard,
    subCategoryMaterials,
  } = useContext(GanyContext);

  const getOfAgeMaterial = async (pMinAge) => {
    const MY_URL = `http://localhost:3001/api/v1/gany/materialsage?minAge=${pMinAge}`;
    const response = await fetch(MY_URL);
    const data = await response.json();
    setSubCategoryMaterials(data);
    setIsActiveMaterialCard(true);
    setIsActiveShowItem(false);
  };

  const categoryIcons = [
    "fa-solid fa-book",
    "fa-solid fa-gamepad",
    "fa-solid fa-mosque",
    "fa-solid fa-microscope",
    "fa-solid fa-arrow-down-1-9",
  ];
  console.log(categoryIcons[0]);
  return (
    <>
      {categories &&
        categories.map((category, index) => (
          <div className="main-collepse">
            <div
              className="category-and-icon"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#a${category.id}`}
              aria-expanded="false"
              aria-controls="collapseWidthExample"
            >
              <i className={`${categoryIcons[index]} me-2`}></i>
              <div className="category-btn">{category.name}</div>
              <i className={`fa-solid fa-caret-down`}></i>
            </div>

            <div>
              <div className="collapse multi-collapse" id={`a${category.id}`}>
                <ul>
                  {subCategories
                    .filter((subCategory) => subCategory.categoryId === category.id)
                    .map((subCategory) => (
                      <li
                        onClick={(e) => getSubCategoriesMaterials(subCategory.id)}
                        className="sidebar-subcategory"
                      >
                        {subCategory.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      <div className="main-collepse">
        <div
          className="category-and-icon"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#ageOfMaterıal`}
          aria-expanded="false"
          aria-controls="collapseWidthExample"
        >
          <div className="category-btn">YAŞA GÖRE İÇERİKLER</div>
          <i className={`fa-solid fa-caret-down`}></i>
        </div>

        <div>
          <div className="collapse multi-collapse" id={`ageOfMaterıal`}>
            <ul>
              <li className="sidebar-subcategory" onClick={() => getOfAgeMaterial(7)}>
                7 Yaş ve Üstü içerikler
              </li>
              <li className="sidebar-subcategory" onClick={() => getOfAgeMaterial(9)}>
                9 Yaş ve Üstü içerikler
              </li>
              <li className="sidebar-subcategory" onClick={() => getOfAgeMaterial(11)}>
                11 Yaş ve Üstü içerikler
              </li>
              <li className="sidebar-subcategory" onClick={() => getOfAgeMaterial(13)}>
                13 Yaş ve Üstü içerikler
              </li>
              <li className="sidebar-subcategory" onClick={() => getOfAgeMaterial(15)}>
                15 Yaş ve Üstü içerikler
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
