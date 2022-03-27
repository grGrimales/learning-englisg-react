import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../type/types";

import Swal from "sweetalert2";

export const startLogin = (email, password) => {
  const showMessage = (message, type) => {
    if (type == "err") {
      console.log(message);
    } else if (type == "success") {
      console.log("exitos");
    }
  };

  return async (dispatch) => {
    const resp = await fetchSinToken("auth/login", { email, password }, "POST");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.user.token);
      dispatch(
        login({
          uid: body.user.uid,
          name: body.user.name,
        })
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: body.msg,
        color: "#52b69a",
        confirmButtonColor: "#34a0a4",
      });
      showMessage(body.msg, "err");
    }
  };
};

export const startCheking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew-token");
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.user.token);
      dispatch(
        login({
          uid: body.user.uid,
          name: body.user.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.authChekingFinish,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
