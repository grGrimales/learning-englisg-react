import React from "react";
import {Link} from 'react-router-dom';
import imgUno from "../../../images/img-uno.png";
import imgDos from "../../../images/img-dos.png";

export const Activity = () => {
  return (
    <>
      <main className="animate__animated animate__fadeIn">
        <section className="sectionActivity">
          <h1 className="sectionActivity__title mt-5">Ejercicios</h1>
          <h2 className="sectionActivity__title mt-3">
            Ejercicios Para mejorar tu aprendizaje
          </h2>
          <div className="containerActivity">
            <div className="containerActivity__one">
              <img
                className="img-ej-uno"
                src={imgUno}
                alt="Persona practicando"
              />

              <Link to='listening'/>
              Listening + Writing. Escucha palabras ya vistas y escríbelas.
            </div>

            <div  className="containerActivity__two">
              <img src={imgDos} alt="Persona practicando" />
              Remember words. Juega a recordar palabras ya vistas.
            </div>
          </div>
        </section>

        {/* <section className="section-listening ocultar animate__animated animate__fadeIn">
          <div className="contenedor-boton">
            <button className="btn-return" type="submit">
              <i className="fa-solid fa-rotate-left"></i>
              Regresar
            </button>
          </div>
          <div className="ejercicio-listening animate__animated animate__fadeIn">
            <h1 className="text-center">Listening + Writing</h1>

            <p>Escucha la palabra y escribela en el recuadro</p>
            <div className="contenedor-listening">
              <div className="contenedor-audio">
                <audio id="audio-listening" controls>
                  <source src="" type="audio/mp3" />
                  Tu navegador no soporta audio HTML5.
                </audio>
              </div>
              <form action="">
                <div className="cotenedor-form">
                  <input
                    type="text"
                    name="answer"
                    id="answer"
                    autofocus
                    autocomplete="off"
                  />
                  <button className="btn-listening btn-regular" type="submit">
                    Comprobar respuesta
                  </button>
                </div>
              </form>
            </div>
            <div className="contenedor-msj"></div>
          </div>
        </section>

        <section className="section-remember-words ocultar animate__animated animate__fadeIn">
          <h1 className="text-center">Remember words</h1>
          <div className="contenedor-boton">
            <button id="btnReturnRemember" className="btn-return" type="submit">
              <i className="fa-solid fa-rotate-left"></i>
              Regresar
            </button>
          </div>
          <div className="contenedor-remember-words">
            <p>Traduce la siguiente palabra y escribela en el recuadro:</p>

            <ul className="listado-words active-word-remember"></ul>

            <form action="" id="formQuestionRemember">
              <input
                type="text"
                name=""
                autofocus
                id="rememberInput"
                autocomplete="off"
              />
              <button className="btn-remember btn-regular" type="submit">
                Comprobar respuesta
              </button>
            </form>
            <div className="contenedor-alert"></div>
          </div>
        </section> */}
      </main>
    </>
  );
};
