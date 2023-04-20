import React, { useContext, useState } from "react";
import { GanyContext } from "../../Contexts/GanyContext";
import "./ShowItem.css";

const ShowItem = ({ showItemName, setProfile, setShowItem, setMyStudents, setMyTasks }) => {
  const { materials, anMaterial } = useContext(GanyContext);

  const showTask = materials.find((material) => material.name === showItemName);

  // Materyali odev olarak atama
  const renderTaskList = () => {
    setProfile(false);
    setShowItem(false);
    setMyStudents(false);
    setMyTasks(true);
  };

  return (
    <div className="container bg-light pb-5 pt-2">
      {anMaterial && (
        <>
          <h3>{anMaterial && anMaterial.name}</h3>
          <div className="row">
            <div className="col-sm-12 col-md-9">
              <div className="item-descreption">{anMaterial && anMaterial.descreption}</div>
              <div className="item-button-group">
                <button className="solve-test btn btn-outline-success btn-sm">Testi Coz</button>
                <button
                  onClick={renderTaskList}
                  className="give-homework btn btn-outline-warning btn-sm"
                >
                  Odevlerime Don
                </button>
                {/* <button
                onClick={() => isTaskDoned(anMaterial.id)}
                className="give-homework btn btn-outline-warning btn-sm"
              >
                Odev Tamamlandi
              </button> */}
              </div>
            </div>
            <div className="col-sm-12 col-md-3 image-small-menu">
              <img src={`${anMaterial && anMaterial.image}`} alt="Vefa ile ilgili resim" />
            </div>
          </div>
        </>
      )}
      {!anMaterial && (
        <>
          <div className="text-center fs-3 p-2 mb-2 bg-danger text-white rounded">
            Bu odev kaldirildi!
          </div>
          <button
            onClick={renderTaskList}
            className="give-homework btn btn-outline-warning btn-sm "
          >
            Odevlerime Don
          </button>
        </>
      )}
    </div>
  );
};

export default ShowItem;
