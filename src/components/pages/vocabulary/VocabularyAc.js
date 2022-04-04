import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BtnReturn } from "./BtnReturn";
import { ActivesWords } from "../activeWord/ActivesWords";
import { ListsWords } from "../listsWords/ListsWords";

import { updateShowActivity } from "../../../action/vocabulary";

export const VocabularyAc = () => {
  const listFiltered = JSON.parse(localStorage.getItem("listFiltered"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReturn = (e) => {
    e.preventDefault();
    localStorage.removeItem("listFiltered");
    localStorage.removeItem("showActivity");
    localStorage.removeItem("category");
    dispatch(updateShowActivity(false));
    navigate("/vocabulary");
  };

  const { activeWord } = useSelector((state) => state.vocabulary);

  return (
    <>
      <section className="sectionVocabulary mt-3 animate__animated animate__fadeIn">
        <BtnReturn returnVocabulary={handleReturn} />
        <div className="sectionVocabulary__actividad">
          <ActivesWords activeWord={activeWord} />

          <ListsWords listFiltered={listFiltered} />
        </div>
      </section>
    </>
  );
};
