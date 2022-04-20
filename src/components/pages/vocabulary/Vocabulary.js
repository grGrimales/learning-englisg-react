import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getListFilteredVocabulary } from "../../../action/vocabulary";
import { useForm } from "../../../hooks/useForm";
import { VocabularyAc } from "./VocabularyAc";

export const Vocabulary = () => {
  const { listCategory, showActivity } = useSelector(
    (state) => state.vocabulary
  );
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const removeError = () => {
    setError(false);
    setMessage(null);
  };

  useEffect(() => { }, [showActivity]);

  const [formValues, handleInputChange, reset] = useForm({
    category: "--Seleccione--",
    order: "--Seleccione--",
    limit:2,
    repetir: 2
  });

  const { category, order, limit, repetir } = formValues;

  const dispatch = useDispatch();

  const handleActivity = (e) => {
    e.preventDefault();

    if (category != "--Seleccione--" && order != "--Seleccione--") {
      dispatch(getListFilteredVocabulary(order, category, limit));
      localStorage.setItem("category", category);
      localStorage.setItem("repetir", repetir);
      localStorage.setItem("order", order);
      localStorage.setItem("limit", limit)
      setTimeout(() => {
        reset();
      }, 800);
    } else {
      setError(true);
      setMessage("*Todos los campos son obligatorios");
      setTimeout(() => {
        removeError();
      }, 3000);
      console.log("Debe seleccionar ambos valores");
    }
  };

  return (
    <>
      <main className=" animate__animated animate__fadeIn">
        {showActivity ? (
          <VocabularyAc />
        ) : (
          <section className="sectionVocabulary mt-3 animate__animated animate__fadeIn">
            <h1 className="sectionVocabulary__title">
              ¿Que categoría te gustaría escuchar hoy?
            </h1>
            <form className="sectionVocabulary__form">
              <div className="formGroup">
                <label htmlFor="category">Selecciona una categoría:</label>
                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={handleInputChange}
                >
                  <option disabled defaultValue>
                    --Seleccione--
                  </option>
                  {listCategory.map((cat) => (
                    <option key={cat.id} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
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

                  <option value="random">Aleatorio</option>
                  <option value="leastplayed">Menos reproducidas</option>
                  <option value="leasthits">Menos aciertos</option>
                </select>
              </div>


              <div className="formGroup">
                <label htmlFor="limit">Total:</label>
                <input
                  name="limit"
                  id="limit"
                  value={limit}
                  onChange={handleInputChange}

                ></input>
              </div>


              <div className="formGroup">
                <label htmlFor="repetir">Repetir:</label>
                <input
                  name="repetir"
                  id="repetir"
                  value={repetir}
                  onChange={handleInputChange}

                ></input>
              </div>

              <button
                className="sectionVocabulary__btn btnRegular"
                type="submit"
                onClick={handleActivity}
              >
                Comenzar
              </button>
              {error && <div className="alert__error">{message}</div>}
            </form>
          </section>
        )}
      </main>
    </>
  );
};
