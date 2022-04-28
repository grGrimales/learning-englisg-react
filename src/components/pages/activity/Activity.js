import { useNavigate } from "react-router-dom";

import imgUno from "../../../images/img-uno.png";
import imgDos from "../../../images/img-dos.png";
import { useDispatch } from "react-redux";
import { setKindActivy } from "../../../action/activity";

export const Activity = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForm = (typeOfactivity) => {

    dispatch(setKindActivy(typeOfactivity));
    navigate("/form-activity");
  };

  return (
    <>
      {" "}
      <main className="animate__animated animate__fadeIn">
        <section className="sectionActivity">
          <h1 className="sectionActivity__title mt-5">Ejercicios</h1>
          <h2 className="sectionActivity__title mt-3">
            Ejercicios Para mejorar tu aprendizaje
          </h2>
          <div className="containerActivity">
            <div className="containerActivity__one" onClick={() => handleForm("listening")}>
              <img
                className="img-ej-uno"
                src={imgUno}
                alt="Persona practicando"
              />
              Listening + Writing. Escucha palabras ya vistas y escríbelas.
              {/* <Link to="/listening" >
                   
                  </Link> */}
            </div>

            <div className="containerActivity__two" onClick={ () => handleForm("remember")}>
              <img src={imgDos} alt="Persona practicando" />
              Remember words. Juega a recordar palabras ya vistas.
            </div>
          </div>
        </section>

        {/* 

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
      </main>{" "}
    </>
  );
};
