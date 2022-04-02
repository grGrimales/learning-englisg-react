import React from "react";

export const ActiveWord = ({ audio, englishWord, spanishWord, img }) => {
  return (
    <>
      <div className="container">
        <div className="container__audio">
          <audio id="audio" controls>
            <source src={audio} type="audio/mp3" />
            Tu navegador no soporta audio HTML5.
          </audio>
        </div>
        <ul className="wordsActive">
          <li className="wordsActive__english">
            {englishWord}
            <i className="fa-solid fa-angle-right change"></i>
          </li>
          <li className="wordsActive__spanish">{spanishWord}</li>
        </ul>
        <div className="wordsActive__img">
          <img src={img} alt={englishWord} />
        </div>
      </div>
    </>
  );
};
