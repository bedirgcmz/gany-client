import React, { useContext } from "react";
import { Col, Row, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";
import { GanyContext } from "../Contexts/GanyContext";

const Footer = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    setIsActiveMaterialCard,
    setIsActiveShowItem,
  } = useContext(GanyContext);

  const renderHomePage = () => {
    setIsActiveMaterialCard(true);
    setIsActiveShowItem(false);
  };
  return (
    <div className="footer-container">
      <Row className="footer-content">
        <Col sm={12} md={12} lg={4}>
          <ListGroup className="footer-link">
            <Link onClick={renderHomePage} to={"/home"}>
              Ana Sayfa
            </Link>
            <Link to={"/"}>Hakkimizda</Link>
            <Link to={"/contact"}>Iletisim</Link>
          </ListGroup>
        </Col>
        <Col sm={12} md={12} lg={4} className="icon-container text-center text-white pt-3">
          <i className="fa-brands fa-facebook-f"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-linkedin-in"></i>
        </Col>
        <Col sm={12} md={12} lg={4} className="button-container">
          {!isAuthenticated && (
            <button onClick={loginWithRedirect} type="button" className="btn btn-outline-warning">
              LOGIN
            </button>
          )}
          {isAuthenticated && (
            <button onClick={() => logout()} type="button" className="btn btn-outline-warning">
              LOGOUT
            </button>
          )}
        </Col>
      </Row>
      <p className="text-container text-center mt-3">
        Copyright © 2022 Bedir Gocmez. All rights reserved.
      </p>
      <div className="xx-container"></div>
    </div>
  );
};

export default Footer;
