import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { VocabularyForm } from "../components/pages/vocabulary/VocabularyForm";
import { Vocabulary } from "../components/pages/vocabulary/Vocabulary";
import { VocabularyAc } from "../components/pages/vocabulary/VocabularyAc";

import { getCategory } from "../action/vocabulary";
import { NavBar } from "../components/pages/NavBar";
import { Activity } from "../components/pages/activity/Activity";
import { Listening } from "../components/pages/activity/Listening";
import { FormActivity } from "../components/pages/activity/FormActivity";
import RememberActivity from "../components/pages/activity/RememberActivity";

export const LearningEnglishRouter = () => {
  const dispatch = useDispatch();
  

  dispatch(getCategory());
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/vocabulary" element={<Vocabulary />} />;
        <Route path="/activity" element={<Activity />} />;
        <Route path="/listening" element={<Listening />} />;
        <Route path="/form-activity" element={<FormActivity />} />;
        <Route path="/remember-activity" element={<RememberActivity />} />;

    
        <Route path="/" element={<Vocabulary />} />
      </Routes>
    </>
  );
};
