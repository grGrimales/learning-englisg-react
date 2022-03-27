import React from "react";
import logo from "../../images/logo-app.png";
import { useDispatch } from "react-redux";

export const Vocabulary = () => {
  const dispatch = useDispatch();

  return (
    <>
      <section className="sectionVocabulary  animate__animated animate__fadeIn">
        <div className="sectionVocabulary__return">
          <h3 className="sectionVocabulary__title">
            Has seleccionado la categoría:
            <span className="sectionVocabulary__span">xxx</span>
          </h3>
          <button className="sectionVocabulary__btnReturn" type="submit">
            <i className="fa-solid fa-rotate-left"></i>
            Regresar
          </button>
        </div>

        <div className="sectionVocabulary__actividad">
          {/* Contenedor Palabra reproduciendo */}
          <div className="container">
            <div className="container__audio">
              <audio id="audio" controls>
                <source src="" type="audio/mp3" />
                Tu navegador no soporta audio HTML5.
              </audio>
            </div>
            <ul className="wordsActive">
              <li className="wordsActive__english">
                englishWord
                <i className="fa-solid fa-angle-right change"></i>
              </li>
              <li className="wordsActive__spanish">spanishWord</li>
            </ul>
            <div className="wordsActive__img">
              <img src={logo} />
            </div>
          </div>

          {/* Contenedor listado de palabras */}

          <div className="containerWord">
            <ul id="words" className="containerWord__listWords">
              <li className="containerWord__english">spanishWord</li>
              <li className="containerWord__english">spanishWord</li>
              <li className="containerWord__english">spanishWord</li>
              <li className="containerWord__english">spanishWord</li>
              <li className="containerWord__english">spanishWord</li>
              <li className="containerWord__english">spanishWord</li>
              <li className="containerWord__english">spanishWord</li>
              <li className="containerWord__english">spanishWord</li>
              <li className="containerWord__english">spanishWord</li>
              <li className="containerWord__english">spanishWord</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
