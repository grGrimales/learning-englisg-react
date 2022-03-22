import { fetchSinToken } from "../helpers/fetch";
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
      console.log(body);
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

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
