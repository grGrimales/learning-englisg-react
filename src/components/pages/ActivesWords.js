import React from "react";
import { ActiveWord } from "./ActiveWord";

export const ActivesWords = ({ activeWord }) => {
  return (
    <>
      {/* {listFiltered.map((list) => (
        <ActiveWord key={list.id} {...list} />
      ))} */}
      <ActiveWord key={activeWord.id} {...activeWord} />
    </>
  );
};
