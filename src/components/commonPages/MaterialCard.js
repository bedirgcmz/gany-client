import React, { useContext } from "react";
import "./MaterialCard.css";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GanyContext } from "../../Contexts/GanyContext";

const MaterialCard = ({ materials, selectedSubCategoryName, getMaterialsById }) => {
  const { subCategoryMaterials } = useContext(GanyContext);

  //asida barda yazili olan alt kategori ismine gore materyalleri filtreleyen fonks.
  // const showMaterials = materials.filter(
  //   (material) => material.subCategory === selectedSubCategoryName
  // );

  return (
    <div>
      {subCategoryMaterials.length !== 0 ? (
        <Row xs={1} md={2} className="g-4">
          {subCategoryMaterials.map((material) => (
            <Col key={material.id} lg={4}>
              <Card>
                <Card.Img variant="top" src={`${material.image}`} className="material-card-img" />
                <Card.Body>
                  <Card.Title>{material.name}</Card.Title>
                  <Card.Text className="material-card-text">{`${material.descreption.substring(
                    0,
                    200
                  )} ...`}</Card.Text>
                  {/* <Link to={``}> */}
                  <div className="d-flex justify-content-between align-items-center">
                    <Button className="read-more" onClick={() => getMaterialsById(material.id)}>
                      Devamini Oku
                    </Button>
                    <i className="fa-solid fa-book-open-reader fs-2 text-succes"></i>
                  </div>
                  {/* </Link> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="category-not-found d-flex justify-content-start align-items-center">
          <p className="mb-0 me-3">Bu kategoride henuz icerik bulunmamaktadir</p>
          <i className="fa-solid fa-face-frown"></i>
        </div>
      )}
    </div>
  );
};

export default MaterialCard;
