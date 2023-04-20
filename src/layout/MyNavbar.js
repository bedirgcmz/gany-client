import React, { useContext, useState } from "react";
import "./MyNavbar.css";
import { Navbar, Nav, NavbarBrand, Modal, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { GanyContext } from "../Contexts/GanyContext";

/**
 * This function creates a Navbar component.
 * @returns Navbar
 */
const MyNavbar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    setIsActiveMaterialCard,
    setIsActiveShowItem,
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    loginInAdminEmail,
    loginInMentorEmail,
    loginInStudentEmail,
  } = useContext(GanyContext);

  const renderHomePage = () => {
    setIsActiveMaterialCard(true);
    setIsActiveShowItem(false);
  };

  return (
    <>
      <div className="navbar-container">
        <Navbar className="site-navbar px-4 py-0" expand="md" light>
          <NavbarBrand href="/">
            <span className="logo-text">
              GA<span className="">NY</span>
            </span>{" "}
            <span></span>
            <img
              width={"40px"}
              src="https://www.pngkey.com/png/full/27-270640_the-campus-plan-education-logo-png-hd.png"
              alt=""
            />
          </NavbarBrand>
          <Navbar.Toggle aria-controls="gany-navbar-nav" />
          <Navbar.Collapse id="gany-navbar-nav">
            <div className="header-text">
              <div className="header-top-text">Öğrendikçe Kalbiniz Sevgi İle Dolar..</div>
              <div className="header-bottom-text">
                <span>...................</span> Ve Sevgi İle Hayat Güzelleşir..
              </div>
            </div>
            <Nav className="ms-auto" navbar>
              <NavLink to={"/home"} onClick={renderHomePage}>
                Ana Sayfa
              </NavLink>
              <NavLink to={"/"}>Hakkımızda</NavLink>
              <NavLink to={"/contact"}>İletişim</NavLink>
              <div className={"px-2 me-4"}>
                <img
                  onClick={handleShow}
                  className="user-img"
                  src={
                    user
                      ? user.picture
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxqlSNYUW9cmBUymWOYLEvZPQzOVNwBHL6dadFN4y1VR3n7yKBOUrXGWoCo-kC0IWuwY&usqp=CAU"
                  }
                  alt="Logout"
                />
              </div>
              {/* Kendi login sayfasi olunca kullanilacak  */}
              {/* <NavLink className={"px-2"} to={"!#"}>
                <img
                  onClick={handleShow}
                  className="user-img"
                  src={
                    user
                      ? user.picture
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxqlSNYUW9cmBUymWOYLEvZPQzOVNwBHL6dadFN4y1VR3n7yKBOUrXGWoCo-kC0IWuwY&usqp=CAU"
                  }
                  alt="Logout"
                />
              </NavLink> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="account-container">
        <Modal className="account-modal" show={show} onHide={handleClose} animation={false}>
          <Modal.Header className="account-modal-header" closeButton>
            <Modal.Title className="text-center mx-auto">HOŞGELDİNİZ</Modal.Title>
          </Modal.Header>
          <img
            className="user-img-in-modal"
            src={
              user
                ? user.picture
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxqlSNYUW9cmBUymWOYLEvZPQzOVNwBHL6dadFN4y1VR3n7yKBOUrXGWoCo-kC0IWuwY&usqp=CAU"
            }
            alt="Login"
          />
          <Modal.Body className="account-modal-body">
            <p className="fs-5 mb-0">{user ? user.name : "Misafir"}</p>
            <p>{user ? user.email : "msafir@gmail.com"}</p>
          </Modal.Body>
          <Modal.Footer className="account-modal-footer d-flex flex-column">
            {loginInAdminEmail && (
              <Link
                to={"/admin"}
                variant="outline-success"
                className="account-modal-link mb-2"
                onClick={handleClose}
              >
                <i className="fa-solid fa-user"></i> Hesabim
              </Link>
            )}
            {loginInMentorEmail && (
              <Link
                to={"/mentor"}
                variant="outline-success"
                className="account-modal-link mb-2"
                onClick={handleClose}
              >
                <i className="fa-solid fa-user"></i> Hesabim
              </Link>
            )}
            {loginInStudentEmail && (
              <Link
                to={"/student"}
                variant="outline-success"
                className="account-modal-link mb-2"
                onClick={handleClose}
              >
                <i className="fa-solid fa-user"></i> Hesabim
              </Link>
            )}
            {isAuthenticated && (
              <Button
                variant="outline-danger"
                className="account-modal-logout-button"
                onClick={() => logout()}
              >
                Logout
              </Button>
            )}

            {!isAuthenticated && (
              <Button className="account-modal-login-button" onClick={loginWithRedirect}>
                Login
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default MyNavbar;
