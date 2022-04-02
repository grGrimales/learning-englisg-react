import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BtnReturn } from "./BtnReturn";
import { ActivesWords } from "../ActivesWords";
import { ListsWords } from "../listsWords/ListsWords";

export const VocabularyAc = () => {
  const listFiltered = JSON.parse(localStorage.getItem("listFiltered"));

  console.log(listFiltered);

  const navigate = useNavigate();

  const handleReturn = (e) => {
    e.preventDefault();
    console.log("Funciona");
    localStorage.removeItem("listFiltered");
    localStorage.removeItem("showActivity");
    localStorage.removeItem("category");
    navigate("/vocabulary");
  };

  const wordActive = listFiltered[1];

  return (
    <>
      <section className="sectionVocabulary mt-3 animate__animated animate__fadeIn">
        <BtnReturn returnVocabulary={handleReturn} />
        <div className="sectionVocabulary__actividad">
          <ActivesWords activeWord={wordActive} />

          <ListsWords listFiltered={listFiltered} />
        </div>
      </section>
    </>
  );
};
