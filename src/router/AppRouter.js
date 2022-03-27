import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../components/auth/Login";
import { PrivateRoute } from "./PrivateRouter";
import { startCheking } from "../action/auth";
import { LearningEnglishRouter } from "./LearningEnglishRouter";
import { PublicRoute } from "./PublicRoute";
import { Espere } from "../components/Espere";

export const AppRouter = () => {
  const { checking } = useSelector((state) => state.auth);
  const { logged } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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
