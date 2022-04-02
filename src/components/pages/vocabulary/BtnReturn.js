import React from "react";

export const BtnReturn = ({ returnVocabulary }) => {
  const category = localStorage.getItem("category") || "";

  return (
    <>
      <div className="sectionVocabulary__return">
        <h3 className="sectionVocabulary__title">
          Has seleccionado la categoría:
          <span className="sectionVocabulary__span">
            {" "}
            {category.toUpperCase()}
          </span>
        </h3>
        <button
          className="sectionVocabulary__btnReturn"
          type="submit"
          onClick={returnVocabulary}
        >
          <i className="fa-solid fa-rotate-left"></i>
          Regresar
        </button>
      </div>
    </>
  );
};
