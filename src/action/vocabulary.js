import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../type/types";

export const getCategory = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("vocabulary/category-vocabulary");
    const body = await resp.json();

    let listCategory = body.categoryVocabulary.map((l) => {
      return {
        category: l,
        id: l,
      };
    });

    dispatch(getListCategory(listCategory));
  };
};

const getListCategory = (listCategory) => ({
  type: types.categoryList,
  payload: listCategory,
});

export const getListFilteredVocabulary = (order, category) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      `vocabulary?order=${order}&category=${category} `
    );

    console.log(resp);
    const body = await resp.json();
    const listFiltered = body.vocabularys;
    dispatch(listFilteredVocabulary(listFiltered));
    localStorage.setItem("listFiltered", JSON.stringify(listFiltered));
    localStorage.setItem("showActivity", "true");
  };
};

const listFilteredVocabulary = (list) => ({
  type: types.listFiltered,
  payload: list,
});
