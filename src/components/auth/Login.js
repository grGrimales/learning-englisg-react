import React, { useState } from "react";

import { useDispatch } from "react-redux";
import validator from "validator";
import { startLogin } from "../../action/auth";
import { useForm } from "../../hooks/useForm";

export const Login = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const [formValues, handleInputChange] = useForm({
    email: "superusertest@gmail.com",
    password: "123456",
  });

  const removeError = () => {
    setError(false);
    setMessage(null);
  };

  const IsformValid = () => {
    if (email.trim().length === 0 || password.length === 0) {
      setError(true);
      setMessage("*Todos los campos son obligatorios");

      setTimeout(() => {
        removeError();
      }, 3000);
      return false;
    } else if (password.length < 6) {
      setError(true);
      setMessage("*La contraseña debe tener mínimo 6 carácteres.");
      setTimeout(() => {
        removeError();
      }, 3000);
      return false;
    } else if (!validator.isEmail(email)) {
      setError(true);
      setMessage("*El correo no es válido.");
      setTimeout(() => {
        removeError();
      }, 3000);

      return false;
    }
    return true;
  };
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if (IsformValid()) {
      dispatch(startLogin(email, password));
    }
  };

  return (
    <>
      <div className="login">
        <h2 className="login__title">Iniciar sesión</h2>
        <form className="login__form" onSubmit={handleLogin}>
          <label htmlFor="email">Ingrese su correo:</label>
          <input
            name="email"
            id="email"
            type="text"
            autoComplete="off"
            value={email}
            placeholder="example@englishvocabulary.com"
            onChange={handleInputChange}
          />

          <label htmlFor="password">Ingrese su contraseña:</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            autoComplete="off"
            value={password}
            onChange={handleInputChange}
          />

          <button type="submit" className="Login__btn">
            Iniciar sesión
          </button>
          <a href="#">¿No tienes cuenta? Ingresa Aquí</a>
          {error && <div className="alert__error">{message}</div>}
        </form>
      </div>
    </>
  );
};
