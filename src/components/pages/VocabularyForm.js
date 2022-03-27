import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

export const VocabularyForm = () => {
  const { listCategory } = useSelector((state) => state.vocabulary);

  const [formValues, handleInputChange] = useForm({
    category: "",
    order: "",
  });

  const { category, order } = formValues;

  const handleActivity = (e) => {
    e.preventDefault();
    console.log("funciona");
    console.log(category, order);
  };

  return (
    <>
      <main className=" animate__animated animate__fadeIn">
        <section className="sectionVocabulary mt-3 animate__animated animate__fadeIn">
          <h1 className="sectionVocabulary__title">
            ¿Que categoría te gustaría escuchar hoy?
          </h1>
          <form className="sectionVocabulary__form">
            <div className="formGroup">
              <label htmlFor="category">Escribe una categoría categoría:</label>
              <input
                type="text"
                id="category "
                name="category"
                value={category}
                onChange={handleInputChange}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="order">Ordenar por:</label>
              <select
                name="order"
                id="order"
                value={order}
                onChange={handleInputChange}
              >
                <option disabled defaultValue>
                  --Seleccione--
                </option>

                <option value="aleatorio">Aleatorio</option>
                <option value="numberReproductions">Menos reproducidas</option>
                <option value="numberSuccessful">Menos aciertos</option>
              </select>
            </div>

            <button
              className="sectionVocabulary__btn btnRegular"
              type="submit"
              onClick={handleActivity}
            >
              Comenzar
            </button>
          </form>
        </section>
      </main>
    </>
  );
};
