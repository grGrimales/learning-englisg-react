import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { VocabularyForm } from "../components/pages/vocabulary/VocabularyForm";
import { Vocabulary } from "../components/pages/vocabulary/Vocabulary";
import { VocabularyAc } from "../components/pages/vocabulary/VocabularyAc";

import { getCategory } from "../action/vocabulary";
import { NavBar } from "../components/pages/NavBar";

export const LearningEnglishRouter = () => {
  const dispatch = useDispatch();

  dispatch(getCategory());
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/vocabulary" element={<Vocabulary />} />;
        <Route path="/" element={<Vocabulary />} />
      </Routes>
    </>
  );
};
