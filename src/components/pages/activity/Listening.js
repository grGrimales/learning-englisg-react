import React from "react";
import { BtnReturn } from "../vocabulary/BtnReturn";
import { useNavigate } from "react-router-dom";

export const Listening = () => {
  const navigate = useNavigate();

  const handleReturn = (e) => {
    e.preventDefault();
    localStorage.removeItem("listFiltered");
    localStorage.removeItem("showActivity");
    localStorage.removeItem("category");
    navigate("/activity");
  };

  return (
    <>
      <section className="sectionListening ocultar animate__animated animate__fadeIn">
        <BtnReturn returnVocabulary={handleReturn} />

        <div className="ejercicioListening animate__animated animate__fadeIn">
          <h1 className="ejercicioListening__title">Listening + Writing</h1>

          <p>Escucha la palabra y escribela en el recuadro</p>

          <div className="containerListening">
            <div className="containerListening__audio">
              <audio id="audio-listening" controls>
                <source src="" type="audio/mp3" />
                Tu navegador no soporta audio HTML5.
              </audio>
            </div>
            <form action="">
              <div className="containerListening__form">
                <input
                  type="text"
                  name="answer"
                  id="answer"
                  autofocus
                  autocomplete="off"
                />
                <button
                  className="containerListening__btn btnRegular"
                  type="submit"
                >
                  Comprobar respuesta
                </button>
              </div>
            </form>
          </div>
          <div className="contenedor-msj"></div>
        </div>
      </section>
    </>
  );
};
