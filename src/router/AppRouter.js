import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../components/auth/Login";
import { PrivateRoute } from "./PrivateRouter";
import { startCheking } from "../action/auth";
import { LearningEnglishRouter } from "./LearningEnglishRouter";
import { PublicRoute } from "./PublicRoute";
import { Espere } from "../components/Espere";
import {
  updateShowActivity,
  updateActiveWord,
  listFilteredVocabulary,
  setCurrentIndex,
} from "../action/vocabulary";

export const AppRouter = () => {
  const { checking } = useSelector((state) => state.auth);
  const { logged } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const showActivity = localStorage.getItem("showActivity");
  const currentIndex = localStorage.getItem("currentIndex");
  const listFiltered = JSON.parse(localStorage.getItem("listFiltered"));

  dispatch(updateShowActivity(showActivity));

  dispatch(listFilteredVocabulary(listFiltered ? listFiltered : []));

  dispatch(updateActiveWord(listFiltered ? listFiltered[currentIndex] : {}));
  dispatch(setCurrentIndex(currentIndex ? parseInt(currentIndex) : 0));

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  if (checking) {
    return <Espere />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <LearningEnglishRouter />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
