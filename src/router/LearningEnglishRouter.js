import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { VocabularyForm } from "../components/pages/VocabularyForm";
import { Vocabulary } from "../components/pages/Vocabulary";
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
        <Route path="/vocabulary-form" element={<VocabularyForm />} />;
        <Route path="/" element={<VocabularyForm />} />
      </Routes>
    </>
  );
};
