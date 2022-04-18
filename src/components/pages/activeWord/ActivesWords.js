import React from "react";
import { ActiveWord } from "./ActiveWord";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { nextActiveWord } from "../../../action/vocabulary";

export const ActivesWords = () => {
  const dispatch = useDispatch();





  return (
    <>
      <ActiveWord
      />
    </>
  );
};
