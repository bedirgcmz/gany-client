import React, { useState, useContext } from "react";
import { GanyContext } from "../../Contexts/GanyContext";
import { Button, Form } from "react-bootstrap";
import "./Contact.css";

const Contact = () => {
  const { postFeedback } = useContext(GanyContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newMessage = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      message: message,
    };
    postFeedback(newMessage);
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <div className="information-container">
        <h4 className="text-center mb-4">Bize Ulaş</h4>
        <ul className="icon-list">
          <li className="contact-icon-item">
            <i className="fa-solid fa-location-dot"></i> Gamla Huddingevegen 423, 122 45 Alvsjö /
            Stockholm
          </li>
          <li className="contact-icon-item">
            <i className="fa-solid fa-mobile-screen-button"></i> +46 76 985 78 89
          </li>
          <li className="contact-icon-item">
            <i className="fa-solid fa-envelope"></i> gany-project@gmail.com
          </li>
        </ul>
        <div className="social-media-icons text-center">
          <i className="fa-brands fa-facebook-f"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-linkedin-in"></i>
        </div>
      </div>
      <div className="contact-form-container">
        <Form
          className="admin-create-mentor-profil-form form-contact "
          onSubmit={(e) => handleSubmitForm(e)}
        >
          <h4 className="text-white text-center">Bizimle İletişime Geç</h4>
          <Form.Group className="mb-2">
            <Form.Label className="text-white mb-1">Adı</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              placeholder="Adınızı yazınız.."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="text-white mb-1">Soyadı</Form.Label>
            <Form.Control
              required
              name="surname"
              type="text"
              placeholder="Soyadınızı yazınız.."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="text-white mb-1">Email</Form.Label>
            <Form.Control
              required
              name="email"
              type="text"
              placeholder="Email adresinizi yazınız.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="text-white mb-1">Mesajınızı buraya yazınız</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Mesajiniz.."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <Button type="submit" className="contact-form-button">
              Gönder
            </Button>
            <span className="message-count">0 / 255</span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
