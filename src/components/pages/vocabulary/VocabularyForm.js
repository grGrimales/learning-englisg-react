import React from "react";
import { useDispatch, useSelector } from "react-redux";

// import { getListFilteredVocabulary } from "../../action/vocabulary";
import { useForm } from "../../../hooks/useForm";
// import { Vocabulary } from "./Vocabulary";

export const VocabularyForm = ({ initActivity, error, message }) => {
  const { listCategory } = useSelector((state) => state.vocabulary);
  // const [error, setError] = useState();
  // const [message, setMessage] = useState();

  // const removeError = () => {
  //   setError(false);
  //   setMessage(null);
  // };

  const [formValues, handleInputChange, reset] = useForm({
    category: "--Seleccione--",
    order: "--Seleccione--",
  });

  const { category, order } = formValues;




  return (
    <>
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

          <button
            className="sectionVocabulary__btn btnRegular"
            type="submit"
            onClick={initActivity}
          >
            Comenzar
          </button>
          {error && <div className="alert__error">{message}</div>}
        </form>
      </section>
    </>
  );
};
