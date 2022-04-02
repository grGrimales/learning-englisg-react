import React from "react";
import { ListWord } from "./ListWord";

export const ListsWords = ({ listFiltered }) => {
  return (
    <>
      <div className="containerWord">
        <ul id="words" className="containerWord__listWords">
          {listFiltered.map((list) => (
            <ListWord key={list.id} {...list} />
          ))}
        </ul>
      </div>
    </>
  );
};
