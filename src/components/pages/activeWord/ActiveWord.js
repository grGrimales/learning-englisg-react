import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListFilteredVocabulary, nextActiveWord, setCurrentIndex, updateActiveWord } from "../../../action/vocabulary";


export const ActiveWord = ({

}) => {


  const { listFiltered, currentIndex, activeWord } = useSelector((state) => state.vocabulary);
  const audioRef = document.getElementById("audio");


  // Guarda la informacion de todas las veces que se ha completado el listado
  const [conteoReproducciones, setconteoReproducciones] = useState(1);

  const repetir = parseInt(localStorage.getItem("repetir"));

  const dispatch = useDispatch();

  const hadleEndAudio = () => {

     setTimeout(() => {

    // si llegamos al final del listado y de repetir volvemos a consultar la base de datos y 
    // refrecasr el listado
    if (repetir < conteoReproducciones) {

      const limit = parseInt(localStorage.getItem("limit"));
      const order = localStorage.getItem("order");

      const category = localStorage.getItem("category");
      setconteoReproducciones(1)

      dispatch(getListFilteredVocabulary(order, category, limit));
      dispatch(nextActiveWord(listFiltered[0]));

      dispatch(setCurrentIndex(0));
      playAudio();
      return;
    }



    // Al final del listado, tenemos que reiniciar
    if (currentIndex >= (listFiltered.length - 1)) {
      //  dispatch(updateActiveWord(listFiltered[0]));
      setconteoReproducciones(conteoReproducciones + 1)

      dispatch(nextActiveWord(listFiltered[0]));

      dispatch(setCurrentIndex(0));
      playAudio();

      return;
    }

    // Pasamos a la siguiente palabra activa

    dispatch(nextActiveWord(activeWord));
    dispatch(setCurrentIndex(currentIndex + 1));

    playAudio();
     }, 870);

  };

  //


  const playAudio = () => {
    audioRef?.load();

    setTimeout(() => {
    //  audioRef?.load();

      setTimeout(() => {
        audioRef?.play();
      }, 200);
    }, 850);
  };


  useEffect(() => {
    audioRef?.load();

  }, [activeWord, listFiltered])



  return (
    <>
      <div className="container">
        <div className="container__audio">
          <audio onEnded={hadleEndAudio} id="audio" controls>
            <source src={activeWord?.audio} type="audio/mp3" />
            Tu navegador no soporta audio HTML5.
          </audio>
        </div>
        <ul className="wordsActive">
          <li className="wordsActive__english">
            {activeWord?.englishWord}
            <i className="fa-solid fa-angle-right change"></i>
          </li>
          <li className="wordsActive__spanish">{activeWord?.spanishWord}</li>
        </ul>
        <div className="wordsActive__img">
          <img src={activeWord?.img} alt={activeWord?.englishWord} />
        </div>
      </div>
    </>
  );
};
