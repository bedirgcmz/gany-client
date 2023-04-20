import React, { useContext } from "react";
import { GanyContext } from "../../Contexts/GanyContext";
import { ListGroup, Badge } from "react-bootstrap";

const FeedbackList = () => {
  const { loginInAdmin, feedbacks, deleteFeedback } = useContext(GanyContext);

  return (
    <>
      <h3 className="text-center feedback-header">Geri Bildirim Listesi</h3>
      <div className="admin-all-feedback-list mt-4">
        <ListGroup as="ol" numbered>
          {feedbacks.length !== 0 ? (
            feedbacks.map((feedback) => (
              <ListGroup.Item
                key={feedback.id}
                as="li"
                className="d-flex justify-content-between align-items-start mb-4 rounded shadow"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold feedback-user-name">
                    Gönderen<i className="fa-solid fa-angle-right mx-3"></i>{" "}
                    {`${feedback.first_name} ${feedback.last_name}`}
                  </div>
                  <div className="fw-bold feedback-message">
                    Mesaj<i className="fa-solid fa-angle-right mx-3"></i>
                    {feedback.message}
                  </div>
                  <span className="feedback-date">{`Gönderim Tarihi:   ${new Date(
                    feedback.createdAt
                  ).getDate()} . ${new Date(feedback.createdAt).getMonth()} . ${new Date(
                    feedback.createdAt
                  ).getFullYear()}`}</span>
                  <span className="feedback-email ms-3">Gönderen Email: {feedback.email}</span>
                </div>
                <Badge bg="light" pill>
                  <i
                    onClick={() => deleteFeedback(feedback.id)}
                    className="fa-solid fa-trash-can"
                  ></i>
                </Badge>
              </ListGroup.Item>
            ))
          ) : (
            <span className="p-3 text-white bg-warning">"Henüz mesajınız yok"</span>
          )}
        </ListGroup>
      </div>
    </>
  );
};

export default FeedbackList;
