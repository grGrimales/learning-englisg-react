import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextActiveWord, setCurrentIndex, updateActiveWord } from "../../../action/vocabulary";


export const ActiveWord = ({

}) => {


  const { listFiltered, currentIndex, activeWord, showActivity } = useSelector((state) => state.vocabulary);
  const audioRef = document.getElementById("audio");

  const dispatch = useDispatch();

  const hadleEndAudio = () => {

    // Al final del listado, tenemos que reiniciar
    if (currentIndex >= (listFiltered.length - 1)) {
      //  dispatch(updateActiveWord(listFiltered[0]));
      dispatch(nextActiveWord(listFiltered[0]));

      dispatch(setCurrentIndex(0));
      playAudio();

      return;
    }

    // Pasamos a la siguiente palabra activa

    dispatch(nextActiveWord(activeWord));
    dispatch(setCurrentIndex(currentIndex + 1));

    playAudio();
  };


  const playAudio = () => {
    audioRef?.load();

    setTimeout(() => {
      audioRef?.load();

      setTimeout(() => {
        audioRef?.play();
      }, 200);
    }, 400);
  };


  useEffect(() => {
    audioRef?.load();

  }, [activeWord])



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
