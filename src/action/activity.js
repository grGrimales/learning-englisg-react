import { types } from "../type/types";

export const setKindActivy = (typeOfactivity) => {
    return async (dispatch) => {
        localStorage.setItem("typeOfactivity", typeOfactivity);
        dispatch(updateKindActivy(typeOfactivity));
    }
};


export const updateKindActivy = (typeOfactivity) => ({
    type: types.updateKindActivy,
    payload: typeOfactivity,

})