import React from "react";
import { ActiveWord } from "./ActiveWord";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { nextActiveWord } from "../../../action/vocabulary";

export const ActivesWords = () => {
  const dispatch = useDispatch();

  const { activeWord } = useSelector((state) => state.vocabulary);

  const audioSrc = new Audio(activeWord.audio);
  //let audio = activeWord.audio;
  const hadleEndAudio = () => {
    dispatch(nextActiveWord());
  };

  useEffect(() => {
    audioSrc.src = activeWord.audio;

    console.log(audioSrc.src);
    audioSrc.src = activeWord.audio;
    console.log(audioSrc.src);

    setTimeout(() => {
      audioSrc.load();
      audioSrc.play();
      console.log(audioSrc.src);
    }, 300);
  }, [activeWord]);

  return (
    <>
      <ActiveWord
        key={activeWord.id}
        {...activeWord}
        hadleEndAudio={hadleEndAudio}
        audioSrc={audioSrc}
      />
    </>
  );
};
